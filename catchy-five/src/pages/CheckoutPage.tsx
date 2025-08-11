import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Divider, Button, Radio, RadioGroup,
  FormControlLabel, FormControl, useMediaQuery, useTheme, Stack
} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useNavigate } from 'react-router-dom';
import { useAddress } from '../components/AddressContext';
import { useCartContext } from '../components/CartContext';

const Checkout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const { addresses } = useAddress();
  const { cart } = useCartContext();

  const selectedAddress = addresses[0] || null;

  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [gpayAvailable, setGpayAvailable] = useState(false);

  useEffect(() => {
    if (window.googlePayClient) {
      setGpayAvailable(true);
    }
  }, []);

  // Calculate total price from cart
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * (item.quantity || 0), 0);
  const deliveryCharge = cartSubtotal >= 80 ? 0 : 30;
  const totalAmount = cartSubtotal + deliveryCharge;

  const handlePlaceOrder = () => {
    if (paymentMethod === 'gpay') {
      alert('Initiating Google Pay...');
    } else {
      alert('Order placed successfully!');
      navigate('/');
    }
  };

  return (
    <Box
      px={isMobile ? 2 : 4}
      py={6}
      sx={{ background: 'linear-gradient(to right, #d4fc79, #96e6a1)', minHeight: '100vh' }}
    >
      <Paper elevation={6} sx={{ maxWidth: 900, mx: 'auto', p: { xs: 2, md: 4 }, borderRadius: 3 }}>
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <LocalShippingIcon color="success" />
          <Typography variant="h5" fontWeight={700}>Checkout</Typography>
        </Stack>

        {/* Delivery Address */}
        <Box mb={4}>
          <Typography variant="h6" fontWeight={600} gutterBottom>Delivery Address</Typography>
          {selectedAddress ? (
            <Box>
              <Typography>{selectedAddress.name}</Typography>
              <Typography>{selectedAddress.phone}</Typography>
              <Typography>
                {selectedAddress.line1}, {selectedAddress.city}, {selectedAddress.state}, {selectedAddress.postalCode}
              </Typography>
              <Typography>{selectedAddress.country}</Typography>
              <Button variant="text" size="small" sx={{ mt: 1 }} onClick={() => navigate('/save-address')}>
                Change Address
              </Button>
            </Box>
          ) : (
            <Button variant="outlined" onClick={() => navigate('/add-address')}>
              Add Address
            </Button>
          )}
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Dynamic Order Summary */}
        <Box mb={4}>
          <Typography variant="h6" fontWeight={600} gutterBottom>Order Summary</Typography>
          {cart.map((item) => (
            <Typography key={item.id}>
              {item.name} x{item.quantity} - ${(item.price * item.quantity).toFixed(2)}
            </Typography>
          ))}

          <Typography mt={1}>Delivery Charge - ${deliveryCharge.toFixed(2)}</Typography>
          <Divider sx={{ my: 2 }} />
          <Typography fontWeight={700}>Total: ${totalAmount.toFixed(2)}</Typography>
        </Box>

        {/* Payment Method */}
        <Box mb={4}>
          <Typography variant="h6" fontWeight={600} gutterBottom>Payment Method</Typography>
          <FormControl>
            <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              <FormControlLabel value="cod" control={<Radio />} label="Cash on Delivery" />
              {gpayAvailable && (
                <FormControlLabel value="gpay" control={<Radio />} label="Google Pay" />
              )}
              <FormControlLabel value="card" control={<Radio />} label="Credit/Debit Card" disabled />
            </RadioGroup>
          </FormControl>

          {gpayAvailable && paymentMethod === 'gpay' && (
            <Box mt={2}>
              <Button variant="outlined" onClick={() => alert('Google Pay flow would start.')}>
                Pay with Google Pay
              </Button>
            </Box>
          )}
        </Box>

        {/* Place Order Button */}
        <Button
          fullWidth
          variant="contained"
          size="large"
          sx={{
            py: 1.5,
            fontWeight: 700,
            background: 'linear-gradient(to right, #56ab2f, #a8e063)',
            '&:hover': { background: 'linear-gradient(to right, #43e97b, #38f9d7)' },
          }}
          onClick={handlePlaceOrder}
          disabled={!selectedAddress || cart.length === 0}
        >
          Place Order
        </Button>
      </Paper>
    </Box>
  );
};

export default Checkout;
