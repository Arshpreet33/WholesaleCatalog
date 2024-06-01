import { Category } from "./category";
import { Client } from "./client";
import { Manufacturer } from "./manufacturer";
import { Product } from "./product";

export interface IOrder {
  id: string;
  number: string;
  orderDate: Date;
  clientId: string;
  client: Client;
  manufacturerId: string;
  manufacturer: Manufacturer;
  categoryId: string;
  category: Category;
  productId: string;
  product: Product;
  quantity: number;
  isCase: boolean;
  price: number;
  isApproved: boolean;
  createdBy: string;
}
