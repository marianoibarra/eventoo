const { Router } = require("express");
const { register, login, verifyToken, test, reset_password, forgot_password, checkResetToken, change_password } = require('../controllers/user')

const router = Router();

router.post('/user/register', register)
router.post('/user/login', login)
router.post('/user/forgot-password', forgot_password)
router.get('/user/reset-password/:reset_token', checkResetToken)
router.put('/user/reset-password', reset_password)
router.put('/user/change-password', change_password)
//router.put('/user', modifyUser)

//probar token login
router.get('/user/test-token', verifyToken, test)


module.exports = router;