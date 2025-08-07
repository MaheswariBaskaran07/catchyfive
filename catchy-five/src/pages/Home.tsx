import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
  TextField,
  useTheme,
  useMediaQuery,
  Link as MuiLink,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useCartContext } from '../components/CartContext';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SearchIcon from '@mui/icons-material/Search';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function HomePage() {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const [showAllCategories, setShowAllCategories] = useState(false);
  const { addToCart, addToWishlist } = useCartContext();

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

  const frequentlyBought = [
    { id: 1, name: 'Tomatoes (1kg)', img: '/tomatoes.jpg', price: 30 },
    { id: 2, name: 'Amul Milk 1L', img: '/milk.jpg', price: 60 },
    { id: 3, name: 'Brown Bread', img: '/bread.jpg', price: 50 },
    { id: 4, name: 'Potatoes (1kg)', img: '/potatoes.jpg', price: 25 },
    { id: 5, name: 'Sunflower Oil 1L', img: '/oil.jpg', price: 110 },
    { id: 6, name: 'Parle-G Biscuits', img: '/biscuits.jpg', price: 10 },
  ];

  const testimonials = [
    { quote: 'Amazing service & fresh produce every time.', author: 'Anjali' },
    { quote: 'Easy ordering and quick delivery.', author: 'Rahul' },
    { quote: 'Best local organic grocery source!', author: 'Sheela' },
  ];

  const steps = [
    {
      icon: <SearchIcon fontSize="large" sx={{ color: theme.palette.primary.main }} />,
      title: 'Browse Products',
      description: 'Explore our wide range of fresh groceries and essentials.',
    },
    {
      icon: <ShoppingCartIcon fontSize="large" sx={{ color: theme.palette.primary.main }} />,
      title: 'Add to Cart',
      description: 'Select your favorites and add them to your cart easily.',
    },
    {
      icon: <LocalShippingIcon fontSize="large" sx={{ color: theme.palette.primary.main }} />,
      title: 'Fast Delivery',
      description: 'Get your order delivered swiftly to your doorstep.',
    },
  ];

  return (
    <Box sx={{ bgcolor: theme.palette.background.default }}>
      {/* HERO */}
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

      {/* CATEGORIES */}
      <div className="container py-5">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" fontWeight={600}>
            Explore Categories
          </Typography>
          <Button
            onClick={() => setShowAllCategories(!showAllCategories)}
            endIcon={showAllCategories ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              color: '#4CAF50',
              border: '1px solid #C8E6C9',
              px: 2,
              py: 0.5,
              borderRadius: 2,
              backgroundColor: '#f1f8e9',
              '&:hover': { bgcolor: '#dcedc8' },
            }}
          >
            {showAllCategories ? 'Show Less' : 'View All Categories'}
          </Button>
        </Box>
        <div className="row gy-4">
          {(showAllCategories ? categories : categories.slice(0, 3)).map((cat) => (
            <div key={cat.id} className="col-12 col-sm-6 col-md-4">
              <Card sx={{ cursor: 'pointer', height: '100%', '&:hover': { transform: 'scale(1.03)' }, transition: 'transform .2s' }}>
                <CardMedia component="img" height="160" image={cat.img} alt={cat.title} />
                <CardContent>
                  <Typography variant="h6" fontWeight={500} textAlign="center">
                    {cat.title}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* FREQUENTLY BOUGHT */}
      <div className="container py-5">
        <Typography variant="h4" fontWeight={600} mb={4} textAlign="center">
          Frequently Bought
        </Typography>
        <div className="row gy-4">
          {frequentlyBought.map((item) => (
            <div key={item.id} className="col-12 col-sm-6 col-md-4">
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform .2s',
                  '&:hover': { transform: 'scale(1.02)' },
                }}
              >
                <CardMedia component="img" height="140" image={item.img} alt={item.name} />
                <CardContent>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {item.name}
                  </Typography>
                  <Typography color="textSecondary" mb={2}>
                    {item.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1 }}>
                    <Button
                      onClick={() => addToCart(item)}
                      variant="contained"
                      fullWidth
                      sx={{ backgroundColor: '#4CAF50', fontWeight: 600, '&:hover': { backgroundColor: '#388e3c' } }}
                      startIcon={<ShoppingCartIcon sx={{ color: 'white' }} />}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      onClick={() => addToWishlist(item)}
                      variant="outlined"
                      fullWidth
                      sx={{
                        borderColor: '#4CAF50',
                        color: '#4CAF50',
                        fontWeight: 600,
                        '&:hover': { bgcolor: '#e8f5e9', borderColor: '#388e3c', color: '#2e7d32' },
                      }}
                    >
                      ❤️ Wishlist
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* TESTIMONIALS */}
      <Box sx={{ bgcolor: '#f9f9f9', py: 6 }}>
        <div className="container">
          <Typography variant="h4" fontWeight={700} textAlign="center" mb={5}>
            What Our Customers Say
          </Typography>
          <div className="row">
            {testimonials.map((t, i) => (
              <div key={i} className="col-12 col-md-4 mb-4">
                <Box sx={{ bgcolor: 'white', boxShadow: 1, borderRadius: 2, p: 3, minHeight: 150, textAlign: 'center' }}>
                  <Typography variant="body1" mb={2}>
                    "{t.quote}"
                  </Typography>
                  <Typography variant="subtitle2" fontWeight={700}>
                    — {t.author}
                  </Typography>
                </Box>
              </div>
            ))}
          </div>
        </div>
      </Box>

      {/* HOW IT WORKS */}
      <Box sx={{ bgcolor: '#f5f5f5', py: 6 }}>
        <div className="container">
          <Typography variant="h4" fontWeight={700} textAlign="center" mb={5}>
            How It Works
          </Typography>
          <div className="row">
            {steps.map((step, index) => (
              <div key={index} className="col-12 col-md-4 mb-4 d-flex justify-content-center">
                <Box sx={{ bgcolor: 'white', borderRadius: 4, boxShadow: 3, p: 4, textAlign: 'center', maxWidth: 320, width: '100%' }}>
                  {step.icon}
                  <Typography variant="h6" fontWeight={600} mt={2}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {step.description}
                  </Typography>
                </Box>
              </div>
            ))}
          </div>
        </div>
      </Box>

      {/* FOOTER */}
      <Box sx={{ bgcolor: theme.palette.primary.main, color: 'white', py: 5 }}>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4 mb-4">
              <Typography variant="h6" fontWeight={700}>
                CatchyFive
              </Typography>
              <Typography variant="body2" sx={{ maxWidth: 300 }}>
                Your trusted partner for fresh groceries delivered directly to your door. Quality and freshness guaranteed.
              </Typography>
            </div>
            <div className="col-6 col-md-2 mb-4">
              <Typography variant="subtitle1" fontWeight={600}>
                Quick Links
              </Typography>
              <ul style={{ listStyle: 'none', paddingLeft: 0, lineHeight: '2' }}>
                <li>
                  <MuiLink href="/about" color="inherit" underline="hover">
                    About Us
                  </MuiLink>
                </li>
                <li>
                  <MuiLink href="/contact" color="inherit" underline="hover">
                    Contact
                  </MuiLink>
                </li>
                <li>
                  <MuiLink href="/privacy" color="inherit" underline="hover">
                    Privacy Policy
                  </MuiLink>
                </li>
                <li>
                  <MuiLink href="/terms" color="inherit" underline="hover">
                    Terms
                  </MuiLink>
                </li>
              </ul>
            </div>
            <div className="col-6 col-md-3 mb-4">
              <Typography variant="subtitle1" fontWeight={600}>
                Follow Us
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <MuiLink href="#" color="inherit">
                  <FacebookIcon />
                </MuiLink>
                <MuiLink href="#" color="inherit">
                  <TwitterIcon />
                </MuiLink>
                <MuiLink href="#" color="inherit">
                  <InstagramIcon />
                </MuiLink>
              </Box>
            </div>
            <div className="col-12 col-md-3 mb-4">
              <Typography variant="subtitle1" fontWeight={600}>
                Subscribe
              </Typography>
              <TextField
                fullWidth
                variant="filled"
                placeholder="Your email"
                sx={{
                  bgcolor: 'white',
                  borderRadius: 1,
                  mb: 1,
                  input: { padding: 1 },
                }}
              />
              <Button
                fullWidth
                variant="contained"
                sx={{ bgcolor: 'white', color: theme.palette.primary.main, textTransform: 'none' }}
              >
                Subscribe
              </Button>
            </div>
          </div>
          <hr style={{ borderColor: 'rgba(255,255,255,0.3)' }} />
          <Typography variant="body2" textAlign="center" mt={3} color="rgba(255,255,255,0.7)">
            © {new Date().getFullYear()} CatchyFive. All rights reserved.
          </Typography>
        </div>
      </Box>
    </Box>
  );
}
