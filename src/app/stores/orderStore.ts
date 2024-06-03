import { makeAutoObservable, runInAction } from "mobx";
import { IOrder, Order } from "../models/order";
import { IOrderItem, OrderItem } from "../models/orderItem";
import agent from "../api/agent.ts";
import { Pagination, PagingParams } from "../models/pagination.ts";
import { Client } from "../models/client.ts";
import { AppUser } from "../models/user.ts";
import { CartItem } from "../models/cartItem.ts";

export default class OrderStore {
  orders: Order[] = [];
  orderItems: OrderItem[] = [];
  clients: Client[] = [];
  users: AppUser[] = [];
  selectedOrder: Order | undefined = undefined;
  loadingInitial = true;
  loadingFilters = true;
  submitting = false;
  pagination: Pagination | null = null;
  pagingParams = new PagingParams();
  isApprovedFilter = false;
  clientFilter = "";
  userFilter = "";
  orderNumberFilter = "";

  constructor() {
    makeAutoObservable(this);
  }

  loadOrders = async () => {
    try {
      let params = new URLSearchParams();

      if (this.clientFilter) params.append("clientId", this.clientFilter);
      if (this.userFilter) params.append("userName", this.userFilter);
      if (this.orderNumberFilter)
        params.append("orderNumber", this.orderNumberFilter);

      params.append("isApproved", String(this.isApprovedFilter));
      params.append("pageNumber", this.pagingParams.pageNumber.toString());
      params.append("pageSize", this.pagingParams.pageSize.toString());

      const response = await agent.Orders.list(params);

      runInAction(() => {
        this.setOrders(response.data);
        this.setPagination(response.pagination);
        this.setLoadingInitial(false);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.setLoadingInitial(false);
      });
    }
  };

  loadMyOrders = async () => {
    try {
      let params = new URLSearchParams();

      if (this.clientFilter) params.append("clientId", this.clientFilter);
      if (this.orderNumberFilter)
        params.append("orderNumber", this.orderNumberFilter);

      params.append("isApproved", String(this.isApprovedFilter));
      params.append("pageNumber", this.pagingParams.pageNumber.toString());
      params.append("pageSize", this.pagingParams.pageSize.toString());

      const response = await agent.Orders.myOrdersList(params);

      runInAction(() => {
        this.setOrders(response.data);
        this.setPagination(response.pagination);
        this.setLoadingInitial(false);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.setLoadingInitial(false);
      });
    }
  };

  loadOrderItems = async (orderId: string) => {
    this.loadingInitial = true;
    try {
      let params = new URLSearchParams();
      params.append("orderId", orderId);

      params.append("pageNumber", this.pagingParams.pageNumber.toString());
      params.append("pageSize", this.pagingParams.pageSize.toString());

      const response = await agent.Orders.itemsList(params);
      runInAction(() => {
        this.setOrderItems(response.data);
        this.setPagination(response.pagination);
        this.setLoadingInitial(false);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.setLoadingInitial(false);
      });
    }
  };

  loadActiveClients = async () => {
    try {
      const params = new URLSearchParams();
      params.append("isActive", "true");

      const response = await agent.Clients.list(params);

      runInAction(() => {
        this.setClients(response.data);
        this.setLoadingFilters(false);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.setLoadingFilters(false);
      });
    }
  };

  loadActiveUsers = async () => {
    try {
      const params = new URLSearchParams();
      params.append("isActive", "true");

      const response = await agent.AppUsers.list(params);

      runInAction(() => {
        this.setUsers(response.data);
        this.setLoadingFilters(false);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.setLoadingFilters(false);
      });
    }
  };

  loadOrderById = async (id: string) => {
    let order = this.getOrderById(id);
    if (order) {
      this.setSelectedOrder(order);
      return order;
    } else {
      this.setLoadingFilters(true);
      try {
        order = await agent.Orders.details(id);
        runInAction(() => {
          this.selectedOrder = order;
          this.setLoadingFilters(false);
        });
        return order;
      } catch (error) {
        console.log(error);
        runInAction(() => {
          this.setLoadingFilters(false);
        });
      }
    }
  };

  getOrderById = (id: string) => {
    return this.orders.find((order) => order.id === id);
  };

  createOrderModel = (cartItems: CartItem[], client: Client) => {
    let order: Order = {
      orderNumber: "",
      orderDate: new Date(),
      clientId: client.id,
      client: client,
      userName: "",
      subTotal: 0,
      itemsCount: 0,
      orderItems: [],
      isApproved: false,
    };

    order.orderItems = cartItems.map((item) => {
      let orderItem: OrderItem = {
        product: item.product,
        productId: item.id,
        orderId: "",
        quantity: item.quantity,
        unitPrice: item.price,
        totalPrice: item.price * item.quantity,
        byCase: item.byCase,
      };
      order.subTotal += orderItem.totalPrice;
      order.itemsCount += orderItem.quantity;
      return orderItem;
    });
    return order;
  };

  saveOrder = async (order: Order) => {
    this.submitting = true;
    try {
      await agent.Orders.create(order);
      this.setSubmitting(false);
    } catch (error) {
      console.log(error);
      this.setSubmitting(false);
    }
  };

  approveOrder = async (id: string) => {
    this.setSubmitting(true);
    try {
      await agent.Orders.toggleActive(id);
      runInAction(() => {
        let order = this.getOrderById(id);
        if (order) {
          order.isApproved = true;
        }
        this.setSubmitting(false);
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.setSubmitting(false);
      });
    }
  };

  setSubmitting = (submitting: boolean) => {
    this.submitting = submitting;
  };

  setLoadingInitial = (loadingInitial: boolean) => {
    this.loadingInitial = loadingInitial;
  };

  setPagination = (pagination: Pagination) => {
    this.pagination = pagination;
  };

  setPagingParams = (pagingParams: PagingParams) => {
    this.pagingParams = pagingParams;
  };

  setClientFilter = (value: string) => {
    this.clientFilter = value;
  };

  setUserFilter = (value: string) => {
    this.userFilter = value;
  };

  setOrderNumberFilter = (value: string) => {
    this.orderNumberFilter = value;
  };

  setIsApprovedFilter = (value: boolean) => {
    this.isApprovedFilter = value;
  };

  setOrders = (orders: Order[]) => {
    this.orders = orders;
  };

  setOrderItems = (orderItems: OrderItem[]) => {
    this.orderItems = orderItems;
  };

  setClients = (clients: Client[]) => {
    this.clients = clients;
  };

  setUsers = (users: AppUser[]) => {
    this.users = users;
  };

  setLoadingFilters = (loadingFilters: boolean) => {
    this.loadingFilters = loadingFilters;
  };

  setSelectedOrder = (order: Order) => {
    this.selectedOrder = order;
  };

  clearSelectedOrder = () => {
    this.selectedOrder = undefined;
  };
}
