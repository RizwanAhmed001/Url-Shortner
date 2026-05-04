import express from "express";
import { addUrl } from "../controllers/url.controller.js";

const urlRoute = express.Router();

urlRoute.post("/addurl", addUrl);

export default urlRoute;