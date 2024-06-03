import { createContext, useContext } from "react";
import ClientStore from "./clientStore.ts";
import UserStore from "./userStore.ts";
import CommonStore from "./commonStore.ts";
import ManufacturerStore from "./manufacturerStore.ts";
import CategoryStore from "./categoryStore.ts";
import ProductStore from "./productStore.ts";
import AppUserStore from "./appUserStore.ts";
import CartStore from "./cartStore.ts";
import OrderStore from "./orderStore.ts";

interface Store {
  clientStore: ClientStore;
  manufacturerStore: ManufacturerStore;
  categoryStore: CategoryStore;
  productStore: ProductStore;
  appUserStore: AppUserStore;
  userStore: UserStore;
  orderStore: OrderStore;
  commonStore: CommonStore;
  cartStore: CartStore;
}

export const store: Store = {
  clientStore: new ClientStore(),
  manufacturerStore: new ManufacturerStore(),
  categoryStore: new CategoryStore(),
  productStore: new ProductStore(),
  appUserStore: new AppUserStore(),
  userStore: new UserStore(),
  orderStore: new OrderStore(),
  commonStore: new CommonStore(),
  cartStore: new CartStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
