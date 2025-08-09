import React, { useState } from 'react';
import { useCartContext } from '../components/CartContext';
import {
  Box,
  Typography,
  Button,
  CardMedia,
  Stack,
  Container,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart, setWishlist, cart } = useCartContext();
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const clearWishlist = () => {
    setWishlist([]);
    setSnackbarMessage('Wishlist cleared');
    setSnackbarOpen(true);
  };

  const handleMoveToCart = (item: any) => {
    if (!cart.some((p) => p.id === item.id)) {
      addToCart({ ...item, quantity: 1 }); // ✅ Add to cart
    }
    removeFromWishlist(item.id); // ✅ Remove from wishlist
    setSnackbarMessage(`${item.name} moved to cart`); // ✅ Show message
    setSnackbarOpen(true); // ✅ Trigger snackbar
  };

  const handleRemove = (id: string) => {
    removeFromWishlist(id);
    setSnackbarMessage('Item removed from wishlist');
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
          <Box className="d-flex justify-content-between flex-wrap mb-3 gap-2">
            <Button variant="outlined" color="error" onClick={clearWishlist}>
              Clear Wishlist
            </Button>
            <Button variant="contained" onClick={() => navigate('/cartpage')}>
              Go to Cart
            </Button>
          </Box>

          <div className="row">
            {wishlist.map((item) => (
              <div key={item.id} className="col-12 col-sm-6 col-md-4 mb-3">
                <Box
                  sx={{
                    p: 2,
                    border: '1px solid #ccc',
                    borderRadius: 2,
                    boxShadow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                    transition: 'all 0.2s',
                    '&:hover': { backgroundColor: '#f9f9f9' },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={item.img}
                    alt={item.name}
                    sx={{ width: '100%', height: 200, objectFit: 'cover', mb: 2 }}
                  />

                  <Box>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      ₹{item.price.toFixed(2)}
                    </Typography>
                  </Box>

                  <Stack direction="column" spacing={1} sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      onClick={() => handleMoveToCart(item)}
                      sx={{
                        backgroundColor: '#4caf50',
                        '&:hover': { backgroundColor: '#388e3c' },
                        textTransform: 'none',
                      }}
                    >
                      Move to Cart
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleRemove(item.id)}
                      sx={{ textTransform: 'none' }}
                    >
                      Remove
                    </Button>
                  </Stack>
                </Box>
              </div>
            ))}
          </div>
        </>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ fontWeight: 600 }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
