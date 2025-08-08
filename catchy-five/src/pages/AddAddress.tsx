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
        background: 'linear-gradient(to right, #d4fc79, #3df355ff)',
        fontFamily: "'Poppins', sans-serif",
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top Left Decorative Image - hidden on xs */}
      <Box
        component="img"
        src="/grocery1.jpg"
        alt="groceries"
        sx={{
          position: 'absolute',
          top: 30,
          left: 30,
          width: { sm: 150, md: 180 },
          display: { xs: 'none', sm: 'block' }, // ✅ hidden on small screens
          opacity: 0.8,
          zIndex: 0,
          borderRadius: 2,
          animation: 'fadeIn 1s ease-in-out',
          '@keyframes fadeIn': {
            '0%': { opacity: 0 },
            '100%': { opacity: 0.8 },
          },
        }}
      />

      {/* Bottom Right Decorative Image - hidden on xs */}
      <Box
        component="img"
        src="/grocery2.jpg"
        alt="groceries"
        sx={{
          position: 'absolute',
          bottom: 30,
          right: 30,
          width: { sm: 150, md: 180 },
          display: { xs: 'none', sm: 'block' }, // ✅ hidden on small screens
          opacity: 0.8,
          zIndex: 0,
          borderRadius: 2,
          animation: 'fadeIn 1s ease-in-out',
        }}
      />

      {/* Form Card */}
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
            fontSize: { xs: '1.8rem', sm: '2.2rem' },
            background: 'linear-gradient(to right, #56ab2f, #a8e063)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Add Address
        </Typography>

        <Typography
          variant="subtitle1"
          color="text.secondary"
          mb={3}
          sx={{
            fontSize: { xs: '0.9rem', sm: '1rem' },
          }}
        >
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
