// const express = require('express')
import express from 'express';
import Hello from "./hello.js"
import Lab5 from "./lab5.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import cors from "cors";
import "dotenv/config";
const app = express()
// app.get('/hello', (req, res) => {res.send('Life is good!')})
// app.get('/', (req, res) => {res.send('Welcome to Full Stack Development!')})
ModuleRoutes(app);
CourseRoutes(app);

app.use(
    cors({
      credentials: true,
      origin: process.env.FRONTEND_URL
    }));
app.use(express.json());
Lab5(app);
Hello(app)
app.listen(process.env.PORT || 4000);


