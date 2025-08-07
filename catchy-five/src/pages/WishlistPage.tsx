import { useCartContext } from '../components/CartContext';
import {
  Box,
  Typography,
  Button,
  Container,
  CardMedia,
  Stack,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function WishlistPage() {
  const {
    wishlist,
    removeFromWishlist,
    addToCart,
    setWishlist,
    cart,
  } = useCartContext();

  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));

  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const clearWishlist = () => {
    setWishlist([]);
    setSnackbarMessage('Wishlist cleared');
    setSnackbarOpen(true);
  };

  const handleMoveToCart = (item: any) => {
    const alreadyInCart = cart.some((p) => p.id === item.id);
    if (!alreadyInCart) {
      addToCart(item);
    }
    removeFromWishlist(item.id);
    setSnackbarMessage(`${item.name} moved to cart`);
    setSnackbarOpen(true);
  };

  const handleRemove = (id: number) => {
    removeFromWishlist(id);
    setSnackbarMessage(`Item removed from wishlist`);
    setSnackbarOpen(true);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        ❤️ Your Wishlist
      </Typography>

      {wishlist.length === 0 ? (
        <Typography>No items in wishlist.</Typography>
      ) : (
        <>
          <Box
            sx={{
              mb: 3,
              display: 'flex',
              flexDirection: isSm ? 'column' : 'row',
              justifyContent: 'space-between',
              alignItems: isSm ? 'stretch' : 'center',
              gap: 2,
            }}
          >
            <Button variant="outlined" color="error" onClick={clearWishlist}>
              Clear Wishlist
            </Button>
            <Button variant="contained" onClick={() => navigate('/cartpage')}>
              Go to Cart
            </Button>
          </Box>

          {wishlist.map((item) => (
            <Box
              key={item.id}
              sx={{
                mb: 2,
                p: 2,
                border: '1px solid #ccc',
                borderRadius: 2,
                boxShadow: 1,
                transition: 'all 0.2s ease',
                '&:hover': { backgroundColor: '#f9f9f9' },
                display: 'flex',
                flexDirection: isSm ? 'column' : 'row',
                alignItems: isSm ? 'flex-start' : 'center',
                gap: 2,
              }}
            >
              <CardMedia
                component="img"
                image={item.img}
                alt={item.name}
                sx={{
                  width: isSm ? '100%' : 120,
                  height: isSm ? 'auto' : 80,
                  maxHeight: 200,
                  objectFit: 'cover',
                  borderRadius: 1,
                }}
              />

              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  ₹{item.price.toFixed(2)}
                </Typography>
              </Box>

              <Stack
                direction={isSm ? 'column' : 'row'}
                spacing={1}
                sx={{ width: isSm ? '100%' : 'auto' }}
              >
                <Button
                  variant="contained"
                  fullWidth={isSm}
                  sx={{
                    textTransform: 'none',
                    backgroundColor: '#4CAF50',
                    '&:hover': { backgroundColor: '#388e3c' },
                  }}
                  onClick={() => handleMoveToCart(item)}
                >
                  Move to Cart
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  fullWidth={isSm}
                  sx={{ textTransform: 'none' }}
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </Button>
              </Stack>
            </Box>
          ))}
        </>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity="success"
          onClose={() => setSnackbarOpen(false)}
          sx={{ fontWeight: 600 }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
