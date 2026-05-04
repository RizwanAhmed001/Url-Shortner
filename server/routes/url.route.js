import express from "express";
import { addUrl } from "../controllers/url.controller";

const urlRoute = express.Router();

urlRoute.post("/addurl", addUrl);

export default urlRoute;