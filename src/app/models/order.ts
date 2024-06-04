import { Client } from "./client";
import { OrderItem } from "./orderItem";
import { AppUser } from "./user";

export interface IOrder {
  id?: string;
  orderNumber: string;
  orderDate: Date;
  clientId: string;
  client: Client;
  userName: string;
  user?: AppUser;
  userId?: string;
  subTotal: number;
  itemsCount: number;
  orderItems: OrderItem[];
  notes?: string;
  isApproved: boolean;
}

export class Order implements IOrder {
  id?: string;
  orderNumber: string;
  orderDate: Date;
  clientId: string;
  client: Client;
  userName: string;
  user?: AppUser;
  userId?: string;
  subTotal: number;
  itemsCount: number;
  orderItems: OrderItem[];
  notes?: string;
  isApproved: boolean;

  constructor(init?: IOrder) {
    Object.assign(this, init);
  }
}
