const router = require('express').Router();
const { register, login, verifyToken, test, reset_password, forgot_password, new_password } = require('../controllers/user')

router.post('/register', register)
router.post('/login', login)
router.get('/login', verifyToken, test)

module.exports = router;
