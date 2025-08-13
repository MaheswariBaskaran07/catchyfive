import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { CartProvider } from './components/CartContext';
import CartPage from './pages/CartPage';
import CategoryPage from './pages/CategoryPage';
import AddAddress from './pages/AddAddress';
import NotFound from './pages/NotFound';
import WishlistPage from './pages/WishlistPage';
import AboutPage from './pages/AboutPage';
import ShopPage from './pages/ShopPage';
import ContactPage from './pages/ContactPage';
import OffersPage from './pages/OffersPage';
import SearchResults from './pages/SearchResults';
import CheckoutPage from './pages/CheckoutPage';
import SaveAddress from './components/SaveAddress';
import DeliveryInfo from './pages/DeliveryInfo';
import ForgotPassword from './pages/ForgotPassword';
import SettingsPage from './components/SettingsPage';

function App() {
  return (
    <>
    <CartProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> 
        <Route path="/add-address" element={<AddAddress />} />
         <Route path="/category/:categoryName" element={<CategoryPage />} />
         <Route path="/cartpage"element={<CartPage />}/>
        <Route path="/wishlistpage"element={<WishlistPage />}/>
        <Route path="/about" element={<AboutPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/checkout" element={<CheckoutPage />} /> 
        <Route path="/save-address" element={<SaveAddress />} />
        <Route path="/add-address/:id" element={<AddAddress />} />
        <Route path="/delivery-info" element={<DeliveryInfo />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </CartProvider>
    </>
  );
}

export default App;



