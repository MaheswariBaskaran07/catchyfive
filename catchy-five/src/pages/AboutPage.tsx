import React from 'react';
import {
  Box,
  Typography,
  Card,
  Avatar,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Link } from 'react-router-dom';
import aboutImage from '../assets/banner.png';

export default function AboutPage() {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));

  const stats = [
    {
      icon: <InfoIcon sx={{ fontSize: 40, color: '#4CAF50' }} />,
      title: '100% Organic',
      desc: 'Certified fresh produce, no harmful chemicals.',
    },
    {
      icon: <LocalShippingIcon sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: 'Fast Delivery',
      desc: 'Swift, safe delivery right to your doorstep.',
    },
    {
      icon: <EmojiNatureIcon sx={{ fontSize: 40, color: '#ff9800' }} />,
      title: 'Local Partnerships',
      desc: 'Supporting local farmers and communities.',
    },
    {
      icon: <VerifiedIcon sx={{ fontSize: 40, color: '#9c27b0' }} />,
      title: 'Satisfaction Guaranteed',
      desc: 'Freshness guaranteed—or your money back.',
    },
  ];

  return (
    <Box sx={{ bgcolor: theme.palette.background.default }}>
      {/* Heading */}
      <Box sx={{ textAlign: 'center', py: { xs: 6, md: 8 }, px: 2 }}>
        <Typography
          variant={isSm ? 'h4' : 'h2'}
          fontWeight={700}
          mb={2}
        >
          About CatchyFive
        </Typography>
        <Typography
          variant={isSm ? 'subtitle1' : 'h5'}
          color="text.secondary"
        >
          Fresh, organic groceries delivered with care.
        </Typography>
      </Box>

      {/* Hero Image */}
      <Box
        sx={{
          maxWidth: '1200px',
          mx: 'auto',
          px: 2,
          mb: 6,
        }}
      >
        <Box
          component="img"
          src={aboutImage}
          alt="About CatchyFive"
          sx={{
            width: '100%',
            height: { xs: 200, sm: 300, md: 400 },
            objectFit: 'cover',
            borderRadius: 3,
            boxShadow: 4,
          }}
        />
      </Box>

      {/* Description */}
      <div className="container pb-5">
        <Typography
          variant="body1"
          color="text.secondary"
          textAlign="center"
          maxWidth={800}
          mx="auto"
          mb={5}
        >
          Welcome to <strong>CatchyFive</strong> — your trusted partner in fresh, healthy living.
          We deliver high-quality, organic groceries from local farms directly to your home,
          supporting sustainability and convenience. Join us in fostering a healthier, more
          eco-conscious world.
        </Typography>

        {/* Stats Section */}
        <div className="row gy-4">
          {stats.map((item, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-3">
              <Card
                elevation={3}
                sx={{
                  textAlign: 'center',
                  p: 3,
                  borderRadius: 2,
                  height: '100%',
                  transition: 'transform 0.3s',
                  '&:hover': { transform: 'scale(1.05)' },
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: theme.palette.grey[100],
                    width: 70,
                    height: 70,
                    mb: 2,
                  }}
                >
                  {item.icon}
                </Avatar>
                <Typography variant="h6" fontWeight={600}>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  {item.desc}
                </Typography>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Mission */}
      <Box sx={{ bgcolor: '#f9f9f9', py: 6 }}>
        <div className="container text-center">
          <Typography variant="h4" fontWeight={700} mb={2}>
            Our Mission
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            maxWidth={700}
            mx="auto"
            mb={4}
          >
            Empowering communities with access to fresh, sustainable, and organic food options.
            We believe in fair pricing, ethical sourcing, and eco-friendly delivery — for your
            health and the planet.
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/shop"
            sx={{
              textTransform: 'none',
              px: 4,
              py: 1.5,
              fontWeight: 600,
              bgcolor: '#4CAF50',
              '&:hover': { bgcolor: '#388e3c' },
            }}
          >
            Shop Now
          </Button>
        </div>
      </Box>
    </Box>
  );
}
