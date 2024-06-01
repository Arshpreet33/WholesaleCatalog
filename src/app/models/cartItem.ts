import { Product } from "./product";

export interface ICartItem {
  id: string;
  product: Product;
  price: number;
  quantity: number;
  byCase: boolean;
  addedToCart?: boolean;
}

export class CartItem implements ICartItem {
  id: string = "";
  product: Product;
  price: number;
  quantity: number;
  byCase: boolean;
  addedToCart?: boolean;

  constructor(init?: ICartItem) {
    Object.assign(this, init);
  }
}
