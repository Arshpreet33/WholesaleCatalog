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
import ProductsDashboard from "../features/products/dashboard/ProductsDashboard.tsx";
import ManufacturerDashboard from "../../features/admin/manufacturers/dashboard/ManufacturerDashboard.tsx";
import ManufacturerDetails from "../../features/admin/manufacturers/details/ManufacturerDetails.tsx";
import ManufacturerForm from "../../features/admin/manufacturers/form/ManufacturerForm.tsx";
import CategoryDashboard from "../../features/admin/categories/dashboard/CategoryDashboard.tsx";
import CategoryDetails from "../../features/admin/categories/details/CategoryDetails.tsx";
import CategoryForm from "../../features/admin/categories/form/CategoryForm.tsx";

export const Routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          { path: "", element: <HomePage /> },
          { path: "products", element: <ProductsDashboard /> },
          {
            path: "admin",
            element: <AdminDashboard />,
            children: [
              { path: "", element: <AdminHomePage /> },
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
            ],
          },
        ],
      },
      { path: "not-found", element: <NotFound /> },
      { path: "server-error", element: <ServerError /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
];

export const Router = createBrowserRouter(Routes);
