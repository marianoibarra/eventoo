const { User, Address, EmailCode, RoleAdmin } = require("../db");
const jwt = require("jsonwebtoken");
const sendEmail = require("../helpers/sendEmail");
const regexp_password = require("../helpers/regexps");
const generateEmailCode = require("../helpers/generateEmailCode");

const register = async (req, res) => {
  try {
    const {
      email,
      password,
      name,
      last_name,
      profile_pic,
      born,
      address_line,
      city,
      state,
      country,
      zip_code,
    } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).send({ msg: "This email is already in use" });
    }

    console.log(!regexp_password.test(password), password);

    if (!regexp_password.test(password)) {
      return res.status(400).send({
        msg: "This password does not meet the security requirements",
      });
    }

    const [code, expiration] = generateEmailCode();

    const newUser = await User.create(
      {
        email,
        password,
        name,
        last_name,
        profile_pic,
        born,
        address: {
          address_line,
          city,
          state,
          country,
          zip_code,
        },
        EmailCode: {
          code: code,
          expiration: expiration,
        },
        RoleAdmin:{}
        
      },
      {
        include: ['address', EmailCode, RoleAdmin],
      }
    );

    sendEmail(newUser.email, code, newUser.name, "confirmEmail");

    const token = jwt.sign({ id: newUser.id }, process.env.SECRET, {
      expiresIn: "90d",
    });

    return res.send({
      msg: "User created successfully",
      id: newUser.id,
      token,
    });
  } catch (e) {
    console.log(e)
    res.status(400).send(e.message);
  }
};

const resendEmailCode = async (req, res) => {
  try {
    const [code, expiration] = generateEmailCode();
    const newCode = await EmailCode.create({ code, expiration });
    const user = await User.findOne({ where: { id: req.userId } });
    await user.setEmailCode(newCode);

    sendEmail(user.email, newCode, newUser.name, "confirmEmail");

    res.send({msg: "Email code resended"})
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const verifyEmailCode = async (req, res) => {
  try {
    const { emailCode } = req.body;
    const userWithEmailCode = await User.findOne(
      {
        where: {
          id: req.userId,
        },
        attributes: ['id'],
        include: {
          model: EmailCode,
          where: {
            code: emailCode
          },
          attributes: ["code", "expiration"],
        },
      }, {
        raw: true,
        nested: true
      }
  );

    
  if(!userWithEmailCode) {
    return res.status(401).send({ isValid: false, msg: "The code is invalid or has expired" })
  }
    
  const expiration = new Date(userWithEmailCode.EmailCode.expiration);
  const now = new Date();
  if (now > expiration) {
    return res.status(401).send({ isValid: false, msg: "The code is invalid or has expired" })
  } 

  await userWithEmailCode.update({emailIsVerify: true})

  userWithEmailCode.getEmailCode().then(emailCode => {
    emailCode.destroy();
  });

  res.send({ isValid: true, msg: "The code is valid" });
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(500)
        .send({ msg: "You must enter an email and a password" });

    const user = await User.findOne({
      where: { email },
      include: 'address'
    });
    if (!user) {
      return res.status(401).send({ msg: "Email or password is incorrect" });
    }

    const matchPassword = await user.validPassword(password);
    if (!matchPassword) {
      return res.status(401).send({ msg: "Email or password is incorrect" });
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: "90d",
    });

    return res.send({ msg: "Logged in successfully", id: user.id, token });
  } catch (error) {
    return res.status(500).send({ msg: "Internal server error" });
  }
};

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET, (err, user) => {
      if (err) {
        return res.status(401).json({ msg: "You are not authenticated" });
      }
      req.userId = user.id;
      next();
    });
  } else {
    res.status(401).json({ msg: "You are not authenticated" });
  }
};

const test = async (req, res) => {
  const token = generateToken();

  try {
    res.json(token);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(501).send({ msg: "Email does not exist" });

    const reset_token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: "1h",
    });

    sendEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${reset_token}`,
      user.name,
      "resetPassword"
    );
    res.send({msg: "Email sended successfully"});
  } catch (error) {
    res.status(501).send(error.message);
  }
};

const checkResetToken = async (req, res) => {
  try {
    const { reset_token } = req.params;

    if (reset_token) {
      const { id } = jwt.verify(reset_token, process.env.SECRET);

      const user = await User.findOne({ where: { id } });

      if (!user) return res.status(401).json({ msg: "This token is invalid" });

      const changePassToken = jwt.sign({ id: user.id }, process.env.SECRET, {
        expiresIn: "10m",
      });
      res.json({ name: user.name, changePassToken });
    } else {
      res.status(400).json({ msg: "No token" });
    }
  } catch (error) {
    res.status(401).json({ msg: "This token is invalid or expired" });
  }
};

const resetPassword = async (req, res) => {
  const { changePassToken, newPassword } = req.body;

  try {
    if (changePassToken) {
      const { id } = jwt.verify(changePassToken, process.env.SECRET);

      const user = await User.findOne({ where: { id } });

      if (!user) return res.status(401).json({ msg: "Invalid token or expired" });

      await user.update({
        password: newPassword,
      });

      console.log(user);

      res.json({ msg: "Password changed successfully" });
    } else {
      res.status(400).json({ msg: "No token" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "Invalid token or expired" });
  }
};

const changePassword = async (req, res) => {
  const { password } = req.body;

  const user = await User.findOne({ where: { id: req.userId } });

  user.update({ password: password });

  res.send("Password changed successfully");
};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  checkResetToken,
  verifyToken,
  test,
  changePassword,
  verifyEmailCode,
  resendEmailCode
};
