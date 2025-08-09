import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Divider,
  Snackbar,
  Alert,
  Grid,
  Paper,
} from '@mui/material';
import { useCartContext } from '../components/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
  const { cart, cartTotal } = useCartContext();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [formValues, setFormValues] = useState({
    name: '',
    address: '',
    city: '',
    zip: '',
    phone: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleOrderSubmit = () => {
    const { name, address, city, zip, phone } = formValues;
    if (!name || !address || !city || !zip || !phone) {
      setSnackbarMessage('Please fill in all required fields');
      setSnackbarOpen(true);
      return;
    }

    setSnackbarMessage('✅ Order placed successfully!');
    setSnackbarOpen(true);

    // Simulate order placement and redirect
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <Container sx={{ py: { xs: 3, md: 5 } }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>

      {cart.length === 0 ? (
        <Typography>No items in cart.</Typography>
      ) : (
        <Grid container spacing={4}>
          {/* Left: Shipping Form */}
          <Grid item xs={12} md={7}>
            <Paper sx={{ p: 3, boxShadow: 3 }}>
              <Typography variant="h6" gutterBottom>
                Shipping Details
              </Typography>

              <Grid container spacing={2}>
                {[
                  { label: 'Full Name', name: 'name' },
                  { label: 'Address', name: 'address' },
                  { label: 'City', name: 'city' },
                  { label: 'Zip Code', name: 'zip' },
                  { label: 'Phone Number', name: 'phone' },
                ].map((field) => (
                  <Grid item xs={12} sm={field.name === 'zip' || field.name === 'phone' ? 6 : 12} key={field.name}>
                    <TextField
                      fullWidth
                      required
                      label={field.label}
                      name={field.name}
                      value={formValues[field.name as keyof typeof formValues]}
                      onChange={handleInputChange}
                    />
                  </Grid>
                ))}
              </Grid>

              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 3 }}
                fullWidth
                onClick={handleOrderSubmit}
              >
                Place Order
              </Button>
            </Paper>
          </Grid>

          {/* Right: Order Summary */}
          <Grid item xs={12} md={5}>
            <Paper sx={{ p: 3, boxShadow: 3 }}>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>

              {cart.map((item) => (
                <Box
                  key={item.id}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1}
                >
                  <Box>
                    <Typography>{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Qty: {item.quantity}
                    </Typography>
                  </Box>
                  <Typography>
                    ₹{(item.price * (item.quantity || 0)).toFixed(2)}
                  </Typography>
                </Box>
              ))}

              <Divider sx={{ my: 2 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1" fontWeight="bold">
                  Total
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  ₹{cartTotal.toFixed(2)}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
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
