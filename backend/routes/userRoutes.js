import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import { getUsersForSidebar } from '../controllers/userController.js';

const route = express.Router();

route.get("/", protectRoute, getUsersForSidebar);

export default route;
