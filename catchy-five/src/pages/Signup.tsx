import { Box, Button, TextField, Typography, InputAdornment } from '@mui/material';
import { Person, Email, Lock, Phone } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Signup() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Save user data to localStorage
    const userData = {
      name,
      email,
      phone,
    };
    localStorage.setItem('userProfile', JSON.stringify(userData));

    setSuccess(true);
    setTimeout(() => navigate('/login'), 2000);
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      px={2}
      sx={{
        position: 'relative',
        background: 'linear-gradient(to right, #a8e6a3, #b8f1b1)',
        fontFamily: "'Poppins', sans-serif",
        overflow: 'hidden',
      }}
    >
      {/* 🌿 Top Left Decorative Image */}
      <Box
        component="img"
        src="/leaf.jpg"
        alt="Leaf Decoration"
        sx={{
          position: 'absolute',
          top: { xs: 10, sm: 30 },
          left: { xs: 10, sm: 30 },
          width: { xs: 200, sm: 200 },
          opacity: 0.9,
          zIndex: 0,
          margin: 10,
        }}
      />

      {/* 🧺 Bottom Right Decorative Image */}
      <Box
        component="img"
        src="/basket.jpg"
        alt="Basket Decoration"
        sx={{
          position: 'absolute',
          bottom: { xs: 10, sm: 30 },
          right: { xs: 10, sm: 30 },
          width: { xs: 200, sm: 200 },
          opacity: 0.9,
          zIndex: 0,
          margin: 10,
        }}
      />

      {/* 📝 Signup Form */}
      <Box
        width="100%"
        maxWidth={{ xs: '100%', sm: '460px' }}
        bgcolor="white"
        boxShadow={6}
        borderRadius={3}
        p={{ xs: 3, sm: 4 }}
        textAlign="center"
        zIndex={2}
        sx={{ mx: 'auto' }}
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
          Join Organic Mart
        </Typography>

        <Typography variant="subtitle1" color="textSecondary" mb={3}>
          Sign up and start shopping fresh 🍓
        </Typography>

        {success ? (
          <Typography sx={{ color: 'green', fontWeight: 600, mb: 2 }}>
            ✅ Signup successful! Redirecting...
          </Typography>
        ) : (
          <Box
            component="form"
            onSubmit={handleSubmit}
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <TextField
              label="Full Name"
              required
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              required
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Email"
              type="email"
              required
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Password"
              type="password"
              required
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="success"
              sx={{
                mt: 1,
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
  );
}
