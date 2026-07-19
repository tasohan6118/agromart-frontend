import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router";
import { router } from './Router/Routes.jsx';
import AuthProvider from './Context/AuthContext/AuthProvider.jsx';
import CartProvider from './Context/CartContext/CartProvider.jsx';
import { LanguageProvider } from './Context/LanguageContext/LanguageProvider.jsx';
import ThemeProvider from './Context/ThemeContext/ThemeProvider.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='max-w-7xl mx-auto'>
     <ThemeProvider>
      <LanguageProvider>
       <AuthProvider>
         <CartProvider>
           <RouterProvider router={router} />
         </CartProvider>
       </AuthProvider>
      </LanguageProvider>
     </ThemeProvider>
    </div>
  </StrictMode>,
)
