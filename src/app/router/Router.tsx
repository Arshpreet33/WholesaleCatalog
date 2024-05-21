import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import AdminDashboard from "../layout/AdminDashboard.tsx";
import ClientDashboard from "../../features/admin/clients/dashboard/ClientDashboard.tsx";
import App from "../layout/App.tsx";
import * as React from "react";
import AdminHomePage from "../../features/admin/home/AdminHomePage.tsx";
import ClientForm from "../../features/admin/clients/form/ClientForm.tsx";
import ClientDetails from "../../features/admin/clients/details/ClientDetails.tsx";
import RequireAuth from "./RequireAuth.tsx";
import NotFound from "../../features/errors/NotFound.tsx";
import ServerError from "../../features/errors/ServerError.tsx";
import HomePage from "../../features/home/HomePage.tsx";
import ManufacturerDashboard from "../../features/admin/manufacturers/dashboard/ManufacturerDashboard.tsx";
import ManufacturerDetails from "../../features/admin/manufacturers/details/ManufacturerDetails.tsx";
import ManufacturerForm from "../../features/admin/manufacturers/form/ManufacturerForm.tsx";
import CategoryDashboard from "../../features/admin/categories/dashboard/CategoryDashboard.tsx";
import CategoryDetails from "../../features/admin/categories/details/CategoryDetails.tsx";
import CategoryForm from "../../features/admin/categories/form/CategoryForm.tsx";
import ProductDetails from "../../features/admin/products/details/ProductDetails.tsx";
import ProductForm from "../../features/admin/products/form/ProductForm.tsx";
import ProductsDashboard from "../../features/admin/products/dashboard/ProductDashboard.tsx";
import AppUserDashboard from "../../features/admin/users/dashboard/AppUserDashboard.tsx";
import AppUserForm from "../../features/admin/users/form/AppUserForm.tsx";
import UserDashboard from "../layout/UserDashboard.tsx";
import UnAuthorized from "../../features/errors/UnAuthorized.tsx";
import LoginForm from "../../features/users/LoginForm.tsx";

export const Routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [],
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/admin",
    element: (
      <RequireAuth role="Admin">
        <AdminDashboard />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <AdminHomePage /> },
      { path: "home", element: <AdminHomePage /> },
      {
        path: "clients",
        children: [
          { path: "", element: <ClientDashboard /> },
          { path: ":id", element: <ClientDetails /> },
          { path: "create", element: <ClientForm /> },
          { path: "edit/:id", element: <ClientForm /> },
        ],
      },
      {
        path: "manufacturers",
        children: [
          { path: "", element: <ManufacturerDashboard /> },
          { path: ":id", element: <ManufacturerDetails /> },
          { path: "create", element: <ManufacturerForm /> },
          { path: "edit/:id", element: <ManufacturerForm /> },
        ],
      },
      {
        path: "categories",
        children: [
          { path: "", element: <CategoryDashboard /> },
          { path: ":id", element: <CategoryDetails /> },
          { path: "create", element: <CategoryForm /> },
          { path: "edit/:id", element: <CategoryForm /> },
        ],
      },
      {
        path: "products",
        children: [
          { path: "", element: <ProductsDashboard /> },
          { path: ":id", element: <ProductDetails /> },
          { path: "create", element: <ProductForm /> },
          { path: "edit/:id", element: <ProductForm /> },
        ],
      },
      {
        path: "users",
        children: [
          { path: "", element: <AppUserDashboard /> },
          { path: "create", element: <AppUserForm /> },
          { path: "edit/:username", element: <AppUserForm /> },
        ],
      },
    ],
  },
  {
    path: "/user",
    element: (
      <RequireAuth role="User">
        <UserDashboard />
      </RequireAuth>
    ),
    children: [
      { path: "", element: <HomePage /> },
      { path: "home", element: <HomePage /> },
    ],
  },

  { path: "/not-found", element: <NotFound /> },
  { path: "/un-authorized", element: <UnAuthorized /> },
  { path: "/server-error", element: <ServerError /> },
  { path: "*", element: <Navigate replace to="/not-found" /> },
];

export const Router = createBrowserRouter(Routes);
