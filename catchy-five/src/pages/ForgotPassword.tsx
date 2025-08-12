import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  useMediaQuery,
} from '@mui/material';
import { Email, LockReset } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    setSubmitted(true);
    setTimeout(() => {
      navigate('/login');
    }, 3000);
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      px={2}
      sx={{
        background: 'linear-gradient(to right, #a8e6a3, #b8f1b1)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 🍃 Leaf Image - only on desktop */}
      {!isMobile && (
        <Box
          component="img"
          src="/organic1.jpg"
          alt="Leaf Decoration"
          sx={{
            position: 'absolute',
            top: 30,
            left: 30,
            width: 200,
            opacity: 0.8,
            zIndex: 0,
          }}
        />
      )}

      {/* 🧺 Basket Image - only on desktop */}
      {!isMobile && (
        <Box
          component="img"
          src="/basket.jpg"
          alt="Basket Decoration"
          sx={{
            position: 'absolute',
            bottom: 30,
            right: 30,
            width: 200,
            opacity: 0.8,
            zIndex: 0,
          }}
        />
      )}

      <Paper
        elevation={4}
        sx={{
          zIndex: 2,
          width: '100%',
          maxWidth: 460,
          borderRadius: 3,
          p: { xs: 3, sm: 4 },
          textAlign: 'center',
        }}
      >
        {/* 🔐 Heading with Icon */}
        <Box display="flex" justifyContent="center" alignItems="center" gap={1} mb={1}>
          <LockReset sx={{ fontSize: 32, color: '#4CAF50' }} />
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{
              background: 'linear-gradient(90deg, #00b09b, #96c93d)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Forgot Password
          </Typography>
        </Box>

        <Typography variant="subtitle1" color="textSecondary" mb={3}>
          Enter your email to receive password reset instructions.
        </Typography>

        {submitted ? (
          <Typography sx={{ color: 'green', fontWeight: 600 }}>
            ✅ Reset link sent to your email!
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
              label="Email Address"
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
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
              Send Reset Link
            </Button>

            <Typography variant="body2" mt={2}>
              Remember your password?{' '}
              <Box
                component="span"
                onClick={() => navigate('/login')}
                sx={{ color: '#00b09b', fontWeight: 600, cursor: 'pointer' }}
              >
                Login
              </Box>
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
