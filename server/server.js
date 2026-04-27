import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";

configDotenv();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API WORKING!")
})

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server Running At Port http://localhost:${port}`);
})