import crypto from 'crypto';
import { User } from '../models/User.js';

export default async function rollDice (req, res) {
        const { bet } = req.body;
        if (!bet || bet <= 0) return res.status(400).json({ message: "Invalid bet amount" });
    
        const user = await User.findById(req.user);
        if (!user) return res.status(401).json({ message: "User not found" });

        if (bet > user.accountBalance) return res.status(400).json({ message: "Insufficient balance" });

        console.log(user);
        // Generate a random roll (1-6)
        const roll = Math.floor(Math.random() * 6) + 1;
        // Generate provably fair hash
        const hash = crypto.createHash("sha256").update(roll + process.env.SECRET_SEED).digest("hex");

        // Determine win or loss
        let result = "lose";
        if (roll >= 4 && roll <= 6) {
            result = "win";
            user.accountBalance += bet; // Win: 2x payout
            await user.save();
            return res.json({
                message:"Congrats For Your Victory Continue Playing And Win More",
                roll,
                result,
                hash,
                newBalance: user.accountBalance
            });
        } else if(roll <= 3 && roll >= 1) {
            result = "lose";
            user.accountBalance -= bet; // Lose: Deduct bet
            await user.save();
            return res.json({
                message:"You Lost But Continue Playing , Because Most Gamblers Quit Just When They Are About To Win",
                roll,
                result,
                hash,
                newBalance: user.accountBalance
            });
        } else{
            result = "draw";
            return res.json({
                message:"Congrats For Your Victory Continue Playing And Win More",
                roll,
                result,
                hash,
                newBalance: user.accountBalance
            });
        }
}