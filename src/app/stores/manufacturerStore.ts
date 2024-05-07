import { makeAutoObservable, runInAction } from "mobx";
import { Manufacturer, ManufacturerFormValues } from "../models/manufacturer";
import agent from "../api/agent.ts";
import { Pagination, PagingParams } from "../models/pagination.ts";

export default class ManufacturerStore {
  manufacturers: Manufacturer[] = [];
  selectedManufacturer: Manufacturer | undefined = undefined;
  editMode = false;
  loadingInitial = true;
  submitting = false;
  pagination: Pagination | null = null;
  pagingParams = new PagingParams();
  isActiveFilter = true;
  nameFilter = "";

  constructor() {
    makeAutoObservable(this);
  }

  loadManufacturers = async () => {
    // this.setLoadingInitial(true)
    try {
      // Create a new URLSearchParams instance
      let params = new URLSearchParams();

      // Append the filter values to the query string
      if (this.nameFilter) params.append("name", this.nameFilter);
      params.append("isActive", String(this.isActiveFilter));
      params.append("pageNumber", this.pagingParams.pageNumber.toString());
      params.append("pageSize", this.pagingParams.pageSize.toString());

      const response = await agent.Manufacturers.list(params);

      runInAction(() => {
        this.setManufacturers(response.data);
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

  getManufacturerById = (id: string) => {
    return this.manufacturers.find((manufacturer) => manufacturer.id === id);
  };

  saveManufacturer = async (manufacturer: ManufacturerFormValues) => {
    this.submitting = true;
    try {
      await agent.Manufacturers.create(manufacturer);
      this.setSubmitting(false);
      this.setEditMode(false);
    } catch (error) {
      console.log(error);
      this.setSubmitting(false);
    }
  };

  updateManufacturer = async (manufacturer: ManufacturerFormValues) => {
    this.submitting = true;
    try {
      await agent.Manufacturers.update(manufacturer);
      this.setSubmitting(false);
      this.setEditMode(false);
    } catch (error) {
      console.log(error);
      this.setSubmitting(false);
    }
  };

  loadManufacturerById = async (id: string) => {
    let manufacturer = this.getManufacturerById(id);
    if (manufacturer) {
      this.selectedManufacturer = manufacturer;
      return manufacturer;
    } else {
      this.loadingInitial = true;
      try {
        manufacturer = await agent.Manufacturers.details(id);
        runInAction(() => {
          this.selectedManufacturer = manufacturer;
          this.loadingInitial = false;
        });
        return manufacturer;
      } catch (error) {
        console.log(error);
        runInAction(() => {
          this.loadingInitial = false;
        });
      }
    }
  };

  deleteManufacturer = async (id: string) => {
    this.submitting = true;
    try {
      await agent.Manufacturers.delete(id);
      runInAction(() => {
        this.manufacturers = this.manufacturers.filter(
          (manufacturer) => manufacturer.id !== id
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
      await agent.Manufacturers.toggleActive(id);
      runInAction(() => {
        let manufacturer = this.getManufacturerById(id);
        if (manufacturer) {
          manufacturer.isActive = !manufacturer.isActive;
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

  setManufacturers = (manufacturers: Manufacturer[]) => {
    this.manufacturers = manufacturers;
  };

  clearSelectedManufacturer = () => {
    this.selectedManufacturer = undefined;
  };
}
