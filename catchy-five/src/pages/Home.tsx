import {
  Box,
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Container,
  TextField,
  CircularProgress,
} from '@mui/material';
import { Link } from 'react-router-dom';

export default function HomePage() {
  
  const categories = [
    {
      id: 1,
      title: 'Fruits & Veggies',
      img: '/images/fruits.jpg',
    },
    {
      id: 2,
      title: 'Dairy & Eggs',
      img: '/images/dairy.jpg',
    },
    {
      id: 3,
      title: 'Bakery & Snacks',
      img: '/images/bakery.jpg',
    },
    {
      id: 4,
      title: 'Beverages',
      img: '/images/beverages.jpg',
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Anjali',
      review: 'Amazing service & fresh produce every time.',
    },
    {
      id: 2,
      name: 'Rahul',
      review: 'Easy ordering and quick delivery.',
    },
    {
      id: 3,
      name: 'Sheela',
      review: 'Best local organic grocery source!',
    },
  ];

  return (
    <Box sx={{ bgcolor: '#f9fff9', fontFamily: "'Poppins', sans-serif" }}>
      
      <Box
        sx={{
          background: 'linear-gradient(135deg, #96c93d, #00b09b)',
          color: 'white',
          py: { xs: 8, md: 12 },
          textAlign: 'center',
        }}
      >
        <Typography variant="h2" fontWeight={700} mb={2}>
          Fresh Groceries, Delivered to Your Doorstep
        </Typography>
        <Typography variant="h5" mb={4}>
          Organic, affordable, & always fresh. Welcome to CatchyFive.
        </Typography>
        <Button
          variant="contained"
          size="large"
          component={Link}
          to="/signup"
          sx={{
            background: 'white',
            color: '#00b09b',
            fontWeight: 'bold',
            textTransform: 'none',
            px: 4,
            '&:hover': { background: '#f0f0f0' },
          }}
        >
          Get Started
        </Button>
      </Box>

      {/* Featured Categories */}
      <Container sx={{ py: { xs: 6, md: 8 } }}>
        <Typography variant="h4" fontWeight={600} mb={4} textAlign="center">
          Explore Categories
        </Typography>
        <div className="row">
          {categories.map((cat) => (
            <div key={cat.id} className="col-12 col-sm-6 col-md-3 mb-4">
              <Card
                sx={{
                  cursor: 'pointer',
                  transition: 'transform .2s',
                  '&:hover': { transform: 'scale(1.03)' },
                }}
              >
                <CardMedia
                  component="img"
                  height="160"
                  image={cat.img}
                  alt={cat.title}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight={500} textAlign="center">
                    {cat.title}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </Container>

      
      <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: '#e6f7f0' }}>
        <Container>
          <Typography variant="h4" fontWeight={600} mb={4} textAlign="center">
            How It Works
          </Typography>
          <div className="row justify-content-center">
            {[
              {
                step: '1',
                title: 'Browse Products',
                description: 'Explore categories & add to cart.',
              },
              {
                step: '2',
                title: 'Secure Checkout',
                description: 'Easy payment & confirmation.',
              },
              {
                step: '3',
                title: 'Fast Delivery',
                description: 'Order delivered in 1–2 hours.',
              },
            ].map((item) => (
              <div key={item.step} className="col-12 col-sm-4 text-center mb-4">
                <Box px={2}>
                  <Box
                    sx={{
                      fontSize: 40,
                      fontWeight: 700,
                      color: '#00b09b',
                      mb: 2,
                    }}
                  >
                    {item.step}
                  </Box>
                  <Typography variant="h6" fontWeight={600} mb={1}>
                    {item.title}
                  </Typography>
                  <Typography color="textSecondary">{item.description}</Typography>
                </Box>
              </div>
            ))}
          </div>
        </Container>
      </Box>

      {/* Testimonials */}
      <Container sx={{ py: { xs: 6, md: 8 } }}>
        <Typography variant="h4" fontWeight={600} mb={4} textAlign="center">
          What Our Customers Say
        </Typography>
        <div className="row">
          {testimonials.map((t) => (
            <div key={t.id} className="col-12 col-sm-4 mb-3">
              <Card sx={{ p: 3, textAlign: 'center', bgcolor: '#f2fff5' }}>
                <Typography variant="body1" mb={2}>
                  "{t.review}"
                </Typography>
                <Typography fontWeight={600}>— {t.name}</Typography>
              </Card>
            </div>
          ))}
        </div>
      </Container>
  </Box>
  );
}

     