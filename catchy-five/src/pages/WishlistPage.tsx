// pages/WishlistPage.tsx

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
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
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
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                borderRadius: 2,
                boxShadow: 1,
                transition: 'all 0.2s ease',
                '&:hover': { backgroundColor: '#f9f9f9' },
              }}
            >
              <CardMedia
                component="img"
                image={item.img}
                alt={item.name}
                sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 1 }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  ₹{item.price.toFixed(2)}
                </Typography>
              </Box>

              <Stack direction="row" spacing={1}>
                <Button
                  variant="contained"
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
        <Alert severity="success" onClose={() => setSnackbarOpen(false)} sx={{ fontWeight: 600 }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
