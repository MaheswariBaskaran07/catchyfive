import { useCartContext } from '../components/CartContext';
import {
  Box,
  Typography,
  Button,
  Container,
  CardMedia,
  Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function WishlistPage() {
  const {
    wishlist,
    removeFromWishlist,
    addToCart,
    setWishlist, 
  } = useCartContext();

  const navigate = useNavigate();

  const clearWishlist = () => {
    setWishlist([]); // Clear all wishlist items
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        ❤️ Your Wishlist
      </Typography>

      {wishlist.length === 0 ? (
        <Typography>No items in wishlist.</Typography>
      ) : (
        <>
          {/* Clear + Go to Cart Buttons */}
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="outlined" color="error" onClick={clearWishlist}>
              Clear Wishlist
            </Button>
            <Button variant="contained" onClick={() => navigate('/cartpage')}>
              Go to Cart
            </Button>
          </Box>

          {/* Wishlist Items */}
          {wishlist.map((item) => (
            <Box
              key={item.id}
              sx={{
                mb: 2,
                p: 2,
                border: '1px solid #ccc',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                borderRadius: 2,
              }}
            >
              <CardMedia
                component="img"
                image={item.img}
                alt={item.name}
                sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 1 }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  ₹{item.price}
                </Typography>
              </Box>

              <Stack direction="row" spacing={1}>
                <Button
                  variant="contained"
                  onClick={() => {
                    addToCart(item);
                    removeFromWishlist(item.id);
                  }}
                >
                  Move to Cart
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  Remove
                </Button>
              </Stack>
            </Box>
          ))}
        </>
      )}
    </Container>
  );
}
