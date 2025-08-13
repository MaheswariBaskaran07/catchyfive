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
import {
  Info,
  Settings,
  
} from '@mui/icons-material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Home } from '@mui/icons-material';


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
       checkout: '/checkout',         
  setting: '/settings',  
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
    console.log('Logged out'); 
    navigate('/');
  };

  
const drawerList = (
  <Box sx={{ width: 250 }}>
    <List>
      <ListItemButton onClick={() => { navigate('/'); setDrawerOpen(false); }}>
        <Home sx={{ color: '#4CAF50', mr: 1 }} />
        <ListItemText primary="Home" />
      </ListItemButton>

      <ListItemButton onClick={() => setOpenCategories(!openCategories)}>
        <Category sx={{ color: '#4CAF50', mr: 1 }} />
        <ListItemText primary="Categories" />
        {openCategories ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={openCategories} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {[
            { label: 'Vegetables', icon: '🥦' },
            { label: 'Fruits', icon: '🍎' },
            { label: 'Groceries', icon: <ShoppingCartIcon sx={{ color: '#0cb906ff', mr: 1 }} /> },
            { label: 'Beverages', icon: '🥤' },
          ].map(({ label, icon }) => (
            <ListItemButton
              key={label}
              sx={{ pl: 4 }}
              onClick={() => {
                navigate(`/category/${label.toLowerCase()}`);
                setDrawerOpen(false);
              }}
            >
              {typeof icon === 'string' ? (
                <Box component="span" sx={{ mr: 1 }}>{icon}</Box>
              ) : icon}
              <ListItemText primary={label} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>

      <ListItemButton onClick={() => { navigate('/offers'); setDrawerOpen(false); }}>
        <ExploreIcon sx={{ color: '#1976d2', mr: 1 }} />
        <ListItemText primary="Offers" />
      </ListItemButton>

      <ListItemButton onClick={() => { navigate('/contact'); setDrawerOpen(false); }}>
        <AccountCircle sx={{ color: '#1976d2', mr: 1 }} />
        <ListItemText primary="Contact" />
      </ListItemButton>

      <ListItemButton onClick={() => { navigate('/about'); setDrawerOpen(false); }}>
        <Info sx={{ color: '#1976d2', mr: 1 }} />
        <ListItemText primary="About" />
      </ListItemButton>

      <ListItemButton onClick={() => { navigate('/add-address'); setDrawerOpen(false); }}>
        <LocalShipping sx={{ color: '#388e3c', mr: 1 }} />
        <ListItemText primary="Add Delivery Address" />
      </ListItemButton>

      <ListItemButton onClick={() => { navigate('/settings'); setDrawerOpen(false); }}>
        <Settings sx={{ color: '#1976d2', mr: 1 }} />
        <ListItemText primary="Settings" />
      </ListItemButton>

      <ListItemButton onClick={() => { navigate('/checkout'); setDrawerOpen(false); }}>
        <ShoppingCart sx={{ color: '#1976d2', mr: 1 }} />
        <ListItemText primary="Checkout" />
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
  <MenuItem onClick={() => { setAnchorElAccount(null); navigate('/login'); }}>
    <AccountCircle sx={{ mr: 1, color: '#388e3c' }} /> Login
  </MenuItem>
  <MenuItem onClick={() => { setAnchorElAccount(null); navigate('/signup'); }}>
    <AccountCircle sx={{ mr: 1, color: '#388e3c' }} /> Signup
  </MenuItem>
  <MenuItem onClick={() => { setAnchorElAccount(null); navigate('/add-address'); }}>
    <LocalShipping sx={{ mr: 1, color: '#388e3c' }} /> Add Address
  </MenuItem>
  <MenuItem onClick={handleLogout}>
    <Logout sx={{ mr: 1, color: '#d32f2f' }} /> Logout
  </MenuItem>
</Menu>

                <Tooltip title="Delivery Info">
                  <IconButton onClick={(e) => setAnchorElDelivery(e.currentTarget)}>
                    <LocalShipping sx={{ color: '#2e7d32' }} />
                  </IconButton>
                </Tooltip>
                
                <Menu anchorEl={anchorElDelivery} open={Boolean(anchorElDelivery)} onClose={() => setAnchorElDelivery(null)}>
  <MenuItem onClick={() => { setAnchorElDelivery(null); navigate('/delivery-info'); }}>
    <LocalShipping sx={{ mr: 1, color: '#1215d4ff' }} /> Delivery Info
  </MenuItem>
  <MenuItem onClick={() => { setAnchorElDelivery(null); navigate('/save-address'); }}>
    <Favorite sx={{ mr: 1, color: '#1825e0ff' }} /> Save Address
  </MenuItem>
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
  <MenuItem onClick={() => { setAnchorElCategory(null); navigate('/category/vegetables'); }}>
    🥦 <span style={{ color: '#1238e0ff', marginLeft: 8 }}>Vegetables</span>
  </MenuItem>
  <MenuItem onClick={() => { setAnchorElCategory(null); navigate('/category/fruits'); }}>
    🍎 <span style={{ color: '#1238e0ff', marginLeft: 8 }}>Fruits</span>
  </MenuItem>
  <MenuItem onClick={() => { setAnchorElCategory(null); navigate('/category/groceries'); }}>
  <ShoppingCartIcon sx={{ color: '#0cb906ff', mr: 1 }} />
  <span style={{ color: '#1238e0ff' }}>Groceries</span>
</MenuItem>
  <MenuItem onClick={() => { setAnchorElCategory(null); navigate('/category/beverages'); }}>
    🥤 <span style={{ color: '#1238e0ff', marginLeft: 8 }}>Beverages</span>
  </MenuItem>
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
  <MenuItem onClick={() => { setAnchorElPages(null); navigate('/offers'); }}>
    <ExploreIcon sx={{ mr: 1, color: '#1976d2' }} /> Offers
  </MenuItem>
  <MenuItem onClick={() => { setAnchorElPages(null); navigate('/contact'); }}>
    <AccountCircle sx={{ mr: 1, color: '#1976d2' }} /> Contact
  </MenuItem>
  <MenuItem onClick={() => { setAnchorElPages(null); navigate('/about'); }}>
    <Info sx={{ mr: 1, color: '#1976d2' }} /> About
  </MenuItem>
  <MenuItem onClick={() => { setAnchorElPages(null); navigate('/checkout'); }}>
    <ShoppingCart sx={{ mr: 1, color: '#1976d2' }} /> Checkout
  </MenuItem>
  <MenuItem onClick={() => { setAnchorElPages(null); navigate('/settings'); }}>
    <Settings sx={{ mr: 1, color: '#1976d2' }} /> Setting
  </MenuItem>
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
  <MenuItem onClick={() => { setAnchorElAccount(null); navigate('/login'); }}>
    <AccountCircle sx={{ mr: 1, color: '#388e3c' }} /> Login
  </MenuItem>
  <MenuItem onClick={() => { setAnchorElAccount(null); navigate('/signup'); }}>
    <AccountCircle sx={{ mr: 1, color: '#388e3c' }} /> Signup
  </MenuItem>
  <MenuItem onClick={() => { setAnchorElAccount(null); navigate('/add-address'); }}>
    <LocalShipping sx={{ mr: 1, color: '#388e3c' }} /> Add Address
  </MenuItem>
  <MenuItem onClick={handleLogout}>
    <Logout sx={{ mr: 1, color: '#d32f2f' }} /> Logout
  </MenuItem>
</Menu>



              <Tooltip title="Delivery Info">
                <IconButton onClick={(e) => setAnchorElDelivery(e.currentTarget)}>
                  <LocalShipping sx={{ color: '#2e7d32' }} />
                </IconButton>
              </Tooltip>
            <Menu anchorEl={anchorElDelivery} open={Boolean(anchorElDelivery)} onClose={() => setAnchorElDelivery(null)}>
  <MenuItem onClick={() => { setAnchorElDelivery(null); navigate('/delivery-info'); }}>
    <LocalShipping sx={{ mr: 1, color: '#1215d4ff' }} /> Delivery Info
  </MenuItem>
  <MenuItem onClick={() => { setAnchorElDelivery(null); navigate('/save-address'); }}>
    <Favorite sx={{ mr: 1, color: '#1825e0ff' }} /> Save Address
  </MenuItem>
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
