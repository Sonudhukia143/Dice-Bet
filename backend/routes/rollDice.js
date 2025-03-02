import { Router } from 'express';
import rollDice from '../controllers/rollDiceController.js';

const router = Router();

router.post('/' , rollDice);

export default router;