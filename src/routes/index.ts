import express, {Router} from "express";
import {login} from "../controllers/auth";
import {getMeals, addMeal} from "../controllers/meals";

const router: Router = express.Router();

// Auth routes
router.post('/login', login);

// MEALS routes
router.get('/meals', getMeals)
router.post('/meals', addMeal)


export default router;