//not needed can be deleted

import { User,validateUser } from "../models/User.js";

export default async function validateSignInUser(req,res,next) {
    try {
        const user = {
            username: req.body.username,
            gmail: req.body.gmail,
            password: req.body.password,
        };

        const { error } = validateUser(user);
        if (error) return res.status(400).json({ "message": JSON.stringify(error.details[0].message) });

        const existingUser = await User.findOne({ $or: [{ username: user.username }, { gmail: user.gmail }] });
        if (existingUser) return res.status(400).json({ "message": "Username or email already exists" });
        
        next();
    } catch (error) {
        return res.status(500).json({ message: "Unexpected Server error: " + error.message });
    }
}