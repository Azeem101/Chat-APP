import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectToMongoDb from './db/connectToMongoDb.js';

import authRoute from './routes/authRoutes.js';
import messageRoute from './routes/messageRoute.js';
import userRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import { app, server } from './socket/socket.js';



app.use(express.json());
app.use(cookieParser());
app.use(cors());
dotenv.config();

const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
    console.log("hello world");
    res.send("working");
});

app.use('/api/auth', authRoute);
app.use('/api/message', messageRoute);
app.use('/api/users', userRoutes);

server.listen(port, async () => {
    await connectToMongoDb();
    console.log(`Server is running: ${port}`);
});
