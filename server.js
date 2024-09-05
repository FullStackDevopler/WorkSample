"use strict";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import connectToMongoDB from './config/db.js';
import fileUpload from 'express-fileupload';
import setupDriverRoutes from './app/routes/index-driver-route.js';
import setupuserRoutes from './app/routes/index-user-route.js';

///start express 

const app = express();
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const { PORT } = process.env;
connectToMongoDB();
app.use(helmet());
app.use(bodyParser.json());
app.use(
  fileUpload({
    limits: {
      fileSize: 1024 * 1024 * 100000,
    },
    createParentPath: false,
  })
);

app.use(cors());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.send(`Kindra Courier API-V1 running on port ${PORT} !!`);
});

//All Routes
setupDriverRoutes(app);
setupuserRoutes(app);

//Run Port
app.listen(PORT, () => {
  console.log(`Kindra Courier API Server Is Running On Port : ${PORT}`);
});