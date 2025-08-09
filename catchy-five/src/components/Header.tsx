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
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery,
  Collapse,
} from '@mui/material';
import {
  ShoppingCart,
  Favorite,
  AccountCircle,
  Menu as MenuIcon,
  Search,
  LocalShipping,
  Category,
  ExpandMore,
  ExpandLess,
  Explore as ExploreIcon,
  Logout,
} from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from './CartContext';

export default function Header() {
  const [anchorElCategory, setAnchorElCategory] = useState<null | HTMLElement>(null);
  const [anchorElPages, setAnchorElPages] = useState<null | HTMLElement>(null);
  const [anchorElAccount, setAnchorElAccount] = useState<null | HTMLElement>(null);
  const [anchorElDelivery, setAnchorElDelivery] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const { cartItemCount, wishlistItemCount, cartTotal } = useCartContext();

  const navStyle = {
    textTransform: 'capitalize',
    fontWeight: 600,
    color: '#4CAF50',
    '&:hover': { color: '#2196F3' },
  };

  const searchBoxStyle = {
    display: 'flex',
    alignItems: 'center',
    bgcolor: '#f5f5f5',
    px: 2,
    py: 0.6,
    borderRadius: 4,
    width: '100%',
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (!query) return;

    const routesMap: { [key: string]: string } = {
      home: '/',
      login: '/login',
      signup: '/signup',
      contact: '/contact',
      about: '/about',
      offers: '/offers',
      shop: '/shop',
      cart: '/cartpage',
      wishlist: '/wishlistpage',
      'add address': '/add-address',
    };

    const categories = ['vegetables', 'fruits', 'groceries', 'beverages'];

    if (routesMap[query]) {
      navigate(routesMap[query]);
    } else if (categories.includes(query)) {
      navigate(`/category/${query}`);
    } else {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }

    setSearchQuery('');
  };

  const handleLogout = () => {
    setAnchorElAccount(null);
    console.log('Logged out'); // Replace with actual logout logic
    navigate('/');
  };

  const drawerList = (
    <Box sx={{ width: 250 }}>
      <List>
        <ListItemButton onClick={() => { navigate('/'); setDrawerOpen(false); }}>
          <ListItemText primary="Home" />
        </ListItemButton>

        <ListItemButton onClick={() => setOpenCategories(!openCategories)}>
          <ListItemText primary="Categories" />
          {openCategories ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openCategories} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {['Vegetables', 'Fruits', 'Groceries', 'Beverages'].map((item) => (
              <ListItemButton
                key={item}
                sx={{ pl: 4 }}
                onClick={() => {
                  navigate(`/category/${item.toLowerCase()}`);
                  setDrawerOpen(false);
                }}
              >
                <ListItemText primary={item} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>

        <ListItemButton onClick={() => { navigate('/offers'); setDrawerOpen(false); }}>
          <ListItemText primary="Offers" />
        </ListItemButton>

        <ListItemButton onClick={() => { navigate('/contact'); setDrawerOpen(false); }}>
          <ListItemText primary="Contact" />
        </ListItemButton>

        <ListItemButton onClick={() => { navigate('/about'); setDrawerOpen(false); }}>
          <ListItemText primary="About" />
        </ListItemButton>

        <ListItemButton onClick={() => { navigate('/add-address'); setDrawerOpen(false); }}>
          <ListItemText primary="Add Delivery Address" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <Box>
      {/* Top Banner */}
      <Box sx={{
        bgcolor: '#4940d4ff',
        color: 'white',
        py: 0.7,
        px: 2,
        fontSize: '0.9rem',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      }}>
        <Box sx={{
          display: 'inline-block',
          animation: 'scroll-left 20s linear infinite',
          fontWeight: 600,
        }}>
          🚚 Free delivery on orders above $80 | 🎉 Use code <strong>ORGANIC10</strong> for 10% OFF!
        </Box>
      </Box>

      <AppBar position="static" elevation={0} sx={{ bgcolor: '#fff', color: '#000', px: 2, py: 1.2 }}>
        {isMobile ? (
          <>
            <Toolbar sx={{ justifyContent: 'space-between', px: 0 }}>
              <IconButton onClick={() => setDrawerOpen(true)} edge="start">
                <MenuIcon />
              </IconButton>

              <Box onClick={() => navigate('/')} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', flexGrow: 1, justifyContent: 'center' }}>
                <img src="/logo1.png" alt="Logo" style={{ height: 40, marginRight: 8 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#4CAF50' }}>Organic Mart</Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 1 }}>
                <Tooltip title="Account">
                  <IconButton onClick={(e) => setAnchorElAccount(e.currentTarget)}>
                    <AccountCircle sx={{ color: '#388e3c' }} />
                  </IconButton>
                </Tooltip>
                <Menu anchorEl={anchorElAccount} open={Boolean(anchorElAccount)} onClose={() => setAnchorElAccount(null)}>
                  <MenuItem onClick={() => { setAnchorElAccount(null); navigate('/login'); }}>Login</MenuItem>
                  <MenuItem onClick={() => { setAnchorElAccount(null); navigate('/signup'); }}>Signup</MenuItem>
                  <MenuItem onClick={() => { setAnchorElAccount(null); navigate('/add-address'); }}>Add Address</MenuItem>
                  <MenuItem onClick={handleLogout}>
                    Logout
                    <Logout sx={{ ml: 1, fontSize: '1.2rem', color: '#d32f2f' }} />
                  </MenuItem>
                </Menu>

                <Tooltip title="Delivery Info">
                  <IconButton onClick={(e) => setAnchorElDelivery(e.currentTarget)}>
                    <LocalShipping sx={{ color: '#2e7d32' }} />
                  </IconButton>
                </Tooltip>
                <Menu anchorEl={anchorElDelivery} open={Boolean(anchorElDelivery)} onClose={() => setAnchorElDelivery(null)}>
                  <MenuItem onClick={() => { setAnchorElDelivery(null); navigate('/delivery-info'); }}>Delivery Info</MenuItem>
                  <MenuItem onClick={() => { setAnchorElDelivery(null); navigate('/save-address'); }}>Save Address</MenuItem>
                </Menu>
              </Box>
            </Toolbar>

            <Toolbar component="form" onSubmit={handleSearchSubmit} sx={{ px: 0, gap: 1 }}>
              <Box sx={{ ...searchBoxStyle, flexGrow: 1 }}>
                <Search sx={{ color: '#888', mr: 1 }} />
                <InputBase
                  placeholder="Search organic products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  fullWidth
                  sx={{ fontSize: '0.9rem' }}
                />
              </Box>
              <Tooltip title="Wishlist">
                <IconButton onClick={() => navigate('/wishlistpage')}>
                  <Badge badgeContent={wishlistItemCount} color="error">
                    <Favorite sx={{ color: '#d32f2f' }} />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title={`Cart Total: ₹${cartTotal.toFixed(2)}`}>
                <IconButton onClick={() => navigate('/cartpage')}>
                  <Badge badgeContent={cartItemCount} color="error">
                    <ShoppingCart sx={{ color: '#1976d2' }} />
                  </Badge>
                </IconButton>
              </Tooltip>
            </Toolbar>
          </>
        ) : (
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box onClick={() => navigate('/')} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <img src="/logo1.png" alt="Logo" style={{ height: 45, marginRight: 10 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#4CAF50' }}>Organic Mart</Typography>
              </Box>
              <Button onClick={() => navigate('/')} sx={navStyle}>Home</Button>
              <Button onClick={(e) => setAnchorElCategory(e.currentTarget)} startIcon={<Category />} endIcon={<ExpandMore />} sx={navStyle}>
                Categories
              </Button>
              <Menu anchorEl={anchorElCategory} open={Boolean(anchorElCategory)} onClose={() => setAnchorElCategory(null)}>
                {['Vegetables', 'Fruits', 'Groceries', 'Beverages'].map((item) => (
                  <MenuItem key={item} onClick={() => { setAnchorElCategory(null); navigate(`/category/${item.toLowerCase()}`); }}>{item}</MenuItem>
                ))}
              </Menu>
            </Box>

            <Box component="form" onSubmit={handleSearchSubmit} sx={{ ...searchBoxStyle, maxWidth: 500 }}>
              <Search sx={{ color: '#888', mr: 1 }} />
              <InputBase
                placeholder="Search organic products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                fullWidth
              />
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <Button onClick={(e) => setAnchorElPages(e.currentTarget)} endIcon={<ExpandMore />} sx={navStyle}>
                <ExploreIcon sx={{ mr: 0.5, fontSize: '1.2rem' }} />
                Explore
              </Button>
              <Menu anchorEl={anchorElPages} open={Boolean(anchorElPages)} onClose={() => setAnchorElPages(null)}>
                {['Offers', 'Contact', 'About'].map((page) => (
                  <MenuItem key={page} onClick={() => { setAnchorElPages(null); navigate(`/${page.toLowerCase()}`); }}>{page}</MenuItem>
                ))}
              </Menu>

              <Tooltip title="Wishlist">
                <IconButton onClick={() => navigate('/wishlistpage')}>
                  <Badge badgeContent={wishlistItemCount} color="error">
                    <Favorite sx={{ color: '#d32f2f' }} />
                  </Badge>
                </IconButton>
              </Tooltip>

              <Tooltip title={`Cart Total: ₹${cartTotal.toFixed(2)}`}>
                <IconButton onClick={() => navigate('/cartpage')}>
                  <Badge badgeContent={cartItemCount} color="error">
                    <ShoppingCart sx={{ color: '#1976d2' }} />
                  </Badge>
                </IconButton>
              </Tooltip>

              <Tooltip title="Account">
                <IconButton onClick={(e) => setAnchorElAccount(e.currentTarget)}>
                  <AccountCircle sx={{ color: '#388e3c' }} />
                </IconButton>
              </Tooltip>
              <Menu anchorEl={anchorElAccount} open={Boolean(anchorElAccount)} onClose={() => setAnchorElAccount(null)}>
                <MenuItem onClick={() => { setAnchorElAccount(null); navigate('/login'); }}>Login</MenuItem>
                <MenuItem onClick={() => { setAnchorElAccount(null); navigate('/signup'); }}>Signup</MenuItem>
                <MenuItem onClick={() => { setAnchorElAccount(null); navigate('/add-address'); }}>Add Address</MenuItem>
                <MenuItem onClick={handleLogout}>
                  Logout
                  <Logout sx={{ ml: 1, fontSize: '1.2rem', color: '#d32f2f' }} />
                </MenuItem>
              </Menu>

              <Tooltip title="Delivery Info">
                <IconButton onClick={(e) => setAnchorElDelivery(e.currentTarget)}>
                  <LocalShipping sx={{ color: '#2e7d32' }} />
                </IconButton>
              </Tooltip>
              <Menu anchorEl={anchorElDelivery} open={Boolean(anchorElDelivery)} onClose={() => setAnchorElDelivery(null)}>
                <MenuItem onClick={() => { setAnchorElDelivery(null); navigate('/delivery-info'); }}>Delivery Info</MenuItem>
                <MenuItem onClick={() => { setAnchorElDelivery(null); navigate('/save-address'); }}>Save Address</MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        )}

        <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          {drawerList}
        </Drawer>
      </AppBar>

      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </Box>
  );
}
