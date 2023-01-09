import axios from 'axios';
import { API_URL_V1 } from "../configs/index";
import {Meal, Ingredients} from "../interface/meals"



// Collect ingredients data
function ingredients(item: any) {
    let ingredient = Object.keys(item).filter(k => k.startsWith('strIngredient'))
    let measurement = Object.keys(item).filter(k => k.startsWith('strMeasure'))

    let ings:Ingredients[]  = [] 
    ingredient.forEach((element, index) => {
        const ms: string = measurement[index]
        const ing: Ingredients = {
            ingredient: item[element],
            measurement: item[ms]
        }
        ing?.ingredient && ings.push(ing);
    });
    return ings;
}
// Format data
const formatData = (meals: any) => {
    const meal: Meal =  meals?.map((item: any) => (
         {
            id: item?.idMeal,
            name: item?.strMeal,
            instructions: item?.strInstructions,
            thumbUrl: item?.strMealThumb,
            youtubeUrl: item?.strYoutube,
            ingredients: ingredients(item)
        }
    ))
    return meal;
}

// Get Meals using ingredien key
export const _getMealsByKey = async(key:string) => {
    const response = await axios.get(`${API_URL_V1}/search.php?s=${key}`)   
    if (response?.status === 200) {
        console.log(response?.data?.meals);
        return {status: response?.status, data: formatData(response?.data?.meals)};
    } else {
        return {status: response?.status, data: response?.statusText}
    }
    
}