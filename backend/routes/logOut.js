import express from 'express';
import logout from '../controllers/logOut.js';

const router = express.Router();

router.post('/',logout);

export default router;