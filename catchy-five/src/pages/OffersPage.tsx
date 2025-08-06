import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import DiscountIcon from '@mui/icons-material/Discount';

const offers = [
  {
    title: '10% OFF on First Order',
    description: 'Use code CATCHY10 during checkout. Valid for new users only.',
    code: 'CATCHY10',
    image: '/offer1.png',
    expires: 'Aug 31, 2025',
  },
  {
    title: 'Buy 1 Get 1 Free on Organic Fruits',
    description: 'Limited-time deal on selected fruits. While stock lasts.',
    code: 'BOGOFRUIT',
    image: '/offer2.png',
    expires: 'Aug 15, 2025',
  },
  {
    title: 'Free Delivery on Orders above $80',
    description: 'Enjoy free delivery without any code. Applied automatically.',
    code: 'AUTOAPPLY',
    image: '/offer3.png',
    expires: 'Sept 10, 2025',
  },
];

const OffersPage: React.FC = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ py: 5, px: 2 }}>
      <div className="container">
        <Typography variant="h4" fontWeight={700} gutterBottom>
          <DiscountIcon sx={{ verticalAlign: 'middle', mr: 1, color: '#4CAF50' }} />
          Exclusive Offers for You
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" mb={4}>
          Save more on your organic grocery orders. Check out our latest deals.
        </Typography>

        <Grid container spacing={4}>
          {offers.map((offer, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  transition: 'transform 0.3s',
                  '&:hover': { transform: 'scale(1.03)' },
                  borderRadius: 3,
                  overflow: 'hidden',
                }}
              >
                {/* ✅ Improved image handling with CardMedia */}
                <CardMedia
                  component="img"
                  image={offer.image}
                  alt={offer.title}
                  sx={{
                    height: 400,
                    width: '100%',
                    objectFit: 'cover',
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                  }}
                />

                <CardContent>
                  <Typography variant="h6" fontWeight={600}>
                    {offer.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ my: 1 }}>
                    {offer.description}
                  </Typography>

                  <Box display="flex" alignItems="center" justifyContent="space-between" mt={2} flexWrap="wrap" gap={1}>
                    <Chip
                      icon={<LocalOfferIcon />}
                      label={offer.code}
                      color="success"
                      sx={{ fontWeight: 600 }}
                    />
                    <Typography variant="caption" color="error">
                      Expires: {offer.expires}
                    </Typography>
                  </Box>

                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{
                      mt: 2,
                      textTransform: 'none',
                      fontWeight: 600,
                      color: '#4CAF50',
                      borderColor: '#4CAF50',
                      '&:hover': {
                        color: '#388e3c',
                        borderColor: '#388e3c',
                        backgroundColor: '#e8f5e9',
                      },
                    }}
                    onClick={() => {
                      navigator.clipboard.writeText(offer.code);
                    }}
                  >
                    Copy Code
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Box>
  );
};

export default OffersPage;
