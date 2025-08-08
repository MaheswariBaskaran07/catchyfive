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
  Grid,
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
    <Container sx={{ py: { xs: 2, sm: 4 } }}>
      <Typography variant="h4" gutterBottom display="flex" alignItems="center">
        <ShoppingCartIcon sx={{ color: '#1976d2', mr: 1 }} /> Your Cart
      </Typography>

      {cart.length === 0 ? (
        <Typography>No items in cart.</Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {cart.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card
                  sx={{
                    boxShadow: 2,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardMedia
                    component="img"
                    image={item.img}
                    alt={item.name}
                    sx={{
                      width: '100%',
                      height: 180,
                      objectFit: 'cover',
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                      Price: {item.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </Typography>

                    {/* Responsive Layout: Quantity + Remove */}
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: { xs: 'row', sm: 'column' },
                        alignItems: { xs: 'center', sm: 'flex-start' },
                        gap: 1,
                        mb: 2,
                      }}
                    >
                      {/* Quantity Controls */}
                      <Box display="flex" alignItems="center" gap={1}>
                        <IconButton onClick={() => handleDecreaseQuantity(item)} size="small">
                          <RemoveIcon />
                        </IconButton>
                        <Typography>{item.quantity ?? 0}</Typography>
                        <IconButton onClick={() => handleAddToCart(item)} size="small">
                          <AddIcon />
                        </IconButton>
                      </Box>

                      {/* Remove Button with hover behavior on mobile */}
                      <Button
                        onClick={() => {
                          removeFromCart(item.id);
                          setSnackbarMessage(`${item.name} removed from cart`);
                          setSnackbarOpen(true);
                        }}
                        color="error"
                        startIcon={<DeleteIcon />}
                        variant="outlined"
                        sx={{
                          textTransform: 'none',
                          minWidth: { xs: 'auto', sm: '100%' },
                          px: 2,
                          py: 0.5,
                          position: 'relative',
                          '& .hover-label': {
                            display: { xs: 'none', sm: 'inline' },
                          },
                          '&:hover .hover-label': {
                            display: 'inline',
                          },
                        }}
                      >
                        <Typography
                          variant="body2"
                          className="hover-label"
                        >
                          Remove
                        </Typography>
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Box textAlign="right" sx={{ mt: 2 }}>
            <Typography variant="h6">
              Total:{' '}
              <strong>
                {cartTotal.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </strong>
            </Typography>
            {cartTotal < freeDeliveryThreshold && (
              <Typography variant="body2" color="text.secondary">
                Add{' '}
                {(freeDeliveryThreshold - cartTotal).toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}{' '}
                more for free delivery
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
