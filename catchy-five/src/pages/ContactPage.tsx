import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
  Paper,
} from '@mui/material';

const ContactPage: React.FC = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // integrate emailjs or backend API
    console.log('Form Submitted:', form);
    alert('Thanks for contacting us!');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <Box sx={{ py: 5, px: 2 }}>
      <Box className="container">
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" mb={4}>
          We’d love to hear from you. Fill out the form below or reach out via our contact info.
        </Typography>

        <Grid container spacing={4}>
          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      multiline
                      rows={5}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{
                        bgcolor: '#4CAF50',
                        fontWeight: 600,
                        textTransform: 'none',
                        '&:hover': { bgcolor: '#388e3c' },
                      }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                bgcolor: isSm ? 'transparent' : '#f5f5f5',
                p: 3,
                borderRadius: 2,
                height: '100%',
              }}
            >
              <Box>
                <Typography variant="h6" fontWeight={600}>
                  Address
                </Typography>
                <Typography color="text.secondary">
                  123 Green Street, Organic Town,<br />Nature City, 560001
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6" fontWeight={600}>
                  Phone
                </Typography>
                <Typography color="text.secondary">
                  +91 98765 43210
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6" fontWeight={600}>
                  Email
                </Typography>
                <Typography color="text.secondary">
                  support@organicmart.com
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ContactPage;
