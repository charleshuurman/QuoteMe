/**
 * This file is the entry point for the React application. It sets up the client-side routing using 
 * React Router's createBrowserRouter and RouterProvider components, defining routes for the application 
 * and associating them with their respective React components. The routing configuration includes 
 * paths for the homepage, shop, product details, user authentication (login and signup), order 
 * success page, order history, user profile, journal, dashboard, emotion chart, and quote creation.
 * 
 * The application's global CSS is also imported here, and the entire app is rendered into the DOM 
 * at the 'root' div, enabling the structured and navigable user interface driven by defined routes.
 */

import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Detail from './pages/Detail';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Success from './pages/Success';
import OrderHistory from './pages/OrderHistory';

import Profile from './pages/Profile';
import Journal from './pages/Journal';
import EmotionChart from './pages/EmotionChart';
import Dashboard from './pages/Dashboard';
import CreateQuote from './pages/CreateQuote';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    error: <NoMatch />,
    children: [
      {
        index: true, 
        element: <Home />
      }, {
        path: '/shop',
        element: <Shop />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/success',
        element: <Success />
      }, {
        path: '/orderHistory',
        element: <OrderHistory />
      }, {
        path: '/products/:id',
        element: <Detail />
      }, {
        path: '/journal',
        element: <Journal />
      }, {
        path: '/dashboard',
        element: <Dashboard />
      }, {
        path: '/EmotionChart',
        element: <EmotionChart />
      }, {
        path: '/profile',
        element: <Profile />
      }, {
        path: '/createquote',
        element: <CreateQuote />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
