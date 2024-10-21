const router = require('express').Router();
const { register, login, logout, authMiddleWare } = require('../controllers/auth/auth-controllers');
const User = require('../models/user');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/check-auth', authMiddleWare, async (req, res) => {
    const user = req.user;
    res.json({
        success: true,
        message: "Authenticated user",
        user
    })
})

module.exports = router;