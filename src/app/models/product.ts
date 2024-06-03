import { Category } from "./category";

export interface IProduct {
  id: string;
  name: string;
  code: string;
  description: string;
  unitPrice: number;
  unitWeight: number;
  itemsInCase: number;
  casePrice: number;
  itemsInStock: number;
  casesInStock: number;
  imageUrl?: string;
  isActive: boolean;
  category: Category;
  categoryId: string;
  addedToCart?: boolean;
}

export class Product implements IProduct {
  id: string;
  name: string;
  code: string;
  description: string;
  unitPrice: number;
  unitWeight: number;
  itemsInCase: number;
  casePrice: number;
  itemsInStock: number;
  casesInStock: number;
  imageUrl?: string;
  isActive: boolean;
  category: Category;
  categoryId: string;
  addedToCart?: boolean;

  constructor(init: ProductFormValues) {
    Object.assign(this, init);
    this.isActive = true;
  }
}

export class ProductFormValues {
  id?: string = undefined;
  name: string = "";
  code: string = "";
  description: string = "";
  unitPrice: number = 0;
  unitWeight: number = 0;
  itemsInCase: number = 0;
  casePrice: number = 0;
  itemsInStock: number = 0;
  casesInStock: number = 0;
  imageUrl?: string = "";
  categoryId: string = "";

  constructor(product?: ProductFormValues) {
    if (product) {
      this.id = product.id;
      this.name = product.name;
      this.code = product.code;
      this.description = product.description;
      this.unitPrice = product.unitPrice;
      this.unitWeight = product.unitWeight;
      this.itemsInCase = product.itemsInCase;
      this.casePrice = product.casePrice;
      this.itemsInStock = product.itemsInStock;
      this.casesInStock = product.casesInStock;
      this.imageUrl = product.imageUrl ?? "";
      this.categoryId = product.categoryId;
    }
  }
}
