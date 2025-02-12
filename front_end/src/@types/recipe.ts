export interface IRecipe {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  author: string;
  difficulty: string;
  description: string;
  ingredients: IIngredient[];
  instructions: string[];
}

export interface IIngredient {
  id: number;
  quantity: number;
  unit: string;
  name: string;
}