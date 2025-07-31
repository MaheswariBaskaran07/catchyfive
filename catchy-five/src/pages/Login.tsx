import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import groceriesImg from '../assets/groceries.jpg';
import { useState } from 'react';


const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

export default function Login() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
        background: 'linear-gradient(135deg, #e0f0ff, #a0c4ff)',
        fontFamily: "'Poppins', sans-serif",
        px: 2,
        animation: 'fadeIn 1.2s ease-in-out',
        '@keyframes fadeIn': {
          from: { opacity: 0 },
          to: { opacity: 1 }
        }
      }}
    >
      <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        bgcolor="rgba(0, 0, 0, 0.72)"
        borderRadius={3}
        p={{ xs: 2, md: 3 }}
        width="100%"
        maxWidth="700px"
        boxShadow={6}
        gap={3}
        sx={{
          transform: 'translateY(0)',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-3px)',
          }
        }}
      >
        {/* Left: Image */}
        <Box
          flex={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
          mb={{ xs: 2, md: 0 }}
        >
          <img
            src={groceriesImg}
            alt="Groceries"
            style={{
              width: '100%',
              maxWidth: isMobile ? '180px' : '220px',
              borderRadius: '10px',
              objectFit: 'cover',
              boxShadow: '0 3px 15px rgba(0,0,0,0.35)'
            }}
          />
        </Box>

        {/* Right: Form */}
        <Box flex={2} color="white">
          <Typography
            variant="h4"
            fontWeight={700}
            mb={1}
            sx={{
              color: '#00FFB3',
              textShadow: '1px 1px 4px black',
              fontSize: { xs: '1.6rem', md: '2rem' }
            }}
          >
            Catchy<span style={{ color: '#ffffff' }}>Five</span>
          </Typography>

          <Typography variant="h6" mb={1} sx={{ fontWeight: 500 }}>
            Welcome Back!
          </Typography>

          <Typography variant="body2" mb={2} sx={{ fontSize: '0.9rem' }}>
            Don’t have an account?{' '}
            <Link
              to="/signup"
              style={{
                color: '#00c6ff',
                textDecoration: 'underline',
                fontWeight: 600
              }}
            >
              Create Account
            </Link>
          </Typography>

          <Typography
            variant="subtitle1"
            mb={1.5}
            sx={{
              color: '#ffffff',
              fontWeight: 600,
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
            }}
          >
            Login
          </Typography>

          {/* Email Field */}
          <TextField
            fullWidth
            label="Email Address"
            margin="dense"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{
              shrink: true,
              sx: {
                color: 'white',
                fontSize: '0.85rem',
                '&.Mui-focused': {
                  color: '#2bbee7ff',
                },
              },
            }}
            InputProps={{
              sx: {
                color: 'white',
                backgroundColor: 'rgba(255,255,255,0.07)',
                fontSize: '0.9rem',
              },
            }}
            sx={{
              mb: 1.5,
              '& .MuiOutlinedInput-root': {
                '& input': {
                  paddingTop: '18px',
                },
                '& fieldset': {
                  borderColor: '#bbb',
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

          {/* Password Field */}
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="dense"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{
              shrink: true,
              sx: {
                color: 'white',
                fontSize: '0.85rem',
                '&.Mui-focused': {
                  color: '#28c8f0ff',
                },
              },
            }}
            InputProps={{
              sx: {
                color: 'white',
                backgroundColor: 'rgba(255,255,255,0.07)',
                fontSize: '0.9rem',
              },
            }}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                '& input': {
                  paddingTop: '18px',
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

          <Typography variant="body2" color="white" mt={-1} mb={2} sx={{ fontSize: '0.9rem' }}>
            <Link
              to="/forgot-password"
              style={{ color: '#00c6ff', textDecoration: 'underline' }}
            >
              Forgot Password?
            </Link>
          </Typography>

          {/* Login Button */}
          <Button
            fullWidth
            variant="contained"
            color="success"
            sx={{
              py: 1.25,
              fontWeight: 'bold',
              fontSize: '0.95rem',
              textTransform: 'none',
              background: 'linear-gradient(to right, #00b09b, #96c93d)',
              '&:hover': {
                background: 'linear-gradient(to right, #11998e, #38ef7d)'
              }
            }}
            onClick={handleLogin}
          >
            Login
          </Button>

          {/* Sign Up Button */}
          <Button
            fullWidth
            variant="outlined"
            onClick={handleSignUp}
            sx={{
              mt: 1.75,
              py: 1.25,
              fontWeight: 'bold',
              color: 'white',
              borderColor: 'white',
              textTransform: 'none',
              fontSize: '0.95rem',
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
