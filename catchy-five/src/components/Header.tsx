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
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  ShoppingCart,
  Favorite,
  AccountCircle,
  Menu as MenuIcon,
  Search,
  LocalShipping,
  Category,
  ExpandMore
} from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../components/CartContext';

export default function Header() {
  const [anchorElCategory, setAnchorElCategory] = useState<null | HTMLElement>(null);
  const [anchorElPages, setAnchorElPages] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const { cartItemCount, wishlistItemCount, cartTotal } = useCartContext();

  const handleCategoryClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElCategory(event.currentTarget);
  };
  const handleCategoryClose = () => setAnchorElCategory(null);

  const handlePagesClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElPages(event.currentTarget);
  };
  const handlePagesClose = () => setAnchorElPages(null);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const drawerList = (
    <Box sx={{ width: 250 }} onClick={() => setDrawerOpen(false)}>
      <List>
        {['Home', 'Categories', 'Offers', 'Contact', 'About'].map((label) => (
          <ListItem button key={label} onClick={() => navigate(`/${label.toLowerCase()}`)}>
            <ListItemText primary={label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box>
      {/* 🔁 Scrolling Banner */}
      <Box
        sx={{
          bgcolor: '#4940d4ff',
          color: 'white',
          py: 0.7,
          px: 2,
          fontSize: '0.9rem',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        <Box
          sx={{
            display: 'inline-block',
            animation: 'scroll-left 20s linear infinite',
            fontWeight: 600,
          }}
        >
          🚚 Free delivery on orders above $80 | 🎉 Use code <strong>CATCHY10</strong> for 10% OFF!
        </Box>
      </Box>

      {/* 🔷 Header Bar */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: '#fff', color: '#000', px: 2, py: 1.2 }}>
        <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          {/* 🔹 Left: Logo + Home + Categories */}
          <Box display="flex" alignItems="center" gap={3}>
            <Box onClick={() => navigate('/')} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <img src="/logo1.png" alt="Logo" style={{ height: 55, marginRight: 10 }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#4CAF50' }}>
                Organic Mart
              </Typography>
            </Box>

            {!isMobile && (
              <>
                <Button
                  onClick={() => navigate('/')}
                  sx={{
                    textTransform: 'capitalize',
                    fontWeight: 600,
                    color: '#4CAF50',
                    '&:hover': { color: '#2196F3' },
                  }}
                >
                  Home
                </Button>

                <Button
                  onClick={handleCategoryClick}
                  startIcon={<Category />}
                  endIcon={<ExpandMore />}
                  sx={{
                    textTransform: 'capitalize',
                    fontWeight: 600,
                    color: '#4CAF50',
                    '&:hover': { color: '#2196F3' },
                  }}
                >
                  Categories
                </Button>

                <Menu anchorEl={anchorElCategory} open={Boolean(anchorElCategory)} onClose={handleCategoryClose}>
                  {['Vegetables', 'Fruits', 'Groceries', 'Beverages'].map((item) => (
                    <MenuItem
                      key={item}
                      onClick={() => {
                        handleCategoryClose();
                        navigate(`/category/${item.toLowerCase()}`);
                      }}
                    >
                      {item}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
          </Box>

          {/* 🔍 Center: Search Bar */}
          {!isMobile && (
            <Box
              component="form"
              onSubmit={handleSearchSubmit}
              sx={{
                display: 'flex',
                alignItems: 'center',
                bgcolor: '#f5f5f5',
                px: 2,
                py: 0.6,
                borderRadius: 4,
                width: '35%',
              }}
            >
              <Search sx={{ color: '#888', mr: 1 }} />
              <InputBase
                placeholder="Search organic products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                fullWidth
              />
            </Box>
          )}

        
          <Box display="flex" alignItems="center" gap={1}>
            {/* 🔸 Pages Dropdown */}
            {!isMobile && (
              <>
                <Button
                  onClick={handlePagesClick}
                  endIcon={<ExpandMore />}
                  sx={{
                    textTransform: 'capitalize',
                    fontWeight: 600,
                    color: '#4CAF50',
                    '&:hover': { color: '#2196F3' },
                  }}
                >
                  Pages
                </Button>
                <Menu anchorEl={anchorElPages} open={Boolean(anchorElPages)} onClose={handlePagesClose}>
                  {['Offers', 'Contact', 'About'].map((page) => (
                    <MenuItem
                      key={page}
                      onClick={() => {
                        handlePagesClose();
                        navigate(`/${page.toLowerCase()}`);
                      }}
                    >
                      {page}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}

    
            {[
              {
                tooltip: 'Wishlist',
                badgeContent: wishlistItemCount,
                icon: <Favorite sx={{ color: '#d32f2f' }} />,
                onClick: () => navigate('/wishlistpage'),
                bgcolor: '#fff0f0',
                hover: '#ffe5e5',
              },
              {
                tooltip: `Cart Total: $${cartTotal.toFixed(2)}`,
                badgeContent: cartItemCount,
                icon: <ShoppingCart sx={{ color: '#1976d2' }} />,
                onClick: () => navigate('/cartpage'),
                bgcolor: '#f0f8ff',
                hover: '#e0f0ff',
              },
              {
                tooltip: 'Account',
                badgeContent: 0,
                icon: <AccountCircle sx={{ color: '#388e3c' }} />,
                onClick: () => navigate('/login'),
                bgcolor: '#f5fff5',
                hover: '#e6ffe6',
              },
              {
                tooltip: 'Delivery Info',
                badgeContent: 0,
                icon: <LocalShipping sx={{ color: '#2e7d32' }} />,
                onClick: () => navigate('/delivery'),
                bgcolor: '#e8f5e9',
                hover: '#d0f0d0',
              },
            ].map(({ tooltip, badgeContent, icon, onClick, bgcolor, hover }, index) => (
              <Tooltip key={index} title={tooltip}>
                <IconButton
                  onClick={onClick}
                  sx={{
                    bgcolor,
                    '&:hover': {
                      bgcolor: hover,
                    },
                    borderRadius: 2,
                  }}
                >
                  <Badge badgeContent={badgeContent} color="error">
                    {icon}
                  </Badge>
                </IconButton>
              </Tooltip>
            ))}

            {/* ☰ Mobile Drawer Button */}
            {isMobile && (
              <IconButton onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* 📱 Drawer for Mobile */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {drawerList}
      </Drawer>

      {/* 🔁 Keyframe for Scroll Animation */}
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </Box>
  );
}
