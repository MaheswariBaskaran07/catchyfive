import React from 'react';
import {
  Box,
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Container,
  TextField,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useCartContext } from '../components/CartContext';

export default function HomePage() {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));

  const categories = [
    { id: 1, title: 'Fruits & Veggies', img: '/fruits.jpg' },
    { id: 2, title: 'Dairy & Eggs', img: '/dairy.jpg' },
    { id: 3, title: 'Bakery & Snacks', img: '/bakery.jpg' },
    { id: 4, title: 'Beverages', img: '/beverages.jpg' },
    { id: 5, title: 'Meat & Seafood', img: '/meat.jpg' },
    { id: 6, title: 'Frozen Foods', img: '/frozen.jpg' },
    { id: 7, title: 'Pantry Staples', img: '/pantry.jpg' },
    { id: 8, title: 'Household Essentials', img: '/household.jpg' },
    { id: 9, title: 'Baby Care', img: '/baby.jpg' },
    { id: 10, title: 'Personal Care', img: '/personalcare.jpg' },
    { id: 11, title: 'Pet Supplies', img: '/pet.jpg' },
    { id: 12, title: 'International Foods', img: '/international.jpg' },
  ];
  const testimonials = [
    { id: 1, name: 'Anjali', review: 'Amazing service & fresh produce every time.' },
    { id: 2, name: 'Rahul', review: 'Easy ordering and quick delivery.' },
    { id: 3, name: 'Sheela', review: 'Best local organic grocery source!' },
  ];
  const frequentlyBought = [
    { id: 1, name: 'Tomatoes (1kg)', img: '/tomatoes.jpg', price: 30 },
    { id: 2, name: 'Amul Milk 1L', img: '/milk.jpg', price: 60 },
    { id: 3, name: 'Brown Bread', img: '/bread.jpg', price: 50 },
    { id: 4, name: 'Potatoes (1kg)', img: '/potatoes.jpg', price: 25 },
    { id: 5, name: 'Sunflower Oil 1L', img: '/oil.jpg', price: 110 },
    { id: 6, name: 'Parle-G Biscuits', img: '/biscuits.jpg', price: 10 },
  ];
  const { addToCart, addToWishlist } = useCartContext();

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, fontFamily: theme.typography.fontFamily }}>
      {/* Hero */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.success.main})`,
          color: 'white',
          py: { xs: 6, md: 10 },
          px: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant={isSm ? 'h4' : 'h2'} fontWeight={700} mb={2}>
          Fresh Groceries, Delivered to Your Doorstep
        </Typography>
        <Typography variant={isSm ? 'subtitle1' : 'h5'} mb={4}>
          Organic, affordable, & always fresh. Welcome to CatchyFive.
        </Typography>
        <Button
          variant="contained"
          size="large"
          component={Link}
          to="/signup"
          sx={{
            background: 'white',
            color: theme.palette.primary.main,
            fontWeight: 600,
            textTransform: 'none',
            px: 4,
            py: 1,
            '&:hover': { background: '#f0f0f0' },
          }}
        >
          Get Started
        </Button>
      </Box>

      {/* Categories */}
      <Container sx={{ py: { xs: 4, md: 6 } }}>
        <Typography variant="h4" fontWeight={600} mb={4} textAlign="center">
          Explore Categories
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2,1fr)',
              md: 'repeat(4,1fr)',
            },
            gap: 3,
          }}
        >
          {categories.map((cat) => (
            <Card
              key={cat.id}
              sx={{
                cursor: 'pointer',
                transition: 'transform .2s',
                '&:hover': { transform: 'scale(1.03)' },
              }}
            >
              <CardMedia component="img" height="160" image={cat.img} alt={cat.title} />
              <CardContent>
                <Typography variant="h6" fontWeight={500} textAlign="center">
                  {cat.title}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>

      {/* Frequently Bought */}
      <Container sx={{ py: { xs: 4, md: 6 } }}>
        <Typography variant="h4" fontWeight={600} mb={4} textAlign="center">
          Frequently Bought
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2,1fr)',
              md: 'repeat(4,1fr)',
            },
            gap: 3,
          }}
        >
          {frequentlyBought.map((item) => (
            <Card
              key={item.id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform .2s',
                '&:hover': { transform: 'scale(1.02)' },
              }}
            >
              <CardMedia component="img" height="140" image={item.img} alt={item.name} />
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  {item.name}
                </Typography>
                <Typography color="textSecondary" mb={2}>
                  ₹{item.price}
                </Typography>
                <Box display="flex" gap={1}>
                  <Button
                    onClick={() => addToCart(item)}
                    variant="contained"
                    size="small"
                    fullWidth
                    sx={{ textTransform: 'none', fontWeight: 600 }}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    onClick={() => addToWishlist(item)}
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{
                      textTransform: 'none',
                      borderColor: theme.palette.primary.main,
                      color: theme.palette.primary.main,
                      '&:hover': {
                        background: theme.palette.primary.light + '20',
                        borderColor: theme.palette.primary.main,
                      },
                      fontWeight: 600,
                    }}
                  >
                    ❤️ Wishlist
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>

      {/* How It Works */}
      <Box sx={{ py: { xs: 4, md: 6 }, bgcolor: theme.palette.success.light }}>
        <Container>
          <Typography variant="h4" fontWeight={600} mb={4} textAlign="center">
            How It Works
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'center', gap: 3 }}>
            {[
              { step: '1', title: 'Browse Products', description: 'Explore categories & add to cart.' },
              { step: '2', title: 'Secure Checkout', description: 'Easy payment & confirmation.' },
              { step: '3', title: 'Fast Delivery', description: 'Order delivered in 1–2 hours.' },
            ].map((item) => (
              <Box key={item.step} sx={{ textAlign: 'center', flex: 1, px: 2 }}>
                <Typography variant="h3" fontWeight={700} color="primary.main">
                  {item.step}
                </Typography>
                <Typography variant="h6" fontWeight={600} mt={1} mb={1}>
                  {item.title}
                </Typography>
                <Typography color="textSecondary">{item.description}</Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Testimonials */}
      <Container sx={{ py: { xs: 4, md: 6 } }}>
        <Typography variant="h4" fontWeight={600} mb={4} textAlign="center">
          What Our Customers Say
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3,1fr)' }, gap: 3 }}>
          {testimonials.map((t) => (
            <Card key={t.id} sx={{ p: 3, textAlign: 'center', bgcolor: theme.palette.background.paper }}>
              <Typography variant="body1" mb={2}>
                "{t.review}"
              </Typography>
              <Typography fontWeight={600}>— {t.name}</Typography>
            </Card>
          ))}
        </Box>
      </Container>

      {/* Footer */}
      <Box sx={{ bgcolor: theme.palette.primary.dark, color: 'white', py: { xs: 4, md: 6 } }}>
        <Container>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 3,
            }}
          >
            <Box flex={1}>
              <Typography variant="h6" fontWeight={600} mb={1}>
                CatchyFive
              </Typography>
              <Typography>Organic groceries delivered fresh.</Typography>
            </Box>
            <Box flex="none">
              <Typography fontWeight={600}>Links</Typography>
              {['Home', 'About', 'Contact', 'Privacy'].map((link) => (
                <Typography
                  key={link}
                  component={Link}
                  to={`/${link.toLowerCase()}`}
                  sx={{
                    color: 'white',
                    textDecoration: 'none',
                    mt: 0.5,
                    display: 'block'
                  }}
                >
                  {link}
                </Typography>
              ))}
            </Box>
            <Box flex="none">
              <Typography fontWeight={600}>Follow Us</Typography>
              {['Instagram', 'Facebook', 'Twitter'].map((s) => (
                <Typography key={s} sx={{ mt: 0.5 }}>
                  {s}
                </Typography>
              ))}
            </Box>
            <Box flex={1}>
              <Typography fontWeight={600}>Subscribe to Newsletter</Typography>
              <Box component="form" mt={1} sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  placeholder="Your email"
                  variant="filled"
                  size="small"
                  sx={{
                    bgcolor: 'white',
                    borderRadius: 1,
                    flex: 1,
                  }}
                />
                <Button variant="contained" color="secondary" sx={{ textTransform: 'none', fontWeight: 600 }}>
                  Subscribe
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
