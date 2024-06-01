import { makeAutoObservable, runInAction } from "mobx";
import { Product, ProductFormValues } from "../models/product";
import agent from "../api/agent.ts";
import { Pagination, PagingParams } from "../models/pagination.ts";
import { Category } from "../models/category.ts";
import { Manufacturer } from "../models/manufacturer.ts";
import { store } from "./store.ts";
import { CartItem } from "../models/cartItem.ts";

export default class ProductStore {
  products: Product[] = [];
  placeOrderProducts: CartItem[] = [];
  manufacturers: Manufacturer[] = [];
  categories: Category[] = [];
  selectedProduct: Product | undefined = undefined;
  editMode = false;
  placeOrderMode = false;
  loadingInitial = true;
  loadingFilters = true;
  submitting = false;
  pagination: Pagination | null = null;
  pagingParams = new PagingParams();
  isActiveFilter = true;
  nameFilter = "";
  categoryIdFilter = "";
  manufacturerIdFilter = "";

  constructor() {
    makeAutoObservable(this);
  }

  loadProducts = async () => {
    try {
      let params = new URLSearchParams();

      if (this.nameFilter) params.append("name", this.nameFilter);
      if (this.categoryIdFilter) {
        params.append("categoryId", this.categoryIdFilter);
      } else {
        if (this.manufacturerIdFilter) {
          params.append("manufacturerId", this.manufacturerIdFilter);
        }
      }
      params.append("isActive", String(this.isActiveFilter));
      params.append("pageNumber", this.pagingParams.pageNumber.toString());
      params.append("pageSize", this.pagingParams.pageSize.toString());

      const response = await agent.Products.list(params);

      runInAction(() => {
        this.setProducts(response.data);
        this.setPagination(response.pagination);
        this.setLoadingInitial(false);
      });
      if (this.placeOrderMode) this.loadPlaceOrderProducts();
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
      if (this.manufacturerIdFilter)
        params.append("manufacturerId", this.manufacturerIdFilter);

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

  loadActiveManufacturers = async () => {
    try {
      const params = new URLSearchParams();
      params.append("isActive", "true");

      const response = await agent.Manufacturers.list(params);

      runInAction(() => {
        this.setManufacturers(response.data);
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

  loadPlaceOrderProducts = async () => {
    runInAction(() => {
      // this.setProducts(
      //   this.products.map((product) => ({
      //     ...product,
      //     addedToCart: store.cartStore.cartItems.some(
      //       (cartItem) => cartItem.product.id === product.id
      //     ),
      //   }))
      // );
      this.setPlaceOrderProducts(
        this.products.map((product) => ({
          id: product.id,
          product,
          addedToCart: store.cartStore.cartItems.some(
            (cartItem) => cartItem.product.id === product.id
          ),
          quantity: 1,
          price: product.casePrice,
          byCase: true,
        }))
      );
    });
  };

  removePlaceOrderProductFromCart = (id: string) => {
    runInAction(() => {
      // this.setProducts(
      //   this.products.map((product) =>
      //     product.id === id ? { ...product, addedToCart: false } : product
      //   )
      // );
      this.setPlaceOrderProducts(
        this.placeOrderProducts.map((item) =>
          item.id === id ? { ...item, addedToCart: false } : item
        )
      );
    });
  };

  addPlaceOrderProductToCart = (id: string) => {
    runInAction(() => {
      // this.setProducts(
      //   this.products.map((product) =>
      //     product.id === id ? { ...product, addedToCart: true } : product
      //   )
      // );
      this.setPlaceOrderProducts(
        this.placeOrderProducts.map((item) =>
          item.id === id ? { ...item, addedToCart: true } : item
        )
      );
    });
  };

  setEditMode = (editMode: boolean) => {
    this.editMode = editMode;
  };

  setPlaceOrderMode = (placeOrderMode: boolean) => {
    this.placeOrderMode = placeOrderMode;
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

  setManufacturerIdFilter = (value: string) => {
    this.manufacturerIdFilter = value;
  };

  setProducts = (products: Product[]) => {
    this.products = products;
  };

  setPlaceOrderProducts = (products: CartItem[]) => {
    this.placeOrderProducts = products;
  };

  setCategories = (categories: Category[]) => {
    this.categories = categories;
  };

  setManufacturers = (manufacturers: Manufacturer[]) => {
    this.manufacturers = manufacturers;
  };

  setLoadingFilters = (loadingFilters: boolean) => {
    this.loadingFilters = loadingFilters;
  };

  clearSelectedProduct = () => {
    this.selectedProduct = undefined;
  };
}
