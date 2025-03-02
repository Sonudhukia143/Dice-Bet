import bcrypt from 'bcrypt';
import { User, validateUser } from '../models/User.js';
import generateToken from '../utils/webtoken.js';

export default async function signinuser(req, res) {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { username, gmail, password } = req.body;

    try {
        const existingUser = await User.findOne({ $or: [{ username }, { gmail }] });
        if (existingUser) return res.status(404).json({ message: "Username or email already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, gmail, password: hashedPassword });

        const saveUser = await newUser.save();
        if(!saveUser) return res.send(404).json({message:"Unable to save user."});

        const token = generateToken(newUser._id);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None',
            maxAge: 24 * 60 * 60 * 1000,
            path: '/',
        });
        const jsonUser = {
            gmail: newUser.gmail,
            username:newUser.username,
            balance:newUser.accountBalance,
        }

        return res.status(200).json({ message: 'Creation successful', token: token, user: jsonUser });
    } catch (error) {
        if (error) {
            return res.status(404).json({ message: "Username or email already exists" });
        }
        return res.status(500).json({ message: "Internal server error" });
    }
}