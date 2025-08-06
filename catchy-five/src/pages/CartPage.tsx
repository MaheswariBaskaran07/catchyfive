import { useCartContext } from '../components/CartContext';
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Divider,
  Snackbar,
  Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    addToCart,
    updateCartItemQuantity, 
  } = useCartContext();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const freeDeliveryThreshold = 80;

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 0),
    0
  );

  const handleAddToCart = (item: any) => {
    addToCart(item);
    const newTotal = cartTotal + item.price;

    if (newTotal < freeDeliveryThreshold) {
      const remaining = (freeDeliveryThreshold - newTotal).toFixed(2);
      setSnackbarMessage(`Add ₹${remaining} more to unlock free delivery!`);
    } else {
      setSnackbarMessage(`${item.name} quantity updated`);
    }

    setSnackbarOpen(true);
  };

  const handleDecreaseQuantity = (item: any) => {
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
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        <ShoppingCartIcon sx={{ color: '#1976d2', mr: 1 }} /> Your Cart
      </Typography>

      {cart.length === 0 ? (
        <Typography>No items in cart.</Typography>
      ) : (
        <>
          {cart.map((item) => (
            <Card key={item.id} sx={{ display: 'flex', mb: 3, boxShadow: 2 }}>
              <CardMedia
                component="img"
                sx={{ width: 140, objectFit: 'contain' }}
                image={item.img}
                alt={item.name}
              />
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: ₹{item.price.toFixed(2)}
                </Typography>
                <Box display="flex" alignItems="center" gap={1} mt={1}>
                  <IconButton onClick={() => handleDecreaseQuantity(item)} size="small">
                    <RemoveIcon />
                  </IconButton>
                  <Typography>{item.quantity ?? 0}</Typography>
                  <IconButton onClick={() => handleAddToCart(item)} size="small">
                    <AddIcon />
                  </IconButton>
                </Box>
                <Button
                  onClick={() => {
                    removeFromCart(item.id);
                    setSnackbarMessage(`${item.name} removed from cart`);
                    setSnackbarOpen(true);
                  }}
                  color="error"
                  startIcon={<DeleteIcon />}
                  variant="outlined"
                  sx={{ mt: 2, textTransform: 'none' }}
                >
                  Remove
                </Button>
              </CardContent>
            </Card>
          ))}

          <Divider sx={{ my: 3 }} />

          <Box textAlign="right">
            <Typography variant="h6">
              Total: <strong>₹{cartTotal.toFixed(2)}</strong>
            </Typography>
            {cartTotal < freeDeliveryThreshold && (
              <Typography variant="body2" color="text.secondary">
                Add ₹{(freeDeliveryThreshold - cartTotal).toFixed(2)} more for free delivery
              </Typography>
            )}
          </Box>
        </>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity="info"
          onClose={() => setSnackbarOpen(false)}
          sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
