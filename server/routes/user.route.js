import express from "express";
import uploadImage from "../middleware/multer.js";
import { register } from "../controllers/user.controller.js";

const userRoute = express.Router();

userRoute.post("/register", uploadImage.single("image"), register);

export default userRoute;