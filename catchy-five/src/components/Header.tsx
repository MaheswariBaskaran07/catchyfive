import {
  AppBar, Toolbar, Typography, IconButton, Button, Menu, MenuItem,
  Box, InputBase, Badge
} from '@mui/material';
import {
  ShoppingCart,
  Favorite,
  AccountCircle,
  Menu as MenuIcon,
  Search,
  LocalShipping
} from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../components/CartContext';


export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  // 🛒 Simulated data (replace with real state/context later)
  const { cartItems, wishlistItems, cartTotal} = useCartContext();

const freeDeliveryThreshold = 80;
const remaining = Math.max(freeDeliveryThreshold - cartTotal, 0).toFixed(2);
const deliveryMessage =
  cartTotal >= freeDeliveryThreshold
    ? '🎉 You have unlocked free delivery!'
    : `🎉 Add $${remaining} more for free delivery`;


  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const [searchQuery, setSearchQuery] = useState('');

const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (searchQuery.trim()) {
    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    setSearchQuery('');
  }
};

  return (
    <Box>
      {/* 🔁 Scrolling Banner */}
      <Box
        sx={{
          bgcolor: 'green',
          color: 'white',
          py: 0.5,
          px: 2,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
       <Box
  component="div"
  sx={{
    display: 'inline-block',
    animation: 'scroll-left 15s linear infinite',
  }}
>
  🚚 Free delivery available on orders above <strong>${freeDeliveryThreshold.toFixed(2)}</strong>! &nbsp;&nbsp;&nbsp;&nbsp;
  🎉 Use code <strong>CATCHY10</strong> for 10% off!
</Box>

      </Box>

      {/* Line 1 - Logo | Search | Delivery Message */}
      <AppBar position="static" color="default" elevation={0} sx={{ px: 2, py: 1, bgcolor: '#dfee8aff'}}>
        <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
          {/* 🎞️ Video Logo */}
          <Box display="flex" alignItems="center">
  <img
    src="/logo1.gif" 
    alt="Logo"
    style={{
      height: 150,
      width: 200,
      cursor: 'pointer',
      objectFit: 'contain',
    }}
    onClick={() => navigate('/')}
  />
</Box>


          {/* 🔍 Search Bar */}
          <Box
  component="form"
  onSubmit={handleSearchSubmit}
  sx={{
    bgcolor: '#f0f0f0',
    px: 1.5,
    py: 0.5,
    borderRadius: 1,
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    mx: 2,
    maxWidth: 600
  }}
>
  <Search sx={{ color: 'gray', mr: 1 }} aria-label="Search icon" />
  <InputBase
    placeholder="Search Products and Categories..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    fullWidth
    inputProps={{ 'aria-label': 'search input' }}
  />
</Box>


          {/* 🟢 Delivery Message */}
          <Box
            sx={{
              bgcolor: cartTotal >= freeDeliveryThreshold ? 'success.main' : 'warning.main',
              color: 'white',
              px: 2,
              py: 0.5,
              borderRadius: '16px',
              fontSize: '0.875rem',
              fontWeight: 500,
              display: 'inline-block',
              whiteSpace: 'nowrap',
            }}
          >
            {deliveryMessage}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Line 2 - Navigation + Icons with Labels */}
      <AppBar position="static" color="default" elevation={0} sx={{ px: 2, bgcolor: '#c2e1f0ff' }}>
        <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
          {/* 📃 Navigation Links */}
          <Box display="flex" alignItems="center" gap={2}>
            <Box display="flex" alignItems="center" gap={2}>
  {[
    { label: 'Home', onClick: () => navigate('/') },
    { label: 'Categories', onClick: handleMenuClick },
    { label: 'About Us' },
    { label: 'Contact Us' },
    { label: 'Offers' },
  ].map(({ label, onClick }, index) => (
    <Button
      key={index}
      onClick={onClick}
      sx={{
        color: '#084fe7ff', 
        fontWeight: 600,
        fontSize: '0.95rem',
        textTransform: 'capitalize',
        '&:hover': {
          color: '#1d1b02ff',
          backgroundColor: 'transparent',
        },
      }}
    >
      {label}
    </Button>
  ))}
</Box>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={handleMenuClose}>Vegetables</MenuItem>
              <MenuItem onClick={handleMenuClose}>Fruits</MenuItem>
              <MenuItem onClick={handleMenuClose}>Groceries</MenuItem>
              <MenuItem onClick={handleMenuClose}>Beverages</MenuItem>
            </Menu>
          </Box>

          {/* 🔘 Icons with Badges and Labels */}
          <Box display="flex" alignItems="center" gap={4}>
            <Box textAlign="center">
              <IconButton aria-label="View Wishlist" onClick={() => navigate('/wishlist')}>
                <Badge badgeContent={wishlistItems} color="secondary">
                  <Favorite />
                  
                </Badge>
              </IconButton>
              <Typography variant="caption" sx={{ fontWeight: 'bold', fontFamily: 'cursive', color: '#084fe7ff' }}>Wishlist</Typography>
            </Box>

            <Box textAlign="center">
              <IconButton aria-label="View Cart" onClick={() => navigate('/cart')}>
                <Badge badgeContent={cartItems} color="primary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
              <Typography variant="caption" sx={{ fontWeight: 'bold', fontFamily: 'cursive', color: '#084fe7ff' }}>Cart</Typography>
            </Box>

            <Box textAlign="center">
              <IconButton aria-label="User Account" onClick={() => navigate('/login')}>
                <AccountCircle />
              </IconButton>
              <Typography variant="caption" sx={{ fontWeight: 'bold', fontFamily: 'cursive', color: '#084fe7ff' }}>Account</Typography>

            </Box>

            <Box textAlign="center">
              <IconButton aria-label="Delivery Information" onClick={() => navigate('/delivery')}>
                <LocalShipping sx={{ color: 'green' }} />
              </IconButton>
              <Typography variant="caption" sx={{ fontWeight: 'bold', fontStyle: 'italic', color: '#084fe7ff' }}>Delivery</Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* 🔁 Animation Keyframes */}
      <style>
        {`
          @keyframes scroll-left {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
        `}
      </style>
    </Box>
  );
}
