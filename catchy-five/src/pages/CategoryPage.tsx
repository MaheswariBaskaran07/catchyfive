import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  IconButton,
  Rating,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useCartContext } from '../components/CartContext';
import { useState } from 'react';

export default function CategoryPage() {
  const { categoryName } = useParams();
  const { addToCart, addToWishlist } = useCartContext();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'info' | 'warning'>('success');

  const categoryKey = categoryName?.toLowerCase() || '';

  const mockData = {
    vegetables: [
      { id: 'vegetables-1', name: 'Carrot', price: 1.5, originalPrice: 2.0, rating: 4.5, reviews: 32, image: '/images/vegetables/carrot.jpg' },
      { id: 'vegetables-2', name: 'Spinach', price: 2.0, originalPrice: 2.5, rating: 4.0, reviews: 20, image: '/images/vegetables/spinach.jpg' },
      { id: 'vegetables-3', name: 'Broccoli', price: 1.8, originalPrice: 2.4, rating: 4.2, reviews: 15, image: '/images/vegetables/broccoli.jpg' },
      { id: 'vegetables-4', name: 'Tomato', price: 1.2, originalPrice: 1.5, rating: 4.6, reviews: 45, image: '/images/vegetables/tomato.jpg' },
    ],
    fruits: [
      { id: 'fruits-1', name: 'Apple', price: 1.2, originalPrice: 1.5, rating: 4.4, reviews: 40, image: '/images/fruits/apple.jpg' },
      { id: 'fruits-2', name: 'Banana', price: 0.8, originalPrice: 1.0, rating: 4.3, reviews: 55, image: '/images/fruits/banana.jpg' },
      { id: 'fruits-3', name: 'Mango', price: 2.5, originalPrice: 3.0, rating: 4.8, reviews: 38, image: '/images/fruits/mango.jpg' },
      { id: 'fruits-4', name: 'Grapes', price: 2.0, originalPrice: 2.5, rating: 4.1, reviews: 28, image: '/images/fruits/grapes.jpg' },
    ],
    groceries: [
      { id: 'groceries-1', name: 'Rice', price: 5.0, originalPrice: 6.0, rating: 4.7, reviews: 64, image: '/images/groceries/rice.jpg' },
      { id: 'groceries-2', name: 'Wheat Flour', price: 4.0, originalPrice: 5.0, rating: 4.5, reviews: 50, image: '/images/groceries/flour.jpg' },
      { id: 'groceries-3', name: 'Sugar', price: 3.5, originalPrice: 4.0, rating: 4.2, reviews: 48, image: '/images/groceries/sugar.jpg' },
      { id: 'groceries-4', name: 'Salt', price: 1.0, originalPrice: 1.2, rating: 4.0, reviews: 30, image: '/images/groceries/salt.jpg' },
    ],
    beverages: [
      { id: 'beverages-1', name: 'Green Tea', price: 3.0, originalPrice: 3.5, rating: 4.3, reviews: 29, image: '/images/beverages/greentea.jpg' },
      { id: 'beverages-2', name: 'Orange Juice', price: 2.5, originalPrice: 3.0, rating: 4.6, reviews: 34, image: '/images/beverages/orangejuice.jpg' },
      { id: 'beverages-3', name: 'Coffee', price: 4.0, originalPrice: 5.0, rating: 4.9, reviews: 70, image: '/images/beverages/coffee.jpg' },
      { id: 'beverages-4', name: 'Mineral Water', price: 1.5, originalPrice: 2.0, rating: 4.1, reviews: 25, image: '/images/beverages/water.jpg' },
    ],
  };

  const products = mockData[categoryKey as keyof typeof mockData] || [];

  const [quantities, setQuantities] = useState<{ [id: string]: number }>(() =>
    Object.fromEntries(products.map((item) => [item.id, 1]))
  );

  const handleAddToCart = (item: any) => {
    const quantity = quantities[item.id] || 0;
    if (quantity <= 0) {
      setSnackbarText(`Please select quantity > 0 for ${item.name}`);
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
      return;
    }

    addToCart({ id: item.id, name: item.name, price: item.price, img: item.image, quantity });
    setSnackbarText(`${item.name} (x${quantity}) added to cart`);
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  const handleAddToWishlist = (item: any) => {
    const quantity = quantities[item.id] || 0;
    if (quantity <= 0) {
      setSnackbarText(`Please select quantity > 0 for ${item.name}`);
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
      return;
    }

    addToWishlist({ id: item.id, name: item.name, price: item.price, img: item.image, quantity });
    setSnackbarText(`${item.name} (x${quantity}) added to wishlist`);
    setSnackbarSeverity('info');
    setSnackbarOpen(true);
  };

  const handleQuantityChange = (id: string, value: string) => {
    const parsed = parseInt(value, 10);
    setQuantities((prev) => ({ ...prev, [id]: isNaN(parsed) ? 0 : parsed }));
  };

  return (
    <Box sx={{ px: { xs: 2, sm: 3, md: 5 }, py: 4 }}>
      <Typography
        variant="h4"
        sx={{ mb: 4, textTransform: 'capitalize', color: '#4CAF50', textAlign: 'center', fontWeight: 'bold' }}
      >
        {categoryName}
      </Typography>

      {products.length === 0 ? (
        <Typography align="center" color="text.secondary">
          No products found for this category.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {products.map((item) => {
            const discount = item.originalPrice
              ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
              : 0;

            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: 3,
                    transition: 'transform 0.3s ease',
                    '&:hover': { transform: 'translateY(-5px)' },
                  }}
                >
                  <CardMedia component="img" image={item.image} alt={item.name} sx={{ height: 180, objectFit: 'cover' }} />

                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                      {item.name}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Rating name="read-only" value={item.rating} precision={0.5} readOnly size="small" />
                      <Typography variant="body2" sx={{ ml: 0.5 }}>
                        ({item.reviews})
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {item.originalPrice && (
                        <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'gray' }}>
                          ${item.originalPrice.toFixed(2)}
                        </Typography>
                      )}
                      <Typography variant="h6" color="primary">
                        {item.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                      </Typography>
                      {discount > 0 && (
                        <Box
                          sx={{
                            border: '1px solid #ccc',
                            borderRadius: 1,
                            px: 0.5,
                            fontSize: '0.75rem',
                            color: '#388e3c',
                            backgroundColor: '#e8f5e9',
                          }}
                        >
                          {discount}% OFF
                        </Box>
                      )}
                    </Box>
                  </CardContent>

                  <CardActions
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, pb: 2, mt: 'auto' }}
                  >
                    <TextField
                      type="number"
                      size="small"
                      value={quantities[item.id] || 0}
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      inputProps={{ min: 0, style: { textAlign: 'center', width: 40, padding: 6 } }}
                      sx={{ width: 60 }}
                    />
                    <Button
                      variant="contained"
                      startIcon={<ShoppingCartIcon />}
                      onClick={() => handleAddToCart(item)}
                      sx={{
                        backgroundColor: '#4CAF50',
                        color: '#fff',
                        textTransform: 'none',
                        fontWeight: 'bold',
                        px: 2,
                        '&:hover': {
                          backgroundColor: '#388e3c',
                        },
                      }}
                    >
                      Add to Cart
                    </Button>
                    <IconButton
                      onClick={() => handleAddToWishlist(item)}
                      sx={{
                        border: '1px solid #ccc',
                        color: '#555',
                        '&:hover': {
                          backgroundColor: '#ffe6e6',
                          color: '#d32f2f',
                        },
                      }}
                    >
                      <FavoriteBorderIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbarSeverity} onClose={() => setSnackbarOpen(false)} sx={{ fontWeight: 600 }}>
          {snackbarText}
        </Alert>
      </Snackbar>
    </Box>
  );
}
