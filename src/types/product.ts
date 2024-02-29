type Feelings = {
  title: string;
};

type Genetics = {
  title: string;
};

export type ProductImage = {
  product_id: number;
  image_path: string;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  category_id: number;
  images: [ProductImage];
  rating: number;
  reviews_count: number;
  available_quantity: number;
  price: number;
  weight: number;
  strain_name: string;
  strain_type: string;
  thc: number;
  origin: string;
  pgr: boolean;
  vhq: boolean;
  cbd: string;
  feelings: [Feelings];
  genetics: [Genetics];
}
