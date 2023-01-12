import { pool } from "./../configs/db";

// Create Meal
export const CreateMeals = (content, cb) => {
    const text = 'INSERT INTO meals(meal, instructions, thumbUrl, youtubeUrl, ingredients, createTime, dateModified) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *'
    const values = [content.meal, content.instructions, content.thumbUrl, content.youtubeUrl, JSON.stringify(content.ingredients), null, null]

    pool.query(text, values, (err, res) => {
        cb(err, res.rows[0])
    });
}

// Select Meal by meal name 
export const GetMealsByName = (skey:any, cb:Function) => {
    const query = `SELECT * 
                   FROM "meals"
                   WHERE meal ILIKE '%' || $1 || '%' 
                   LIMIT 20`;
                   
    pool.query(query, [skey], (err, res) => {
        cb(err, res?.rows || [])
    });
}