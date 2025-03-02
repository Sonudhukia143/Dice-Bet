import { Router } from 'express';
import signupuser from '../controllers/signUpController.js';

const router = Router();

router.post('/' , signupuser);

export default router;