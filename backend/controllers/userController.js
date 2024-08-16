const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const generateToken = (_id) => {
    return jwt.sign({ _id:_id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try{
        const user = await User.login(email, password);

        const token = generateToken(user._id);

        res.status(200).json({email,token});
    }catch(error){
        res.status(400).json({ error: error.message });
    }
};

const registerUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.register(email, password);

        // create jwt token

        const token = generateToken(user._id);

        res.status(200).json({email,token});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {loginUser, registerUser};