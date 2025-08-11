import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Divider,
  Button,
  Stack,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from '@mui/material';
import { useAddress } from '../components/AddressContext';
import { useNavigate } from 'react-router-dom';
import { LocalShipping } from '@mui/icons-material';


const DeliveryInfoPage = () => {
  const { addresses, deleteAddress } = useAddress();
  const navigate = useNavigate();

  // Track selected address id
  const [selectedId, setSelectedId] = useState<string | null>(
    addresses.length > 0 ? addresses[0].id : null
  );

  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedId(event.target.value);
  };

  const handleConfirm = () => {
    if (!selectedId) {
      alert('Please select an address!');
      return;
    }
    // For example, navigate to checkout or pass selected address to next step
    alert('Delivery address confirmed!');
    // navigate('/checkout'); // or any other route
  };

  return (
    <Box
      minHeight="90vh"
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      pt={{ xs: 10, md: 12 }}
      px={2}
      sx={{
        background: 'linear-gradient(to right, #d4fc79, #96e6a1)',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          maxWidth: 600,
          width: '100%',
          borderRadius: 4,
          bgcolor: 'white',
          mt: 2,
        }}
      >
        <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
  <LocalShipping sx={{ fontSize: 32, color: '#56ab2f', mr: 1 }} />
  <Typography
    variant="h4"
    fontWeight={700}
    sx={{
      background: 'linear-gradient(to right, #56ab2f, #a8e063)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    }}
  >
    Select Delivery Address
  </Typography>
</Box>


        {addresses.length === 0 ? (
          <Typography textAlign="center" color="gray" mt={4}>
            No delivery address added.
          </Typography>
        ) : (
          <FormControl component="fieldset" fullWidth>
            <RadioGroup value={selectedId} onChange={handleSelect}>
              <Stack spacing={3}>
                {addresses.map((address) => (
                  <Box
                    key={address.id}
                    sx={{
                      border: '1px solid #ccc',
                      borderRadius: 2,
                      p: 2,
                      boxShadow: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <FormControlLabel
                      value={address.id}
                      control={<Radio />}
                      label={
                        <Box>
                          <Typography><strong>{address.name}</strong></Typography>
                          <Typography>{address.line1}, {address.city}, {address.state}</Typography>
                          <Typography>{address.postalCode}, {address.country}</Typography>
                          <Typography>Phone: {address.phone}</Typography>
                        </Box>
                      }
                    />

                    <Stack spacing={1} direction="row">
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => navigate(`/add-address/${address.id}`)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => deleteAddress(address.id)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </RadioGroup>

            <Divider sx={{ my: 3 }} />

            <Button
              variant="contained"
              fullWidth
              onClick={handleConfirm}
              sx={{
                fontWeight: 'bold',
                background: 'linear-gradient(to right, #56ab2f, #a8e063)',
                textTransform: 'none',
                '&:hover': {
                  background: 'linear-gradient(to right, #43e97b, #38f9d7)',
                },
              }}
            >
              Confirm Delivery Address
            </Button>
          </FormControl>
        )}

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

export default DeliveryInfoPage;
