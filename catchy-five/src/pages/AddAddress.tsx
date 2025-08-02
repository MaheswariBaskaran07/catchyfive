import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  Fade,
} from '@mui/material';
import { Home, LocationOn } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function AddAddress() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => navigate('/'), 2000);
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      px={2}
      sx={{
        background: 'linear-gradient(to right, #d4fc79, #96e6a1)',
        fontFamily: "'Poppins', sans-serif",
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Optional decorative background icons */}
      <Box
        component="img"
        src="/tree-left.png"
        alt="Tree Left"
        sx={{
          position: 'absolute',
          top: 24,
          left: 24,
          width: 70,
          opacity: 0.08,
          display: { xs: 'none', md: 'block' },
        }}
      />
      <Box
        component="img"
        src="/veggies-right.png"
        alt="Veggies Right"
        sx={{
          position: 'absolute',
          bottom: 24,
          right: 24,
          width: 80,
          opacity: 0.08,
          display: { xs: 'none', md: 'block' },
        }}
      />

      {/* Card Container */}
      <Box
        width="100%"
        maxWidth="500px"
        bgcolor="white"
        boxShadow={6}
        borderRadius={4}
        p={{ xs: 3, sm: 4 }}
        textAlign="center"
        zIndex={1}
        sx={{
          animation: 'fadeInUp 0.6s ease-in-out',
          '@keyframes fadeInUp': {
            '0%': { opacity: 0, transform: 'translateY(20px)' },
            '100%': { opacity: 1, transform: 'translateY(0)' },
          },
        }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          mb={1}
          sx={{
            background: 'linear-gradient(to right, #56ab2f, #a8e063)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Add Address
        </Typography>

        <Typography variant="subtitle1" color="text.secondary" mb={3}>
          Help us deliver your order to the right place 🚚
        </Typography>

        <Fade in={saved}>
          <Typography
            color="green"
            fontWeight={600}
            mb={2}
            sx={{ display: saved ? 'block' : 'none' }}
          >
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
              label="Address Line 1"
              required
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
              label="Address Line 2"
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
              label="Postcode"
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOn />
                  </InputAdornment>
                ),
              }}
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
}
