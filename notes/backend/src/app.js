import express from 'express'
import userRouter from './router/user.router.js';
import noteRouter from './router/note.router.js';
import logger from './config/logger.config.js'
import cookieParser from "cookie-parser";
import cors from 'cors'
import { options, corsOpt } from './config/cors.config.js';


const app = express()   
app.use(options);
app.use(cors(corsOpt ))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser('tokenSecret'));

app.use('/api/users', new userRouter().getRouter())
app.use('/api/notes', new noteRouter().getRouter())




app.listen(8000, () => logger.info('Server started on port 8000'))  

