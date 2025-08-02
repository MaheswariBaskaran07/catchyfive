import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Paper,
  InputAdornment,
  IconButton,
  CircularProgress,
} from '@mui/material';
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  } from '@mui/icons-material';
import SpaIcon from '@mui/icons-material/Spa'; 

import { Link, useNavigate } from 'react-router-dom';
import groceriesImg from '../assets/groceries.jpg';

export default function Login() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!email || !password) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 1000);
  };

  return (
    <Box
      sx={{
        minHeight: '90vh',
        bgcolor: '#f9f9f9',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        px: 2,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 180,
          height: 180,
          backgroundImage: "url('/assets/leaves-top-right.svg')",
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          opacity: 0.07,
          zIndex: 0,
        }}
      />

      <Paper
        elevation={3}
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          width: '100%',
          maxWidth: 900,
          borderRadius: 4,
          overflow: 'hidden',
          animation: 'fadeInUp 0.6s ease-in-out',
          '@keyframes fadeInUp': {
            '0%': { opacity: 0, transform: 'translateY(20px)' },
            '100%': { opacity: 1, transform: 'translateY(0)' },
          },
        }}
      >
        {/* Left image */}
        <Box
          flex={1}
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#e8f5e9',
            p: 3,
          }}
        >
          <img
            src={groceriesImg}
            alt="Groceries"
            style={{
              width: '100%',
              maxWidth: 260,
              height: isMobile ? 180 : 260,
              borderRadius: 12,
              objectFit: 'cover',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s',
            }}
          />
        </Box>

        {/* Right side form */}
        <Box flex={1.2} p={{ xs: 3, md: 4 }} display="flex" flexDirection="column" gap={2}>
          {/* 👇 Grocery Icon with Heading */}
          <Box display="flex" alignItems="center" gap={1}>
  <SpaIcon sx={{ fontSize: 32, color: '#4CAF50' }} />
  <Typography variant="h4" color="#4CAF50" fontWeight={700}>
    Welcome Back
  </Typography>
</Box>


          <Typography variant="body1" color="text.secondary">
            Login to your CatchyFive account to start shopping fresh!
          </Typography>

          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            size="medium"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email color="action" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            size="medium"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((s) => !s)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box textAlign="right" mb={1}>
            <Link
              to="/forgot-password"
              style={{ fontSize: 14, color: '#388e3c', textDecoration: 'underline' }}
            >
              Forgot password?
            </Link>
          </Box>

          <Button
            fullWidth
            variant="contained"
            sx={{
              py: 1.3,
              fontWeight: 'bold',
              fontSize: '1rem',
              backgroundColor: '#4CAF50',
              '&:hover': { backgroundColor: '#388e3c' },
            }}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </Button>

          <Typography variant="body2" color="text.secondary" textAlign="center">
            Don’t have an account?{' '}
            <Link to="/signup" style={{ color: '#4CAF50', fontWeight: 600 }}>
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
