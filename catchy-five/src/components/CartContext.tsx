import { createContext, useContext, useState, ReactNode } from 'react';

type CartContextType = {
  cartItems: number;
  wishlistItems: number;
  cartTotal: number;
  addToCart: (amount: number) => void;
  addToWishlist: () => void;
  resetCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState(0);
  const [wishlistItems, setWishlistItems] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const addToCart = (amount: number) => {
    setCartItems(prev => prev + 1);
    setCartTotal(prev => prev + amount);
  };

  const addToWishlist = () => {
    setWishlistItems(prev => prev + 1);
  };

  const resetCart = () => {
    setCartItems(0);
    setWishlistItems(0);
    setCartTotal(0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        wishlistItems,
        cartTotal,
        addToCart,
        addToWishlist,
        resetCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};
