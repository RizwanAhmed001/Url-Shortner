import express from "express";
import { addUrl, allUserUrls, redirectUrl } from "../controllers/url.controller.js";
import { auth } from "../middleware/auth.js";

const urlRoute = express.Router();

urlRoute.post("/addurl",auth, addUrl);
urlRoute.get("/alluserurls", auth, allUserUrls);


export default urlRoute;
