import { createContext, useContext } from "react";
import ClientStore from "./clientStore.ts";
import UserStore from "./userStore.ts";
import CommonStore from "./commonStore.ts";
import ManufacturerStore from "./manufacturerStore.ts";
import CategoryStore from "./categoryStore.ts";
import ProductStore from "./productStore.ts";
import AppUserStore from "./appUserStore.ts";

interface Store {
  clientStore: ClientStore;
  manufacturerStore: ManufacturerStore;
  categoryStore: CategoryStore;
  productStore: ProductStore;
  appUserStore: AppUserStore;
  userStore: UserStore;
  commonStore: CommonStore;
}

export const store: Store = {
  clientStore: new ClientStore(),
  manufacturerStore: new ManufacturerStore(),
  categoryStore: new CategoryStore(),
  productStore: new ProductStore(),
  appUserStore: new AppUserStore(),
  userStore: new UserStore(),
  commonStore: new CommonStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
