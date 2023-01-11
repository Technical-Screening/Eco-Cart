export interface IngredientsDto {
    ingredient: string
    measurement: string
}
export interface MealDto {
    id: number
    name: string
    instructions: string
    thumbUrl: string
    youtubeUrl: string
    ingredients: IngredientsDto[] 
}