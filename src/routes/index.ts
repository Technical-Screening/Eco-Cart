import express, {Router} from "express";
import {login} from "../controllers/auth";
import {getMeals, addMeal} from "../controllers/meals";
import {isCached} from "./../utils"

const router: Router = express.Router();

// Auth routes
router.post('/login', login);

// MEALS routes with Cache middileware
router.get('/meals', isCached, getMeals);
router.post('/meals', addMeal)


export default router;