import express from "express";
import { addUrl } from "../controllers/url.controller.js";
import { auth } from "../middleware/auth.js";

const urlRoute = express.Router();

urlRoute.post("/addurl",auth, addUrl);

export default urlRoute;