import express from 'express';
import rollDice from '../routes/rollDice.js';

const app = express();
app.use(express.json());
app.use('/', rollDice);

export default app;