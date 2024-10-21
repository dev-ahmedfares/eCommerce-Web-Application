import { isString } from "./guards";

export type TCategory = {
  id?: number;
  title: string;
  prefix: string;
  img: string;
};
export type TProduct = {
  id: number;
  title: string;
  cat_prefix: string;
  img: string;
  price: number;
  max: number;
  quantity?: number;
  isLiked?: boolean;
  isAuthenticated?: boolean;
  weight?: number;
  dimensions?: number[];
  color?: string[];
  material?: string[];
};

export type TOrderList = {
  items: TProduct[];
  id: number;
  subtotal: number;
};

export type TLoading = "idle" | "pending" | "succeeded" | "failed";
export { isString };
