export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
  description?: string;
  created_at?: string;
}

export interface CartItem extends Product {
  quantity: number;
}
