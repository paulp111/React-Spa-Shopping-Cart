import { Component } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './HomePage';
import ProductPage from './ProductPage';
import CartPage from './CartPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/product/:id",
    element: <ProductPage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
]);

class AppRouter extends Component {
  render() {
    return <RouterProvider router={router} />;
  }
}

export default AppRouter;
