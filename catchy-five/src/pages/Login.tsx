import { Box, Button, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import groceriesImg from '../assets/groceries.jpg';
import { useState, useEffect } from 'react';

// Import custom font
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email && password) {
      navigate('/');
    }
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        background: 'linear-gradient(135deg, #f0db7dff, #cce658ff)',
        fontFamily: "'Poppins', sans-serif",
        animation: 'fadeIn 1.5s ease-in-out',
        '@keyframes fadeIn': {
          from: { opacity: 0 },
          to: { opacity: 1 }
        }
      }}
    >
      <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        bgcolor="rgba(5, 90, 57, 0.7)"
        borderRadius={4}
        p={{ xs: 3, md: 5 }}
        width="95%"
        maxWidth="900px"
        boxShadow={10}
        gap={4}
        sx={{
          transform: 'translateY(0)',
          transition: 'transform 0.4s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
          }
        }}
      >
        {/* Image Section */}
        <Box
          flex={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <img
            src={groceriesImg}
            alt="Groceries"
            style={{
              width: '100%',
              maxWidth: '280px',
              borderRadius: '12px',
              objectFit: 'cover',
              boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
            }}
          />
        </Box>

        {/* Form Section */}
        <Box flex={2} color="white">
          <Typography
            variant="h3"
            fontWeight="bold"
            mb={1}
            sx={{
              color: '#00FFB3',
              textShadow: '1px 1px 4px black'
            }}
          >
            Catchy<span style={{ color: '#ffffff' }}>Five</span>
          </Typography>

          <Typography variant="h5" mb={1}>
            Welcome Back!
          </Typography>

          <Typography variant="body2" mb={3}>
            Don’t have an account?{' '}
            <Link
              to="/signup"
              style={{
                color: '#00c6ff',
                textDecoration: 'underline',
                fontWeight: '600'
              }}
            >
              Create Account
            </Link>
          </Typography>
            
            
  <Typography
    variant="h6"
    mb={2}
    sx={{
      color: '#ffffff',
      fontWeight: '600',
      textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
    }}
  >
    Login
  </Typography>
      <TextField
  fullWidth
  label="Email Address"
  margin="normal"
  variant="outlined"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  InputLabelProps={{
    shrink: true,
    sx: {
      color: 'white',
      '&.Mui-focused': {
        color: '#2bbee7ff',
      },
    },
  }}
  InputProps={{
    sx: {
      color: 'white',
      backgroundColor: 'rgba(255,255,255,0.08)',
      paddingTop: '8px', 
    },
  }}
  sx={{
    '& .MuiOutlinedInput-root': {
      '& input': {
        paddingTop: '20px', 
      },
      '& fieldset': {
        borderColor: '#ccc',
      },
      '&:hover fieldset': {
        borderColor: '#00c6ff',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#00c6ff',
      },
    },
  }}
/>

         

         <TextField
  fullWidth
  label="Password"
  type="password"
  margin="normal"
  variant="outlined"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  InputLabelProps={{
    shrink: true,
    sx: {
      color: 'white',
      '&.Mui-focused': {
        color: '#28c8f0ff',
      },
    },
  }}
  InputProps={{
    style: {
      color: 'white',
    },
  }}
  sx={{
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
       paddingTop: '8px',
      '& input': {
        color: 'white',
      },
      '& fieldset': {
        borderColor: 'whitesmoke',
      },
      '&:hover fieldset': {
        borderColor: '#00c6ff',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#00c6ff',
      },
    },
  }}
/>

  


         

          <Typography variant="body2" color="white" mt={1} mb={2}>
            <Link
              to="/forgot-password"
              style={{ color: '#00c6ff', textDecoration: 'underline' }}
            >
              Forgot Password?
            </Link>
          </Typography>

          <Button
            fullWidth
            variant="contained"
            color="success"
            sx={{
              mt: 1,
              py: 1.5,
              fontWeight: 'bold',
              fontSize: '1rem',
              textTransform: 'none',
              background: 'linear-gradient(to right, #00b09b, #96c93d)',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                background: 'linear-gradient(to right, #11998e, #38ef7d)'
              }
            }}
            onClick={handleLogin}
          >
            Login
          </Button>

          <Button
            fullWidth
            variant="outlined"
            onClick={handleSignUp}
            sx={{
              mt: 2,
              py: 1.5,
              fontWeight: 'bold',
              color: 'white',
              borderColor: 'white',
              textTransform: 'none',
              '&:hover': {
                borderColor: '#00c6ff',
                color: '#00c6ff',
              }
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
