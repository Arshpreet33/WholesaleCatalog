import axios from 'axios'
import './styles.css'
import { useCallback, useEffect, useState } from 'react'
import * as React from 'react'
import { Product } from '../models/product'
import NavBar from './NavBar.tsx'
import { Container } from '@mui/material'
import ProductsDashboard from '../features/products/dashboard/ProductsDashboard.tsx'
import ProductDetails from '../features/products/details/ProductDetails.tsx'

const App = () => {
  const [products, setProducts] = useState<Product[]>([])

  const getProducts = useCallback(async () => {
    axios
      .get<Product[]>('http://localhost:2030/api/products')
      .then((response) => {
        setProducts(response.data)
      })
  }, [])

  useEffect(() => {
    getProducts()
  }, [getProducts])
  return (
    <>
      <NavBar />
      <Container maxWidth="xl">
        <ProductsDashboard products={products} />
        {/* <ProductDetails product={products[0]} /> */}
      </Container>
    </>
  )
}

export default App
