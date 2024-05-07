export interface ICategory {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  manufacturerId: string;
  isActive: boolean;
}

export class Category implements ICategory {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  manufacturerId: string;
  isActive: boolean;

  constructor(init: CategoryFormValues) {
    Object.assign(this, init);
    this.isActive = true;
  }
}

export class CategoryFormValues {
  id?: string = undefined;
  name: string = "";
  description: string = "";
  imageUrl?: string = "";
  manufacturerId: string = "";

  constructor(category?: CategoryFormValues) {
    if (category) {
      this.id = category.id;
      this.name = category.name;
      this.description = category.description;
      this.imageUrl = category.imageUrl ?? "";
      this.manufacturerId = category.manufacturerId;
    }
  }
}
