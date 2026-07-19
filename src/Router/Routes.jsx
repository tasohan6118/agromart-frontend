import {
  createBrowserRouter,
} from "react-router-dom";
import RootLayout from "../Layouts/RootLayout/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Login/Register/Register";
import MarketPlace from "../Pages/MarketPlace/MarketPlace";
import SellerLogin from "../Components/Seller/SellerLogin";
import SellerRegister from "../Components/Seller/SellerRegister";
import SellerDashboard from "../Pages/Seller/SellerDashboard";
import DashboardHome from "../Pages/Seller/DashboardHome";
import AddProducts from "../Pages/Seller/AddProducts";
import ProductList from "../Pages/Seller/ProductList";
import Orders from "../Pages/Seller/Orders";
import SellerProfile from "../Pages/Seller/SellerProfile";
import Messages from "../Pages/Seller/Messages";
import AboutUs from "../Pages/Home/About Us/AboutUs";
import AllQuestions from "../Pages/Home/FAQ/AllQuestions";
import Contact from "../Pages/Home/Contact/Contact";
import MarketPrices from "../Pages/MarketPrices/MarketPrices";
import Features from "../Pages/Features/Features";
import Weather from "../Pages/Weather/Weather";
import AICropPlanning from "../Pages/AICropPlanning/AICropPlanning";
import Community from "../Pages/Community/Community";
import Cart from "../Pages/Cart/Cart";
import Checkout from "../Pages/Checkout/Checkout";
import Payment from "../Pages/Payment/Payment";
import PaymentSuccess from "../Pages/Payment/PaymentSuccess";
import PaymentFail from "../Pages/Payment/PaymentFail";
import PaymentCancel from "../Pages/Payment/PaymentCancel";
import PrivateRoute from "../Routes/PrivateRoute";
import CropCalendar from "../Pages/CropCalendar/CropCalendar";
import AIDiseaseDetection from "../Pages/AIDiseaseDetection/AIDiseaseDetection";
import Schemes from "../Pages/Schemes";
import SchemeDetail from "../Pages/SchemeDetail";
import AdminSchemes from "../Pages/AdminSchemes";
import Blog from "../Pages/Blog/Blog";
import BlogDetail from "../Pages/Blog/BlogDetail";














export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        loader: () => fetch('Services Card.json'),
        path: "/",
        Component: Home
      },
      {
        path: 'marketplace',
        element: <PrivateRoute><MarketPlace /></PrivateRoute>

      },
      {
        path: 'features',
        element: <PrivateRoute><Features /></PrivateRoute>
      },
      {
        path: 'ai-crop-planning',
        element: <PrivateRoute><AICropPlanning /></PrivateRoute>
      },
      {
        path: 'ai-disease-detection',
        element: <PrivateRoute><AIDiseaseDetection /></PrivateRoute>
      },
      {
        path: 'community',
        element: <PrivateRoute><Community /></PrivateRoute>
      },
      {
        path: 'about',
        Component: AboutUs
      },
      {
        path: 'all-questions',
        Component: AllQuestions
      },
      {
        path: 'contact',
        Component: Contact
      },
      {
        path: 'blog',
        Component: Blog
      },
      {
        path: 'blog/:id',
        Component: BlogDetail
      },
      {
        path: 'market-prices',
        element: <PrivateRoute><MarketPrices /></PrivateRoute>
      },
      {
        path: 'weather',
        element: <PrivateRoute><Weather /></PrivateRoute>
      },
      {
        path: 'cart',
        element: <PrivateRoute><Cart /></PrivateRoute>
      },
      {
        path: 'checkout',
        element: <PrivateRoute><Checkout /></PrivateRoute>
      },
      {
        path: 'payment',
        element: <PrivateRoute><Payment /></PrivateRoute>
      },
      {
        path: 'payment-success',
        element: <PrivateRoute><PaymentSuccess /></PrivateRoute>
      },
      {
        path: 'payment-fail',
        element: <PaymentFail />
      },
      {
        path: 'payment-cancel',
        element: <PaymentCancel />
      },
      {
        path: 'crop-calendar',
        element: <CropCalendar />
      },
      {
        path: 'schemes',
        element: <Schemes></Schemes>
      },
      {
        path: 'schemes/:id',
        element: <SchemeDetail></SchemeDetail>
      },
      {
        path: '/admin/schemes',
        element: <AdminSchemes></AdminSchemes>
      }




    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register
      },

    ]
  },
  {
    path: '/',
    children: [
      {
        path: "seller-login",
        Component: SellerLogin

      },
      {
        path: "seller-register",
        Component: SellerRegister
      }
    ]
  },
  {
    path: 'dashboard',
    element:
      <SellerDashboard></SellerDashboard>,

    children: [
      {
        path: 'add-product',
        Component: AddProducts
      },
      {
        path: 'product-list',
        Component: ProductList
      },
      {
        path: 'orders',
        Component: Orders
      },
      {
        path: 'messages',
        Component: Messages
      },
      {
        path: 'profile',
        Component: SellerProfile
      },

    ]

  }
]);


// import {
//   createBrowserRouter,
// } from "react-router-dom";
// import RootLayout from "../Layouts/RootLayout/RootLayout";
// import Home from "../Pages/Home/Home/Home";
// import AuthLayout from "../Layouts/AuthLayout";
// import Login from "../Pages/Authentication/Login/Login";
// import Register from "../Pages/Authentication/Login/Register/Register";
// import MarketPlace from "../Pages/MarketPlace/MarketPlace";
// import SellerLogin from "../Components/Seller/SellerLogin";
// import SellerRegister from "../Components/Seller/SellerRegister";
// import SellerDashboard from "../Pages/Seller/SellerDashboard";
// import DashboardHome from "../Pages/Seller/DashboardHome";
// import AddProducts from "../Pages/Seller/AddProducts";
// import ProductList from "../Pages/Seller/ProductList";
// import Orders from "../Pages/Seller/Orders";
// import SellerProfile from "../Pages/Seller/SellerProfile";
// import Messages from "../Pages/Seller/Messages";
// import AboutUs from "../Pages/Home/About Us/AboutUs";
// import AllQuestions from "../Pages/Home/FAQ/AllQuestions";
// import Contact from "../Pages/Home/Contact/Contact";
// import MarketPrices from "../Pages/MarketPrices/MarketPrices";
// import Features from "../Pages/Features/Features";
// import Weather from "../Pages/Weather/Weather";
// import AICropPlanning from "../Pages/AICropPlanning/AICropPlanning";
// import Community from "../Pages/Community/Community";
// import Cart from "../Pages/Cart/Cart";
// import Checkout from "../Pages/Checkout/Checkout";
// import Payment from "../Pages/Payment/Payment";
// import PaymentSuccess from "../Pages/Payment/PaymentSuccess";
// import PrivateRoute from "../Routes/PrivateRoute";
// import CropCalendar from "../Pages/CropCalendar/CropCalendar";
// import AIDiseaseDetection from "../Pages/AIDiseaseDetection/AIDiseaseDetection";
// import Schemes from "../Pages/Schemes";
// import SchemeDetail from "../Pages/SchemeDetail";
// import AdminSchemes from "../Pages/AdminSchemes";

// // ✅ Create a wrapper for Seller Dashboard protection
// const SellerRoute = ({ children }) => {
//   const token = localStorage.getItem('token');
//   const role = localStorage.getItem('role');
  
//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }
  
//   if (role !== 'seller') {
//     alert('Access denied. You must be a seller to access this page.');
//     return <Navigate to="/" replace />;
//   }
  
//   return children;
// };

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     Component: RootLayout,
//     children: [
//       {
//         index: true,
//         loader: () => fetch('Services Card.json'),
//         path: "/",
//         Component: Home
//       },
//       {
//         path: 'marketplace',
//         element: <PrivateRoute><MarketPlace /></PrivateRoute>
//       },
//       {
//         path: 'features',
//         element: <PrivateRoute><Features /></PrivateRoute>
//       },
//       {
//         path: 'ai-crop-planning',
//         element: <PrivateRoute><AICropPlanning /></PrivateRoute>
//       },
//       {
//         path: 'ai-disease-detection',
//         element: <PrivateRoute><AIDiseaseDetection /></PrivateRoute>
//       },
//       {
//         path: 'community',
//         element: <PrivateRoute><Community /></PrivateRoute>
//       },
//       {
//         path: 'about',
//         Component: AboutUs
//       },
//       {
//         path: 'all-questions',
//         Component: AllQuestions
//       },
//       {
//         path: 'contact',
//         Component: Contact
//       },
//       {
//         path: 'market-prices',
//         element: <PrivateRoute><MarketPrices /></PrivateRoute>
//       },
//       {
//         path: 'weather',
//         element: <PrivateRoute><Weather /></PrivateRoute>
//       },
//       {
//         path: 'cart',
//         element: <PrivateRoute><Cart /></PrivateRoute>
//       },
//       {
//         path: 'checkout',
//         element: <PrivateRoute><Checkout /></PrivateRoute>
//       },
//       {
//         path: 'payment',
//         element: <PrivateRoute><Payment /></PrivateRoute>
//       },
//       {
//         path: 'payment-success',
//         element: <PrivateRoute><PaymentSuccess /></PrivateRoute>
//       },
//       {
//         path: 'crop-calendar',
//         element: <CropCalendar />
//       },
//       {
//         path: 'schemes',
//         element: <Schemes />
//       },
//       {
//         path: 'schemes/:id',
//         element: <SchemeDetail />
//       },
//       {
//         path: '/admin/schemes',
//         element: <AdminSchemes />
//       }
//     ]
//   },
//   {
//     path: '/',
//     Component: AuthLayout,
//     children: [
//       {
//         path: 'login',
//         Component: Login
//       },
//       {
//         path: 'register',
//         Component: Register
//       }
//     ]
//   },
//   {
//     path: '/',
//     children: [
//       {
//         path: "seller-login",
//         Component: SellerLogin
//       },
//       {
//         path: "seller-register",
//         Component: SellerRegister
//       }
//     ]
//   },
//   // ✅ FIXED: Protected Seller Dashboard routes
//   {
//     path: 'dashboard',
//     element: (
//       <SellerRoute>
//         <SellerDashboard />
//       </SellerRoute>
//     ),
//     children: [
//       {
//         path: 'add-product',
//         Component: AddProducts
//       },
//       {
//         path: 'product-list',
//         Component: ProductList
//       },
//       {
//         path: 'orders',
//         Component: Orders
//       },
//       {
//         path: 'messages',
//         Component: Messages
//       },
//       {
//         path: 'profile',
//         Component: SellerProfile
//       }
//     ]
//   }
// ]);