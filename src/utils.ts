import {Meal} from "./interface/meals"

// Format data
export const formatMealData = (meals: any) => {
    const meal: Meal =  meals?.map((item: any) => (
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