import {Request, Response} from "express";
import {_getMealsByKey} from "./../services/meals";
import {verifyToken} from './auth';

// GET Meals
export const getMeals = async(req: Request, res: Response) => {
    const {key} = req.query;
    const username = await verifyToken(req.cookies["token"], res);
    if(!username) return; 
    
    try {
        if (!key) res.status(400).json("Bad Request! 'key' query or search key missing.");
        const response = await _getMealsByKey(key as string);
        if (response?.status === 200) {
            res.status(200).json(response?.data || "no data");
        } else {
            res.status(response?.status).json(response?.data);
        }
    } catch (err) {
        console.log(err);
    }
};