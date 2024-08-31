import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import authRoute from "./routes/auth.route.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);

app.listen(8000, () => {
  console.log("http://localhost:8000");
});

// console-ninja node --watch app.js
