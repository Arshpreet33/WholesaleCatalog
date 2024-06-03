import { CartItem } from "../models/cartItem";
import { makeAutoObservable, runInAction } from "mobx";
import { Product } from "../models/product";

export default class CartStore {
  cartItems: CartItem[] = [];
  products: Product[] = [];
  totalPrice = 0;
  totalItems = 0;
  // loadingInitial = true;
  submitting = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadCartItems = async () => {
    // this.setLoadingInitial(true);
    // try {
    //   const cartItems = await agent.CartItems.list();
    //   runInAction(() => {
    //     this.setCartItems(cartItems);
    //     this.setLoadingInitial(false);
    //   });
    // } catch (error) {
    //   console.log(error);
    //   runInAction(() => {
    //     this.setLoadingInitial(false);
    //   });
    // }
  };

  addItemToCart = async (
    product: Product,
    quantity: number,
    byCase: boolean
  ) => {
    this.setSubmitting(true);
    try {
      this.cartItems.push({
        id: product.id,
        product,
        price: byCase ? product.casePrice : product.unitPrice,
        quantity,
        byCase,
      });
      runInAction(() => {
        this.setTotalItems();
        this.setTotalPrice();
        this.setSubmitting(false);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.setSubmitting(false);
      });
    }
  };

  removeItemFromCart = async (id: string) => {
    this.setSubmitting(true);
    try {
      this.cartItems = this.cartItems.filter((item) => item.id !== id);
      runInAction(() => {
        this.setTotalItems();
        this.setTotalPrice();
        this.setSubmitting(false);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.setSubmitting(false);
      });
    }
  };

  updateItemQuantity = async (id: string, quantity: number) => {
    this.setSubmitting(true);
    try {
      const item = this.cartItems.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
      runInAction(() => {
        this.setTotalItems();
        this.setTotalPrice();
        this.setSubmitting(false);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.setSubmitting(false);
      });
    }
  };

  clearCart = async () => {
    this.setSubmitting(true);
    try {
      this.setCartItems([]);
      runInAction(() => {
        this.setTotalItems();
        this.setTotalPrice();
        this.setSubmitting(false);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.setSubmitting(false);
      });
    }
  };

  setCartItems = (cartItems: CartItem[]) => {
    this.cartItems = cartItems;
  };

  setTotalPrice = () => {
    this.totalPrice = this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  };

  setTotalItems = () => {
    this.totalItems = this.cartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
  };

  // setLoadingInitial = (state: boolean) => {
  //   this.loadingInitial = state;
  // };

  setSubmitting = (state: boolean) => {
    this.submitting = state;
  };
}
