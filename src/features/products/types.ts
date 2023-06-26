export type TCategories =
  | "all"
  | "pizza"
  | "burger"
  | "drinks"
  | "desserts"
  | "sides";

export type TProduct = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: TCategories[];
  images: string[];
};
