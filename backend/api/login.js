import express from 'express';
import logInRouter from '../routes/login.js';

const app = express();
app.use(express.json());
app.use('/', logInRouter);

export default app;