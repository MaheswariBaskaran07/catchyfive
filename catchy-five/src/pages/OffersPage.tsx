import React from 'react';
import {
  Box,
  Typography,
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
    description: 'Use code ORGANIC10 during checkout. Valid for new users only.',
    code: 'ORGANIC10',
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
    <Box sx={{ py: 5, px: { xs: 2, sm: 4, md: 6 } }}>
      <div className="container">
        <Typography
          variant="h4"
          fontWeight={700}
          gutterBottom
          sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}
        >
          <DiscountIcon sx={{ color: '#4CAF50', fontSize: 32 }} />
          Exclusive Offers for You
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" mb={4}>
          Save more on your organic grocery orders. Check out our latest deals.
        </Typography>

        <div
          className="row g-4"
          style={{ display: 'flex', flexWrap: 'wrap', marginLeft: '-1rem', marginRight: '-1rem' }}
        >
          {offers.map((offer, index) => (
            <div
              key={index}
              className="col-12 col-sm-6 col-lg-4"
              style={{
                display: 'flex',
                flexDirection: 'column',
                paddingLeft: '1rem',
                paddingRight: '1rem',
                marginBottom: '1rem',
              }}
            >
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  transition: 'transform 0.3s',
                  '&:hover': { transform: 'scale(1.03)' },
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: 3,
                }}
              >
                <CardMedia
                  component="img"
                  image={offer.image}
                  alt={offer.title}
                  sx={{
                    width: '100%',
                    height: 350, // full visible height - adjust as needed
                    objectFit: 'cover', // fills entire box, cropping if needed
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                    flexShrink: 0,
                  }}
                />

                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box>
                    <Typography variant="h6" fontWeight={600}>
                      {offer.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ my: 1 }}>
                      {offer.description}
                    </Typography>

                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      mt={2}
                      flexWrap="wrap"
                      gap={1}
                    >
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
            </div>
          ))}
        </div>
      </div>
    </Box>
  );
};

export default OffersPage;
