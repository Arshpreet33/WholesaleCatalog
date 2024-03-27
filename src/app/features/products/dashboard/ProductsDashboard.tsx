import * as React from 'react'
import { Product } from '../../../models/product'
import { Box, Stack, Divider } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2' // Grid version 2
import SearchBar from '../../../layout/SearchBar.tsx'
import PaperItem from '../../../utils/components/PaperItem.ts'
import ProductList from './ProductList.tsx'

interface Props {
  products: Product[]
}

const ProductsDashboard = ({ products }: Props) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={8} md={10} sx={{ p: 4 }}>
          <ProductList products={products} />
        </Grid>
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{ mr: '-1px' }}
        />
        <Grid xs={4} md={2} sx={{ p: 4 }}>
          <Box sx={{ width: '100%' }}>
            <Stack spacing={4}>
              <SearchBar />
              <PaperItem>Filter 2</PaperItem>
              <PaperItem>Filter 3</PaperItem>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ProductsDashboard
