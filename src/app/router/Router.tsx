import { RouteObject, createBrowserRouter } from 'react-router-dom'
import AdminDashboard from '../layout/AdminDashboard.tsx'
import ClientDashboard from '../../features/admin/clients/dashboard/ClientDashboard.tsx'
import HomePage from '../../features/home/HomePage.tsx'
import App from '../layout/App.tsx'
import * as React from 'react'
import AdminHomePage from '../../features/admin/home/AdminHomePage.tsx'
import ProductsDashboard from '../features/products/dashboard/ProductsDashboard.tsx'
import ClientForm from '../../features/admin/clients/form/ClientForm.tsx'
import ClientDetails from '../../features/admin/clients/details/ClientDetails.tsx'
import LoginForm from '../../features/users/LoginForm.tsx'

export const Routes: RouteObject[] = [
  {
    path: '/',
    element: <LoginForm />,
    children: [
      { path: '', element: <HomePage /> },
      // { path: 'login', element: <LoginForm /> },
      { path: 'products', element: <ProductsDashboard /> },
      // { path: 'orders', element: <Orders /> },
    ],
  },
  {
    path: 'admin',
    element: <AdminDashboard />,
    children: [
      { path: '', element: <AdminHomePage /> },
      { path: 'home', element: <AdminHomePage /> },
      // { path: 'users', element: <UserDashboard /> },
      {
        path: 'clients',
        children: [
          { path: '', element: <ClientDashboard /> },
          { path: ':id', element: <ClientDetails /> },
          { path: 'create', element: <ClientForm /> },
          { path: 'edit/:id', element: <ClientForm /> },
        ],
      },
      // { path: 'manufacturers', element: <ManufacturerDashboard /> },
      // { path: 'products', element: <ProductDashboard /> },
      // { path: 'orders', element: <OrderDashboard /> },
      // { path: 'settings', element: <SettingDashboard /> },
    ],
  },
]

export const Router = createBrowserRouter(Routes)
