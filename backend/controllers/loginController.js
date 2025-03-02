import bcrypt from 'bcrypt';
import {User} from '../models/User.js';
import generateToken from '../utils/webtoken.js';

const loginUser = async (req, res) => {
    const { gmail, password } = req.body;
    if(!gmail || !password) return res.status(400).json({message:'Input feilds cannot be empty'});

    try {
        const user = await User.findOne({ gmail });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
        
        const token = generateToken(user._id);
        res.cookie('token', token , {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None',
            maxAge: 24 * 60 * 60 * 1000,
            path: '/',
        });
        const newUser = {
            username:user.username,
            gmail:user.gmail,
            balance:user.accountBalance,
        }
        return res.status(200).json({ message: 'Login successful' , token:token , user:newUser});
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};

export default loginUser;