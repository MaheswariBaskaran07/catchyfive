import React, { createContext, useContext, useEffect, useState } from 'react';

// Types
export interface Product {
  id: number;
  name: string;
  img: string;
  price: number;
  quantity?: number;
}

// Context Types
interface CartContextType {
  cart: Product[];
  wishlist: Product[];
  cartItemCount: number;
  wishlistItemCount: number;
  cartTotal: number;
  addToCart: (item: Product) => void;
  addToWishlist: (item: Product) => void;
  removeFromCart: (id: number) => void;
  removeFromWishlist: (id: number) => void;
  setWishlist: React.Dispatch<React.SetStateAction<Product[]>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used inside CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [cart, wishlist]);

  const addToCart = (item: Product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const addToWishlist = (item: Product) => {
    setWishlist((prev) => {
      const exists = prev.find((p) => p.id === item.id);
      if (exists) return prev;
      return [...prev, item];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const removeFromWishlist = (id: number) => {
    setWishlist((prev) => prev.filter((p) => p.id !== id));
  };

  const cartItemCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const wishlistItemCount = wishlist.length;
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        cartItemCount,
        wishlistItemCount,
        cartTotal,
        addToCart,
        addToWishlist,
        removeFromCart,
        removeFromWishlist,
         setWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
