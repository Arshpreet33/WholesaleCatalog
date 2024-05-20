import { makeAutoObservable, runInAction } from "mobx";
import { IUser, ILoginFormValues } from "../models/user.ts";
import agent from "../api/agent.ts";
import { store } from "./store.ts";
import { Router } from "../router/Router.tsx";

export default class UserStore {
  user: IUser | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  login = async (creds: ILoginFormValues) => {
    const user = await agent.Account.login(creds);
    store.commonStore.setToken(user.token);
    runInAction(() => {
      this.user = user;
    });
    Router.navigate("/admin");
  };

  logout = () => {
    store.commonStore.setToken(null);
    this.user = null;
    Router.navigate("/");
  };

  getUser = async () => {
    try {
      const user = await agent.Account.current();
      runInAction(() => {
        this.user = user;
      });
    } catch (error) {
      console.log(error);
    }
  };
}
