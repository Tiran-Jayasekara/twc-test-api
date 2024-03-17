const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Joi = require("joi").extend(require("@joi/date"));



function validateUser(req) {
    const schema = Joi.object({
        email: Joi.string().email(),
        password: Joi.string().min(5).max(20).required(),
    });
    return schema.validate(req);
}

// User Register
module.exports.registerUser = async (req, res) => {
    try {
        const { error } = validateUser(req.body);
        if (error) {
            res.status(200).json({ message: error.message });
        } else {
            const { email, password } = req.body;
            const isUserAlreadyExist = await User.findOne({ email });
            if (isUserAlreadyExist) {
                res.status(200).json({ message: "This email is Already Exist !" });
            } else {
                const hash = await bcrypt.hash(password, 10);

                const user = await User.create({
                    email,
                    password: hash,
                });

                if (user) {
                    res.status(200).json({ message: "User Add Successfull", user });
                } else {
                    res.status(400).json({ message: "Unsuccess" });
                }
            }
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}



// User Login
module.exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const checkUser = await User.findOne({ email });
        if (checkUser) {
            const match = await bcrypt.compare(password, checkUser.password);
            if (match) {
                const token = jwt.sign(
                    {
                        id: checkUser._id,
                        email: checkUser?.email,
                    },
                    (process.env.SecretKey),
                    { expiresIn: "1d" }
                );

                res.status(200).json({ message: "Login Success", checkUser, token });
            } else {
                res.status(200).json({ message: "Password Is Wrong" });
            }
        } else {
            res.status(200).json({ message: "Email Not Register" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};