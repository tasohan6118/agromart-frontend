// src/pages/Schemes.jsx
// import React, { useState, useEffect, useCallback } from 'react';
// import { Link } from 'react-router-dom';
// import { schemeService } from '../services/schemeService';
// import {
//   MagnifyingGlassIcon,
//   FunnelIcon,
//   XMarkIcon,
//   ClockIcon,
//   FireIcon,
//   StarIcon,
//   CheckBadgeIcon,
// } from '@heroicons/react/24/outline'; // optional, for icons

// const Schemes = () => {
//   const [schemes, setSchemes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('all'); // 'all', 'recent', 'popular', 'expiring', 'featured'
//   const [filters, setFilters] = useState({
//     search: '',
//     category: 'all',
//     district: 'all',
//     cropType: 'all',
//     farmerType: 'all',
//     ministry: 'all',
//   });
//   const [pagination, setPagination] = useState({
//     page: 1,
//     total: 0,
//     totalPages: 0,
//   });
//   const [showFilters, setShowFilters] = useState(false);
//   const [featuredSchemes, setFeaturedSchemes] = useState([]);
//   const [recentSchemes, setRecentSchemes] = useState([]);
//   const [popularSchemes, setPopularSchemes] = useState([]);
//   const [expiringSchemes, setExpiringSchemes] = useState([]);

//   // Fetch schemes based on active tab and filters
//   const fetchSchemes = useCallback(async () => {
//     setLoading(true);
//     try {
//       const params = {
//         ...filters,
//         page: pagination.page,
//         limit: 10,
//         sort: activeTab === 'recent' ? 'createdAt' : activeTab === 'expiring' ? 'deadline' : 'popularity',
//         // For 'popular' we assume backend has a popularity field; fallback to default
//       };
//       const data = await schemeService.getAll(params);
//       if (data.success) {
//         setSchemes(data.schemes);
//         setPagination({
//           page: data.pagination.page,
//           total: data.pagination.total,
//           totalPages: data.pagination.totalPages,
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching schemes:', error);
//     }
//     setLoading(false);
//   }, [filters, pagination.page, activeTab]);

//   // Fetch featured, recent, popular, expiring separately (or from one API)
//   const fetchHighlights = useCallback(async () => {
//     try {
//       const featured = await schemeService.getFeatured();
//       setFeaturedSchemes(featured);
//       const recent = await schemeService.getRecent({ limit: 4 });
//       setRecentSchemes(recent);
//       const popular = await schemeService.getPopular({ limit: 4 });
//       setPopularSchemes(popular);
//       const expiring = await schemeService.getExpiring({ limit: 4 });
//       setExpiringSchemes(expiring);
//     } catch (error) {
//       console.error('Error fetching highlights:', error);
//     }
//   }, []);

//   useEffect(() => {
//     fetchSchemes();
//   }, [fetchSchemes]);

//   useEffect(() => {
//     fetchHighlights();
//   }, [fetchHighlights]);

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prev) => ({ ...prev, [name]: value }));
//     setPagination((prev) => ({ ...prev, page: 1 }));
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     setPagination((prev) => ({ ...prev, page: 1 }));
//     fetchSchemes();
//   };

//   const clearFilters = () => {
//     setFilters({
//       search: '',
//       category: 'all',
//       district: 'all',
//       cropType: 'all',
//       farmerType: 'all',
//       ministry: 'all',
//     });
//     setPagination((prev) => ({ ...prev, page: 1 }));
//   };

//   const renderSchemeCard = (scheme) => (
//     <Link
//       to={`/schemes/${scheme._id}`}
//       key={scheme._id}
//       className="block bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
//     >
//       <div className="p-5">
//         <div className="flex justify-between items-start mb-2">
//           <span className="text-xs font-semibold px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
//             {scheme.category}
//           </span>
//           {scheme.isFeatured && (
//             <span className="flex items-center text-xs text-yellow-600 dark:text-yellow-400">
//               <StarIcon className="w-4 h-4 mr-1" />
//               Featured
//             </span>
//           )}
//         </div>
//         <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">
//           {scheme.schemeName}
//         </h3>
//         <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-2">
//           {scheme.description}
//         </p>
//         <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
//           <span>📍 {scheme.district}</span>
//           <span>🌾 {scheme.cropType || 'All Crops'}</span>
//           <span>👨‍🌾 {scheme.farmerType || 'All Farmers'}</span>
//         </div>
//         <div className="flex justify-between items-center text-sm">
//           <span className="text-green-600 dark:text-green-400 font-semibold">
//             {scheme.amount}
//           </span>
//           <span className="text-red-500 dark:text-red-400 text-xs">
//             <ClockIcon className="w-3 h-3 inline mr-1" />
//             {new Date(scheme.deadline).toLocaleDateString()}
//           </span>
//         </div>
//         <div className="mt-3 flex items-center text-green-600 dark:text-green-400 font-semibold text-sm">
//           View Details →
//         </div>
//       </div>
//     </Link>
//   );

//   // Render highlight section with horizontal scroll
//   const renderHighlightSection = (title, schemesList, icon) => (
//     <div className="mb-8">
//       <div className="flex items-center gap-2 mb-3">
//         {icon}
//         <h2 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h2>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         {schemesList.slice(0, 4).map((scheme) => renderSchemeCard(scheme))}
//       </div>
//     </div>
//   );

//   if (loading && schemes.length === 0) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="text-xl text-gray-600">Loading government schemes...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
//         <div>
//           <h1 className="text-3xl font-bold text-green-700 dark:text-green-400">
//             🏛️ Government Schemes for Farmers
//           </h1>
//           <p className="text-gray-600 dark:text-gray-300">
//             Discover subsidies, loans, training, free seeds, and fertilizer support programs.
//           </p>
//         </div>
//         <button
//           onClick={() => setShowFilters(!showFilters)}
//           className="mt-2 md:mt-0 flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//         >
//           <FunnelIcon className="w-5 h-5" />
//           Filters
//         </button>
//       </div>

//       {/* Search Bar */}
//       <form onSubmit={handleSearch} className="mb-6 flex gap-2">
//         <div className="relative flex-1">
//           <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//           <input
//             type="text"
//             name="search"
//             placeholder="Search scheme by name..."
//             value={filters.search}
//             onChange={handleFilterChange}
//             className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:border-gray-600"
//           />
//         </div>
//         <button
//           type="submit"
//           className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//         >
//           Search
//         </button>
//       </form>

//       {/* Expandable Filters */}
//       {showFilters && (
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6 border border-gray-200 dark:border-gray-700">
//           <div className="flex justify-between items-center mb-3">
//             <h3 className="font-semibold">Advanced Filters</h3>
//             <button onClick={clearFilters} className="text-sm text-red-500 hover:underline">
//               Clear All
//             </button>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             <select
//               name="category"
//               value={filters.category}
//               onChange={handleFilterChange}
//               className="p-2 border rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600"
//             >
//               <option value="all">All Categories</option>
//               <option value="Subsidy">Subsidy</option>
//               <option value="Loan">Loan</option>
//               <option value="Training">Training</option>
//               <option value="Seed Distribution">Seed Distribution</option>
//               <option value="Fertilizer Support">Fertilizer Support</option>
//               <option value="Financial Support">Financial Support</option>
//             </select>
//             <select
//               name="district"
//               value={filters.district}
//               onChange={handleFilterChange}
//               className="p-2 border rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600"
//             >
//               <option value="all">All States/Districts</option>
//               <option value="Dhaka">Dhaka</option>
//               <option value="Chittagong">Chittagong</option>
//               <option value="Rajshahi">Rajshahi</option>
//               <option value="Khulna">Khulna</option>
//               <option value="Barishal">Barishal</option>
//               <option value="Sylhet">Sylhet</option>
//               <option value="Rangpur">Rangpur</option>
//               <option value="Mymensingh">Mymensingh</option>
//             </select>
//             <select
//               name="cropType"
//               value={filters.cropType}
//               onChange={handleFilterChange}
//               className="p-2 border rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600"
//             >
//               <option value="all">All Crop Types</option>
//               <option value="Rice">Rice</option>
//               <option value="Wheat">Wheat</option>
//               <option value="Maize">Maize</option>
//               <option value="Sugarcane">Sugarcane</option>
//               <option value="Cotton">Cotton</option>
//               <option value="Vegetables">Vegetables</option>
//               <option value="Fruits">Fruits</option>
//             </select>
//             <select
//               name="farmerType"
//               value={filters.farmerType}
//               onChange={handleFilterChange}
//               className="p-2 border rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600"
//             >
//               <option value="all">All Farmer Types</option>
//               <option value="Small">Small</option>
//               <option value="Marginal">Marginal</option>
//               <option value="Women">Women</option>
//               <option value="Large">Large</option>
//               <option value="SC/ST">SC/ST</option>
//             </select>
//             <select
//               name="ministry"
//               value={filters.ministry}
//               onChange={handleFilterChange}
//               className="p-2 border rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600"
//             >
//               <option value="all">All Ministries</option>
//               <option value="Agriculture">Agriculture</option>
//               <option value="Rural Development">Rural Development</option>
//               <option value="Finance">Finance</option>
//               <option value="Fisheries">Fisheries</option>
//               <option value="Animal Husbandry">Animal Husbandry</option>
//             </select>
//           </div>
//           <div className="mt-3 flex justify-end">
//             <button
//               onClick={() => {
//                 setPagination((prev) => ({ ...prev, page: 1 }));
//                 fetchSchemes();
//               }}
//               className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               Apply Filters
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Highlights: Featured, Recent, Popular, Expiring */}
//       {activeTab === 'all' && (
//         <>
//           {featuredSchemes.length > 0 &&
//             renderHighlightSection(
//               '⭐ Featured Schemes',
//               featuredSchemes,
//               <StarIcon className="w-6 h-6 text-yellow-500" />
//             )}
//           {recentSchemes.length > 0 &&
//             renderHighlightSection(
//               '🆕 Recently Added',
//               recentSchemes,
//               <FireIcon className="w-6 h-6 text-orange-500" />
//             )}
//           {popularSchemes.length > 0 &&
//             renderHighlightSection(
//               '🔥 Popular Schemes',
//               popularSchemes,
//               <FireIcon className="w-6 h-6 text-red-500" />
//             )}
//           {expiringSchemes.length > 0 &&
//             renderHighlightSection(
//               '⏰ Expiring Soon',
//               expiringSchemes,
//               <ClockIcon className="w-6 h-6 text-red-400" />
//             )}
//         </>
//       )}

//       {/* Category-wise Cards (optional) – quick view */}
//       <div className="mb-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
//         {['Subsidy', 'Loan', 'Training', 'Seed', 'Fertilizer', 'Financial'].map((cat) => (
//           <button
//             key={cat}
//             onClick={() => {
//               setFilters((prev) => ({ ...prev, category: cat }));
//               setActiveTab('all');
//               setPagination((prev) => ({ ...prev, page: 1 }));
//             }}
//             className={`p-2 text-center rounded-lg border ${
//               filters.category === cat
//                 ? 'bg-green-600 text-white border-green-600'
//                 : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-green-50 dark:hover:bg-gray-700'
//             } transition-colors text-sm font-medium`}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>

//       {/* Tabs: All / Recent / Popular / Expiring */}
//       <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700 mb-6">
//         {['all', 'recent', 'popular', 'expiring'].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => {
//               setActiveTab(tab);
//               setPagination((prev) => ({ ...prev, page: 1 }));
//             }}
//             className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
//               activeTab === tab
//                 ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border-b-2 border-green-600'
//                 : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
//             } transition-colors`}
//           >
//             {tab === 'all' && 'All Schemes'}
//             {tab === 'recent' && 'Recently Added'}
//             {tab === 'popular' && 'Most Popular'}
//             {tab === 'expiring' && 'Expiring Soon'}
//           </button>
//         ))}
//       </div>

//       {/* Scheme Grid */}
//       {schemes.length === 0 ? (
//         <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
//           <p className="text-xl text-gray-600 dark:text-gray-400">
//             No schemes found matching your criteria.
//           </p>
//         </div>
//       ) : (
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {schemes.map(renderSchemeCard)}
//         </div>
//       )}

//       {/* Pagination */}
//       {pagination.totalPages > 1 && (
//         <div className="flex justify-center gap-2 mt-8">
//           <button
//             onClick={() => setPagination((prev) => ({ ...prev, page: prev.page - 1 }))}
//             disabled={pagination.page === 1}
//             className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-700"
//           >
//             Previous
//           </button>
//           <span className="px-4 py-2">
//             Page {pagination.page} of {pagination.totalPages}
//           </span>
//           <button
//             onClick={() => setPagination((prev) => ({ ...prev, page: prev.page + 1 }))}
//             disabled={pagination.page === pagination.totalPages}
//             className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-700"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Schemes;



// // src/pages/Schemes.jsx
// import React, { useState, useEffect, useCallback } from 'react';
// import { Link } from 'react-router-dom';
// import { schemeService } from '../services/schemeService';
// import {
//   MagnifyingGlassIcon,
//   FunnelIcon,
//   ClockIcon,
//   FireIcon,
//   StarIcon,
// } from '@heroicons/react/24/outline';

// const Schemes = () => {
//   const [schemes, setSchemes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('all');
//   const [filters, setFilters] = useState({
//     search: '',
//     category: 'all',
//     district: 'all',
//     cropType: 'all',
//     farmerType: 'all',
//     ministry: 'all',
//   });
//   const [pagination, setPagination] = useState({ page: 1, total: 0, totalPages: 0 });
//   const [showFilters, setShowFilters] = useState(false);
//   const [featuredSchemes, setFeaturedSchemes] = useState([]);
//   const [recentSchemes, setRecentSchemes] = useState([]);
//   const [popularSchemes, setPopularSchemes] = useState([]);
//   const [expiringSchemes, setExpiringSchemes] = useState([]);
//   const [categories, setCategories] = useState([]); // dynamic from API

//   // Fetch all unique categories for quick buttons
//   const fetchCategories = useCallback(async () => {
//     try {
//       const data = await schemeService.getCategories();
//       if (data.success) {
//         setCategories(data.categories);
//       }
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//     }
//   }, []);

//   useEffect(() => {
//     fetchCategories();
//   }, [fetchCategories]);

//   const fetchSchemes = useCallback(async () => {
//     setLoading(true);
//     try {
//       const params = {
//         ...filters,
//         page: pagination.page,
//         limit: 10,
//         sort: activeTab === 'recent' ? 'createdAt' : activeTab === 'expiring' ? 'deadline' : 'postedDate',
//       };
//       // If tab is 'popular', we use default sort (popularity) but we need to tell backend.
//       if (activeTab === 'popular') params.sort = 'popularity';
//       const data = await schemeService.getAll(params);
//       if (data.success) {
//         setSchemes(data.schemes);
//         setPagination({
//           page: data.pagination.page,
//           total: data.pagination.total,
//           totalPages: data.pagination.totalPages,
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching schemes:', error);
//     }
//     setLoading(false);
//   }, [filters, pagination.page, activeTab]);

//   const fetchHighlights = useCallback(async () => {
//     try {
//       const featured = await schemeService.getFeatured({ limit: 4 });
//       setFeaturedSchemes(featured);
//       const recent = await schemeService.getRecent({ limit: 4 });
//       setRecentSchemes(recent);
//       const popular = await schemeService.getPopular({ limit: 4 });
//       setPopularSchemes(popular);
//       const expiring = await schemeService.getExpiring({ limit: 4 });
//       setExpiringSchemes(expiring);
//     } catch (error) {
//       console.error('Error fetching highlights:', error);
//     }
//   }, []);

//   useEffect(() => {
//     fetchSchemes();
//   }, [fetchSchemes]);

//   useEffect(() => {
//     fetchHighlights();
//   }, [fetchHighlights]);

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prev) => ({ ...prev, [name]: value }));
//     setPagination((prev) => ({ ...prev, page: 1 }));
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     setPagination((prev) => ({ ...prev, page: 1 }));
//     fetchSchemes();
//   };

//   const clearFilters = () => {
//     setFilters({
//       search: '',
//       category: 'all',
//       district: 'all',
//       cropType: 'all',
//       farmerType: 'all',
//       ministry: 'all',
//     });
//     setPagination((prev) => ({ ...prev, page: 1 }));
//   };

//   const renderSchemeCard = (scheme) => (
//     <Link
//       to={`/schemes/${scheme._id}`}
//       key={scheme._id}
//       className="block bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
//     >
//       <div className="p-5">
//         <div className="flex justify-between items-start mb-2">
//           <span className="text-xs font-semibold px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
//             {scheme.category}
//           </span>
//           {scheme.isFeatured && (
//             <span className="flex items-center text-xs text-yellow-600 dark:text-yellow-400">
//               <StarIcon className="w-4 h-4 mr-1" />
//               Featured
//             </span>
//           )}
//         </div>
//         <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">
//           {scheme.schemeName}
//         </h3>
//         <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-2">
//           {scheme.description}
//         </p>
//         <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
//           <span>📍 {scheme.district}</span>
//           <span>🌾 {scheme.cropType || 'All Crops'}</span>
//           <span>👨‍🌾 {scheme.farmerType || 'All Farmers'}</span>
//         </div>
//         <div className="flex justify-between items-center text-sm">
//           <span className="text-green-600 dark:text-green-400 font-semibold">
//             {scheme.amount}
//           </span>
//           <span className="text-red-500 dark:text-red-400 text-xs">
//             <ClockIcon className="w-3 h-3 inline mr-1" />
//             {new Date(scheme.deadline).toLocaleDateString()}
//           </span>
//         </div>
//         <div className="mt-3 flex items-center text-green-600 dark:text-green-400 font-semibold text-sm">
//           View Details →
//         </div>
//       </div>
//     </Link>
//   );

//   const renderHighlightSection = (title, schemesList, icon) => (
//     <div className="mb-8">
//       <div className="flex items-center gap-2 mb-3">
//         {icon}
//         <h2 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h2>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         {schemesList.slice(0, 4).map((scheme) => renderSchemeCard(scheme))}
//       </div>
//     </div>
//   );

//   if (loading && schemes.length === 0) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="text-xl text-gray-600">Loading government schemes...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
//         <div>
//           <h1 className="text-3xl font-bold text-green-700 dark:text-green-400">
//             🏛️ Government Schemes for Farmers
//           </h1>
//           <p className="text-gray-600 dark:text-gray-300">
//             Discover subsidies, loans, training, free seeds, and fertilizer support programs.
//           </p>
//         </div>
//         <button
//           onClick={() => setShowFilters(!showFilters)}
//           className="mt-2 md:mt-0 flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//         >
//           <FunnelIcon className="w-5 h-5" />
//           Filters
//         </button>
//       </div>

//       {/* Search Bar */}
//       <form onSubmit={handleSearch} className="mb-6 flex gap-2">
//         <div className="relative flex-1">
//           <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//           <input
//             type="text"
//             name="search"
//             placeholder="Search scheme by name..."
//             value={filters.search}
//             onChange={handleFilterChange}
//             className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:border-gray-600"
//           />
//         </div>
//         <button
//           type="submit"
//           className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//         >
//           Search
//         </button>
//       </form>

//       {/* Expandable Filters */}
//       {showFilters && (
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6 border border-gray-200 dark:border-gray-700">
//           <div className="flex justify-between items-center mb-3">
//             <h3 className="font-semibold">Advanced Filters</h3>
//             <button onClick={clearFilters} className="text-sm text-red-500 hover:underline">
//               Clear All
//             </button>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             <select
//               name="category"
//               value={filters.category}
//               onChange={handleFilterChange}
//               className="p-2 border rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600"
//             >
//               <option value="all">All Categories</option>
//               <option value="Subsidy">Subsidy</option>
//               <option value="Loan">Loan</option>
//               <option value="Training">Training</option>
//               <option value="Seed Distribution">Seed Distribution</option>
//               <option value="Fertilizer Support">Fertilizer Support</option>
//               <option value="Financial Support">Financial Support</option>
//               <option value="Market Support">Market Support</option>
//             </select>
//             <select
//               name="district"
//               value={filters.district}
//               onChange={handleFilterChange}
//               className="p-2 border rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600"
//             >
//               <option value="all">All Districts</option>
//               <option value="Dhaka">Dhaka</option>
//               <option value="Chittagong">Chittagong</option>
//               <option value="Rajshahi">Rajshahi</option>
//               <option value="Khulna">Khulna</option>
//               <option value="Barishal">Barishal</option>
//               <option value="Sylhet">Sylhet</option>
//               <option value="Rangpur">Rangpur</option>
//               <option value="Mymensingh">Mymensingh</option>
//             </select>
//             <select
//               name="cropType"
//               value={filters.cropType}
//               onChange={handleFilterChange}
//               className="p-2 border rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600"
//             >
//               <option value="all">All Crop Types</option>
//               <option value="Rice">Rice</option>
//               <option value="Wheat">Wheat</option>
//               <option value="Maize">Maize</option>
//               <option value="Sugarcane">Sugarcane</option>
//               <option value="Cotton">Cotton</option>
//               <option value="Vegetables">Vegetables</option>
//               <option value="Fruits">Fruits</option>
//             </select>
//             <select
//               name="farmerType"
//               value={filters.farmerType}
//               onChange={handleFilterChange}
//               className="p-2 border rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600"
//             >
//               <option value="all">All Farmer Types</option>
//               <option value="Small">Small</option>
//               <option value="Marginal">Marginal</option>
//               <option value="Women">Women</option>
//               <option value="Large">Large</option>
//               <option value="SC/ST">SC/ST</option>
//             </select>
//             <select
//               name="ministry"
//               value={filters.ministry}
//               onChange={handleFilterChange}
//               className="p-2 border rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600"
//             >
//               <option value="all">All Ministries</option>
//               <option value="Agriculture">Ministry of Agriculture</option>
//               <option value="Finance">Ministry of Finance</option>
//               <option value="Fisheries and Livestock">Ministry of Fisheries and Livestock</option>
//               <option value="Food">Ministry of Food</option>
//               <option value="Environment">Ministry of Environment, Forest and Climate Change</option>
//               <option value="Local Government">Ministry of Local Government</option>
//               <option value="Water Resources">Ministry of Water Resources</option>
//             </select>
//           </div>
//           <div className="mt-3 flex justify-end">
//             <button
//               onClick={() => {
//                 setPagination((prev) => ({ ...prev, page: 1 }));
//                 fetchSchemes();
//               }}
//               className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               Apply Filters
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Highlights: Featured, Recent, Popular, Expiring */}
//       {activeTab === 'all' && (
//         <>
//           {featuredSchemes.length > 0 &&
//             renderHighlightSection(
//               '⭐ Featured Schemes',
//               featuredSchemes,
//               <StarIcon className="w-6 h-6 text-yellow-500" />
//             )}
//           {recentSchemes.length > 0 &&
//             renderHighlightSection(
//               '🆕 Recently Added',
//               recentSchemes,
//               <FireIcon className="w-6 h-6 text-orange-500" />
//             )}
//           {popularSchemes.length > 0 &&
//             renderHighlightSection(
//               '🔥 Popular Schemes',
//               popularSchemes,
//               <FireIcon className="w-6 h-6 text-red-500" />
//             )}
//           {expiringSchemes.length > 0 &&
//             renderHighlightSection(
//               '⏰ Expiring Soon',
//               expiringSchemes,
//               <ClockIcon className="w-6 h-6 text-red-400" />
//             )}
//         </>
//       )}

//       {/* Category-wise Cards – now using dynamic categories from DB */}
//       <div className="mb-6 flex flex-wrap gap-2">
//         {categories.length > 0 ? (
//           categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => {
//                 setFilters((prev) => ({ ...prev, category: cat }));
//                 setActiveTab('all');
//                 setPagination((prev) => ({ ...prev, page: 1 }));
//               }}
//               className={`px-4 py-2 text-sm rounded-lg border ${
//                 filters.category === cat
//                   ? 'bg-green-600 text-white border-green-600'
//                   : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-green-50 dark:hover:bg-gray-700'
//               } transition-colors font-medium`}
//             >
//               {cat}
//             </button>
//           ))
//         ) : (
//           // fallback static list (if API fails)
//           ['Financial Support', 'Subsidy', 'Loan', 'Training', 'Seed Distribution', 'Fertilizer Support', 'Market Support'].map((cat) => (
//             <button
//               key={cat}
//               onClick={() => {
//                 setFilters((prev) => ({ ...prev, category: cat }));
//                 setActiveTab('all');
//                 setPagination((prev) => ({ ...prev, page: 1 }));
//               }}
//               className={`px-4 py-2 text-sm rounded-lg border ${
//                 filters.category === cat
//                   ? 'bg-green-600 text-white border-green-600'
//                   : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-green-50 dark:hover:bg-gray-700'
//               } transition-colors font-medium`}
//             >
//               {cat}
//             </button>
//           ))
//         )}
//       </div>

//       {/* Tabs: All / Recent / Popular / Expiring */}
//       <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700 mb-6">
//         {['all', 'recent', 'popular', 'expiring'].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => {
//               setActiveTab(tab);
//               setPagination((prev) => ({ ...prev, page: 1 }));
//             }}
//             className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
//               activeTab === tab
//                 ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border-b-2 border-green-600'
//                 : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
//             } transition-colors`}
//           >
//             {tab === 'all' && 'All Schemes'}
//             {tab === 'recent' && 'Recently Added'}
//             {tab === 'popular' && 'Most Popular'}
//             {tab === 'expiring' && 'Expiring Soon'}
//           </button>
//         ))}
//       </div>

//       {/* Scheme Grid */}
//       {schemes.length === 0 ? (
//         <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
//           <p className="text-xl text-gray-600 dark:text-gray-400">
//             No schemes found matching your criteria.
//           </p>
//         </div>
//       ) : (
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {schemes.map(renderSchemeCard)}
//         </div>
//       )}

//       {/* Pagination */}
//       {pagination.totalPages > 1 && (
//         <div className="flex justify-center gap-2 mt-8">
//           <button
//             onClick={() => setPagination((prev) => ({ ...prev, page: prev.page - 1 }))}
//             disabled={pagination.page === 1}
//             className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-700"
//           >
//             Previous
//           </button>
//           <span className="px-4 py-2">
//             Page {pagination.page} of {pagination.totalPages}
//           </span>
//           <button
//             onClick={() => setPagination((prev) => ({ ...prev, page: prev.page + 1 }))}
//             disabled={pagination.page === pagination.totalPages}
//             className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-700"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Schemes;



// // src/pages/Schemes.jsx
// import React, { useState, useEffect, useCallback } from 'react';
// import { Link } from 'react-router-dom';
// import { schemeService } from '../services/schemeService';
// import {
//   MagnifyingGlassIcon,
//   FunnelIcon,
//   ClockIcon,
//   FireIcon,
//   StarIcon,
// } from '@heroicons/react/24/outline';

// const Schemes = () => {
//   const [schemes, setSchemes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('all');
//   const [filters, setFilters] = useState({
//     search: '',
//     category: 'all',
//     district: 'all',
//     cropType: 'all',
//     farmerType: 'all',
//     ministry: 'all',
//   });
//   const [pagination, setPagination] = useState({ page: 1, total: 0, totalPages: 0 });
//   const [showFilters, setShowFilters] = useState(false);
//   const [featuredSchemes, setFeaturedSchemes] = useState([]);
//   const [recentSchemes, setRecentSchemes] = useState([]);
//   const [popularSchemes, setPopularSchemes] = useState([]);
//   const [expiringSchemes, setExpiringSchemes] = useState([]);
//   const [categories, setCategories] = useState([]);

//   const fetchCategories = useCallback(async () => {
//     try {
//       const data = await schemeService.getCategories();
//       if (data.success) setCategories(data.categories);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//     }
//   }, []);

//   useEffect(() => {
//     fetchCategories();
//   }, [fetchCategories]);

//   const fetchSchemes = useCallback(async () => {
//     setLoading(true);
//     try {
//       const params = {
//         ...filters,
//         page: pagination.page,
//         limit: 10,
//         sort: activeTab === 'recent' ? 'createdAt' : activeTab === 'expiring' ? 'deadline' : 'postedDate',
//       };
//       if (activeTab === 'popular') params.sort = 'popularity';
//       const data = await schemeService.getAll(params);
//       if (data.success) {
//         setSchemes(data.schemes);
//         setPagination({
//           page: data.pagination.page,
//           total: data.pagination.total,
//           totalPages: data.pagination.totalPages,
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching schemes:', error);
//     }
//     setLoading(false);
//   }, [filters, pagination.page, activeTab]);

//   const fetchHighlights = useCallback(async () => {
//     try {
//       const featured = await schemeService.getFeatured({ limit: 4 });
//       setFeaturedSchemes(featured);
//       const recent = await schemeService.getRecent({ limit: 4 });
//       setRecentSchemes(recent);
//       const popular = await schemeService.getPopular({ limit: 4 });
//       setPopularSchemes(popular);
//       const expiring = await schemeService.getExpiring({ limit: 4 });
//       setExpiringSchemes(expiring);
//     } catch (error) {
//       console.error('Error fetching highlights:', error);
//     }
//   }, []);

//   useEffect(() => {
//     fetchSchemes();
//   }, [fetchSchemes]);

//   useEffect(() => {
//     fetchHighlights();
//   }, [fetchHighlights]);

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prev) => ({ ...prev, [name]: value }));
//     setPagination((prev) => ({ ...prev, page: 1 }));
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     setPagination((prev) => ({ ...prev, page: 1 }));
//     fetchSchemes();
//   };

//   const clearFilters = () => {
//     setFilters({
//       search: '',
//       category: 'all',
//       district: 'all',
//       cropType: 'all',
//       farmerType: 'all',
//       ministry: 'all',
//     });
//     setPagination((prev) => ({ ...prev, page: 1 }));
//     setActiveTab('all');
//   };

//   const renderSchemeCard = (scheme) => (
//     <Link
//       to={`/schemes/${scheme._id}`}
//       key={scheme._id}
//       className="block bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-all duration-200 border border-gray-100 dark:border-gray-700"
//     >
//       <div className="p-5">
//         <div className="flex justify-between items-start mb-2">
//           <span className="text-xs font-medium px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
//             {scheme.category}
//           </span>
//           {scheme.isFeatured && (
//             <span className="flex items-center text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-2 py-1 rounded-full">
//               <StarIcon className="w-4 h-4 mr-1" />
//               Featured
//             </span>
//           )}
//         </div>
//         <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1 line-clamp-1">
//           {scheme.schemeName}
//         </h3>
//         <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-2">
//           {scheme.description}
//         </p>
//         <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
//           <span>📍 {scheme.district}</span>
//           <span>🌾 {scheme.cropType || 'All Crops'}</span>
//           <span>👨‍🌾 {scheme.farmerType || 'All Farmers'}</span>
//         </div>
//         <div className="flex justify-between items-center text-sm">
//           <span className="text-emerald-600 dark:text-emerald-400 font-medium">
//             {scheme.amount}
//           </span>
//           <span className="text-red-500 dark:text-red-400 text-xs flex items-center">
//             <ClockIcon className="w-3 h-3 mr-1" />
//             {new Date(scheme.deadline).toLocaleDateString()}
//           </span>
//         </div>
//         <div className="mt-3 flex items-center text-emerald-600 dark:text-emerald-400 font-medium text-sm hover:underline">
//           View Details →
//         </div>
//       </div>
//     </Link>
//   );

//   const renderHighlightSection = (title, schemesList, icon) => {
//     if (!schemesList || schemesList.length === 0) return null;
//     return (
//       <div className="mb-8">
//         <div className="flex items-center gap-2 mb-3">
//           {icon}
//           <h2 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h2>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           {schemesList.slice(0, 4).map((scheme) => renderSchemeCard(scheme))}
//         </div>
//       </div>
//     );
//   };

//   // Show highlights only when NO category is selected AND activeTab is 'all'
//   const showHighlights = activeTab === 'all' && filters.category === 'all';

//   if (loading && schemes.length === 0) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="text-xl text-gray-600">Loading government schemes...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
//         <div>
//           <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
//             🏛️ Government Schemes for Farmers
//           </h1>
//           <p className="text-gray-500 dark:text-gray-400 text-sm">
//             Discover subsidies, loans, training, free seeds, and fertilizer support.
//           </p>
//         </div>
//         <button
//           onClick={() => setShowFilters(!showFilters)}
//           className="mt-2 md:mt-0 flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
//         >
//           <FunnelIcon className="w-5 h-5 text-gray-500" />
//           <span className="text-gray-700 dark:text-gray-300 text-sm">
//             {showFilters ? 'Hide Filters' : 'Show Filters'}
//           </span>
//         </button>
//       </div>

//       {/* Search Bar */}
//       <form onSubmit={handleSearch} className="mb-6 flex gap-2">
//         <div className="relative flex-1">
//           <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//           <input
//             type="text"
//             name="search"
//             placeholder="Search scheme by name..."
//             value={filters.search}
//             onChange={handleFilterChange}
//             className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition"
//           />
//         </div>
//         <button
//           type="submit"
//           className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition shadow-sm font-medium"
//         >
//           Search
//         </button>
//       </form>

//       {/* Expandable Filters */}
//       {showFilters && (
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 mb-6 border border-gray-200 dark:border-gray-700">
//           <div className="flex justify-between items-center mb-3">
//             <h3 className="font-medium text-gray-800 dark:text-white">Advanced Filters</h3>
//             <button onClick={clearFilters} className="text-sm text-red-500 hover:underline">
//               Clear All
//             </button>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
//             <select
//               name="category"
//               value={filters.category}
//               onChange={handleFilterChange}
//               className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
//             >
//               <option value="all">All Categories</option>
//               <option value="Subsidy">Subsidy</option>
//               <option value="Loan">Loan</option>
//               <option value="Training">Training</option>
//               <option value="Seed Distribution">Seed Distribution</option>
//               <option value="Fertilizer Support">Fertilizer Support</option>
//               <option value="Financial Support">Financial Support</option>
//               <option value="Market Support">Market Support</option>
//             </select>
//             <select
//               name="district"
//               value={filters.district}
//               onChange={handleFilterChange}
//               className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
//             >
//               <option value="all">All Districts</option>
//               <option value="Dhaka">Dhaka</option>
//               <option value="Chittagong">Chittagong</option>
//               <option value="Rajshahi">Rajshahi</option>
//               <option value="Khulna">Khulna</option>
//               <option value="Barishal">Barishal</option>
//               <option value="Sylhet">Sylhet</option>
//               <option value="Rangpur">Rangpur</option>
//               <option value="Mymensingh">Mymensingh</option>
//             </select>
//             <select
//               name="cropType"
//               value={filters.cropType}
//               onChange={handleFilterChange}
//               className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
//             >
//               <option value="all">All Crop Types</option>
//               <option value="Rice">Rice</option>
//               <option value="Wheat">Wheat</option>
//               <option value="Maize">Maize</option>
//               <option value="Sugarcane">Sugarcane</option>
//               <option value="Cotton">Cotton</option>
//               <option value="Vegetables">Vegetables</option>
//               <option value="Fruits">Fruits</option>
//             </select>
//             <select
//               name="farmerType"
//               value={filters.farmerType}
//               onChange={handleFilterChange}
//               className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
//             >
//               <option value="all">All Farmer Types</option>
//               <option value="Small">Small</option>
//               <option value="Marginal">Marginal</option>
//               <option value="Women">Women</option>
//               <option value="Large">Large</option>
//               <option value="SC/ST">SC/ST</option>
//             </select>
//             <select
//               name="ministry"
//               value={filters.ministry}
//               onChange={handleFilterChange}
//               className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
//             >
//               <option value="all">All Ministries</option>
//               <option value="Agriculture">Ministry of Agriculture</option>
//               <option value="Finance">Ministry of Finance</option>
//               <option value="Fisheries and Livestock">Ministry of Fisheries and Livestock</option>
//               <option value="Food">Ministry of Food</option>
//               <option value="Environment">Ministry of Environment</option>
//               <option value="Local Government">Ministry of Local Government</option>
//               <option value="Water Resources">Ministry of Water Resources</option>
//             </select>
//           </div>
//           <div className="mt-3 flex justify-end">
//             <button
//               onClick={() => {
//                 setPagination((prev) => ({ ...prev, page: 1 }));
//                 fetchSchemes();
//               }}
//               className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition text-sm"
//             >
//               Apply Filters
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Category Buttons – now with simple, clean styling */}
//       <div className="mb-6 flex flex-wrap gap-2">
//         <button
//           onClick={() => {
//             setFilters((prev) => ({ ...prev, category: 'all' }));
//             setActiveTab('all');
//             setPagination((prev) => ({ ...prev, page: 1 }));
//           }}
//           className={`px-4 py-2 text-sm font-medium rounded-lg border transition ${
//             filters.category === 'all'
//               ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
//               : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
//           }`}
//         >
//           All Categories
//         </button>
//         {categories.length > 0 ? (
//           categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => {
//                 setFilters((prev) => ({ ...prev, category: cat }));
//                 setActiveTab('all');
//                 setPagination((prev) => ({ ...prev, page: 1 }));
//               }}
//               className={`px-4 py-2 text-sm font-medium rounded-lg border transition ${
//                 filters.category === cat
//                   ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
//                   : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
//               }`}
//             >
//               {cat}
//             </button>
//           ))
//         ) : (
//           // fallback
//           ['Financial Support', 'Subsidy', 'Loan', 'Training', 'Seed Distribution', 'Fertilizer Support', 'Market Support'].map((cat) => (
//             <button
//               key={cat}
//               onClick={() => {
//                 setFilters((prev) => ({ ...prev, category: cat }));
//                 setActiveTab('all');
//                 setPagination((prev) => ({ ...prev, page: 1 }));
//               }}
//               className={`px-4 py-2 text-sm font-medium rounded-lg border transition ${
//                 filters.category === cat
//                   ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
//                   : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
//               }`}
//             >
//               {cat}
//             </button>
//           ))
//         )}
//       </div>

//       {/* Tabs */}
//       <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700 mb-6">
//         {['all', 'recent', 'popular', 'expiring'].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => {
//               setActiveTab(tab);
//               setPagination((prev) => ({ ...prev, page: 1 }));
//             }}
//             className={`px-5 py-2.5 text-sm font-medium rounded-t-lg transition ${
//               activeTab === tab
//                 ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-b-2 border-emerald-600'
//                 : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
//             }`}
//           >
//             {tab === 'all' && 'All Schemes'}
//             {tab === 'recent' && 'Recently Added'}
//             {tab === 'popular' && 'Most Popular'}
//             {tab === 'expiring' && 'Expiring Soon'}
//           </button>
//         ))}
//       </div>

//       {/* Main Content: Highlights (only when no category) then scheme grid */}
//       {showHighlights && (
//         <>
//           {renderHighlightSection('⭐ Featured Schemes', featuredSchemes, <StarIcon className="w-6 h-6 text-amber-500" />)}
//           {renderHighlightSection('🆕 Recently Added', recentSchemes, <FireIcon className="w-6 h-6 text-orange-500" />)}
//           {renderHighlightSection('🔥 Popular Schemes', popularSchemes, <FireIcon className="w-6 h-6 text-red-500" />)}
//           {renderHighlightSection('⏰ Expiring Soon', expiringSchemes, <ClockIcon className="w-6 h-6 text-red-400" />)}
//         </>
//       )}

//       {/* Scheme Grid */}
//       {schemes.length === 0 ? (
//         <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
//           <p className="text-lg text-gray-500 dark:text-gray-400">
//             No schemes found matching your criteria.
//           </p>
//         </div>
//       ) : (
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {schemes.map(renderSchemeCard)}
//         </div>
//       )}

//       {/* Pagination */}
//       {pagination.totalPages > 1 && (
//         <div className="flex justify-center gap-2 mt-8">
//           <button
//             onClick={() => setPagination((prev) => ({ ...prev, page: prev.page - 1 }))}
//             disabled={pagination.page === 1}
//             className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
//           >
//             Previous
//           </button>
//           <span className="px-4 py-2 text-gray-700 dark:text-gray-300">
//             Page {pagination.page} of {pagination.totalPages}
//           </span>
//           <button
//             onClick={() => setPagination((prev) => ({ ...prev, page: prev.page + 1 }))}
//             disabled={pagination.page === pagination.totalPages}
//             className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Schemes;



// src/pages/Schemes.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { schemeService } from '../services/schemeService';
import { MagnifyingGlassIcon, FunnelIcon, ClockIcon } from '@heroicons/react/24/outline';

const Schemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    district: 'all',
    cropType: 'all',
    farmerType: 'all',
    ministry: 'all',
  });
  const [pagination, setPagination] = useState({ page: 1, total: 0, totalPages: 0 });
  const [showFilters, setShowFilters] = useState(false);
  const [categories, setCategories] = useState([]);

  // Fetch all unique categories for quick buttons
  const fetchCategories = useCallback(async () => {
    try {
      const data = await schemeService.getCategories();
      if (data.success) setCategories(data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Fetch schemes with current filters
  const fetchSchemes = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        ...filters,
        page: pagination.page,
        limit: 10,
        sort: 'postedDate', // default sort – newest first
      };
      const data = await schemeService.getAll(params);
      if (data.success) {
        setSchemes(data.schemes);
        setPagination({
          page: data.pagination.page,
          total: data.pagination.total,
          totalPages: data.pagination.totalPages,
        });
      }
    } catch (error) {
      console.error('Error fetching schemes:', error);
    }
    setLoading(false);
  }, [filters, pagination.page]);

  useEffect(() => {
    fetchSchemes();
  }, [fetchSchemes]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPagination((prev) => ({ ...prev, page: 1 }));
    fetchSchemes();
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: 'all',
      district: 'all',
      cropType: 'all',
      farmerType: 'all',
      ministry: 'all',
    });
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const renderSchemeCard = (scheme) => (
    <Link
      to={`/schemes/${scheme._id}`}
      key={scheme._id}
      className="block bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-all duration-200 border border-gray-100 dark:border-gray-700"
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-medium px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
            {scheme.category}
          </span>
          {scheme.isFeatured && (
            <span className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-2 py-1 rounded-full">
              ⭐ Featured
            </span>
          )}
        </div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1 line-clamp-1">
          {scheme.schemeName}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-2">
          {scheme.description}
        </p>
        <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
          <span>📍 {scheme.district}</span>
          <span>🌾 {scheme.cropType || 'All Crops'}</span>
          <span>👨‍🌾 {scheme.farmerType || 'All Farmers'}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">
            {scheme.amount}
          </span>
          <span className="text-red-500 dark:text-red-400 text-xs flex items-center">
            <ClockIcon className="w-3 h-3 mr-1" />
            {new Date(scheme.deadline).toLocaleDateString()}
          </span>
        </div>
        <div className="mt-3 flex items-center text-emerald-600 dark:text-emerald-400 font-medium text-sm hover:underline">
          View Details →
        </div>
      </div>
    </Link>
  );

  if (loading && schemes.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Loading government schemes...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
            🏛️ Government Schemes for Farmers
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Discover subsidies, loans, training, free seeds, and fertilizer support.
          </p>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="mt-2 md:mt-0 flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
        >
          <FunnelIcon className="w-5 h-5 text-gray-500" />
          <span className="text-gray-700 dark:text-gray-300 text-sm">
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </span>
        </button>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            name="search"
            placeholder="Search scheme by name..."
            value={filters.search}
            onChange={handleFilterChange}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition shadow-sm font-medium"
        >
          Search
        </button>
      </form>

      {/* Expandable Filters */}
      {showFilters && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 mb-6 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-gray-800 dark:text-white">Advanced Filters</h3>
            <button onClick={clearFilters} className="text-sm text-red-500 hover:underline">
              Clear All
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            >
              <option value="all">All Categories</option>
              <option value="Subsidy">Subsidy</option>
              <option value="Loan">Loan</option>
              <option value="Training">Training</option>
              <option value="Seed Distribution">Seed Distribution</option>
              <option value="Fertilizer Support">Fertilizer Support</option>
              <option value="Financial Support">Financial Support</option>
              <option value="Market Support">Market Support</option>
            </select>
            <select
              name="district"
              value={filters.district}
              onChange={handleFilterChange}
              className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            >
              <option value="all">All Districts</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Chittagong">Chittagong</option>
              <option value="Rajshahi">Rajshahi</option>
              <option value="Khulna">Khulna</option>
              <option value="Barishal">Barishal</option>
              <option value="Sylhet">Sylhet</option>
              <option value="Rangpur">Rangpur</option>
              <option value="Mymensingh">Mymensingh</option>
            </select>
            <select
              name="cropType"
              value={filters.cropType}
              onChange={handleFilterChange}
              className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            >
              <option value="all">All Crop Types</option>
              <option value="Rice">Rice</option>
              <option value="Wheat">Wheat</option>
              <option value="Maize">Maize</option>
              <option value="Sugarcane">Sugarcane</option>
              <option value="Cotton">Cotton</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
            </select>
            <select
              name="farmerType"
              value={filters.farmerType}
              onChange={handleFilterChange}
              className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            >
              <option value="all">All Farmer Types</option>
              <option value="Small">Small</option>
              <option value="Marginal">Marginal</option>
              <option value="Women">Women</option>
              <option value="Large">Large</option>
              <option value="SC/ST">SC/ST</option>
            </select>
            <select
              name="ministry"
              value={filters.ministry}
              onChange={handleFilterChange}
              className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            >
              <option value="all">All Ministries</option>
              <option value="Agriculture">Ministry of Agriculture</option>
              <option value="Finance">Ministry of Finance</option>
              <option value="Fisheries and Livestock">Ministry of Fisheries and Livestock</option>
              <option value="Food">Ministry of Food</option>
              <option value="Environment">Ministry of Environment</option>
              <option value="Local Government">Ministry of Local Government</option>
              <option value="Water Resources">Ministry of Water Resources</option>
            </select>
          </div>
          <div className="mt-3 flex justify-end">
            <button
              onClick={() => {
                setPagination((prev) => ({ ...prev, page: 1 }));
                fetchSchemes();
              }}
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition text-sm"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Category Buttons – simple, clean */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => {
            setFilters((prev) => ({ ...prev, category: 'all' }));
            setPagination((prev) => ({ ...prev, page: 1 }));
          }}
          className={`px-4 py-2 text-sm font-medium rounded-lg border transition ${
            filters.category === 'all'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
              : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          All Categories
        </button>
        {categories.length > 0 ? (
          categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setFilters((prev) => ({ ...prev, category: cat }));
                setPagination((prev) => ({ ...prev, page: 1 }));
              }}
              className={`px-4 py-2 text-sm font-medium rounded-lg border transition ${
                filters.category === cat
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {cat}
            </button>
          ))
        ) : (
          // fallback static list
          ['Financial Support', 'Subsidy', 'Loan', 'Training', 'Seed Distribution', 'Fertilizer Support', 'Market Support'].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setFilters((prev) => ({ ...prev, category: cat }));
                setPagination((prev) => ({ ...prev, page: 1 }));
              }}
              className={`px-4 py-2 text-sm font-medium rounded-lg border transition ${
                filters.category === cat
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {cat}
            </button>
          ))
        )}
      </div>

      {/* Scheme Grid */}
      {schemes.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <p className="text-lg text-gray-500 dark:text-gray-400">
            No schemes found matching your criteria.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schemes.map(renderSchemeCard)}
        </div>
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <button
            onClick={() => setPagination((prev) => ({ ...prev, page: prev.page - 1 }))}
            disabled={pagination.page === 1}
            className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-gray-700 dark:text-gray-300">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <button
            onClick={() => setPagination((prev) => ({ ...prev, page: prev.page + 1 }))}
            disabled={pagination.page === pagination.totalPages}
            className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Schemes;