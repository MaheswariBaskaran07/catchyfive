import type { RouteObject } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
 
import Signup from './pages/Signup';

import WishlistPage from './pages/WishlistPage';
import NotFound from './pages/NotFound';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
 
   {
    path: '/signup',
    element: <Signup /> 
  },
 
  {
    path: '/wishlist',      
    element: <WishlistPage />,
  },
  
  {
    path: '*',
    element: <NotFound />
  }
];

export default routes;
