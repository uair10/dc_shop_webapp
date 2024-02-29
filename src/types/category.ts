import type { Product } from "@/types/product";

export type Category = {
  id: number;
  title: string;
}

export type CategoryWithProducts = {
  id: number;
  title: string;
  products: Product[];
}
