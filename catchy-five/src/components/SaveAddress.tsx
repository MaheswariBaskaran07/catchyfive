import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Divider,
  Button,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useAddress } from '../components/AddressContext';
import { useNavigate } from 'react-router-dom';

const SaveAddress = () => {
  const { addresses, deleteAddress } = useAddress();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      minHeight="100vh"
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

      {/* Main Content */}
      <Paper
        elevation={6}
        sx={{
          p: 4,
          maxWidth: 600,
          width: '100%',
          borderRadius: 4,
          bgcolor: 'white',
          zIndex: 1,
        }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          gutterBottom
          textAlign="center"
          sx={{
            background: 'linear-gradient(to right, #56ab2f, #a8e063)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Saved Addresses
        </Typography>

        {addresses.length === 0 && (
          <Typography textAlign="center" color="gray" mt={4}>
            No addresses saved yet.
          </Typography>
        )}

        <Stack spacing={4}>
          {addresses.map((address) => (
            <Box
              key={address.id}
              sx={{
                border: '1px solid #ccc',
                borderRadius: 2,
                p: 3,
                position: 'relative',
                boxShadow: 1,
              }}
            >
              <Typography><strong>Full Name:</strong> {address.name}</Typography>
              <Typography><strong>Phone:</strong> {address.phone}</Typography>
              <Typography><strong>Address Line 1:</strong> {address.line1}</Typography>
              <Typography><strong>City:</strong> {address.city}</Typography>
              <Typography><strong>State:</strong> {address.state}</Typography>
              <Typography><strong>Postal Code:</strong> {address.postalCode}</Typography>
              <Typography><strong>Country:</strong> {address.country}</Typography>

              <Stack
                direction={isMobile ? 'column' : 'row'}
                spacing={2}
                mt={3}
                justifyContent="flex-end"
              >
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => navigate(`/add-address/${address.id}`)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => deleteAddress(address.id)}
                >
                  Delete
                </Button>
              </Stack>
            </Box>
          ))}
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Button
          variant="contained"
          fullWidth
          onClick={() => navigate('/add-address')}
          sx={{
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #56ab2f, #a8e063)',
            textTransform: 'none',
            '&:hover': {
              background: 'linear-gradient(to right, #43e97b, #38f9d7)',
            },
          }}
        >
          Add New Address
        </Button>
      </Paper>
    </Box>
  );
};

export default SaveAddress;
