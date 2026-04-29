import express from "express";
import uploadImage from "../middleware/multer.js";
import { login, logout, register } from "../controllers/user.controller.js";

const userRoute = express.Router();

userRoute.post("/register", uploadImage.single("image"), register);
userRoute.post("/login", login);
userRoute.post("/logout", logout);

export default userRoute;