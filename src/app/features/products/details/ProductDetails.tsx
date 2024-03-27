import * as React from 'react'
import { Product } from '../../../models/product'
import { Box, Button, Divider, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2' // Grid version 2
import AddIcon from '@mui/icons-material/Add'

interface Props {
  product: Product
}

const ProductDetails = ({ product }: Props) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={12} md={12} sx={{ p: 5 }}>
          <Typography component="div">
            <Box sx={{ fontSize: 'h2.fontSize', m: 1 }}>{product.title}</Box>
          </Typography>
        </Grid>
        <Grid xs={12} md={6} sx={{ p: 5 }}>
          <Box
            component="img"
            sx={{
              height: 433,
              width: 550,
              maxHeight: { xs: 433, md: 567 },
              maxWidth: { xs: 550, md: 650 },
            }}
            alt="Candy image here"
            src="/candy.png"
          />
        </Grid>
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{ mr: '-1px' }}
        />
        <Grid xs={12} md={6} sx={{ p: 5 }}>
          <Typography component="div">
            <Box sx={{ fontSize: 'h4.fontSize', m: 1 }}>
              Category - Baci Candy
            </Box>
            <Box sx={{ fontSize: 'h4.fontSize', m: 1 }}>
              Code - {product.code}
            </Box>
            <Box sx={{ fontSize: 'h4.fontSize', m: 1 }}>
              ({product.caseQty}x{product.unitWeight}g)
            </Box>
            <Box sx={{ fontSize: 'h4.fontSize', m: 1 }}>
              Unit Price - ${product.unitPrice}
            </Box>
            <Box sx={{ fontSize: 'h4.fontSize', m: 1 }}>
              Quantity - {product.caseQty}
            </Box>
            <Box sx={{ fontSize: 'h4.fontSize', m: 2 }}>
              <Button variant="contained" startIcon={<AddIcon />}>
                Add Item to cart
              </Button>
            </Box>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ProductDetails
