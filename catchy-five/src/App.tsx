import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { CartProvider } from './components/CartContext';
import CartPage from './pages/CartPage';
import NotFound from './pages/NotFound';
import WishlistPage from './pages/WishlistPage';

function App() {
  return (
    <>
    <CartProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> 
         <Route path="/cartpage"element={<CartPage />}/>
        <Route path="/wishlistpage"element={<WishlistPage />}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
      </CartProvider>
    </>
  );
}

export default App;



