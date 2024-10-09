export interface Product {
  name: string;
  price: number;
  imageUrl: string;
  amazonUrl: string;
}

export interface GameState {
  score: number;
  highScore: number;
  leftProduct: Product;
  rightProduct: Product;
  gameOver: boolean;
  products: Product[];
}