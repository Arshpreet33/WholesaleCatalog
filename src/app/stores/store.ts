import { createContext, useContext } from "react";
import ClientStore from "./clientStore.ts";
import UserStore from "./userStore.ts";
import CommonStore from "./commonStore.ts";

interface Store {
  clientStore: ClientStore;
  userStore: UserStore;
  commonStore: CommonStore;
}

export const store: Store = {
  clientStore: new ClientStore(),
  userStore: new UserStore(),
  commonStore: new CommonStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
