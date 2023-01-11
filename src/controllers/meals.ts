import {Request, Response} from "express";
import {verifyToken} from './auth';
import * as yup from "yup";
import {formatMealData, setCached} from '../utils'
import {CreateMeals, GetMealsByName} from '../models/meals'


const ingredientsSchema = yup.object({
    ingredient: yup.string(),
    measurement: yup.string(),
})

const mealSchema = yup.object().shape({
    meal: yup.string().required(),
    category: yup.string().required(),
    instructions: yup.string(),
    thumbUrl: yup.string(),
    youtubeUrl: yup.string(),
    ingredients: yup.array().of(ingredientsSchema)
});

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

        //     const params = {
        //     TableName: DB_TABLE,
        //     FilterExpression: "sk= :sk AND begins_with(searchName, :meal)",
        //     ExpressionAttributeValues: {
        //       ":sk": "MEALS#",
        //       ":meal": key.toString().toLowerCase(),
        //     },
        //   };
        //   const response = await docClient.scan(params).promise();



        // if (response) {
        //     res.status(200).json(formatMealData(response?.Items) || "no data");
        // }
    
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
        // await mealSchema.validate(content, { abortEarly: false });
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