export interface Ingredients {
    ingredient: string
    measurement: string
}
export interface Meal {
    id: number
    name: string
    instructions: string
    thumbUrl: string
    youtubeUrl: string
    ingredients: Ingredients[] 
}
