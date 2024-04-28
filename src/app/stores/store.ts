import { createContext, useContext } from "react";
import ClientStore from "./clientStore.ts";
import UserStore from "./userStore.ts";

interface Store {
  clientStore: ClientStore;
  userStore: UserStore;
}

export const store: Store = {
  clientStore: new ClientStore(),
  userStore: new UserStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
