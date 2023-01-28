const { Router } = require("express");
const { register, login, verifyToken, test, resetPassword, forgotPassword, checkResetToken, changePassword, verifyEmailCode, resendEmailCode } = require('../controllers/user')

const router = Router();

router.post('/register', register)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.get('/reset-password/:reset_token', checkResetToken)
router.put('/reset-password', resetPassword)
router.put('/change-password', verifyToken, changePassword)
router.post('/verify-email', verifyToken, verifyEmailCode)
router.post('/verify-email/resend', verifyToken , resendEmailCode)

//router.put('/user', modifyUser)

//probar token login
router.get('/test-token', test)



module.exports = router;