import express from "express";
import authHttpHandler from "./auth-http.js";

const router = express.Router();

router.route('/login')
    .post(authHttpHandler.loginUser);

export default router;