// import React from 'react';
// import { useNavigate } from 'react-router';
// import { useLanguage } from '../../Context/LanguageContext/LanguageContext';



// const Features = () => {
//     const navigate = useNavigate();
//         const { language } = useLanguage();

//         const text = language === 'bn'
//             ? {
//                     title: 'আমাদের ফিচার',
//                     subtitle: 'কৃষক ও ক্রেতাদের সাহায্যের জন্য তৈরি টুলগুলো অন্বেষণ করুন',
//                     marketTitle: 'দৈনিক বাজারদর',
//                     marketDesc: 'বাংলাদেশের বিভিন্ন বাজারের রিয়েল-টাইম পণ্যদর প্রতিদিন আপডেটসহ দেখুন।',
//                     weatherTitle: 'আবহাওয়া পূর্বাভাস',
//                     weatherDesc: 'ভাল সিদ্ধান্তের জন্য সঠিক আবহাওয়ার পূর্বাভাস ও কৃষি পরামর্শ নিন।',
//                     aiTitle: 'এআই ফসল পরিকল্পনা',
//                     aiDesc: 'মাটি, আবহাওয়া এবং বাজার পরিস্থিতি দেখে এআই-ভিত্তিক ফসল পরামর্শ পান।',
//                     assistantTitle: 'এআই সহকারী',
//                     assistantDesc: 'কৃষি প্রশ্নের দ্রুত উত্তর ও বিশেষজ্ঞ পরামর্শ পেতে আমাদের এআই সহকারীর সাথে কথা বলুন।',
//                     communityTitle: 'কমিউনিটি সাপোর্ট',
//                     communityDesc: 'সহ-কৃষকদের সাথে যুক্ত হন, অভিজ্ঞতা ভাগ করুন এবং সাহায্য নিন।',
//                 }
//             : {
//                     title: 'Our Features',
//                     subtitle: 'Explore tools designed to help farmers and buyers',
//                     marketTitle: 'Daily Market Prices',
//                     marketDesc: 'Check real-time commodity prices from markets across Bangladesh with daily updates.',
//                     weatherTitle: 'Weather Forecasting',
//                     weatherDesc: 'Get accurate weather predictions and farming recommendations for better decisions.',
//                     aiTitle: 'AI Crop Planning',
//                     aiDesc: 'Get AI-powered crop recommendations based on soil, weather, and market conditions.',
//                     assistantTitle: 'AI Assistant',
//                     assistantDesc: 'Chat with our AI assistant to get instant answers to your farming questions and expert advice.',
//                     communityTitle: 'Community Support',
//                     communityDesc: 'Connect with fellow farmers, share experiences, and get support from our vibrant community.',
//                 };

//     const handleMarketPricesClick = () => {
//         // Set a flag in sessionStorage to allow access
//         sessionStorage.setItem('marketPricesAccess', 'true');
//         navigate('/market-prices');
//     };

//     const handleWeatherClick = () => {
//         navigate('/weather');
//     };

//     const handleAICropPlanningClick = () => {
//         navigate('/ai-crop-planning');
//     };

//     const handleAIAssistantClick = () => {
//         // Functionality will be added later
//         console.log('AI Assistant clicked - Coming soon!');
//     };

//     const handleCommunitySupportClick = () => {
//         navigate('/community');
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 py-16">
//             <div className="container mx-auto px-4">
//                 <h1 className="text-4xl font-bold text-center mb-3 text-gray-800">{text.title}</h1>
//                 <p className="text-center text-gray-600 mb-12">{text.subtitle}</p>

//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
//                     {/* Daily Market Prices Card */}
//                     <div 
//                         onClick={handleMarketPricesClick} 
//                         className="bg-white border-2 border-green-200 rounded-lg p-6 cursor-pointer hover:border-green-500 hover:shadow-md transition-all duration-300"
//                     >
//                         <div className="flex items-center gap-4 mb-4">
//                             <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center">
//                                 <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                                 </svg>
//                             </div>
//                             <h3 className="text-xl font-bold text-gray-800">{text.marketTitle}</h3>
//                         </div>

//                         <p className="text-gray-600 text-sm mb-4">
//                             {text.marketDesc}
//                         </p>

//                         <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//                             <div className="flex gap-4 text-xs text-gray-500">
//                                 <span>🏪 70 Markets</span>
//                                 <span>📦 80+ Products</span>
//                             </div>
//                             <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                             </svg>
//                         </div>
//                     </div>

//                     {/* Weather Forecasting Card */}
//                     <div 
//                         onClick={handleWeatherClick}
//                         className="bg-white border-2 border-blue-200 rounded-lg p-6 cursor-pointer hover:border-blue-500 hover:shadow-md transition-all duration-300"
//                     >
//                         <div className="flex items-center gap-4 mb-4">
//                             <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center">
//                                 <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
//                                 </svg>
//                             </div>
//                             <h3 className="text-xl font-bold text-gray-800">{text.weatherTitle}</h3>
//                         </div>

//                         <p className="text-gray-600 text-sm mb-4">
//                             {text.weatherDesc}
//                         </p>

//                         <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//                             <div className="flex gap-4 text-xs text-gray-500">
//                                 <span>🌤️ 5-Day Forecast</span>
//                                 <span>🌾 Farm Tips</span>
//                             </div>
//                             <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                             </svg>
//                         </div>
//                     </div>

//                     {/* AI Crop Planning Card */}
//                     <div 
//                         onClick={handleAICropPlanningClick}
//                         className="bg-white border-2 border-purple-200 rounded-lg p-6 cursor-pointer hover:border-purple-500 hover:shadow-md transition-all duration-300"
//                     >
//                         <div className="flex items-center gap-4 mb-4">
//                             <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center">
//                                 <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
//                                 </svg>
//                             </div>
//                             <h3 className="text-xl font-bold text-gray-800">{text.aiTitle}</h3>
//                         </div>

//                         <p className="text-gray-600 text-sm mb-4">
//                             {text.aiDesc}
//                         </p>

//                         <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//                             <div className="flex gap-4 text-xs text-gray-500">
//                                 <span>🤖 AI Powered</span>
//                                 <span>🌱 Smart Tips</span>
//                             </div>
//                             <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                             </svg>
//                         </div>
//                     </div>

//                     {/* AI Assistant Card */}
//                     <div 
//                         onClick={handleAIAssistantClick}
//                         className="bg-white border-2 border-orange-200 rounded-lg p-6 cursor-pointer hover:border-orange-500 hover:shadow-md transition-all duration-300"
//                     >
//                         <div className="flex items-center gap-4 mb-4">
//                             <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center">
//                                 <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
//                                 </svg>
//                             </div>
//                             <h3 className="text-xl font-bold text-gray-800">{text.assistantTitle}</h3>
//                         </div>

//                         <p className="text-gray-600 text-sm mb-4">
//                             {text.assistantDesc}
//                         </p>

//                         <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//                             <div className="flex gap-4 text-xs text-gray-500">
//                                 <span>💬 24/7 Chat</span>
//                                 <span>🎓 Expert Help</span>
//                             </div>
//                             <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                             </svg>
//                         </div>
//                     </div>


//                     {/* Smart Crop Calendar Card */}
// <div
//     onClick={handleCropCalendarClick}
//     className="bg-white border-2 border-emerald-200 rounded-lg p-6 cursor-pointer hover:border-emerald-500 hover:shadow-md transition-all duration-300"
// >
//     <div className="flex items-center gap-4 mb-4">
//         <div className="w-14 h-14 bg-emerald-100 rounded-lg flex items-center justify-center">
//             <svg
//                 className="w-8 h-8 text-emerald-600"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//             >
//                 <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M8 7V3m8 4V3M4 11h16M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"
//                 />
//             </svg>
//         </div>

//         <h3 className="text-xl font-bold text-gray-800">
//             {language === "bn"
//                 ? "স্মার্ট ফসল ক্যালেন্ডার"
//                 : "Smart Crop Calendar"}
//         </h3>
//     </div>

//     <p className="text-gray-600 text-sm mb-4">
//         {language === "bn"
//             ? "জেলা অনুযায়ী কোন মাসে কোন ফসল বপন, পরিচর্যা ও সংগ্রহ করতে হবে তা জানুন।"
//             : "Know the best sowing, fertilizing, irrigation and harvesting schedule based on your district."}
//     </p>

//     <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//         <div className="flex gap-4 text-xs text-gray-500">
//             <span>🌾 50+ Crops</span>
//             <span>📅 12 Months</span>
//         </div>

//         <svg
//             className="w-5 h-5 text-emerald-600"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//         >
//             <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M13 7l5 5m0 0l-5 5m5-5H6"
//             />
//         </svg>
//     </div>
// </div>

//                     {/* Community Support Card */}
//                     <div 
//                         onClick={handleCommunitySupportClick}
//                         className="bg-white border-2 border-teal-200 rounded-lg p-6 cursor-pointer hover:border-teal-500 hover:shadow-md transition-all duration-300"
//                     >
//                         <div className="flex items-center gap-4 mb-4">
//                             <div className="w-14 h-14 bg-teal-100 rounded-lg flex items-center justify-center">
//                                 <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//                                 </svg>
//                             </div>
//                             <h3 className="text-xl font-bold text-gray-800">{text.communityTitle}</h3>
//                         </div>

//                         <p className="text-gray-600 text-sm mb-4">
//                             {text.communityDesc}
//                         </p>

//                         <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//                             <div className="flex gap-4 text-xs text-gray-500">
//                                 <span>👥 Active Community</span>
//                                 <span>🤝 Help & Share</span>
//                             </div>
//                             <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                             </svg>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Features;


// 2 no part


// import React from 'react';
// import { useNavigate } from 'react-router';
// import { useLanguage } from '../../Context/LanguageContext/LanguageContext';

// const Features = () => {
//     const navigate = useNavigate();
//     const { language } = useLanguage();

//     const text = language === 'bn'
//         ? {
//             title: 'আমাদের ফিচার',
//             subtitle: 'কৃষক ও ক্রেতাদের সাহায্যের জন্য তৈরি টুলগুলো অন্বেষণ করুন',
//             marketTitle: 'দৈনিক বাজারদর',
//             marketDesc: 'বাংলাদেশের বিভিন্ন বাজারের রিয়েল-টাইম পণ্যদর প্রতিদিন আপডেটসহ দেখুন।',
//             weatherTitle: 'আবহাওয়া পূর্বাভাস',
//             weatherDesc: 'ভাল সিদ্ধান্তের জন্য সঠিক আবহাওয়ার পূর্বাভাস ও কৃষি পরামর্শ নিন।',
//             aiTitle: 'এআই ফসল পরিকল্পনা',
//             aiDesc: 'মাটি, আবহাওয়া এবং বাজার পরিস্থিতি দেখে এআই-ভিত্তিক ফসল পরামর্শ পান।',
//             assistantTitle: 'এআই সহকারী',
//             assistantDesc: 'কৃষি প্রশ্নের দ্রুত উত্তর ও বিশেষজ্ঞ পরামর্শ পেতে আমাদের এআই সহকারীর সাথে কথা বলুন।',
//             communityTitle: 'কমিউনিটি সাপোর্ট',
//             communityDesc: 'সহ-কৃষকদের সাথে যুক্ত হন, অভিজ্ঞতা ভাগ করুন এবং সাহায্য নিন।',
//             cropCalendarTitle: 'স্মার্ট ফসল ক্যালেন্ডার',
//             cropCalendarDesc: 'জেলা অনুযায়ী কোন মাসে কোন ফসল বপন, পরিচর্যা ও সংগ্রহ করতে হবে তা জানুন।',
//             diseaseTitle: 'এআই রোগ নির্ণয়',
//             diseaseDesc: 'ফসলের পাতার ছবি আপলোড করে এআই রোগ নির্ণয় ও তাত্ক্ষণিক প্রতিকার পান।',
//         }
//         : {
//             title: 'Our Features',
//             subtitle: 'Explore tools designed to help farmers and buyers',
//             marketTitle: 'Daily Market Prices',
//             marketDesc: 'Check real-time commodity prices from markets across Bangladesh with daily updates.',
//             weatherTitle: 'Weather Forecasting',
//             weatherDesc: 'Get accurate weather predictions and farming recommendations for better decisions.',
//             aiTitle: 'AI Crop Planning',
//             aiDesc: 'Get AI-powered crop recommendations based on soil, weather, and market conditions.',
//             assistantTitle: 'AI Assistant',
//             assistantDesc: 'Chat with our AI assistant to get instant answers to your farming questions and expert advice.',
//             communityTitle: 'Community Support',
//             communityDesc: 'Connect with fellow farmers, share experiences, and get support from our vibrant community.',
//             cropCalendarTitle: 'Smart Crop Calendar',
//             cropCalendarDesc: 'Know the best sowing, fertilizing, irrigation and harvesting schedule based on your district.',
//             diseaseTitle: 'AI Disease Detection',
//             diseaseDesc: 'Upload an image of your crop leaf for instant disease identification & solutions.',
//         };

//     const handleMarketPricesClick = () => {
//         sessionStorage.setItem('marketPricesAccess', 'true');
//         navigate('/market-prices');
//     };

//     const handleWeatherClick = () => {
//         navigate('/weather');
//     };

//     const handleAICropPlanningClick = () => {
//         navigate('/ai-crop-planning');
//     };

//     const handleAIAssistantClick = () => {
//         console.log('AI Assistant clicked - Coming soon!');
//     };

//     const handleCommunitySupportClick = () => {
//         navigate('/community');
//     };

//     // ✅ ADD THIS MISSING HANDLER
//     const handleCropCalendarClick = () => {
//         navigate('/crop-calendar'); // make sure this route exists in your router
//     };

//     const handleAIDiseaseDetectionClick = () => {
//         navigate('/ai-disease-detection');
//     };


//     return (
//         <div className="min-h-screen bg-gray-50 py-16">
//             <div className="container mx-auto px-4">
//                 <h1 className="text-4xl font-bold text-center mb-3 text-gray-800">{text.title}</h1>
//                 <p className="text-center text-gray-600 mb-12">{text.subtitle}</p>

//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
//                     {/* Daily Market Prices Card */}
//                     <div
//                         onClick={handleMarketPricesClick}
//                         className="bg-white border-2 border-green-200 rounded-lg p-6 cursor-pointer hover:border-green-500 hover:shadow-md transition-all duration-300"
//                     >
//                         <div className="flex items-center gap-4 mb-4">
//                             <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center">
//                                 <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                                 </svg>
//                             </div>
//                             <h3 className="text-xl font-bold text-gray-800">{text.marketTitle}</h3>
//                         </div>

//                         <p className="text-gray-600 text-sm mb-4">
//                             {text.marketDesc}
//                         </p>

//                         <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//                             <div className="flex gap-4 text-xs text-gray-500">
//                                 <span>🏪 70 Markets</span>
//                                 <span>📦 80+ Products</span>
//                             </div>
//                             <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                             </svg>
//                         </div>
//                     </div>

//                     {/* Weather Forecasting Card */}
//                     <div
//                         onClick={handleWeatherClick}
//                         className="bg-white border-2 border-blue-200 rounded-lg p-6 cursor-pointer hover:border-blue-500 hover:shadow-md transition-all duration-300"
//                     >
//                         <div className="flex items-center gap-4 mb-4">
//                             <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center">
//                                 <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
//                                 </svg>
//                             </div>
//                             <h3 className="text-xl font-bold text-gray-800">{text.weatherTitle}</h3>
//                         </div>

//                         <p className="text-gray-600 text-sm mb-4">
//                             {text.weatherDesc}
//                         </p>

//                         <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//                             <div className="flex gap-4 text-xs text-gray-500">
//                                 <span>🌤️ 5-Day Forecast</span>
//                                 <span>🌾 Farm Tips</span>
//                             </div>
//                             <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                             </svg>
//                         </div>
//                     </div>

//                     {/* AI Crop Planning Card */}
//                     <div
//                         onClick={handleAICropPlanningClick}
//                         className="bg-white border-2 border-purple-200 rounded-lg p-6 cursor-pointer hover:border-purple-500 hover:shadow-md transition-all duration-300"
//                     >
//                         <div className="flex items-center gap-4 mb-4">
//                             <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center">
//                                 <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
//                                 </svg>
//                             </div>
//                             <h3 className="text-xl font-bold text-gray-800">{text.aiTitle}</h3>
//                         </div>

//                         <p className="text-gray-600 text-sm mb-4">
//                             {text.aiDesc}
//                         </p>

//                         <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//                             <div className="flex gap-4 text-xs text-gray-500">
//                                 <span>🤖 AI Powered</span>
//                                 <span>🌱 Smart Tips</span>
//                             </div>
//                             <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                             </svg>
//                         </div>
//                     </div>

//                     {/* AI Assistant Card */}
//                     <div
//                         onClick={handleAIAssistantClick}
//                         className="bg-white border-2 border-orange-200 rounded-lg p-6 cursor-pointer hover:border-orange-500 hover:shadow-md transition-all duration-300"
//                     >
//                         <div className="flex items-center gap-4 mb-4">
//                             <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center">
//                                 <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
//                                 </svg>
//                             </div>
//                             <h3 className="text-xl font-bold text-gray-800">{text.assistantTitle}</h3>
//                         </div>

//                         <p className="text-gray-600 text-sm mb-4">
//                             {text.assistantDesc}
//                         </p>

//                         <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//                             <div className="flex gap-4 text-xs text-gray-500">
//                                 <span>💬 24/7 Chat</span>
//                                 <span>🎓 Expert Help</span>
//                             </div>
//                             <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                             </svg>
//                         </div>
//                     </div>

//                     {/* ✅ Smart Crop Calendar Card – now with proper text and handler */}
//                     <div
//                         onClick={handleCropCalendarClick}
//                         className="bg-white border-2 border-emerald-200 rounded-lg p-6 cursor-pointer hover:border-emerald-500 hover:shadow-md transition-all duration-300"
//                     >
//                         <div className="flex items-center gap-4 mb-4">
//                             <div className="w-14 h-14 bg-emerald-100 rounded-lg flex items-center justify-center">
//                                 <svg
//                                     className="w-8 h-8 text-emerald-600"
//                                     fill="none"
//                                     stroke="currentColor"
//                                     viewBox="0 0 24 24"
//                                 >
//                                     <path
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         strokeWidth={2}
//                                         d="M8 7V3m8 4V3M4 11h16M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"
//                                     />
//                                 </svg>
//                             </div>
//                             <h3 className="text-xl font-bold text-gray-800">
//                                 {text.cropCalendarTitle}
//                             </h3>
//                         </div>

//                         <p className="text-gray-600 text-sm mb-4">
//                             {text.cropCalendarDesc}
//                         </p>

//                         <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//                             <div className="flex gap-4 text-xs text-gray-500">
//                                 <span>🌾 50+ Crops</span>
//                                 <span>📅 12 Months</span>
//                             </div>
//                             <svg
//                                 className="w-5 h-5 text-emerald-600"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                             >
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth={2}
//                                     d="M13 7l5 5m0 0l-5 5m5-5H6"
//                                 />
//                             </svg>
//                         </div>
//                     </div>

//                     {/* AI Disease Detection Card */}
//                     <div
//                         onClick={handleAIDiseaseDetectionClick}
//                         className="bg-white border-2 border-rose-200 rounded-lg p-6 cursor-pointer hover:border-rose-500 hover:shadow-md transition-all duration-300"
//                     >
//                         <div className="flex items-center gap-4 mb-4">
//                             <div className="w-14 h-14 bg-rose-100 rounded-lg flex items-center justify-center">
//                                 <svg className="w-8 h-8 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                                 </svg>
//                             </div>
//                             <h3 className="text-xl font-bold text-gray-800">{text.diseaseTitle}</h3>
//                         </div>

//                         <p className="text-gray-600 text-sm mb-4">
//                             {text.diseaseDesc}
//                         </p>

//                         <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//                             <div className="flex gap-4 text-xs text-gray-500">
//                                 <span>🤖 AI Diagnosis</span>
//                                 <span>📸 Camera / Upload</span>
//                             </div>
//                             <svg className="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                             </svg>
//                         </div>
//                     </div>

//                     {/* Community Support Card */}
//                     <div
//                         onClick={handleCommunitySupportClick}
//                         className="bg-white border-2 border-teal-200 rounded-lg p-6 cursor-pointer hover:border-teal-500 hover:shadow-md transition-all duration-300"
//                     >
//                         <div className="flex items-center gap-4 mb-4">
//                             <div className="w-14 h-14 bg-teal-100 rounded-lg flex items-center justify-center">
//                                 <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//                                 </svg>
//                             </div>
//                             <h3 className="text-xl font-bold text-gray-800">{text.communityTitle}</h3>
//                         </div>

//                         <p className="text-gray-600 text-sm mb-4">
//                             {text.communityDesc}
//                         </p>

//                         <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//                             <div className="flex gap-4 text-xs text-gray-500">
//                                 <span>👥 Active Community</span>
//                                 <span>🤝 Help & Share</span>
//                             </div>
//                             <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                             </svg>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Features;


// import React from 'react';
// import { useNavigate } from 'react-router';
// import { useLanguage } from '../../Context/LanguageContext/LanguageContext';



// const Features = () => {
//     const navigate = useNavigate();
//         const { language } = useLanguage();

//         const text = language === 'bn'
//             ? {
//                     title: 'আমাদের ফিচার',
//                     subtitle: 'কৃষক ও ক্রেতাদের সাহায্যের জন্য তৈরি টুলগুলো অন্বেষণ করুন',
//                     marketTitle: 'দৈনিক বাজারদর',
//                     marketDesc: 'বাংলাদেশের বিভিন্ন বাজারের রিয়েল-টাইম পণ্যদর প্রতিদিন আপডেটসহ দেখুন।',
//                     weatherTitle: 'আবহাওয়া পূর্বাভাস',
//                     weatherDesc: 'ভাল সিদ্ধান্তের জন্য সঠিক আবহাওয়ার পূর্বাভাস ও কৃষি পরামর্শ নিন।',
//                     aiTitle: 'এআই ফসল পরিকল্পনা',
//                     aiDesc: 'মাটি, আবহাওয়া এবং বাজার পরিস্থিতি দেখে এআই-ভিত্তিক ফসল পরামর্শ পান।',
//                     assistantTitle: 'এআই সহকারী',
//                     assistantDesc: 'কৃষি প্রশ্নের দ্রুত উত্তর ও বিশেষজ্ঞ পরামর্শ পেতে আমাদের এআই সহকারীর সাথে কথা বলুন।',
//                     communityTitle: 'কমিউনিটি সাপোর্ট',
//                     communityDesc: 'সহ-কৃষকদের সাথে যুক্ত হন, অভিজ্ঞতা ভাগ করুন এবং সাহায্য নিন।',
//                 }
//             : {
//                     title: 'Our Features',
//                     subtitle: 'Explore tools designed to help farmers and buyers',
//                     marketTitle: 'Daily Market Prices',
//                     marketDesc: 'Check real-time commodity prices from markets across Bangladesh with daily updates.',
//                     weatherTitle: 'Weather Forecasting',
//                     weatherDesc: 'Get accurate weather predictions and farming recommendations for better decisions.',
//                     aiTitle: 'AI Crop Planning',
//                     aiDesc: 'Get AI-powered crop recommendations based on soil, weather, and market conditions.',
//                     assistantTitle: 'AI Assistant',
//                     assistantDesc: 'Chat with our AI assistant to get instant answers to your farming questions and expert advice.',
//                     communityTitle: 'Community Support',
//                     communityDesc: 'Connect with fellow farmers, share experiences, and get support from our vibrant community.',
//                 };

//     const handleMarketPricesClick = () => {
//         // Set a flag in sessionStorage to allow access
//         sessionStorage.setItem('marketPricesAccess', 'true');
//         navigate('/market-prices');
//     };

//     const handleWeatherClick = () => {
//         navigate('/weather');
//     };

//     const handleAICropPlanningClick = () => {
//         navigate('/ai-crop-planning');
//     };

//     const handleAIAssistantClick = () => {
//         // Functionality will be added later
//         console.log('AI Assistant clicked - Coming soon!');
//     };

//     const handleCommunitySupportClick = () => {
//         navigate('/community');
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 py-16">
//             <div className="container mx-auto px-4">
//                 <h1 className="text-4xl font-bold text-center mb-3 text-gray-800">{text.title}</h1>
//                 <p className="text-center text-gray-600 mb-12">{text.subtitle}</p>

//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
//                     {/* Daily Market Prices Card */}
//                     <div 
//                         onClick={handleMarketPricesClick} 
//                         className="bg-white border-2 border-green-200 rounded-lg p-6 cursor-pointer hover:border-green-500 hover:shadow-md transition-all duration-300"
//                     >
//                         <div className="flex items-center gap-4 mb-4">
//                             <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center">
//                                 <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                                 </svg>
//                             </div>
//                             <h3 className="text-xl font-bold text-gray-800">{text.marketTitle}</h3>
//                         </div>

//                         <p className="text-gray-600 text-sm mb-4">
//                             {text.marketDesc}
//                         </p>

//                         <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//                             <div className="flex gap-4 text-xs text-gray-500">
//                                 <span>🏪 70 Markets</span>
//                                 <span>📦 80+ Products</span>
//                             </div>
//                             <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                             </svg>
//                         </div>
//                     </div>

//                     {/* Weather Forecasting Card */}
//                     <div 
//                         onClick={handleWeatherClick}
//                         className="bg-white border-2 border-blue-200 rounded-lg p-6 cursor-pointer hover:border-blue-500 hover:shadow-md transition-all duration-300"
//                     >
//                         <div className="flex items-center gap-4 mb-4">
//                             <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center">
//                                 <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
//                                 </svg>
//                             </div>
//                             <h3 className="text-xl font-bold text-gray-800">{text.weatherTitle}</h3>
//                         </div>

//                         <p className="text-gray-600 text-sm mb-4">
//                             {text.weatherDesc}
//                         </p>

//                         <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//                             <div className="flex gap-4 text-xs text-gray-500">
//                                 <span>🌤️ 5-Day Forecast</span>
//                                 <span>🌾 Farm Tips</span>
//                             </div>
//                             <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                             </svg>
//                         </div>
//                     </div>

//                     {/* AI Crop Planning Card */}
//                     <div 
//                         onClick={handleAICropPlanningClick}
//                         className="bg-white border-2 border-purple-200 rounded-lg p-6 cursor-pointer hover:border-purple-500 hover:shadow-md transition-all duration-300"
//                     >
//                         <div className="flex items-center gap-4 mb-4">
//                             <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center">
//                                 <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
//                                 </svg>
//                             </div>
//                             <h3 className="text-xl font-bold text-gray-800">{text.aiTitle}</h3>
//                         </div>

//                         <p className="text-gray-600 text-sm mb-4">
//                             {text.aiDesc}
//                         </p>

//                         <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//                             <div className="flex gap-4 text-xs text-gray-500">
//                                 <span>🤖 AI Powered</span>
//                                 <span>🌱 Smart Tips</span>
//                             </div>
//                             <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                             </svg>
//                         </div>
//                     </div>

//                     {/* AI Assistant Card */}
//                     <div 
//                         onClick={handleAIAssistantClick}
//                         className="bg-white border-2 border-orange-200 rounded-lg p-6 cursor-pointer hover:border-orange-500 hover:shadow-md transition-all duration-300"
//                     >
//                         <div className="flex items-center gap-4 mb-4">
//                             <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center">
//                                 <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
//                                 </svg>
//                             </div>
//                             <h3 className="text-xl font-bold text-gray-800">{text.assistantTitle}</h3>
//                         </div>

//                         <p className="text-gray-600 text-sm mb-4">
//                             {text.assistantDesc}
//                         </p>

//                         <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//                             <div className="flex gap-4 text-xs text-gray-500">
//                                 <span>💬 24/7 Chat</span>
//                                 <span>🎓 Expert Help</span>
//                             </div>
//                             <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                             </svg>
//                         </div>
//                     </div>


//                     {/* Smart Crop Calendar Card */}
// <div
//     onClick={handleCropCalendarClick}
//     className="bg-white border-2 border-emerald-200 rounded-lg p-6 cursor-pointer hover:border-emerald-500 hover:shadow-md transition-all duration-300"
// >
//     <div className="flex items-center gap-4 mb-4">
//         <div className="w-14 h-14 bg-emerald-100 rounded-lg flex items-center justify-center">
//             <svg
//                 className="w-8 h-8 text-emerald-600"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//             >
//                 <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M8 7V3m8 4V3M4 11h16M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"
//                 />
//             </svg>
//         </div>

//         <h3 className="text-xl font-bold text-gray-800">
//             {language === "bn"
//                 ? "স্মার্ট ফসল ক্যালেন্ডার"
//                 : "Smart Crop Calendar"}
//         </h3>
//     </div>

//     <p className="text-gray-600 text-sm mb-4">
//         {language === "bn"
//             ? "জেলা অনুযায়ী কোন মাসে কোন ফসল বপন, পরিচর্যা ও সংগ্রহ করতে হবে তা জানুন।"
//             : "Know the best sowing, fertilizing, irrigation and harvesting schedule based on your district."}
//     </p>

//     <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//         <div className="flex gap-4 text-xs text-gray-500">
//             <span>🌾 50+ Crops</span>
//             <span>📅 12 Months</span>
//         </div>

//         <svg
//             className="w-5 h-5 text-emerald-600"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//         >
//             <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M13 7l5 5m0 0l-5 5m5-5H6"
//             />
//         </svg>
//     </div>
// </div>

//                     {/* Community Support Card */}
//                     <div 
//                         onClick={handleCommunitySupportClick}
//                         className="bg-white border-2 border-teal-200 rounded-lg p-6 cursor-pointer hover:border-teal-500 hover:shadow-md transition-all duration-300"
//                     >
//                         <div className="flex items-center gap-4 mb-4">
//                             <div className="w-14 h-14 bg-teal-100 rounded-lg flex items-center justify-center">
//                                 <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//                                 </svg>
//                             </div>
//                             <h3 className="text-xl font-bold text-gray-800">{text.communityTitle}</h3>
//                         </div>

//                         <p className="text-gray-600 text-sm mb-4">
//                             {text.communityDesc}
//                         </p>

//                         <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//                             <div className="flex gap-4 text-xs text-gray-500">
//                                 <span>👥 Active Community</span>
//                                 <span>🤝 Help & Share</span>
//                             </div>
//                             <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                             </svg>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Features;


import React from 'react';
import { useNavigate } from 'react-router';
import { useLanguage } from '../../Context/LanguageContext/LanguageContext';

const Features = () => {
    const navigate = useNavigate();
    const { language } = useLanguage();

    const text = language === 'bn'
        ? {
            title: 'আমাদের ফিচার',
            subtitle: 'কৃষক ও ক্রেতাদের সাহায্যের জন্য তৈরি টুলগুলো অন্বেষণ করুন',
            marketTitle: 'দৈনিক বাজারদর',
            marketDesc: 'বাংলাদেশের বিভিন্ন বাজারের রিয়েল-টাইম পণ্যদর প্রতিদিন আপডেটসহ দেখুন।',
            weatherTitle: 'আবহাওয়া পূর্বাভাস',
            weatherDesc: 'ভাল সিদ্ধান্তের জন্য সঠিক আবহাওয়ার পূর্বাভাস ও কৃষি পরামর্শ নিন।',
            aiTitle: 'এআই ফসল পরিকল্পনা',
            aiDesc: 'মাটি, আবহাওয়া এবং বাজার পরিস্থিতি দেখে এআই-ভিত্তিক ফসল পরামর্শ পান।',
            assistantTitle: 'এআই সহকারী',
            assistantDesc: 'কৃষি প্রশ্নের দ্রুত উত্তর ও বিশেষজ্ঞ পরামর্শ পেতে আমাদের এআই সহকারীর সাথে কথা বলুন।',
            communityTitle: 'কমিউনিটি সাপোর্ট',
            communityDesc: 'সহ-কৃষকদের সাথে যুক্ত হন, অভিজ্ঞতা ভাগ করুন এবং সাহায্য নিন।',
            cropCalendarTitle: 'স্মার্ট ফসল ক্যালেন্ডার',
            cropCalendarDesc: 'জেলা অনুযায়ী কোন মাসে কোন ফসল বপন, পরিচর্যা ও সংগ্রহ করতে হবে তা জানুন।',
            diseaseTitle: 'এআই রোগ নির্ণয়',
            diseaseDesc: 'ফসলের পাতার ছবি আপলোড করে এআই রোগ নির্ণয় ও তাত্ক্ষণিক প্রতিকার পান।',
            schemesTitle: 'সরকারি প্রকল্পসমূহ',
            schemesDesc: 'কৃষি ভর্তুকি, ঋণ, প্রশিক্ষণ, বিনামূল্যে বীজ ও সার সহায়তা সম্পর্কে জানুন।',
        }
        : {
            title: 'Our Features',
            subtitle: 'Explore tools designed to help farmers and buyers',
            marketTitle: 'Daily Market Prices',
            marketDesc: 'Check real-time commodity prices from markets across Bangladesh with daily updates.',
            weatherTitle: 'Weather Forecasting',
            weatherDesc: 'Get accurate weather predictions and farming recommendations for better decisions.',
            aiTitle: 'AI Crop Planning',
            aiDesc: 'Get AI-powered crop recommendations based on soil, weather, and market conditions.',
            assistantTitle: 'AI Assistant',
            assistantDesc: 'Chat with our AI assistant to get instant answers to your farming questions and expert advice.',
            communityTitle: 'Community Support',
            communityDesc: 'Connect with fellow farmers, share experiences, and get support from our vibrant community.',
            cropCalendarTitle: 'Smart Crop Calendar',
            cropCalendarDesc: 'Know the best sowing, fertilizing, irrigation and harvesting schedule based on your district.',
            diseaseTitle: 'AI Disease Detection',
            diseaseDesc: 'Upload an image of your crop leaf for instant disease identification & solutions.',
            schemesTitle: 'Government Schemes',
            schemesDesc: 'Discover subsidies, loans, training, free seeds, and fertilizer support programs.',
        };

    const handleMarketPricesClick = () => {
        sessionStorage.setItem('marketPricesAccess', 'true');
        navigate('/market-prices');
    };

    const handleWeatherClick = () => {
        navigate('/weather');
    };

    const handleAICropPlanningClick = () => {
        navigate('/ai-crop-planning');
    };

    const handleAIAssistantClick = () => {
        console.log('AI Assistant clicked - Coming soon!');
    };

    const handleCommunitySupportClick = () => {
        navigate('/community');
    };

    const handleCropCalendarClick = () => {
        navigate('/crop-calendar');
    };

    const handleAIDiseaseDetectionClick = () => {
        navigate('/ai-disease-detection');
    };

    // ✅ NEW HANDLER
    const handleGovernmentSchemesClick = () => {
        navigate('/schemes');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-16">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center mb-3 text-gray-800">{text.title}</h1>
                <p className="text-center text-gray-600 mb-12">{text.subtitle}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    
                    {/* Daily Market Prices Card */}
                    <div
                        onClick={handleMarketPricesClick}
                        className="bg-white border-2 border-green-200 rounded-lg p-6 cursor-pointer hover:border-green-500 hover:shadow-md transition-all duration-300"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">{text.marketTitle}</h3>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{text.marketDesc}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="flex gap-4 text-xs text-gray-500">
                                <span>🏪 70 Markets</span>
                                <span>📦 80+ Products</span>
                            </div>
                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </div>
                    </div>

                    {/* Weather Forecasting Card */}
                    <div
                        onClick={handleWeatherClick}
                        className="bg-white border-2 border-blue-200 rounded-lg p-6 cursor-pointer hover:border-blue-500 hover:shadow-md transition-all duration-300"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">{text.weatherTitle}</h3>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{text.weatherDesc}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="flex gap-4 text-xs text-gray-500">
                                <span>🌤️ 5-Day Forecast</span>
                                <span>🌾 Farm Tips</span>
                            </div>
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </div>
                    </div>

                    {/* AI Crop Planning Card */}
                    <div
                        onClick={handleAICropPlanningClick}
                        className="bg-white border-2 border-purple-200 rounded-lg p-6 cursor-pointer hover:border-purple-500 hover:shadow-md transition-all duration-300"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center">
                                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">{text.aiTitle}</h3>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{text.aiDesc}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="flex gap-4 text-xs text-gray-500">
                                <span>🤖 AI Powered</span>
                                <span>🌱 Smart Tips</span>
                            </div>
                            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </div>
                    </div>

                    {/* AI Assistant Card */}
                    {/* <div
                        onClick={handleAIAssistantClick}
                        className="bg-white border-2 border-orange-200 rounded-lg p-6 cursor-pointer hover:border-orange-500 hover:shadow-md transition-all duration-300"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center">
                                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">{text.assistantTitle}</h3>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{text.assistantDesc}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="flex gap-4 text-xs text-gray-500">
                                <span>💬 24/7 Chat</span>
                                <span>🎓 Expert Help</span>
                            </div>
                            <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </div>
                    </div> */}

                    {/* Smart Crop Calendar Card */}
                    <div
                        onClick={handleCropCalendarClick}
                        className="bg-white border-2 border-emerald-200 rounded-lg p-6 cursor-pointer hover:border-emerald-500 hover:shadow-md transition-all duration-300"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-14 h-14 bg-emerald-100 rounded-lg flex items-center justify-center">
                                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3M4 11h16M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">{text.cropCalendarTitle}</h3>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{text.cropCalendarDesc}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="flex gap-4 text-xs text-gray-500">
                                <span>🌾 50+ Crops</span>
                                <span>📅 12 Months</span>
                            </div>
                            <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </div>
                    </div>

                    {/* AI Disease Detection Card */}
                    <div
                        onClick={handleAIDiseaseDetectionClick}
                        className="bg-white border-2 border-rose-200 rounded-lg p-6 cursor-pointer hover:border-rose-500 hover:shadow-md transition-all duration-300"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-14 h-14 bg-rose-100 rounded-lg flex items-center justify-center">
                                <svg className="w-8 h-8 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">{text.diseaseTitle}</h3>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{text.diseaseDesc}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="flex gap-4 text-xs text-gray-500">
                                <span>🤖 AI Diagnosis</span>
                                <span>📸 Camera / Upload</span>
                            </div>
                            <svg className="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </div>
                    </div>

                    {/* 🆕 Government Schemes Card */}
                    <div
                        onClick={handleGovernmentSchemesClick}
                        className="bg-white border-2 border-amber-200 rounded-lg p-6 cursor-pointer hover:border-amber-500 hover:shadow-md transition-all duration-300"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-14 h-14 bg-amber-100 rounded-lg flex items-center justify-center">
                                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">{text.schemesTitle}</h3>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{text.schemesDesc}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="flex gap-4 text-xs text-gray-500">
                                <span>🏛️ Subsidies & Loans</span>
                                <span>🌾 Training & Support</span>
                            </div>
                            <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </div>
                    </div>

                    {/* Community Support Card */}
                    <div
                        onClick={handleCommunitySupportClick}
                        className="bg-white border-2 border-teal-200 rounded-lg p-6 cursor-pointer hover:border-teal-500 hover:shadow-md transition-all duration-300"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-14 h-14 bg-teal-100 rounded-lg flex items-center justify-center">
                                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">{text.communityTitle}</h3>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{text.communityDesc}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="flex gap-4 text-xs text-gray-500">
                                <span>👥 Active Community</span>
                                <span>🤝 Help & Share</span>
                            </div>
                            <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Features;