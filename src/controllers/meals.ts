import {Request, Response} from "express";
import {_getMealsByKey} from "./../services/meals";
import {verifyToken} from './auth';
import { docClient } from "./../configs/db";
import { DB_TABLE } from "./../configs/index";
import { v4 as uuidv4 } from 'uuid';
import * as yup from "yup";
import {formatMealData} from '../utils'


const ingredientsSchema = yup.object({
    ingredient: yup.string(),
    measurement: yup.string(),
})

const mealSchema = yup.object({
    meal: yup.string().required(),
    category: yup.string(),
    instructions: yup.string(),
    thumbUrl: yup.string(),
    youtubeUrl: yup.string(),
    ingredients: yup.array().of(ingredientsSchema)
});

// GET Meals
export const getMeals = async(req: Request, res: Response) => {
    const {key} = req.query;
    try {
        const hasId = await verifyToken(req.cookies["token"], res);
        if(!hasId) return; 
        if (!key) res.status(400).json("Bad Request! 'key' query or search key missing.");

            const params = {
            TableName: DB_TABLE,
            FilterExpression: "sk= :sk AND begins_with(searchName, :meal)",
            ExpressionAttributeValues: {
              ":sk": "MEALS#",
              ":meal": key.toString().toLowerCase(),
            },
          };
          const response = await docClient.scan(params).promise();

        if (response) {
            res.status(200).json(formatMealData(response?.Items) || "no data");
        }
    
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
        console.log(content);
        await mealSchema.validate(content, { abortEarly: false });
        console.log("content");
        const meals = {
            ...content,
            "searchName": content?.meal.toLowerCase(),
            "id": uuidv4(),
            "sk": 'MEALS#',
            "createTime": Date.now(),
            "updateTime": Date.now(),
        }
        
        const params = {
            TableName: DB_TABLE,
            Item:  meals
        };

        docClient.put(params, function (err, data) {
            if (err) {
                return res.status(500).json({err});
            } else {
                console.log("contact::add::success" ); 
                return res.status(201).json(JSON.stringify(meals));               
            }
        });
    } catch (err) {
        console.log(err);
    }
}