import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { useCart } from '../../../../../Context/CartContext/CartContext';
import CartModal from './CartModal';
import userAuth from '../../../../../Hooks/userAuth';
import { useLanguage } from '../../../../../Context/LanguageContext/LanguageContext';
import { useTheme } from '../../../../../Context/ThemeContext/ThemeContext';

const Navbar = () => {
  const { getCartItemsCount } = useCart();
  const { user, logOut } = userAuth();
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const { toggleTheme, isDark } = useTheme();
  const cartCount = getCartItemsCount();

  const labels = {
    en: {
      home: 'Home',
      features: 'Features',
      marketplace: 'MarketPlace',
      about: 'About Us',
      contact: 'Contact Us',
      blog: 'Blog',
      seller: 'Seller',
      login: 'Login',
      logout: 'Logout',
      lang: 'বাংলা',
    },
    bn: {
      home: 'হোম',
      features: 'ফিচার',
      marketplace: 'মার্কেটপ্লেস',
      about: 'আমাদের সম্পর্কে',
      contact: 'যোগাযোগ',
      blog: 'ব্লগ',
      seller: 'বিক্রেতা',
      login: 'লগইন',
      logout: 'লগআউট',
      lang: 'English',
    },
  };

  const text = labels[language];

  const languageToggleBase = 'inline-flex items-center rounded-full border border-green-200 bg-green-50 p-1 shadow-sm';
  const languageToggleOption = 'min-w-14 px-2.5 py-1 text-xs font-semibold rounded-full transition-all duration-200';
  const activeLanguageOption = 'bg-green-600 text-white shadow';
  const inactiveLanguageOption = 'text-green-700 hover:bg-green-100';

  const handleLogout = async () => {
    try {
      await logOut();
      alert('Logged out successfully!');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      alert('Failed to logout');
    }
  };

  const navItems = <>
    <li><NavLink to="/">{text.home}</NavLink></li>
    <li><NavLink to="/features">{text.features}</NavLink></li>
    <li><NavLink to="marketplace">{text.marketplace}</NavLink></li>
    <li><NavLink to="/about">{text.about}</NavLink></li>
    <li><NavLink to="/blog">{text.blog}</NavLink></li>
    <li><NavLink to="/contact">{text.contact}</NavLink></li>


  </>


  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm rounded-2xl">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              {navItems}
            </ul>
          </div>
          <img className="w-20 h-16" src="/public/images/Logo.jpg" alt="" />
          <a className="btn btn-ghost text-xl -ml-4"><span className='text-green-400'>Agro</span>Mart</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navItems}
          </ul>
        </div>
        <div className="navbar-end gap-2">
          <div className={languageToggleBase} role="group" aria-label="Language switcher">
            <button
              type="button"
              onClick={() => setLanguage('en')}
              aria-pressed={language === 'en'}
              className={`${languageToggleOption} ${language === 'en' ? activeLanguageOption : inactiveLanguageOption}`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage('bn')}
              aria-pressed={language === 'bn'}
              className={`${languageToggleOption} ${language === 'bn' ? activeLanguageOption : inactiveLanguageOption}`}
            >
              বাংলা
            </button>
          </div>
          {/* Dark/Light Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle swap swap-rotate"
            aria-label="Toggle dark mode"
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? (
              /* Sun icon — shown in dark mode, click to go light */
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              /* Moon icon — shown in light mode, click to go dark */
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
          <button
            onClick={() => setIsCartOpen(true)}
            className="btn btn-ghost btn-circle relative"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
          <NavLink to="/seller-login" className="btn btn-outline btn-success btn-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {text.seller}
          </NavLink>

          {user ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-lg border border-green-200">
                <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm">
                  {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                </div>
                <div className="hidden md:block">
                  <p className="text-xs font-semibold text-gray-700">{user.displayName || 'User'}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="btn btn-outline btn-error btn-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                {text.logout}
              </button>
            </div>
          ) : (
            <NavLink to="/login" className="btn btn-outline btn-info btn-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {text.login}
            </NavLink>
          )}
        </div>
      </div>

      {isCartOpen && <CartModal onClose={() => setIsCartOpen(false)} />}
    </div>
  );
};

export default Navbar;