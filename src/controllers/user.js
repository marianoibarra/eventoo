const { User } = require('../db')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
  try {
    const { email, password } = req.body
    newUser = await User.create({ email, password })
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
    console.log(authorization)
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
    console.log(req.userId)
    res.send('todo ok')
  } catch (error) {
    res.status(400).send('error')
  }
}

const forgot_password = async (req, res) => {
  
}

const reset_password = async (req, res) => {
  
}

const new_password = async (req, res) => {
  
}

module.exports = {
  register,
  login,
  forgot_password,
  reset_password,
  new_password,
  verifyToken,
  test
}