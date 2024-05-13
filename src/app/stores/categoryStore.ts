import { makeAutoObservable, runInAction } from "mobx";
import { Category, CategoryFormValues } from "../models/category";
import agent from "../api/agent.ts";
import { Pagination, PagingParams } from "../models/pagination.ts";
import { Manufacturer } from "../models/manufacturer.ts";

export default class CategoryStore {
  categories: Category[] = [];
  manufacturers: Manufacturer[] = [];
  selectedCategory: Category | undefined = undefined;
  editMode = false;
  loadingInitial = true;
  loadingFilters = true;
  submitting = false;
  pagination: Pagination | null = null;
  pagingParams = new PagingParams();
  isActiveFilter = true;
  nameFilter = "";
  manufacturerIdFilter = "";

  constructor() {
    makeAutoObservable(this);
  }

  loadCategories = async () => {
    try {
      let params = new URLSearchParams();

      if (this.nameFilter) params.append("name", this.nameFilter);
      if (this.manufacturerIdFilter)
        params.append("manufacturerId", this.manufacturerIdFilter);
      params.append("isActive", String(this.isActiveFilter));
      params.append("pageNumber", this.pagingParams.pageNumber.toString());
      params.append("pageSize", this.pagingParams.pageSize.toString());

      const response = await agent.Categories.list(params);

      runInAction(() => {
        this.setCategories(response.data);
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

  getCategoryById = (id: string) => {
    return this.categories.find((category) => category.id === id);
  };

  saveCategory = async (category: CategoryFormValues) => {
    this.submitting = true;
    try {
      await agent.Categories.create(category);
      this.setSubmitting(false);
      this.setEditMode(false);
    } catch (error) {
      console.log(error);
      this.setSubmitting(false);
    }
  };

  updateCategory = async (category: CategoryFormValues) => {
    this.submitting = true;
    try {
      await agent.Categories.edit(category);
      this.setSubmitting(false);
      this.setEditMode(false);
    } catch (error) {
      console.log(error);
      this.setSubmitting(false);
    }
  };

  loadCategoryById = async (id: string) => {
    let category = this.getCategoryById(id);
    if (category) {
      this.selectedCategory = category;
      return category;
    } else {
      this.loadingInitial = true;
      try {
        category = await agent.Categories.details(id);
        runInAction(() => {
          this.selectedCategory = category;
          this.loadingInitial = false;
        });
        return category;
      } catch (error) {
        console.log(error);
        runInAction(() => {
          this.loadingInitial = false;
        });
      }
    }
  };

  deleteCategory = async (id: string) => {
    this.submitting = true;
    try {
      await agent.Categories.delete(id);
      runInAction(() => {
        this.categories = this.categories.filter(
          (category) => category.id !== id
        );
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
      await agent.Categories.toggleActive(id);
      runInAction(() => {
        let category = this.getCategoryById(id);
        if (category) {
          category.isActive = !category.isActive;
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

  setLoadingFilters = (loadingFilters: boolean) => {
    this.loadingFilters = loadingFilters;
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

  setManufacturerIdFilter = (value: string) => {
    this.manufacturerIdFilter = value;
  };

  setCategories = (categories: Category[]) => {
    this.categories = categories;
  };

  setManufacturers = (manufacturers: Manufacturer[]) => {
    this.manufacturers = manufacturers;
  };

  clearSelectedCategory = () => {
    this.selectedCategory = undefined;
  };
}
