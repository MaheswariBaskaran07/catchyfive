import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  Fade,
} from '@mui/material';
import { Home, LocationOn, Person, Phone } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { useAddress } from '../components/AddressContext';
import type { Address } from '../components/AddressContext'; 
import { v4 as uuidv4 } from 'uuid';

const AddAddress = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const { addresses, saveAddress } = useAddress();
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState<Address>({
    id: '',
    name: '',
    phone: '',
    line1: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });

  useEffect(() => {
    if (id) {
      const existing = addresses.find((a) => a.id === id);
      if (existing) {
        setFormData(existing);
      }
    }
  }, [id, addresses]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const toSave = { ...formData, id: formData.id || uuidv4() };
    saveAddress(toSave);
    setSaved(true);
    setTimeout(() => navigate('/save-address'), 1500);
  };

  return (
    <Box
      minHeight="calc(100vh - 64px)"
      display="flex"
      justifyContent="center"
      alignItems="center"
      px={2}
      py={6}
      sx={{
        background: 'linear-gradient(to right, #d4fc79, #3df355ff)',
        fontFamily: "'Poppins', sans-serif",
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Images */}
      <Box
        component="img"
        src="/grocery1.jpg"
        alt="groceries"
        sx={{
          position: 'absolute',
          top: 30,
          left: 30,
          width: { sm: 150, md: 180 },
          display: { xs: 'none', sm: 'block' },
          opacity: 0.8,
          borderRadius: 2,
        }}
      />
      <Box
        component="img"
        src="/grocery2.jpg"
        alt="groceries"
        sx={{
          position: 'absolute',
          bottom: 30,
          right: 30,
          width: { sm: 150, md: 180 },
          display: { xs: 'none', sm: 'block' },
          opacity: 0.8,
          borderRadius: 2,
        }}
      />

      {/* Main Form Box */}
      <Box
        width="100%"
        maxWidth="500px"
        bgcolor="white"
        boxShadow={6}
        borderRadius={4}
        p={{ xs: 3, sm: 4 }}
        mx="auto"
        textAlign="center"
        zIndex={1}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          mb={1}
          sx={{
            fontSize: { xs: '1.8rem', sm: '2.2rem' },
            background: 'linear-gradient(to right, #56ab2f, #a8e063)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {id ? 'Edit Address' : 'Add Address'}
        </Typography>

        <Typography variant="subtitle1" color="text.secondary" mb={3}>
          Help us deliver your order to the right place 🚚
        </Typography>

        <Fade in={saved}>
          <Typography color="green" fontWeight={600} mb={2}>
            ✅ Address saved successfully!
          </Typography>
        </Fade>

        {!saved && (
          <Box
            component="form"
            onSubmit={handleSubmit}
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <TextField
              label="Full Name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Phone Number"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              type="tel"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Address Line 1"
              required
              name="line1"
              value={formData.line1}
              onChange={handleChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Home />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="City"
              name="city"
              required
              value={formData.city}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="State"
              name="state"
              required
              value={formData.state}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Postal Code"
              name="postalCode"
              required
              value={formData.postalCode}
              onChange={handleChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOn />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Country"
              name="country"
              required
              value={formData.country}
              onChange={handleChange}
              fullWidth
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                py: 1.3,
                fontSize: '1rem',
                fontWeight: 'bold',
                background: 'linear-gradient(to right, #56ab2f, #a8e063)',
                textTransform: 'none',
                '&:hover': {
                  background: 'linear-gradient(to right, #43e97b, #38f9d7)',
                },
              }}
            >
              Save Address
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AddAddress;
