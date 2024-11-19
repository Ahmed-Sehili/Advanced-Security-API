import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import sequelize from './config/db.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const options = {
    origin: 'http://localhost:3000',
    credentials: true
}

app.use(express.json());
app.use(cookieParser());
app.use(cors(options));

import { router } from './routes/routes.js';
app.use('/api', router);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
    return sequelize.sync(); 
}).then(() => {
    console.log('Database synced');
}).catch((err) => {
    console.error('Unable to connect to the database:', err);
});

app.listen(PORT, () => console.log('Server is running on port: ', PORT));
