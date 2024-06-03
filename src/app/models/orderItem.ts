import { Order } from "./order";
import { Product } from "./product";

export interface IOrderItem {
  id?: string;
  product: Product;
  productId: string;
  order?: Order;
  orderId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  byCase: boolean;
}

export class OrderItem implements IOrderItem {
  id?: string;
  product: Product;
  productId: string;
  order?: Order;
  orderId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  byCase: boolean;

  constructor(init?: IOrderItem) {
    Object.assign(this, init);
  }
}
