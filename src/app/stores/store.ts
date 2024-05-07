import { createContext, useContext } from "react";
import ClientStore from "./clientStore.ts";
import UserStore from "./userStore.ts";
import CommonStore from "./commonStore.ts";
import ManufacturerStore from "./manufacturerStore.ts";

interface Store {
  clientStore: ClientStore;
  manufacturerStore: ManufacturerStore;
  userStore: UserStore;
  commonStore: CommonStore;
}

export const store: Store = {
  clientStore: new ClientStore(),
  manufacturerStore: new ManufacturerStore(),
  userStore: new UserStore(),
  commonStore: new CommonStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
