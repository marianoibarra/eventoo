const router = require('express').Router();
const { register, login, verifyToken, test, reset_password, forgot_password, checkResetToken, change_password } = require('../controllers/user')

router.post('/register', register)
router.post('/login', login)

router.get('/login', verifyToken, test)

router.post('/forgot-password', forgot_password)
router.get('/reset-password/:reset_token', checkResetToken)
router.put('/reset-password', reset_password)
router.put('/change-password', change_password)

module.exports = router;
