const { User, Address } = require('../db')
const jwt = require('jsonwebtoken')
const sendMail = require('../helpers/sendMail')
const regexp_password = require('../helpers/regexps')

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
      zip_code
    } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).send({ msg: "This email is already in use" });
    }

    if (!regexp_password.test(password)) {
      return res.status(400).send({
        msg: "This password does not meet the security requirements"
      });
    }

    const newUser = await User.create({
      email,
      password,
      name,
      last_name,
      profile_pic,
      born,
    });

    await newUser.createAddress({
      address_line, 
      city, 
      state, 
      country, 
      zip_code 
    });

    const a = await User.findOne({where: {id: newUser.id}, include: {model: Address}})

    res.send({data: a, msg: "User created successfully"});
  } catch (err) {
    res.send(err.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!email || !password) return res.status(500).send({msg: 'You must enter an email and a password'})

    const user = await User.findOne({ 
      where: { email },
      include: {
        model: Address
      }
    });
    if (!user) {
      return res
        .status(401)
        .send({ message: "Email or password is incorrect" });
    }

    const matchPassword = await user.validPassword(password)
    if (!matchPassword) {
      return res
        .status(401)
        .send({ message: "Email or password is incorrect" });
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: "90d"});

    return res.send({ user, message: "Logged in successfully", id: user.id, token });
    
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
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
}

const test = async (req, res) => {



  try {
    res.send(`el id es: ${req.userId}`)
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const forgot_password = async (req, res) => {
  try {
    const { email } = req.body
    const user = await User.findOne({where: {email}})

    if(!user) return res.status(501).send({msg: 'Email does not exist'})

    const reset_token = jwt.sign({ id: user.id }, process.env.SECRET, {expiresIn: '1h'})

    sendMail(user.email, `${CLIENT_URL}/reset-password/${reset_token}`, user.name)
    res.send('done')
  } catch (error) {

    res.status(501).send(error.message)
  }
}

const checkResetToken = async (req, res) => {

  try {

    const { reset_token } = req.params;

    if (reset_token) {
      const { id } = jwt.verify(reset_token, process.env.SECRET)

      const user = await User.findOne({where: { id }})

      if(!user) return res.status(401).json({ msg: "This URL is invalid" });

      const changePassToken = jwt.sign({ id: user.id }, process.env.SECRET, {expiresIn: '5m'});
      res.json({ name: user.name, changePassToken})
        
    } else {
      res.status(401).json({ msg: "No token" });
    }
  } catch (error) {
    res.status(401).json({ msg: "This URL is invalid or expired" });
  }
}

const reset_password = async (req, res) => {

  const { changePassToken, newPassword } = req.body;

  try {

    if (changePassToken) {
      const {id} = jwt.verify(changePassToken, process.env.SECRET)

      const user = await User.findOne({where: { id }})

      if(!user) return res.status(401).json({ msg: "invalid token" });

      await user.update({
        password: newPassword,
      });

      console.log(user)

      res.json({ msg: 'Password changed successfully'})
        
    } else {
      res.status(401).json({ msg: "No token" });
    }
  } catch (error) {
    console.log(error)
    res.status(401).json({ msg: "Token expired" });
  }
  
}

const change_password = async (req, res) => {

  const { password } = req.body

  const user = await User.findOne({where: {id: req.userId}})

  user.update({password: password}) 

  res.send('Password changed successfully')
  
}

module.exports = {
  register,
  login,
  forgot_password,
  reset_password,
  checkResetToken,
  verifyToken,
  test,
  change_password
}