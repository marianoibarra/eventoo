const { Router } = require("express");
const { register, login, verifyToken, test, reset_password, forgot_password, checkResetToken, change_password } = require('../controllers/user')

const router = Router();

router.post('/register', register)
router.post('/login', login)
router.post('/forgot-password', forgot_password)
router.get('/reset-password/:reset_token', checkResetToken)
router.put('/reset-password', reset_password)
router.put('/change-password', verifyToken, change_password)

//router.put('/user', modifyUser)

//probar token login
router.get('/test-token', verifyToken, test)



module.exports = router;