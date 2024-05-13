import { createContext, useContext } from "react";
import ClientStore from "./clientStore.ts";
import UserStore from "./userStore.ts";
import CommonStore from "./commonStore.ts";
import ManufacturerStore from "./manufacturerStore.ts";
import CategoryStore from "./categoryStore.ts";

interface Store {
  clientStore: ClientStore;
  manufacturerStore: ManufacturerStore;
  categoryStore: CategoryStore;
  userStore: UserStore;
  commonStore: CommonStore;
}

export const store: Store = {
  clientStore: new ClientStore(),
  manufacturerStore: new ManufacturerStore(),
  categoryStore: new CategoryStore(),
  userStore: new UserStore(),
  commonStore: new CommonStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
