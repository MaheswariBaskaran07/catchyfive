import React, { createContext, useContext, useEffect, useState } from 'react';

// Types
export interface Product {
  id: string; 
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
  removeFromCart: (id: string) => void; // 🔄 string
  removeFromWishlist: (id: string) => void; // 🔄 string
  setWishlist: React.Dispatch<React.SetStateAction<Product[]>>;
  updateCartItemQuantity: (id: string, quantity: number) => void; // 🔄 string
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

  // Save to localStorage on cart/wishlist change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [cart, wishlist]);

  // Add item to cart
  const addToCart = (item: Product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: (p.quantity || 0) + (item.quantity || 1) } : p
        );
      }
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  };

  // Update quantity of cart item
  const updateCartItemQuantity = (id: string, quantity: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
        .filter((item) => (item.quantity ?? 0) > 0)
    );
  };

  // Add to wishlist (no duplicates)
  const addToWishlist = (item: Product) => {
    setWishlist((prev) => {
      const exists = prev.find((p) => p.id === item.id);
      if (exists) return prev;
      return [...prev, item];
    });
  };

  // Remove item from cart
  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  // Remove item from wishlist
  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== id));
  };

  const cartItemCount = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const wishlistItemCount = wishlist.length;
  const cartTotal = cart.reduce((sum, item) => sum + item.price * (item.quantity || 0), 0);

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
        updateCartItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
