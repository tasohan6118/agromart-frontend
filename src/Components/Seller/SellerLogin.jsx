import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import userAuth from '../../Hooks/userAuth';
import useAxios from '../../Axios/useAxios';
import { useLanguage } from '../../Context/LanguageContext/LanguageContext';

const SellerLogin = () => {
    const {register,handleSubmit,formState:{errors}}=useForm();
    const {signIn, signInWithGoogle} = userAuth();
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState('');
    const axiosInstance = useAxios();
        const { language } = useLanguage();

        const text = language === 'bn'
            ? {
                    welcome: 'আবার স্বাগতম',
                    subtitle: 'আপনার পণ্য ও ব্যবসা এক জায়গা থেকে পরিচালনা করুন',
                    email: 'ইমেইল ঠিকানা',
                    emailPlaceholder: 'seller@example.com',
                    password: 'পাসওয়ার্ড',
                    passwordPlaceholder: 'আপনার পাসওয়ার্ড লিখুন',
                    forgot: 'পাসওয়ার্ড ভুলে গেছেন?',
                    login: 'লগইন',
                    or: 'অথবা',
                    google: 'গুগল দিয়ে চালিয়ে যান',
                    newToSelling: 'নতুন বিক্রি শুরু করছেন?',
                    startJourney: 'আপনার যাত্রা শুরু করুন →',
                    invalid: 'ইমেইল বা পাসওয়ার্ড সঠিক নয়। আবার চেষ্টা করুন।',
                    googleFailed: 'গুগল লগইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।',
                    emailRequired: 'ইমেইল প্রয়োজন',
                    passwordRequired: 'পাসওয়ার্ড প্রয়োজন',
                    passwordLength: 'পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে',
                }
            : {
                    welcome: 'Welcome Back',
                    subtitle: 'Manage your products & grow your business',
                    email: 'Email Address',
                    emailPlaceholder: 'seller@example.com',
                    password: 'Password',
                    passwordPlaceholder: 'Enter your password',
                    forgot: 'Forgot password?',
                    login: 'Access Seller Dashboard',
                    or: 'OR',
                    google: 'Continue with Google',
                    newToSelling: 'New to selling?',
                    startJourney: 'Start Your Journey →',
                    invalid: 'Invalid email or password. Please try again.',
                    googleFailed: 'Google login failed. Please try again.',
                    emailRequired: 'Email is required',
                    passwordRequired: 'Password is required',
                    passwordLength: 'Password must be 6 characters or longer',
                };

    const onSubmit=data=>{
        console.log(data);
        setLoginError('');
        
        signIn(data.email, data.password)
            .then(result => {
                console.log('Logged in:', result.user);
                // Redirect to seller dashboard
                navigate('/dashboard');
            })
            .catch(error => {
                console.error('Login error:', error);
                setLoginError(text.invalid);
            });
    }

    const handleGoogleLogin = () => {
        setLoginError('');
        signInWithGoogle()
            .then(async (result) => {
                console.log('Google login:', result.user);
                
                // Save seller info to backend
                const sellerInfo = {
                    email: result.user.email,
                    name: result.user.displayName,
                    role: 'seller',
                    created_at: new Date().toISOString(),
                    last_log_in: new Date().toISOString()
                };

                try {
                    const sellerRes = await axiosInstance.post('/sellers', sellerInfo);
                    console.log(sellerRes.data);
                } catch (error) {
                    console.log('Seller already exists or error:', error);
                }

                // Redirect to dashboard
                navigate('/dashboard');
            })
            .catch(error => {
                console.error('Google login error:', error);
                setLoginError(text.googleFailed);
            });
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-green-50 to-teal-100 flex items-center justify-center px-8 py-12 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-20 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

            <div className="w-full max-w-md relative z-10">
                <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
                    <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
                        {text.welcome}
                    </h2>
                    <p className="text-center text-gray-600 mb-6 text-sm">{text.subtitle}</p>
                    
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Login Error Message */}
                        {loginError && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                {loginError}
                            </div>
                        )}

                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">{text.email}</label>
                            <input 
                                type="email" 
                                {...register('email', {required: true})} 
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-gray-50/50" 
                                placeholder={text.emailPlaceholder} 
                            />
                            {errors.email && <p className='text-red-500 text-sm mt-1'>{text.emailRequired}</p>}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">{text.password}</label>
                            <input 
                                type="password" 
                                {...register('password',{required:true,minLength:6})} 
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-gray-50/50" 
                                placeholder={text.passwordPlaceholder} 
                            />
                            {errors.password?.type === 'required' && <p className='text-red-500 text-sm mt-1'>{text.passwordRequired}</p>}
                            {errors.password?.type === 'minLength' && <p className='text-red-500 text-sm mt-1'>{text.passwordLength}</p>}
                        </div>

                        {/* Forgot Password */}
                        <div className="flex justify-end">
                            <a className="text-sm text-green-600 hover:text-green-700 font-medium hover:underline cursor-pointer">{text.forgot}</a>
                        </div>

                        {/* Login Button */}
                        <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3.5 rounded-xl transition duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                            {text.login}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center my-6">
                        <div className="flex-1 border-t border-gray-300"></div>
                        <span className="px-4 text-gray-500 text-sm">{text.or}</span>
                        <div className="flex-1 border-t border-gray-300"></div>
                    </div>

                    {/* Google Login Button */}
                    <button 
                        onClick={handleGoogleLogin}
                        className="w-full bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 rounded-xl transition duration-200 flex items-center justify-center gap-3 shadow-sm hover:shadow-md"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        {text.google}
                    </button>

                    {/* Register Link */}
                    <div className="text-center mt-6">
                        <p className="text-gray-600 text-sm">
                            {text.newToSelling} 
                            <Link to="/seller-register" className="text-green-600 hover:text-green-700 font-bold hover:underline ml-1">
                                {text.startJourney}
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerLogin;