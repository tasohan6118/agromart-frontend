import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from './SocialLogin/SocialLogin';
import userAuth from '../../../Hooks/userAuth';
import { useLanguage } from '../../../Context/LanguageContext/LanguageContext';

const Login = () => {

const {register,handleSubmit,formState:{errors}}=useForm();
const { signIn, user, loading: authLoading } = userAuth();
const navigate = useNavigate();
const location = useLocation();
const [loading, setLoading] = useState(false);
const { language } = useLanguage();

const from = location.state?.from?.pathname || '/';

useEffect(() => {
    if (!authLoading && user) {
        navigate(from, { replace: true });
    }
}, [authLoading, user, navigate, from]);

const text = {
    en: {
        welcome: 'Welcome Back',
        subtitle: 'Login to your account',
        email: 'Email Address',
        emailPlaceholder: 'Enter your email',
        emailRequired: 'Email is required',
        password: 'Password',
        passwordPlaceholder: 'Enter your password',
        passwordRequired: 'Password is required',
        passwordLength: 'Password must be 6 characters or longer',
        forgot: 'Forgot password?',
        loggingIn: 'Logging in...',
        login: 'Login',
        or: 'OR',
        noAccount: "Don't have an account?",
        register: 'Register',
    },
    bn: {
        welcome: 'আবার স্বাগতম',
        subtitle: 'আপনার অ্যাকাউন্টে প্রবেশ করুন',
        email: 'ইমেইল ঠিকানা',
        emailPlaceholder: 'আপনার ইমেইল লিখুন',
        emailRequired: 'ইমেইল প্রয়োজন',
        password: 'পাসওয়ার্ড',
        passwordPlaceholder: 'আপনার পাসওয়ার্ড লিখুন',
        passwordRequired: 'পাসওয়ার্ড প্রয়োজন',
        passwordLength: 'পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে',
        forgot: 'পাসওয়ার্ড ভুলে গেছেন?',
        loggingIn: 'লগইন হচ্ছে...',
        login: 'লগইন',
        or: 'অথবা',
        noAccount: 'অ্যাকাউন্ট নেই?',
        register: 'রেজিস্টার',
    },
}[language];

const onSubmit = async (data) => {
    setLoading(true);
    try {
        await signIn(data.email, data.password);
        alert(language === 'bn' ? 'লগইন সফল হয়েছে!' : 'Login successful!');
        navigate(from, { replace: true });
    } catch (error) {
        console.error('Login error:', error);
        alert(error.message || (language === 'bn' ? 'লগইন ব্যর্থ হয়েছে। অনুগ্রহ করে তথ্য যাচাই করুন।' : 'Login failed. Please check your credentials.'));
    } finally {
        setLoading(false);
    }
}



    if (authLoading || user) {
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500"></div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-xl p-6">
                <h2 className="text-2xl font-bold text-center mb-3 text-gray-800">{text.welcome}</h2>
                <p className="text-center text-gray-600 mb-5 text-sm">{text.subtitle}</p>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{text.email}</label>
                        <input 
                            type="email" 
                            {...register('email', {required: true})} 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition" 
                            placeholder={text.emailPlaceholder} 
                        />
                        {errors.email && <p className='text-red-500 text-sm mt-1'>{text.emailRequired}</p>}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{text.password}</label>
                        <input 
                            type="password" 
                            {...register('password',{required:true,minLength:6})} 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition" 
                            placeholder={text.passwordPlaceholder} 
                        />
                        {errors.password?.type === 'required' && <p className='text-red-500 text-sm mt-1'>{text.passwordRequired}</p>}
                        {errors.password?.type === 'minLength' && <p className='text-red-500 text-sm mt-1'>{text.passwordLength}</p>}
                    </div>

                    {/* Forgot Password */}
                    <div className="flex justify-end">
                        <a className="text-sm text-green-600 hover:text-green-700 hover:underline cursor-pointer">{text.forgot}</a>
                    </div>

                    {/* Login Button */}
                    <button 
                        disabled={loading}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg transition duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? text.loggingIn : text.login}
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-4">
                    <div className="flex-1 border-t border-gray-300"></div>
                    <span className="px-4 text-gray-500 text-sm">{text.or}</span>
                    <div className="flex-1 border-t border-gray-300"></div>
                </div>

                {/* Social Login */}
                <SocialLogin />

                {/* Register Link */}
                <p className="text-center text-gray-600 text-sm mt-4">
                    {text.noAccount} <Link to="/register" className="text-green-600 hover:text-green-700 font-semibold hover:underline">{text.register}</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;

// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { Link, useNavigate } from 'react-router';
// import SocialLogin from './SocialLogin/SocialLogin';
// import userAuth from '../../../Hooks/userAuth';
// import { useLanguage } from '../../../Context/LanguageContext/LanguageContext';

// const Login = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const { signIn } = userAuth(); // Firebase signIn (if you still need it)
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [role, setRole] = useState('user'); // 🆕 role state
//   const { language } = useLanguage();

//   const text = {
//     en: {
//       welcome: 'Welcome Back',
//       subtitle: 'Login to your account',
//       email: 'Email Address',
//       emailPlaceholder: 'Enter your email',
//       emailRequired: 'Email is required',
//       password: 'Password',
//       passwordPlaceholder: 'Enter your password',
//       passwordRequired: 'Password is required',
//       passwordLength: 'Password must be 6 characters or longer',
//       forgot: 'Forgot password?',
//       loggingIn: 'Logging in...',
//       login: 'Login',
//       or: 'OR',
//       noAccount: "Don't have an account?",
//       register: 'Register',
//       roleLabel: 'Login as',
//       userOption: 'User',
//       sellerOption: 'Seller',
//       loginError: 'Login failed. Please check your credentials.',
//     },
//     bn: {
//       welcome: 'আবার স্বাগতম',
//       subtitle: 'আপনার অ্যাকাউন্টে প্রবেশ করুন',
//       email: 'ইমেইল ঠিকানা',
//       emailPlaceholder: 'আপনার ইমেইল লিখুন',
//       emailRequired: 'ইমেইল প্রয়োজন',
//       password: 'পাসওয়ার্ড',
//       passwordPlaceholder: 'আপনার পাসওয়ার্ড লিখুন',
//       passwordRequired: 'পাসওয়ার্ড প্রয়োজন',
//       passwordLength: 'পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে',
//       forgot: 'পাসওয়ার্ড ভুলে গেছেন?',
//       loggingIn: 'লগইন হচ্ছে...',
//       login: 'লগইন',
//       or: 'অথবা',
//       noAccount: 'অ্যাকাউন্ট নেই?',
//       register: 'রেজিস্টার',
//       roleLabel: 'লগইন করুন হিসেবে',
//       userOption: 'ব্যবহারকারী',
//       sellerOption: 'বিক্রেতা',
//       loginError: 'লগইন ব্যর্থ হয়েছে। অনুগ্রহ করে তথ্য যাচাই করুন।',
//     },
//   }[language];

//   const onSubmit = async (data) => {
//     setLoading(true);
//     try {
//       // 1. (Optional) Sign in with Firebase – if you need Firebase token as well
//       // await signIn(data.email, data.password);

//       // 2. Call your backend /jwt endpoint with email, password, role
//       const response = await fetch('http://localhost:5000/jwt', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           email: data.email,
//           password: data.password,
//           role: role, // 🆕 role from selector
//         }),
//       });

//       const result = await response.json();

//       if (result.success) {
//         // ✅ Store token, role, and user info
//         localStorage.setItem('token', result.token);
//         localStorage.setItem('role', result.role);
//         localStorage.setItem('user', JSON.stringify(result.user));

//         // ✅ Redirect based on role
//         // if (result.role === 'seller') {
//         //   navigate('/seller-dashboard');
//         // } else {
//         //   navigate('/user-dashboard');
//         // }
// //         if (result.role === 'seller') {
// //   navigate('/dashboard/profile');  // ✅ Redirect to seller dashboard
// // } else {
// //   navigate('/');  // ✅ Redirect to home page for users
// // }
//       } else {
//         // ❌ Login failed – show error message
//         alert(result.message || text.loginError);
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       alert(text.loginError);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full max-w-md">
//       <div className="bg-white rounded-2xl shadow-xl p-6">
//         <h2 className="text-2xl font-bold text-center mb-3 text-gray-800">{text.welcome}</h2>
//         <p className="text-center text-gray-600 mb-5 text-sm">{text.subtitle}</p>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           {/* 🆕 Role Selection */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">{text.roleLabel}</label>
//             <select
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
//               required
//             >
//               <option value="user">{text.userOption}</option>
//               <option value="seller">{text.sellerOption}</option>
//             </select>
//           </div>

//           {/* Email Field */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">{text.email}</label>
//             <input
//               type="email"
//               {...register('email', { required: true })}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
//               placeholder={text.emailPlaceholder}
//             />
//             {errors.email && <p className="text-red-500 text-sm mt-1">{text.emailRequired}</p>}
//           </div>

//           {/* Password Field */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">{text.password}</label>
//             <input
//               type="password"
//               {...register('password', { required: true, minLength: 6 })}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
//               placeholder={text.passwordPlaceholder}
//             />
//             {errors.password?.type === 'required' && <p className="text-red-500 text-sm mt-1">{text.passwordRequired}</p>}
//             {errors.password?.type === 'minLength' && <p className="text-red-500 text-sm mt-1">{text.passwordLength}</p>}
//           </div>

//           {/* Forgot Password */}
//           <div className="flex justify-end">
//             <a className="text-sm text-green-600 hover:text-green-700 hover:underline cursor-pointer">{text.forgot}</a>
//           </div>

//           {/* Login Button */}
//           <button
//             disabled={loading}
//             className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg transition duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? text.loggingIn : text.login}
//           </button>
//         </form>

//         {/* Divider */}
//         <div className="flex items-center my-4">
//           <div className="flex-1 border-t border-gray-300"></div>
//           <span className="px-4 text-gray-500 text-sm">{text.or}</span>
//           <div className="flex-1 border-t border-gray-300"></div>
//         </div>

//         {/* Social Login */}
//         <SocialLogin />

//         {/* Register Link */}
//         <p className="text-center text-gray-600 text-sm mt-4">
//           {text.noAccount}{' '}
//           <Link to="/register" className="text-green-600 hover:text-green-700 font-semibold hover:underline">
//             {text.register}
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;