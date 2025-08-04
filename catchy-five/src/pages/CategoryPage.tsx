import { useParams } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardMedia, CardContent, CardActions, Button } from '@mui/material';

const mockData = {
  vegetables: [
    { id: 1, name: 'Carrot', price: 1.5, image: '/images/vegetables/carrot.jpg' },
    { id: 2, name: 'Spinach', price: 2.0, image: '/images/vegetables/spinach.jpg' },
    { id: 3, name: 'Broccoli', price: 1.8, image: '/images/vegetables/broccoli.jpg' },
    { id: 4, name: 'Tomato', price: 1.2, image: '/images/vegetables/tomato.jpg' },
  ],
  fruits: [
    { id: 1, name: 'Apple', price: 1.2, image: '/images/fruits/apple.jpg' },
    { id: 2, name: 'Banana', price: 0.8, image: '/images/fruits/banana.jpg' },
    { id: 3, name: 'Mango', price: 2.5, image: '/images/fruits/mango.jpg' },
    { id: 4, name: 'Grapes', price: 2.0, image: '/images/fruits/grapes.jpg' },
  ],
  groceries: [
    { id: 1, name: 'Rice', price: 5.0, image: '/images/groceries/rice.jpg' },
    { id: 2, name: 'Wheat Flour', price: 4.0, image: '/images/groceries/flour.jpg' },
    { id: 3, name: 'Sugar', price: 3.5, image: '/images/groceries/sugar.jpg' },
    { id: 4, name: 'Salt', price: 1.0, image: '/images/groceries/salt.jpg' },
  ],
  beverages: [
    { id: 1, name: 'Green Tea', price: 3.0, image: '/images/beverages/greentea.jpg' },
    { id: 2, name: 'Orange Juice', price: 2.5, image: '/images/beverages/juice.jpg' },
    { id: 3, name: 'Coffee', price: 4.0, image: '/images/beverages/coffee.jpg' },
    { id: 4, name: 'Mineral Water', price: 1.5, image: '/images/beverages/water.jpg' },
  ],
};

export default function CategoryPage() {
  const { categoryName } = useParams();
  const categoryKey = categoryName?.toLowerCase() || '';
  const products = mockData[categoryKey as keyof typeof mockData] || [];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, textTransform: 'capitalize', color: '#4CAF50' }}>
        {categoryName}
      </Typography>

      {products.length === 0 ? (
        <Typography>No products found for this category.</Typography>
      ) : (
        <Grid container spacing={3}>
          {products.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <Card>
                <CardMedia component="img" height="160" image={item.image} alt={item.name} />
                <CardContent>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography color="text.secondary">${item.price.toFixed(2)}</Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Button variant="contained" color="primary" fullWidth>Add to Cart</Button>
                  <Button variant="outlined" color="secondary" fullWidth>Add to Wishlist</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
