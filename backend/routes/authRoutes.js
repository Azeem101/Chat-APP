import express from 'express';
import { authLogin, authLogout, authSignup } from '../controllers/authController.js';

const route = express.Router();

route.post("/login", authLogin);
route.post("/logout", authLogout);
route.post("/signup", authSignup);

export default route;
