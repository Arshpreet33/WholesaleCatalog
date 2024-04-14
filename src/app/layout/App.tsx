// import axios from 'axios'
// import './styles.css'
// import { useCallback, useEffect, useState } from 'react'
// import { Product } from '../models/product'
import * as React from 'react'
import NavBar from './NavBar.tsx'
import { Container } from '@mui/material'
import { Outlet } from 'react-router-dom'
// import ProductsDashboard from '../features/products/dashboard/ProductsDashboard.tsx'
// import ProductDetails from '../features/products/details/ProductDetails.tsx'

const App = () => {
  return (
    <>
      <NavBar />
      <Container maxWidth="xl">
        <Outlet />
        {/* <ProductsDashboard products={products} /> */}
        {/* <ProductDetails product={products[0]} /> */}
      </Container>
    </>
  )
}

export default App
