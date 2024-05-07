import { makeAutoObservable, runInAction } from "mobx";
import { Client, ClientFormValues } from "../models/client";
import agent from "../api/agent.ts";
import { Pagination, PagingParams } from "../models/pagination.ts";

export default class ClientStore {
  clients: Client[] = [];
  selectedClient: Client | undefined = undefined;
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

  loadClients = async () => {
    // this.setLoadingInitial(true)
    try {
      // Create a new URLSearchParams instance
      let params = new URLSearchParams();

      // Append the filter values to the query string
      if (this.nameFilter) params.append("name", this.nameFilter);
      params.append("isActive", String(this.isActiveFilter));
      params.append("pageNumber", this.pagingParams.pageNumber.toString());
      params.append("pageSize", this.pagingParams.pageSize.toString());

      const response = await agent.Clients.list(params);

      runInAction(() => {
        this.setClients(response.data);
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

  getClientById = (id: string) => {
    return this.clients.find((client) => client.id === id);
  };

  saveClient = async (client: ClientFormValues) => {
    this.submitting = true;
    try {
      await agent.Clients.create(client);
      this.setSubmitting(false);
      this.setEditMode(false);
    } catch (error) {
      console.log(error);
      this.setSubmitting(false);
    }
  };

  updateClient = async (client: ClientFormValues) => {
    this.submitting = true;
    try {
      await agent.Clients.edit(client);
      runInAction(() => {
        let updateClient = {
          ...this.getClientById(client.id!),
          client,
        };
        this.selectedClient = updateClient as Client;
      });
      this.setSubmitting(false);
      this.setEditMode(false);
    } catch (error) {
      console.log(error);
      this.setSubmitting(false);
    }
  };

  loadClientById = async (id: string) => {
    let client = this.getClientById(id);
    if (client) {
      this.selectedClient = client;
      return client;
    } else {
      this.setLoadingInitial(true);
      try {
        const client = await agent.Clients.details(id);
        runInAction(() => {
          this.selectedClient = client;
        });
        this.setLoadingInitial(false);
        return client;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  deleteClient = async (id: string) => {
    this.setSubmitting(true);
    try {
      await agent.Clients.delete(id);
      runInAction(() => {
        this.clients = this.clients.filter((client) => client.id !== id);
        this.setSubmitting(false);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.setSubmitting(false);
      });
    }
  };

  toggleActive = async (id: string) => {
    this.setSubmitting(true);
    try {
      await agent.Clients.toggleActive(id);
      runInAction(() => {
        this.clients.find((a) => a.id === id)!.isActive = !this.clients.find(
          (a) => a.id === id
        )!.isActive;
        this.setSubmitting(false);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.setSubmitting(false);
      });
    }
  };

  setPagingParams = (pagingParams: PagingParams) => {
    this.pagingParams = pagingParams;
  };

  setPagination = (pagination: Pagination) => {
    this.pagination = pagination;
  };

  setLoadingInitial = (value: boolean) => {
    this.loadingInitial = value;
  };

  setSubmitting = (value: boolean) => {
    this.submitting = value;
  };

  setNameFilter = (name: string) => {
    this.nameFilter = name;
  };

  setIsActiveFilter = (isActive: boolean) => {
    this.isActiveFilter = isActive;
  };

  setEditMode = (value: boolean) => {
    this.editMode = value;
  };

  setClients = (clients: Client[]) => {
    this.clients = clients;
  };

  clearSelectedClient = () => {
    this.selectedClient = undefined;
  };
}
