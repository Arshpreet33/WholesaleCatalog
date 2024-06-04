import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Client, ClientFormValues } from "../models/client.ts";
import { PaginatedResults } from "../models/pagination.ts";
import {
  IUser,
  ILoginFormValues,
  AppUser,
  AppUserFormValues,
} from "../models/user.ts";
import { store } from "../stores/store.ts";
import { Router } from "../router/Router.tsx";
import {
  Manufacturer,
  ManufacturerFormValues,
} from "../models/manufacturer.ts";
import { Category, CategoryFormValues } from "../models/category.ts";
import { Product, ProductFormValues } from "../models/product.ts";
import { Order } from "../models/order.ts";
import { OrderItem } from "../models/orderItem.ts";

axios.defaults.baseURL = "http://localhost:2030/api";

// axios.defaults.baseURL = "https://wholesale-api.o2p.dev/api";

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    const pagination = response.headers["pagination"];
    if (pagination) {
      response.data = new PaginatedResults(
        response.data,
        JSON.parse(pagination)
      );
      return response as AxiosResponse<PaginatedResults<any>>;
    }
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;

    switch (status) {
      case 400:
        if (config.method === "get" && data.errors.hasOwnProperty("id")) {
          Router.navigate("/not-found");
        }
        if (data.errors) {
          const modalStateErrors: string[] = []; // Define modalStateErrors as an array of strings
          for (const key in data.errors) {
            if (data.errors[key]) modalStateErrors.push(data.errors[key]);
          }
          throw modalStateErrors.flat();
        } else toast.error(data);
        break;
      case 401:
        toast.error("unauthorized");
        break;
      case 403:
        toast.error("forbidden");
        break;
      case 404:
        Router.navigate("/not-found");
        break;
      case 500:
        store.commonStore.setServerError(data);
        Router.navigate("/server-error");
        break;
    }

    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
  toggleActive: <T>(url: string) => axios.put<T>(url).then(responseBody),
};

const clientURL = "/clients";
const Clients = {
  list: (params: URLSearchParams) =>
    axios
      .get<PaginatedResults<Client[]>>(clientURL, { params })
      .then(responseBody),
  details: (id: string) => requests.get<Client>(clientURL + "/" + id),
  create: (client: ClientFormValues) => requests.post<void>(clientURL, client),
  edit: (client: ClientFormValues) =>
    requests.put<void>(clientURL + "/" + client.id, client),
  delete: (id: string) => requests.del<void>(clientURL + "/" + id),
  toggleActive: (id: string) =>
    requests.toggleActive<void>(clientURL + "/toggle/" + id),
};

const manufacturerURL = "/manufacturers";
const Manufacturers = {
  list: (params: URLSearchParams) =>
    axios
      .get<PaginatedResults<Manufacturer[]>>(manufacturerURL, { params })
      .then(responseBody),
  details: (id: string) =>
    requests.get<Manufacturer>(manufacturerURL + "/" + id),
  create: (manufacturer: ManufacturerFormValues) =>
    requests.post<void>(manufacturerURL, manufacturer),
  edit: (manufacturer: ManufacturerFormValues) =>
    requests.put<void>(manufacturerURL + "/" + manufacturer.id, manufacturer),
  delete: (id: string) => requests.del<void>(manufacturerURL + "/" + id),
  toggleActive: (id: string) =>
    requests.toggleActive<void>(manufacturerURL + "/toggle/" + id),
};

const categoryURL = "/category";
const Categories = {
  list: (params: URLSearchParams) =>
    axios
      .get<PaginatedResults<Category[]>>(categoryURL, { params })
      .then(responseBody),
  details: (id: string) => requests.get<Category>(categoryURL + "/" + id),
  create: (category: CategoryFormValues) =>
    requests.post<void>(categoryURL, category),
  edit: (category: CategoryFormValues) =>
    requests.put<void>(categoryURL + "/" + category.id, category),
  delete: (id: string) => requests.del<void>(categoryURL + "/" + id),
  toggleActive: (id: string) =>
    requests.toggleActive<void>(categoryURL + "/toggle/" + id),
};

const productUrl = "/products";
const Products = {
  list: (params: URLSearchParams) =>
    axios
      .get<PaginatedResults<Product[]>>(productUrl, { params })
      .then(responseBody),
  details: (id: string) => requests.get<Product>(productUrl + "/" + id),
  create: (formData: FormData) => requests.post<void>(productUrl, formData),
  edit: (id, formData: FormData) =>
    requests.put<void>(productUrl + "/" + id, formData),
  delete: (id: string) => requests.del<void>(productUrl + "/" + id),
  toggleActive: (id: string) =>
    requests.toggleActive<void>(productUrl + "/toggle/" + id),
};

const userUrl = "/users";
const AppUsers = {
  list: (params: URLSearchParams) =>
    axios
      .get<PaginatedResults<AppUser[]>>(userUrl, { params })
      .then(responseBody),
  details: (userName: string) =>
    requests.get<AppUser>(userUrl + "/" + userName),
  create: (user: AppUserFormValues) => requests.post<void>(userUrl, user),
  edit: (user: AppUserFormValues) =>
    requests.put<void>(userUrl + "/" + user.userName, user),
  // delete: (userName: string) => requests.del<void>(userUrl + "/" + userName),
  toggleActive: (userName: string) =>
    requests.toggleActive<void>(userUrl + "/toggle/" + userName),
};

const orderUrl = "/orders";
const Orders = {
  list: (params: URLSearchParams) =>
    axios
      .get<PaginatedResults<Order[]>>(orderUrl, { params })
      .then(responseBody),
  itemsList: (params: URLSearchParams) =>
    axios
      .get<PaginatedResults<OrderItem[]>>(orderUrl + "/items", { params })
      .then(responseBody),
  myOrdersList: (params: URLSearchParams) =>
    axios
      .get<PaginatedResults<Order[]>>(orderUrl + "/myorders", { params })
      .then(responseBody),
  details: (id: string) => requests.get<Order>(orderUrl + "/" + id),
  create: (order: Order) => requests.post<void>(orderUrl, order),
  toggleActive: (id: string) =>
    requests.toggleActive<void>(orderUrl + "/approve/" + id),
};

const Account = {
  current: () => requests.get<IUser>("/account"),
  login: (user: ILoginFormValues) =>
    requests.post<IUser>("/account/login", user),
  // register: (user: UserFormValues) =>
  //   requests.post<User>('/account/register', user),
};

const agent = {
  Clients,
  Manufacturers,
  Categories,
  Products,
  AppUsers,
  Orders,
  Account,
};

export default agent;
