import { Box, Button, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import groceriesImg from '../assets/catchyfive2.jpg'; // groceries image

export default function Signup() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => navigate('/login'), 2000);
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        background: 'linear-gradient(to right, #aef3cfff, #c6dee4ff)',
        fontFamily: "'Poppins', sans-serif",
        px: 2,
        py: 4,
      }}
    >
      <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        width="100%"
        maxWidth="1100px"
        bgcolor="white"
        borderRadius={4}
        overflow="hidden"
        boxShadow={6}
      >
        {/* LEFT SIDE: Visual Panel */}
        <Box
          flex={1}
          sx={{
            backgroundColor: 'greenyellow',
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h4"
            fontWeight={700}
            mb={2}
            color="#2e7d32"
          >
            Welcome to CatchyFive
          </Typography>
          <Typography variant="subtitle1" mb={3} color="textSecondary">
            Your trusted organic grocery partner 🍎
          </Typography>

          <img
            src="/logo1.gif"
            alt="Store animation"
            style={{
              width: '65%',
              maxWidth: '200px',
              marginBottom: '20px',
            }}
          />

          <img
            src={groceriesImg}
            alt="Groceries"
            style={{
              width: '100%',
              maxWidth: '240px',
              borderRadius: '12px',
              objectFit: 'cover',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            }}
          />
        </Box>

        {/* RIGHT SIDE: Form */}
        <Box
          flex={1.5}
          sx={{ p: { xs: 3, md: 5 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{
              mb: 1,
              background: 'linear-gradient(90deg, #00b09b, #96c93d)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Create Your Account
          </Typography>

          <Typography variant="subtitle1" color="textSecondary" mb={3}>
            Sign up to start shopping with CatchyFive.
          </Typography>

          {success && (
            <Typography sx={{ color: 'green', fontWeight: 600, mb: 2 }}>
              ✅ Signup successful! Redirecting to login...
            </Typography>
          )}

          {!success && (
            <Box component="form" onSubmit={handleSubmit}>
              <TextField label="Full Name" fullWidth required margin="dense" />
              <TextField label="Phone Number" fullWidth required margin="dense" />
              <TextField label="Email" fullWidth required type="email" margin="dense" />
              <TextField label="Password" fullWidth required type="password" margin="dense" />
              <TextField label="Address Line 1" fullWidth margin="dense" />
              <TextField label="Address Line 2" fullWidth margin="dense" />
              <TextField label="Postcode" fullWidth margin="dense" />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="success"
                sx={{
                  mt: 3,
                  py: 1.3,
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  background: 'linear-gradient(to right, #00b09b, #96c93d)',
                  '&:hover': {
                    background: 'linear-gradient(to right, #11998e, #38ef7d)',
                  },
                }}
              >
                Sign Up
              </Button>

              <Typography mt={2}>
                Already registered?{' '}
                <Link to="/login" style={{ color: '#00b09b', fontWeight: 600 }}>
                  Login
                </Link>
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
