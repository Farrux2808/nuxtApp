const {Router} = require('express')
const router = Router()
const {login, creatUser} = require('../controllers/auth.controller')

router.post('/admin/login')

module.exports = router;
