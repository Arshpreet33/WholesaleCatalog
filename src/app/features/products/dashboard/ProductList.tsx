import * as React from 'react'
import { Product } from '../../../models/product'
import {
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CardActions,
  Box,
} from '@mui/material'

interface Props {
  products: Product[]
}

const ProductList = ({ products }: Props) => {
  return (
    <Box
      sx={{
        display: 'grid',
        columnGap: 4,
        rowGap: 4,
        gridTemplateColumns: 'repeat(3, 1fr)',
      }}
    >
      {/* <Box sx={{flexGrow:1}}>
       <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}> */}
      {products.map((product) => (
        // <Grid key={product.id} xs={2} sm={4}>
        <Card>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="/candy.png"
              alt="Candy image here"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Category - Baci Candy
                <br />
                Code - {product.code}
                <br />({product.caseQty}x{product.unitWeight}g)
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Add to Cart
            </Button>
          </CardActions>
        </Card>
        // </Grid>
      ))}
      {/* </Box>
       </Grid> */}
    </Box>
  )
}

export default ProductList
