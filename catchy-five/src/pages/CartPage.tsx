import React, { useState } from 'react';
import { useCartContext } from '../components/CartContext';
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Container,
  Divider,
  Snackbar,
  Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const { cart, removeFromCart, addToCart, updateCartItemQuantity } = useCartContext();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const freeDeliveryThreshold = 80;
  const navigate = useNavigate();

  const cartTotal = cart.reduce((sum, item) => sum + item.price * (item.quantity || 0), 0);

  const handleAdd = (item: any) => {
    addToCart({ ...item, quantity: 1 });
    setSnackbarMessage(`${item.name} quantity updated`);
    setSnackbarOpen(true);
  };

  const handleDecrease = (item: any) => {
    const newQty = (item.quantity || 1) - 1;
    if (newQty <= 0) {
      removeFromCart(item.id);
      setSnackbarMessage(`${item.name} removed from cart`);
    } else {
      updateCartItemQuantity(item.id, newQty);
      setSnackbarMessage(`${item.name} quantity decreased`);
    }
    setSnackbarOpen(true);
  };

  return (
    <Container sx={{ py: { xs: 2, sm: 4 } }}>
      <Typography variant="h4" gutterBottom display="flex" alignItems="center">
        <ShoppingCartIcon sx={{ color: '#1976d2', mr: 1 }} /> Your Cart
      </Typography>
      {cart.length === 0 ? (
        <Typography>No items in cart.</Typography>
      ) : (
        <>
          <div className="row">
            {cart.map((item) => (
              <div key={item.id} className="col-12 col-sm-6 col-md-4 mb-3">
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    image={item.img}
                    alt={item.name}
                    sx={{ height: 180, objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography color="text.secondary" mb={1}>
                      ${item.price.toFixed(2)}
                    </Typography>

                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      gap={1}
                      mb={2}
                    >
                      <Box display="flex" alignItems="center" gap={1}>
                        <IconButton onClick={() => handleDecrease(item)} size="small" color="primary">
                          <RemoveIcon />
                        </IconButton>
                        <Typography>{item.quantity ?? 0}</Typography>
                        <IconButton onClick={() => handleAdd(item)} size="small" color="primary">
                          <AddIcon />
                        </IconButton>
                      </Box>

                      <Button
                        size="small"
                        color="error"
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        onClick={() => {
                          removeFromCart(item.id);
                          setSnackbarMessage(`${item.name} removed from cart`);
                          setSnackbarOpen(true);
                        }}
                        sx={{
                          textTransform: 'none',
                          ml: 2,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        Remove
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          <Divider sx={{ my: 4 }} />

          <Box textAlign="right">
            <Typography variant="h6">
              Total: <strong>${cartTotal.toFixed(2)}</strong>
            </Typography>

            {cartTotal < freeDeliveryThreshold && (
              <Typography color="text.secondary" mb={2}>
                Add ${(freeDeliveryThreshold - cartTotal).toFixed(2)} more for free delivery
              </Typography>
            )}

            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/checkout')}
              disabled={cart.length === 0}
              sx={{ mt: 2, textTransform: 'none' }}
            >
              Proceed to Checkout
            </Button>
          </Box>
        </>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="info" sx={{ fontWeight: 600 }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
