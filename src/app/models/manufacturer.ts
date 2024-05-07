import { Category } from "./category";

export interface IManufacturer {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  categories?: Category[];
  isActive: boolean;
}

export class Manufacturer implements IManufacturer {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  categories?: Category[];
  isActive: boolean;

  constructor(init: ManufacturerFormValues) {
    Object.assign(this, init);
    this.isActive = true;
  }
}

export class ManufacturerFormValues {
  id?: string = undefined;
  name: string = "";
  description: string = "";
  imageUrl: string = "";

  constructor(manufacturer?: ManufacturerFormValues) {
    if (manufacturer) {
      this.id = manufacturer.id;
      this.name = manufacturer.name;
      this.description = manufacturer.description;
      this.imageUrl = manufacturer.imageUrl ?? "";
    }
  }
}
