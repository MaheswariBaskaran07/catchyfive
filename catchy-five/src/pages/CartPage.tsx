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
  Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; 
import { useState } from 'react';

export default function CartPage() {
  const { cart, removeFromCart, addToCart } = useCartContext();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [remainingAmount, setRemainingAmount] = useState('0.00');

  const freeDeliveryThreshold = 80;

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  const handleAddToCart = (item: any) => {
    addToCart(item);

    const newTotal = cartTotal + item.price;

    if (newTotal < freeDeliveryThreshold) {
      const remaining = (freeDeliveryThreshold - newTotal).toFixed(2);
      setRemainingAmount(remaining);
      setSnackbarOpen(true);
    }
  };

  const decreaseQuantity = (itemId: number) => {
    const item = cart.find((p) => p.id === itemId);
    if (!item) return;

    if ((item.quantity || 1) > 1) {
      const updatedCart = cart.map((p) =>
        p.id === itemId ? { ...p, quantity: (p.quantity || 1) - 1 } : p
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      window.location.reload(); 
    } else {
      removeFromCart(itemId);
    }
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
            <Card key={item.id} sx={{ display: 'flex', mb: 3 }}>
              <CardMedia
                component="img"
                sx={{ width: 140, objectFit: 'contain' }}
                image={item.img}
                alt={item.name}
              />
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: ${item.price.toFixed(2)}
                </Typography>
                <Box display="flex" alignItems="center" gap={1} mt={1}>
                  <IconButton onClick={() => decreaseQuantity(item.id)} size="small">
                    <RemoveIcon />
                  </IconButton>
                  <Typography>{item.quantity || 1}</Typography>
                  <IconButton onClick={() => handleAddToCart(item)} size="small">
                    <AddIcon />
                  </IconButton>
                </Box>
                <Button
                  onClick={() => removeFromCart(item.id)}
                  color="error"
                  variant="outlined"
                  sx={{ mt: 2 }}
                >
                  Remove
                </Button>
              </CardContent>
            </Card>
          ))}

          <Divider sx={{ my: 3 }} />

          <Box textAlign="right">
            <Typography variant="h6">
              Total: <strong>${cartTotal.toFixed(2)}</strong>
            </Typography>
          </Box>
        </>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity="info"
          onClose={() => setSnackbarOpen(false)}
          sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}
        >
          <ShoppingCartIcon sx={{ color: '#1976d2', mr: 1 }} />
          Add ${remainingAmount} more to unlock free delivery!
        </Alert>
      </Snackbar>
    </Container>
  );
}
