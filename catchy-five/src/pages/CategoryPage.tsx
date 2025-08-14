import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
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
  Slide,
  Tooltip,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useCartContext } from '../components/CartContext';
import { useState, useEffect } from 'react';


const categoryIcons: { [key: string]: string } = {
  vegetables: '🥕',
  fruits: '🍎',
  groceries: '🧺',
  beverages: '🥤',
};

export default function CategoryPage() {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const { addToCart, addToWishlist } = useCartContext();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'info' | 'warning'>('success');

  const categoryKey = categoryName?.toLowerCase() || '';
  const categories = ['vegetables', 'fruits', 'groceries', 'beverages'];

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
  const [quantities, setQuantities] = useState<{ [id: string]: number }>({});

  useEffect(() => {
    const initialQuantities: { [id: string]: number } = {};
    products.forEach((item) => {
      initialQuantities[item.id] = 0;
    });
    setQuantities(initialQuantities);
  }, [categoryKey]);

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
    setQuantities((prev) => ({ ...prev, [id]: isNaN(parsed) || parsed < 0 ? 0 : parsed }));
  };

  return (
    <Box sx={{ px: { xs: 2, sm: 3, md: 5 }, py: 4 }}>
      {/* Category Buttons */}
      <Box className="d-flex flex-wrap justify-content-center gap-2 mb-4">
        {categories
          .filter((cat) => cat !== categoryKey)
          .map((cat, index) => (
            <Slide key={cat} direction="left" in mountOnEnter timeout={400 + index * 200}>
              <Button
                variant="outlined"
                onClick={() => navigate(`/category/${cat}`)}
                sx={{
                  textTransform: 'capitalize',
                  fontWeight: 'bold',
                  px: 2,
                  borderColor: '#4CAF50',
                  color: '#4CAF50',
                  '&:hover': {
                    backgroundColor: '#e8f5e9',
                    borderColor: '#388e3c',
                    color: '#388e3c',
                  },
                }}
                startIcon={<span>{categoryIcons[cat]}</span>}
              >
                {cat}
              </Button>
            </Slide>
          ))}
      </Box>

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
        <div className="row gy-4">
          {products.map((item) => {
            const discount = item.originalPrice
              ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
              : 0;

            return (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={item.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: 3,
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

                  {/* Quantity control with increment/decrement buttons */}
                  <CardActions
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      px: 2,
                      pb: 2,
                      mt: 'auto',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '1px solid #ccc',
                        borderRadius: 1,
                        overflow: 'hidden',
                        width: 110,
                        height: 36,
                      }}
                    >
                      <Button
                        onClick={() => {
                          const current = quantities[item.id] || 0;
                          if (current > 0) {
                            handleQuantityChange(item.id, String(current - 1));
                          }
                        }}
                        sx={{
                          minWidth: 0,
                          px: 1,
                          fontWeight: 'bold',
                          fontSize: 20,
                          userSelect: 'none',
                        }}
                      >
                        −
                      </Button>
                      <TextField
                        type="number"
                        size="small"
                        value={quantities[item.id] || 0}
                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                        inputProps={{
                          min: 0,
                          style: { textAlign: 'center', padding: '6px 8px', width: 40 },
                        }}
                        sx={{
                          '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                            display: 'none',
                          },
                          '& input[type=number]': {
                            MozAppearance: 'textfield',
                          },
                        }}
                      />
                      <Button
                        onClick={() => {
                          const current = quantities[item.id] || 0;
                          handleQuantityChange(item.id, String(current + 1));
                        }}
                        sx={{
                          minWidth: 0,
                          px: 1,
                          fontWeight: 'bold',
                          fontSize: 20,
                          userSelect: 'none',
                        }}
                      >
                        +
                      </Button>
                    </Box>

                    <Tooltip title="Add to Cart" arrow>
                      <Button
                        variant="contained"
                        onClick={() => handleAddToCart(item)}
                        sx={{
                          backgroundColor: '#4CAF50',
                          color: '#fff',
                          textTransform: 'none',
                          fontWeight: 'bold',
                          px: 2,
                          minWidth: 0,
                          '&:hover': {
                            backgroundColor: '#388e3c',
                          },
                        }}
                      >
                        <ShoppingCartIcon fontSize="small" />
                      </Button>
                    </Tooltip>

                    <Tooltip title="Add to Wishlist" arrow>
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
                    </Tooltip>
                  </CardActions>
                </Card>
              </div>
            );
          })}
        </div>
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
