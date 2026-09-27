export enum IngredientUnit {
  Gram = "g",
  Kilogram = "kg",
  Milliliter = "ml",
  Liter = "l",
  Teaspoon = "tsp",
  Tablespoon = "tbsp",
  Cup = "cup",
  Piece = "piece",
  Clove = "clove",
  Pinch = "pinch",
}

export type Ingredient = {
  name: string;
  amount: number;
  units: IngredientUnit;
};

export type CookingStep = {
  stepNumber: number;
  description: string;
};

export type CommentReference = {
  collection: "comments";
  headId: string | null;
  tailId: string | null;
};

export type Recipe = {
  id: string;
  imageUrl: string;
  videoUrl: string;
  title: string;
  description: string;
  ingredients: Ingredient[];
  cookingSteps: CookingStep[];
  rating: number;
  comments: CommentReference;
};

export type CommentRecord = {
  id: string;
  recipeId: string;
  author: string;
  text: string;
  createdAt: string;
  parentCommentId: string | null;
  previousSiblingId: string | null;
  nextSiblingId: string | null;
};