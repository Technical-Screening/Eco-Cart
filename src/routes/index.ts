import express, {Router} from "express";
import {login} from "../controllers/auth";
import {getMeals} from "../controllers/meals";

const router: Router = express.Router();

// Auth routes
router.post('/login', login);

// MEALS routes
router.get('/meals', getMeals)


export default router;