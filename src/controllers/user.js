const { User } = require('../db')
const jwt = require('jsonwebtoken')
const sendMail = require('../helpers/sendMail')
const bcrypt = require('bcrypt')

const register = async (req, res) => {
  try {
    const { email, password, name } = req.body
    newUser = await User.create({ name, email, password })
    res.send({msg: 'Register OK!'})
  } catch (error) {
    res.status(400).send({msg: error.message})
  }
}

const login = async (req, res) => {
  const { email, password } = req.body
  if(!email || !password) return res.status(500).send({msg: 'error'})
  const user = await User.findOne({where: {email}})
  if(!user) return res.status(500).send({msg: 'invalid email'})
  const checkPassword = await user.validPassword(password)
  
  if(checkPassword) {

    const accessToken = jwt.sign({ id: user.id }, process.env.SECRET); 
    
    res.json({
        msg: 'Login OK',
        id: user.id,
        token: accessToken,
      });

  } else {
    res.status(500).send({msg: 'Invalid password'})
  }
}

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
    res.send('todo ok')
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

    sendMail(user.email, `http://localhost:3000/reset-password/${reset_token}`, user.name)
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
      //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjc0NDE4MDc2LCJleHAiOjE2NzQ0MjE2NzZ9.yFfxcGo_vUKg_4x3fCmow7dtmV7ysAv8Y0Yx1q2ztXU

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