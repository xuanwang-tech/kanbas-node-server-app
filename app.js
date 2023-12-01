import "dotenv/config";
import express from "express";
import cors from "cors";
import UserRoutes from "./users/routes.js";
import Hello from "./hello.js";
import Lab5 from "./lab5.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import AssignmentRoutes from "./assignment/routes.js";
import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/kanbas");

const app = express();
// app.use(
//   cors({
//     credentials: true,
//     origin: process.env.NODE_ENV === "production" ? process.env.FRONTEND_URL : process.env.FRONTEND_URL_LOCAL,
//   }));
app.use(cors());
app.use(express.json());
UserRoutes(app);
AssignmentRoutes(app);
ModuleRoutes(app);
CourseRoutes(app)
Lab5(app);
Hello(app);
app.listen(process.env.PORT || 4000);