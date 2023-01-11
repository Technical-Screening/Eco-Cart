import { Response, Request, NextFunction } from 'express';
import {MealDto} from "./Dtos/mealsDto";
import * as redis from 'redis';

const redisClient = redis.createClient({url: process.env.REDIS_URL, password: process.env.REDIS_PASS});

// Format data
export const formatMealData = (meals: any) => {
    const meal: MealDto =  meals?.map((item: any) => (
         {
            id: item?.id,
            name: item?.meal,
            instructions: item?.strInstructions,
            thumbUrl: item?.thumbUrl,
            youtubeUrl: item?.youtubeUrl,
            ingredients: item?.ingredients
        }
    ));
    return meal;
}

// Cache middleware
export const isCached = async (req: Request, res: Response, next: NextFunction) => {
    const skey: any = req.query.skey;
    await redisClient.connect().catch(error => {})
    try {
        // getting our data by key (skey)
        const cacheResults = await redisClient.get(skey);

        if (cacheResults !== null) {
            console.log("we Found it in Redis 🟢");
            return res.status(200).json(cacheResults || "no data");
        } else {
            console.log("User Not Found 🔴 ");
            // go To ⏭️ function or middleware
            next();
        }

    } catch (error) {
        console.error(error);
        res.status(404).send("Data unavailable");
    }
};

// Cache data to Redis
export const setCached = async (skey: any, data:any) => {
  redisClient.set(skey, JSON.stringify(data)); 
};
  