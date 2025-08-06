import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  useTheme,
  useMediaQuery,
  IconButton,
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useCartContext } from '../components/CartContext';

// ✅ Define Product type
interface Product {
  id: number;
  name: string;
  price: number;
  img: string;
  category: string;
}

const ShopPage: React.FC = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const { addToCart, addToWishlist } = useCartContext();
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');

  const [sort, setSort] = useState<string>('default');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<{ [id: number]: number }>({});

  const products: Product[] = [
    { id: 1, name: 'Tomatoes (1kg)', price: 30, img: '/tomatoes.jpg', category: 'vegetables' },
    { id: 2, name: 'Amul Milk 1L', price: 60, img: '/milk.jpg', category: 'dairy' },
    { id: 3, name: 'Brown Bread', price: 50, img: '/bread.jpg', category: 'bakery' },
    { id: 4, name: 'Apples (1kg)', price: 80, img: '/images/fruits/apple.jpg', category: 'fruits' },
    { id: 5, name: 'Sunflower Oil 1L', price: 110, img: '/oil.jpg', category: 'groceries' },
    { id: 6, name: 'Bananas (1 dozen)', price: 40, img: '/images/fruits/banana.jpg', category: 'fruits' },
  ];

  useEffect(() => {
    let filtered = categoryFilter
      ? products.filter((p) => p.category === categoryFilter.toLowerCase())
      : [...products];

    if (sort === 'lowToHigh') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'highToLow') {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [sort, categoryFilter]);

  const handleQuantityChange = (id: number, delta: number) => {
    setQuantities((prev) => {
      const current = prev[id] || 1;
      return { ...prev, [id]: Math.max(1, current + delta) };
    });
  };

  return (
    <Box sx={{ py: 5, px: 2 }}>
      <div className="container">
        {/* Heading and Sort */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4} flexWrap="wrap" gap={2}>
          <Typography variant="h4" fontWeight={700}>
            {categoryFilter
              ? `${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)} Collection`
              : 'Shop All Products'}
          </Typography>
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Sort By</InputLabel>
            <Select value={sort} label="Sort By" onChange={(e) => setSort(e.target.value)}>
              <MenuItem value="default">Default</MenuItem>
              <MenuItem value="lowToHigh">Price: Low to High</MenuItem>
              <MenuItem value="highToLow">Price: High to Low</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Product Grid */}
        <Grid container spacing={4}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'scale(1.02)' },
                }}
              >
                <CardMedia component="img" height="180" image={product.img} alt={product.name} />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {product.name}
                  </Typography>
                  <Typography color="text.secondary" mb={2}>
                    ₹{product.price}
                  </Typography>

                  {/* Quantity + Add to Cart + Wishlist */}
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    flexDirection={isSm ? 'column' : 'row'}
                    gap={1}
                    mt={2}
                  >
                    {/* Quantity Selector */}
                    <Box display="flex" alignItems="center" gap={1}>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleQuantityChange(product.id, -1)}
                        sx={{ minWidth: 30, px: 0 }}
                      >
                        –
                      </Button>
                      <Typography>{quantities[product.id] || 1}</Typography>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleQuantityChange(product.id, 1)}
                        sx={{ minWidth: 30, px: 0 }}
                      >
                        +
                      </Button>
                    </Box>

                    {/* Add to Cart */}
                    <Button
                      variant="contained"
                      onClick={() => addToCart({ ...product, quantity: quantities[product.id] || 1 })}
                      startIcon={<ShoppingCartIcon />}
                      sx={{
                        bgcolor: '#4CAF50',
                        color: '#fff',
                        fontWeight: 600,
                        textTransform: 'none',
                        borderRadius: '10px',
                        boxShadow: '0px 4px 12px rgba(0, 128, 0, 0.2)',
                        transition: 'all 0.3s ease',
                        flexGrow: 1,
                        '&:hover': {
                          bgcolor: '#388e3c',
                          boxShadow: '0px 6px 16px rgba(0, 128, 0, 0.3)',
                        },
                      }}
                    >
                      Add to Cart
                    </Button>

                    {/* Wishlist Button */}
                    <IconButton
                      onClick={() => addToWishlist(product)}
                      sx={{
                        color: '#d32f2f',
                        '&:hover': {
                          color: '#b71c1c',
                          backgroundColor: '#ffe6e6',
                        },
                      }}
                    >
                      <FavoriteBorderIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <Box textAlign="center" mt={6}>
            <Typography variant="h6" color="text.secondary">
              No products found in this category.
            </Typography>
          </Box>
        )}
      </div>
    </Box>
  );
};

export default ShopPage;
