import {Request, Response} from "express";
import {verifyToken} from './auth';
import {formatMealData, setCached, deletionKeysByKey} from '../utils'
import {CreateMeals, GetMealsByName} from '../models/meals'


// GET Meals
export const getMeals = async(req: Request, res: Response) => {
    const {skey} = req.query;
    try {
        const hasId = await verifyToken(req.cookies["token"], res);
        if(!hasId) return; 
        if (!skey) res.status(400).json("Bad Request! 'key' query or search key missing.");

        GetMealsByName(skey, async (err:any, data:any) => {
            if (err) {
                return res.status(500).json({err});
            } else {
                console.log("contact::add::success" ); 
                // Set data to Redis
                setCached(skey, formatMealData(data));
                return res.status(200).json(JSON.stringify(formatMealData(data)) || "no data");           
            }
        });
    
    } catch (err) {
        console.log(err);
    }
};

// Create Meal
export const addMeal = async(req: Request, res: Response) => {
    try {
        const hasId = await verifyToken(req.cookies["token"], res);
        if(!hasId) return; 
        const { content } = req.body;
        // clear the cache for the meal name
        deletionKeysByKey(content.meal);
        
        CreateMeals(content, (err, data) => {
            if (err) {
                return res.status(500).json({err});
            } else {
                console.log("contact::add::success" ); 
                return res.status(201).json(JSON.stringify(data));           
            }
        });
    } catch (err) {
        console.log(err);
    }
}