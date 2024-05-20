import { makeAutoObservable, runInAction } from "mobx";
import { Product, ProductFormValues } from "../models/product";
import agent from "../api/agent.ts";
import { Pagination, PagingParams } from "../models/pagination.ts";
import { Category } from "../models/category.ts";

export default class ProductStore {
  products: Product[] = [];
  categories: Category[] = [];
  selectedProduct: Product | undefined = undefined;
  editMode = false;
  loadingInitial = true;
  loadingFilters = true;
  submitting = false;
  pagination: Pagination | null = null;
  pagingParams = new PagingParams();
  isActiveFilter = true;
  nameFilter = "";
  categoryIdFilter = "";

  constructor() {
    makeAutoObservable(this);
  }

  loadProducts = async () => {
    try {
      let params = new URLSearchParams();

      if (this.nameFilter) params.append("name", this.nameFilter);
      if (this.categoryIdFilter)
        params.append("categoryId", this.categoryIdFilter);
      params.append("isActive", String(this.isActiveFilter));
      params.append("pageNumber", this.pagingParams.pageNumber.toString());
      params.append("pageSize", this.pagingParams.pageSize.toString());

      const response = await agent.Products.list(params);

      runInAction(() => {
        this.setProducts(response.data);
        this.setPagination(response.pagination);
        this.setLoadingInitial(false);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.setLoadingInitial(false);
      });
    }
  };

  loadActiveCategories = async () => {
    try {
      const params = new URLSearchParams();
      params.append("isActive", "true");

      const response = await agent.Categories.list(params);

      runInAction(() => {
        this.setCategories(response.data);
        this.setLoadingFilters(false);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.setLoadingFilters(false);
      });
    }
  };

  getProductById = (id: string) => {
    return this.products.find((product) => product.id === id);
  };

  saveProduct = async (product: ProductFormValues) => {
    this.submitting = true;
    try {
      await agent.Products.create(product);
      this.setSubmitting(false);
      this.setEditMode(false);
    } catch (error) {
      console.log(error);
      this.setSubmitting(false);
    }
  };

  updateProduct = async (product: ProductFormValues) => {
    this.submitting = true;
    try {
      await agent.Products.edit(product);
      this.setSubmitting(false);
      this.setEditMode(false);
    } catch (error) {
      console.log(error);
      this.setSubmitting(false);
    }
  };

  loadProductById = async (id: string) => {
    let product = this.getProductById(id);
    if (product) {
      this.selectedProduct = product;
      return product;
    } else {
      this.loadingInitial = true;
      try {
        product = await agent.Products.details(id);
        runInAction(() => {
          this.selectedProduct = product;
          this.loadingInitial = false;
        });
        return product;
      } catch (error) {
        console.log(error);
        runInAction(() => {
          this.loadingInitial = false;
        });
      }
    }
  };

  deleteProduct = async (id: string) => {
    this.submitting = true;
    try {
      await agent.Products.delete(id);
      runInAction(() => {
        this.products = this.products.filter((product) => product.id !== id);
        this.submitting = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.submitting = false;
      });
    }
  };

  toggleActive = async (id: string) => {
    this.submitting = true;
    try {
      await agent.Products.toggleActive(id);
      runInAction(() => {
        let product = this.getProductById(id);
        if (product) {
          product.isActive = !product.isActive;
        }
        this.submitting = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.submitting = false;
      });
    }
  };

  setEditMode = (editMode: boolean) => {
    this.editMode = editMode;
  };

  setSubmitting = (submitting: boolean) => {
    this.submitting = submitting;
  };

  setLoadingInitial = (loadingInitial: boolean) => {
    this.loadingInitial = loadingInitial;
  };

  setPagination = (pagination: Pagination) => {
    this.pagination = pagination;
  };

  setPagingParams = (pagingParams: PagingParams) => {
    this.pagingParams = pagingParams;
  };

  setNameFilter = (value: string) => {
    this.nameFilter = value;
  };

  setIsActiveFilter = (value: boolean) => {
    this.isActiveFilter = value;
  };

  setCategoryIdFilter = (value: string) => {
    this.categoryIdFilter = value;
  };

  setProducts = (products: Product[]) => {
    this.products = products;
  };

  setCategories = (categories: Category[]) => {
    this.categories = categories;
  };

  setLoadingFilters = (loadingFilters: boolean) => {
    this.loadingFilters = loadingFilters;
  };

  clearSelectedProduct = () => {
    this.selectedProduct = undefined;
  };
}
