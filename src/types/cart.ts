import type { ProductImage } from "@/types/product";

export interface CartItem {
  id: number;
  title: string;
  images: [ProductImage];
  price: number;
  discounted_price?: number;
  quantity: number;
  category_id?: number;
  available_quantity: number;
}

export interface Cart {
  items: CartItem[];
  promocode: string;
  promocodeDiscount: number;
  bonusesAmount: number;
  totalAmount: number;
}
