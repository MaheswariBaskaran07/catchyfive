import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCartContext } from '../components/CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Product {
  id: number;
  name: string;
  price: number;
  img: string;
  category: string;
}

const ShopPage: React.FC = () => {
  const { addToCart, addToWishlist } = useCartContext();
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');

  const [sort, setSort] = useState<string>('default');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<{ [id: number]: number }>({});
  const [hovered, setHovered] = useState<number | null>(null);
  const [wishlistStatus, setWishlistStatus] = useState<{ [id: number]: boolean }>({});

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

  const handleAddToWishlist = (product: Product) => {
    addToWishlist(product);
    setWishlistStatus((prev) => ({ ...prev, [product.id]: true }));

    setTimeout(() => {
      setWishlistStatus((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <h2 className="fw-bold mb-0">
          {categoryFilter
            ? `${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)} Collection`
            : 'Shop All Products'}
        </h2>

        <div>
          <label className="me-2">Sort By:</label>
          <select
            className="form-select form-select-sm d-inline-block"
            style={{ width: '160px' }}
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="row g-4">
        {filteredProducts.map((product) => {
          const cartBtnStyle: React.CSSProperties = {
            backgroundColor: hovered === product.id ? '#388e3c' : '#4CAF50',
            color: 'white',
            fontWeight: 600,
            textTransform: 'none',
            borderRadius: '10px',
            padding: '6px 12px',
            whiteSpace: 'nowrap',
            border: 'none',
            transition: 'background-color 0.3s ease',
            fontSize: '0.875rem',
          };

          return (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product.id}>
              <div className="card h-100 shadow-sm position-relative">
                <img
                  src={product.img}
                  alt={product.name}
                  className="card-img-top"
                  style={{ height: '180px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h6 className="fw-bold">{product.name}</h6>
                    <p className="text-muted mb-2">₹{product.price}</p>
                  </div>

                  <div className="d-flex align-items-center justify-content-between flex-wrap gap-1 mt-3">
                    <div className="d-flex align-items-center gap-2">
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => handleQuantityChange(product.id, -1)}
                      >
                        –
                      </button>
                      <span>{quantities[product.id] || 1}</span>
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => handleQuantityChange(product.id, 1)}
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="btn btn-sm"
                      onClick={() =>
                        addToCart({ ...product, quantity: quantities[product.id] || 1 })
                      }
                      onMouseEnter={() => setHovered(product.id)}
                      onMouseLeave={() => setHovered(null)}
                      style={cartBtnStyle}
                    >
                      Add to Cart
                    </button>

                    <div style={{ position: 'relative' }}>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleAddToWishlist(product)}
                      >
                        ❤
                      </button>

                      {/* Tooltip message near the heart icon */}
                      {wishlistStatus[product.id] && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '-28px',
                            right: 0,
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            padding: '3px 10px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            whiteSpace: 'nowrap',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                            zIndex: 10,
                          }}
                        >
                          Added to wishlist
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center mt-5">
          <p className="text-muted">No products found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
