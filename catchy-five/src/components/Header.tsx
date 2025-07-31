import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Box,
  InputBase,
  Badge,
  Tooltip,
  useTheme,
  useMediaQuery
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const {
    cartItemCount,
    wishlistItemCount,
    cartTotal,
  } = useCartContext();

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
          bgcolor: 'primary.main',
          color: 'white',
          py: 0.5,
          px: 2,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          fontSize: { xs: '0.75rem', sm: '0.9rem' },
          fontWeight: 500,
        }}
      >
        <Box
          sx={{
            display: 'inline-block',
            animation: 'scroll-left 18s linear infinite',
          }}
        >
          🚚 Free delivery on orders above ${freeDeliveryThreshold.toFixed(2)} &nbsp;&nbsp;|&nbsp;&nbsp; 🎉 Use code <strong>CATCHY10</strong> for 10% OFF!
        </Box>
      </Box>

      {/* 🔶 Top Bar */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'background.default', px: { xs: 2, md: 4 }, py: 1 }}>
        <Toolbar sx={{ flexDirection: { xs: 'column', md: 'row' }, gap: 2, alignItems: 'center', justifyContent: 'space-between' }}>
          {/* 🔷 Logo */}
          <Box onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
            <img
              src="/logo1.png"
              alt="Logo"
              style={{
                height: isMobile ? 60 : 80,
                width: isMobile ? 120 : 160,
                objectFit: 'contain'
              }}
            />
          </Box>

          {/* 🔍 Search */}
          <Box
            component="form"
            onSubmit={handleSearchSubmit}
            sx={{
              bgcolor: '#f5f5f5',
              px: 2,
              py: 0.7,
              borderRadius: 3,
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              maxWidth: 600,
              boxShadow: 1,
            }}
          >
            <Search sx={{ color: 'gray', mr: 1 }} />
            <InputBase
              placeholder="Search Products and Categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              fullWidth
              sx={{ fontSize: '0.9rem' }}
            />
          </Box>

          {/* 🟢 Delivery Message */}
          <Box
            sx={{
              mt: { xs: 1, md: 0 },
              bgcolor: cartTotal >= freeDeliveryThreshold ? 'success.main' : 'warning.main',
              color: 'white',
              px: 2,
              py: 0.5,
              borderRadius: 3,
              fontSize: '0.85rem',
              fontWeight: 600,
              textAlign: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            {deliveryMessage}
          </Box>
        </Toolbar>
      </AppBar>

      {/* 🔷 Bottom Bar */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'background.paper', px: { xs: 2, md: 4 }, py: 1 }}>
        <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          {/* 📂 Navigation */}
          <Box display="flex" gap={1} flexWrap="wrap">
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
                  color: 'primary.main',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  textTransform: 'capitalize',
                  '&:hover': {
                    color: 'secondary.main',
                    backgroundColor: 'transparent',
                  },
                }}
              >
                {label}
              </Button>
            ))}
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={handleMenuClose}>Vegetables</MenuItem>
              <MenuItem onClick={handleMenuClose}>Fruits</MenuItem>
              <MenuItem onClick={handleMenuClose}>Groceries</MenuItem>
              <MenuItem onClick={handleMenuClose}>Beverages</MenuItem>
            </Menu>
          </Box>

          {/* 🛒 Icons */}
          <Box display="flex" gap={3} alignItems="center">
            {[
              {
                label: 'Wishlist',
                icon: (
                  <Badge badgeContent={wishlistItemCount} color="secondary">
                    <Favorite sx={{ color: wishlistItemCount > 0 ? 'error.main' : 'inherit' }} />
                  </Badge>
                ),
                onClick: () => navigate('/wishlistpage'),
              },
              {
                label: 'Cart',
                icon: (
                  <Tooltip title={`Cart Total: $${cartTotal.toFixed(2)}`}>
                    <Badge badgeContent={cartItemCount} color="primary">
                      <ShoppingCart sx={{ color: cartItemCount > 0 ? 'primary.main' : 'inherit' }} />
                    </Badge>
                  </Tooltip>
                ),
                onClick: () => navigate('/cartpage'),
              },
              {
                label: 'Account',
                icon: <AccountCircle />,
                onClick: () => navigate('/login'),
              },
              {
                label: 'Delivery',
                icon: <LocalShipping sx={{ color: 'success.main' }} />,
                onClick: () => navigate('/delivery'),
              },
            ].map(({ label, icon, onClick }, index) => (
              <Box key={index} textAlign="center">
                <IconButton onClick={onClick} aria-label={label}>
                  {icon}
                </IconButton>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 'bold',
                    fontFamily: 'cursive',
                    color: 'primary.main',
                  }}
                >
                  {label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* 🔁 Keyframes for Banner */}
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
