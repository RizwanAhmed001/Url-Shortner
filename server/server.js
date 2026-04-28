import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import connectDB from "./config/connectDB.js";
import cloudinaryConfig from "./config/cloudinary.js";
import userRoute from "./routes/user.route.js";

configDotenv();

const app = express();

connectDB();
cloudinaryConfig();

app.use(cors());
app.use(express.json());

app.use("/api/user", userRoute);

app.get("/", (req, res) => {
  res.send("API WORKING!")
})

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server Running At Port http://localhost:${port}`);
})