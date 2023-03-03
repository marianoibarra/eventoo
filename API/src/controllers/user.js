const { User, Address, EmailCode, RoleAdmin } = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {sendEmail} = require("../helpers/sendEmail");
const regexp_password = require("../helpers/regexps");
const generateEmailCode = require("../helpers/generateEmailCode");

const { verifyGoogle } = require("../helpers/verifyGoogle");

const googleAuth = async (req, res) => {
  try {
    const { credential } = req.body;
    const { email, picture, given_name, family_name, email_verified } =
      await verifyGoogle(credential);

    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        name: given_name,
        last_name: family_name,
        profile_pic: picture ? picture : `https://ui-avatars.com/api/?size=128&background=random&name=${given_name}+${family_name}&length=1`,
        email: email,
        emailIsVerify: email_verified,
      },
    });

    if(created) {
      const role = await RoleAdmin.findByPk(3)
      await user.setRoleAdmin(role)
    }

    await user.reload({
      attributes: { exclude: ["addressId", "roleAdminId"] },
      include: [
        "roleAdmin",
        {
          model: Address,
          as: "address",
          attributes: { exclude: ["id"] },
        },
      ],
    })

    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: "90d",
    });

    const response = user ? await user.toJSON() : null
    
    if(response.roleAdmin) response.roleAdmin = response.roleAdmin.name;
     delete response.password

    res.send({
      isNewUser: created,
      id: user.id,
      token,
      data: response,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const register = async (req, res) => {
  try {
    const {
      email,
      password,
      name,
      last_name,
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
        profile_pic: `https://ui-avatars.com/api/?size=128&background=random&name=${name}+${last_name}&length=1/`,
        born,
        address: {
          address_line,
          city,
          state,
          country,
          zip_code,
        },
        emailCode: {
          code: code,
          expiration: expiration,
        }
      },
      {
        include: ["address", EmailCode],
      }
    );

    const role = await RoleAdmin.findByPk(3)
    await newUser.setRoleAdmin(role)

    const response = await User.findByPk(newUser.id, {
      attributes: { exclude: ["password", "addressId", "roleAdminId"] },
      include: [
        "roleAdmin",
        {
          model: Address,
          as: "address",
          attributes: { exclude: ["id"] },
        },
      ],
    }).then((r) => r.toJSON());

    if(response.roleAdmin.name) response.roleAdmin = response.roleAdmin.name;

    sendEmail(newUser.email, code, newUser.name, "confirmEmail");

    const token = jwt.sign({ id: newUser.id }, process.env.SECRET, {
      expiresIn: "90d",
    });

    return res.send({
      msg: "User created successfully",
      id: newUser.id,
      token,
      data: response,
    });
  } catch (e) {
    console.log(e);
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

    res.send({ msg: "Email code resended" });
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
        attributes: ["id"],
        include: {
          model: EmailCode,
          where: {
            code: emailCode,
          },
          attributes: ["code", "expiration"],
        },
      },
      {
        raw: true,
        nested: true,
      }
    );

    if (!userWithEmailCode) {
      return res
        .status(401)
        .send({ isValid: false, msg: "The code is invalid or has expired" });
    }

    const expiration = new Date(userWithEmailCode.EmailCode.expiration);
    const now = new Date();
    if (now > expiration) {
      return res
        .status(401)
        .send({ isValid: false, msg: "The code is invalid or has expired" });
    }

    await userWithEmailCode.update({ emailIsVerify: true });

    userWithEmailCode.getEmailCode().then((emailCode) => {
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
      attributes: { exclude: ["addressId", "roleAdminId"] },
      include: [
        "roleAdmin",
        {
          model: Address,
          as: "address",
          attributes: { exclude: ["id"] },
        },
      ],
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

     const response = await user.toJSON()  
    
     if(response.roleAdmin.name) response.roleAdmin = response.roleAdmin.name;
     delete response.password

    return res.send({
      msg: "Logged in successfully",
      id: user.id,
      token,
      data: response,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "Internal server error" });
  }
};

const verifyToken = (req, res, next) => {
  "6se74fd7s8f";
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
      `https://www.eventoo.com.ar/reset-password/${reset_token}`,
      user.name,
      "resetPassword"
    );
    res.send({ msg: "Email sended successfully" });
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

const getProfile = async ({ userId }, res) => {

  try {
    const profileUser = await User.findByPk(userId, {
      attributes: { exclude: ["password", "addressId", "roleAdminId"] },
      include: [
        "roleAdmin",
        {
          model: Address,
          as: "address",
          attributes: { exclude: ["id"] },
        },
      ],
    }).then((r) => r.toJSON());

    if(profileUser.roleAdmin.name) profileUser.roleAdmin = profileUser.roleAdmin.name;
    res.status(200).json(profileUser);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const resetPassword = async (req, res) => {
  const { changePassToken, newPassword } = req.body;

  try {
    if (changePassToken) {
      const { id } = jwt.verify(changePassToken, process.env.SECRET);

      const user = await User.findOne({ where: { id } });

      if (!user)
        return res.status(401).json({ msg: "Invalid token or expired" });

      await user.update({
        password: newPassword,
      });

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

const modifyUser = async (req, res) => {
  const userId = req.userId;
  const {
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
  try {
    const user = await User.findByPk(userId);

    if (address_line && city && state && country && zip_code) {
      const newAddress = await Address.create({
        address_line,
        city,
        state,
        country,
        zip_code,
      });
      await user.setAddress(newAddress);
    }
    await user.update({
      name,
      last_name,
      profile_pic,
      born,
    });
    await user.reload({
      include: [
        {
          model: Address,
          as: "address",
          attributes: { exclude: ["id"] },
        },
      ],
    });
    res.json({ msg: "successful modification", data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verifyAdmins = async (req, res, next) => {
  const userId = req.userId;
  try {
    const user = await User.findByPk(userId);
    const role = await RoleAdmin.findByPk(user.roleAdminId)
    if (role.name === "ADMIN" || role.name === "SUPERADMIN") {
      next();
    } else {
      res.status(401).json({ msg: "You are not an ADMIN" });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const verifySuperAdmin = async (req, res, next) => {
  const userId = req.userId;
  try {
    const user = await User.findByPk(userId);
    const role = await RoleAdmin.findByPk(user.roleAdminId);
    if (role.name === "SUPERADMIN") {
      next();
    } else {
      res.status(401).json({ msg: "You are not the SUPERADMIN" });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const changeRole = async (req, res) => {
  const { id } = req.params;
  const userId = Number(id);
  try {
    const user = await User.findByPk(userId);
    const roleId = user.roleAdminId;
    const role = await RoleAdmin.findByPk(roleId);
    await role.update({ name: "ADMIN" });
    res.send("Successful update");
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
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
  resendEmailCode,
  modifyUser,
  verifyAdmins,
  verifySuperAdmin,
  googleAuth,
  getProfile,
};
