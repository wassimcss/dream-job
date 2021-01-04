

let bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
const { loginValidation, registerValidation } = require("../validation/userValdation")

const User = require("../models/User")
//user Register
const register = async (req, role, res) => {
    // let validate a emlpoyee
    const { error } = registerValidation(req);
    if (error) return res.status(400).send(error.details[0].message);
    // let verify email existance 
    const user = await User.findOne({ email: req.email })
    if (user) return res.status(400).send({ msg: "you are alerady registred" })

    // hash password 
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.password, salt)
    // add new user 
    const newUser = new User({
       ...req,
        password: hashPassword,
        role

    });
    const savedUser = await newUser.save();
    const token = jwt.sign({ _id: savedUser._id,role:savedUser.role }, process.env.SECRET_TOKEN_E, { expiresIn: 3600 })
    res.header('auth-token', token).send({
        token,
        user: {
            _id: savedUser._id,
            name: savedUser.name,
            email: savedUser.email,
            category: savedUser.category,
            role: savedUser.role,
            block:savedUser.block
        }

    })
}

// User login
const login = async (req,role, res) => {
    // let validate a User
    const { error } = loginValidation(req);
    if (error) return res.status(400).send({ msg: error.details[0].message });

    // let verify email existance 
    const user = await User.findOne({ email: req.email })
    if (!user) return res.status(400).send({ msg: "Your email dosn't exist" })
    // We will check the role
    if (user.roleType !== role) {
        return res.status(403).json({
            msg: "Please make sure you are logging in from the right portal.",
        });
    }
    //we will check permission
    if (user.block === true){
        return res.status(403).json({
            msg:"You are blocked for a while"
        })
    }

    //

    // check  password 
    const validPass = await bcrypt.compare(req.password, user.password)
    if (!validPass) return res.status(400).send({ msg: "wrong password" })
    //create and assign  token 
    const token = jwt.sign({ _id: user._id,role:user.role }, process.env.SECRET_TOKEN_E, { expiresIn: 3600 })
    res.header('auth-token', token).send({
        token,
        user: {
            _id: user._id,
            email: user.email,
            name: user.name,
            category: user.category,
            role: user.role,
            block:user.block
        }
    })

}






//get the current user with the token
const getCurrentUser = (req, res) => {
    User.findById({ _id: req.user._id }).select("-password")
        .then(user => res.send(user))
}



module.exports = { getCurrentUser, login, register }