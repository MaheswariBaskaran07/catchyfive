import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Divider, Button, Radio, RadioGroup,
  FormControlLabel, FormControl, TextField, Chip
} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useNavigate } from 'react-router-dom';
import { useAddress } from '../components/AddressContext';
import { useCartContext } from '../components/CartContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { addresses } = useAddress();
  const { cart } = useCartContext();

  const selectedAddress = addresses[0] || null;

  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [gpayAvailable, setGpayAvailable] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  useEffect(() => {
    if (window.googlePayClient) {
      setGpayAvailable(true);
    }
  }, []);

  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * (item.quantity || 0), 0);
  const deliveryCharge = cartSubtotal >= 80 ? 0 : 30;
  const discountAmount = (cartSubtotal * discountPercent) / 100;
  const totalAmount = cartSubtotal - discountAmount + deliveryCharge;

  const handleApplyPromo = () => {
    if (promoCode.trim().toLowerCase() === 'organic10') {
      setDiscountPercent(10);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code');
      setDiscountPercent(0);
    }
  };

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
      sx={{
        background: 'linear-gradient(to right, #d4fc79, #96e6a1)',
        minHeight: '100vh',
        pt: 4,
        pb: 6,
      }}
    >
      <div className="container">
        <Paper elevation={6} className="p-4 p-md-5 rounded-3">

          {/* Header with Icon inline */}
          <div className="text-center mb-4 d-flex justify-content-center align-items-center gap-2">
            <LocalShippingIcon fontSize="large" color="success" />
            <Typography
              variant="h4"
              fontWeight={700}
              sx={{
                background: 'linear-gradient(to right, #56ab2f, #a8e063)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                m: 0
              }}
            >
              Checkout
            </Typography>
          </div>

          <div className="row gx-5 align-items-start">
            {/* Left Section */}
            <div className="col-12 col-md-7 mb-4 mb-md-0">
              <div className="mb-4">
                <Typography variant="h6" fontWeight={600} gutterBottom>Delivery Address</Typography>
                {selectedAddress ? (
                  <>
                    <Typography>{selectedAddress.name}</Typography>
                    <Typography>{selectedAddress.phone}</Typography>
                    <Typography>
                      {selectedAddress.line1}, {selectedAddress.city}, {selectedAddress.state}, {selectedAddress.postalCode}
                    </Typography>
                    <Typography>{selectedAddress.country}</Typography>
                    <Button variant="text" size="small" sx={{ mt: 1 }} onClick={() => navigate('/save-address')}>
                      Change Address
                    </Button>
                  </>
                ) : (
                  <Button variant="outlined" onClick={() => navigate('/add-address')}>
                    Add Address
                  </Button>
                )}
              </div>

              <div className="mb-4">
                <Typography variant="h6" fontWeight={600} gutterBottom>Your Items</Typography>
                {cart.map((item) => (
                  <Typography key={item.id}>
                    {item.name} x{item.quantity} - ${item.price.toFixed(2)}
                  </Typography>
                ))}
              </div>

              <div>
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
              </div>
            </div>

            {/* Right Section */}
            <div className="col-12 col-md-5">
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <Typography variant="h6" fontWeight={600}>
                    Promo Code{' '}
                    <Typography component="span" variant="caption" color="text.secondary">
                      (Use <strong>organic10</strong> for 10% off)
                    </Typography>
                  </Typography>
                </div>
                <div className="d-flex mt-2">
                  <TextField
                    size="small"
                    variant="outlined"
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    error={!!promoError}
                    helperText={promoError}
                    fullWidth
                  />
                 <Button
  onClick={handleApplyPromo}
  sx={{
    ml: 1,
    minWidth: '80px',
    height: '40px',
    fontWeight: 'bold',
    background: 'linear-gradient(to right, #56ab2f, #a8e063)',
    color: 'white',
    textTransform: 'uppercase',
    '&:hover': {
      background: 'linear-gradient(to right, #43e97b, #38f9d7)',
    },
  }}
>
  APPLY
</Button>

                </div>
              </div>

              <div>
                <Typography variant="h6" fontWeight={600} gutterBottom>Order Summary</Typography>
                <Typography>Subtotal: ${cartSubtotal.toFixed(2)}</Typography>
                {discountPercent > 0 && (
                  <Typography color="success.main">
                    Discount ({discountPercent}%): -${discountAmount.toFixed(2)}
                  </Typography>
                )}
                <Typography>Delivery Charge: ${deliveryCharge.toFixed(2)}</Typography>

                {cartSubtotal < 80 ? (
                  <Chip
                    label={`$${(80 - cartSubtotal).toFixed(2)} more to unlock Free Delivery`}
                    color="warning"
                    sx={{ mt: 1 }}
                  />
                ) : (
                  <Chip
                    label="Free Delivery Applied"
                    color="success"
                    sx={{ mt: 1 }}
                  />
                )}

                <Divider sx={{ my: 2 }} />
                <Typography fontWeight={700}>Total: ${totalAmount.toFixed(2)}</Typography>
              </div>
            </div>
          </div>

          {/* Place Order Button */}
          <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{
              py: 1.5,
              mt: 4,
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
      </div>
    </Box>
  );
};

export default Checkout;
