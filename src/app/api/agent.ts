import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Client, ClientFormValues } from "../models/client.ts";
import { PaginatedResults } from "../models/pagination.ts";
import { User, UserFormValues } from "../models/user.ts";
import { store } from "../stores/store.ts";
import { Router } from "../router/Router.tsx";

axios.defaults.baseURL = "http://localhost:2030/api";

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
          const modalStateErrors = [];
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

const Account = {
  current: () => requests.get<User>("/account"),
  login: (user: UserFormValues) => requests.post<User>("/account/login", user),
  // register: (user: UserFormValues) =>
  //   requests.post<User>('/account/register', user),
};

const agent = {
  Clients,
  Account,
};

export default agent;
