import express from 'express';
import logout from '../routes/logOut.js';


const app = express();
app.use(express.json());
app.use('/', logout);

export default app;