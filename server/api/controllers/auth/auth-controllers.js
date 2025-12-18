const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

const register = async (req, res) => {
    
    const { username, email, password } = req.body;

    User.find({ $or: [{ username: username }, { email: email }] })
    .then((data) => {
        if (data.length > 0){
            return res.status(400).json({
                message: "User Already Exist",
                success: false
            })
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(req.body.password)) {
            return res.status(400).json({
                message: "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.",
                success: false
            });
        }

        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({
                    
                    message: "This Password Is Not Valid",
                    success: false
                });
            }
            const newUser = new User({
                username: username,
                email: email,
                password: hash
            })

            newUser.save()
            .then((data) => {
                return res.status(201).json({
                    message: 'User is Created',
                    success: true
                })
            }).catch((err) => {
                return res.status(401).json({
                    message: err.message,
                    success: false
                })
            })
        })

    })
    .catch((error) => {
        res.status(500).json({
            message: error.message
        })
    })
}
const login = async (req, res) => {
    
    const { email, password } = req.body;

    User.find({ email: email })
    .then((data) => {
        if (data.length < 1) return res.status(404).json({message: "User is not authenticated", success: false});
        bcrypt.compare(password, data[0].password, (err, response) => {
            if (err || !response) return res.status(401).json({ message: "Authentication Failed Something Is Wrong", success: false})
            
            const token = jwt.sign(
                {id: data[0]._id, username: data[0].username, email: data[0].email, role: data[0].role},
                process.env.JWT_SECRET_KEY,
                {expiresIn: "1h"}
            );

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 3600000,
                sameSite: "strict"
            });

            return res.status(200).json({
                message: "Successfully Loged in",
                success: true,
                user: {
                    username: data[0].username,
                    email: data[0].email,
                    role: data[0].role,
                    id: data[0]._id
                }
            });
        })
    }).catch((err) => {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    })
}

const logout = (req, res) => {
    res.clearCookie("token").json({
        success: true,
        message: "Logged out Successfully"
    })
}

const authMiddleWare = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized user",
            success: false
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized user",
            success: false
        })
    }
}

module.exports = {
    register,
    login,
    logout,
    authMiddleWare
}