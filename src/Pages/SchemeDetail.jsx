// // src/pages/SchemeDetail.jsx
// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { schemeService } from '../services/schemeService';

// const SchemeDetail = () => {
//   const { id } = useParams();
//   const [scheme, setScheme] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchScheme();
//   }, [id]);

//   const fetchScheme = async () => {
//     setLoading(true);
//     try {
//       const data = await schemeService.getById(id);
//       if (data.success) {
//         setScheme(data.scheme);
//       }
//     } catch (error) {
//       console.error('Error fetching scheme:', error);
//     }
//     setLoading(false);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="text-xl text-gray-600">Loading scheme details...</div>
//       </div>
//     );
//   }

//   if (!scheme) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="text-center py-12">
//           <h2 className="text-2xl font-bold text-red-600">Scheme not found</h2>
//           <Link to="/schemes" className="text-green-600 hover:underline mt-4 inline-block">
//             Back to all schemes
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8 max-w-4xl">
//       <Link to="/schemes" className="text-green-600 hover:underline mb-4 inline-block">
//         ← Back to all schemes
//       </Link>

//       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
//         <div className="p-6 md:p-8">
//           {/* Header */}
//           <div className="flex flex-wrap justify-between items-start mb-4">
//             <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
//               {scheme.schemeName}
//             </h1>
//             <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
//               scheme.status === 'active' 
//                 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
//                 : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
//             }`}>
//               {scheme.status.charAt(0).toUpperCase() + scheme.status.slice(1)}
//             </span>
//           </div>

//           {/* Meta Info */}
//           <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
//             <span>Category: <span className="font-semibold">{scheme.category}</span></span>
//             <span>District: <span className="font-semibold">{scheme.district}</span></span>
//             <span>Amount: <span className="font-semibold text-green-600 dark:text-green-400">{scheme.amount}</span></span>
//             <span>Deadline: <span className="font-semibold text-red-500">{new Date(scheme.deadline).toLocaleDateString()}</span></span>
//           </div>

//           {/* Description */}
//           <div className="mb-6">
//             <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Description</h2>
//             <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{scheme.description}</p>
//           </div>

//           {/* Eligibility */}
//           <div className="mb-6">
//             <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Eligibility</h2>
//             <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{scheme.eligibility}</p>
//           </div>

//           {/* Required Documents */}
//           <div className="mb-6">
//             <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Required Documents</h2>
//             <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
//               {scheme.requiredDocuments?.map((doc, index) => (
//                 <li key={index}>{doc}</li>
//               ))}
//             </ul>
//           </div>

//           {/* Application Process */}
//           <div className="mb-6">
//             <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Application Process</h2>
//             <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{scheme.applicationProcess}</div>
//           </div>

//           {/* Contact Info */}
//           {scheme.contactInfo && (
//             <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
//               <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Contact Information</h2>
//               <p className="text-gray-700 dark:text-gray-300">{scheme.contactInfo}</p>
//             </div>
//           )}

//           {/* Actions */}
//           <div className="flex gap-4 mt-8">
//             <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
//               Apply Now
//             </button>
//             <button className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
//               Download Details
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SchemeDetail;
// src/pages/SchemeDetail.jsx







// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { schemeService } from '../services/schemeService';
// import {
//   CalendarIcon,
//   DocumentTextIcon,
//   CheckCircleIcon,
//   LinkIcon,
//   QuestionMarkCircleIcon,
//   ArrowLeftIcon,
// } from '@heroicons/react/24/outline';

// const SchemeDetail = () => {
//   const { id } = useParams();
//   const [scheme, setScheme] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchScheme = async () => {
//       try {
//         const data = await schemeService.getById(id);
//         if (data.success) {
//           setScheme(data.scheme);
//         } else {
//           setError('Scheme not found');
//         }
//       } catch (err) {
//         setError('Error loading scheme details');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchScheme();
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="text-xl text-gray-600">Loading scheme details...</div>
//       </div>
//     );
//   }

//   if (error || !scheme) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="text-center text-red-500">{error || 'Scheme not found'}</div>
//         <Link to="/schemes" className="text-green-600 hover:underline block mt-4">
//           ← Back to Schemes
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8 max-w-4xl">
//       {/* Back Button */}
//       <Link to="/schemes" className="inline-flex items-center text-green-600 hover:underline mb-4">
//         <ArrowLeftIcon className="w-4 h-4 mr-1" />
//         Back to Schemes
//       </Link>

//       {/* Header */}
//       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700">
//         <div className="flex flex-wrap items-start justify-between gap-2">
//           <div>
//             <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-semibold mb-2">
//               {scheme.category}
//             </span>
//             <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
//               {scheme.schemeName}
//             </h1>
//             <p className="text-gray-600 dark:text-gray-300 mt-1">
//               {scheme.district} • {scheme.ministry || 'Ministry of Agriculture'}
//             </p>
//           </div>
//           {scheme.isFeatured && (
//             <span className="flex items-center text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30 px-3 py-1 rounded-full text-sm">
//               <StarIcon className="w-5 h-5 mr-1" />
//               Featured
//             </span>
//           )}
//         </div>
//         <div className="mt-4 flex flex-wrap gap-4 text-sm">
//           <span className="flex items-center text-gray-700 dark:text-gray-300">
//             <CalendarIcon className="w-5 h-5 mr-1 text-red-500" />
//             Deadline: <span className="font-semibold ml-1">{new Date(scheme.deadline).toLocaleDateString()}</span>
//           </span>
//           <span className="flex items-center text-gray-700 dark:text-gray-300">
//             <DocumentTextIcon className="w-5 h-5 mr-1 text-blue-500" />
//             Amount: <span className="font-semibold ml-1">{scheme.amount}</span>
//           </span>
//           <span className="flex items-center text-gray-700 dark:text-gray-300">
//             <CheckCircleIcon className="w-5 h-5 mr-1 text-green-500" />
//             Status: <span className="font-semibold ml-1">{scheme.status || 'Active'}</span>
//           </span>
//         </div>
//       </div>

//       {/* Description */}
//       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
//         <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">📝 Description</h2>
//         <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
//           {scheme.description}
//         </p>
//       </div>

//       {/* Eligibility */}
//       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
//         <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">✅ Eligibility</h2>
//         <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
//           {scheme.eligibility && scheme.eligibility.length > 0 ? (
//             scheme.eligibility.map((item, idx) => <li key={idx}>{item}</li>)
//           ) : (
//             <li>No specific eligibility criteria listed.</li>
//           )}
//         </ul>
//       </div>

//       {/* Benefits */}
//       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
//         <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">🎯 Benefits</h2>
//         <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
//           {scheme.benefits && scheme.benefits.length > 0 ? (
//             scheme.benefits.map((item, idx) => <li key={idx}>{item}</li>)
//           ) : (
//             <li>No benefits listed.</li>
//           )}
//         </ul>
//       </div>

//       {/* Required Documents */}
//       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
//         <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">📄 Required Documents</h2>
//         <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
//           {scheme.documents && scheme.documents.length > 0 ? (
//             scheme.documents.map((doc, idx) => <li key={idx}>{doc}</li>)
//           ) : (
//             <li>No documents specified.</li>
//           )}
//         </ul>
//       </div>

//       {/* Application Process (Step-by-Step) */}
//       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
//         <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">📋 Application Process</h2>
//         {scheme.applicationSteps && scheme.applicationSteps.length > 0 ? (
//           <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
//             {scheme.applicationSteps.map((step, idx) => (
//               <li key={idx} className="pl-2">{step}</li>
//             ))}
//           </ol>
//         ) : (
//           <p className="text-gray-700 dark:text-gray-300">
//             Visit the official website or contact the local agriculture office for application details.
//           </p>
//         )}
//       </div>

//       {/* Last Date to Apply (already shown) */}
//       {/* Official Apply Link */}
//       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
//         <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">🔗 Apply Now</h2>
//         {scheme.applyLink ? (
//           <a
//             href={scheme.applyLink}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//           >
//             <LinkIcon className="w-5 h-5 mr-2" />
//             Apply Online
//           </a>
//         ) : (
//           <p className="text-gray-700 dark:text-gray-300">
//             No direct online application link available. Please visit the nearest agriculture office.
//           </p>
//         )}
//       </div>

//       {/* FAQs */}
//       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
//         <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
//           <QuestionMarkCircleIcon className="w-6 h-6 inline mr-2" />
//           Frequently Asked Questions
//         </h2>
//         {scheme.faqs && scheme.faqs.length > 0 ? (
//           <div className="space-y-4">
//             {scheme.faqs.map((faq, idx) => (
//               <div key={idx} className="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-0">
//                 <h4 className="font-semibold text-gray-800 dark:text-white">{faq.question}</h4>
//                 <p className="text-gray-700 dark:text-gray-300 mt-1">{faq.answer}</p>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-700 dark:text-gray-300">No FAQs available for this scheme.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SchemeDetail;


// src/pages/SchemeDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { schemeService } from '../services/schemeService';
import {
  CalendarIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  LinkIcon,
  QuestionMarkCircleIcon,
  ArrowLeftIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  GlobeAltIcon,
  InformationCircleIcon,
  CurrencyRupeeIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  ClockIcon,
  BookOpenIcon,
  DocumentDuplicateIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';

const SchemeDetail = () => {
  const { id } = useParams();
  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchScheme = async () => {
      try {
        const data = await schemeService.getById(id);
        if (data.success) {
          setScheme(data.scheme);
        } else {
          setError('Scheme not found');
        }
      } catch (err) {
        setError('Error loading scheme details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchScheme();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Loading scheme details...</div>
      </div>
    );
  }

  if (error || !scheme) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">{error || 'Scheme not found'}</div>
        <Link to="/schemes" className="text-green-600 hover:underline block mt-4">
          ← Back to Schemes
        </Link>
      </div>
    );
  }

  // Helper to render bullet list
  const renderList = (items, fallback = 'No information available.') => {
    if (!items || items.length === 0) {
      return <p className="text-gray-500 dark:text-gray-400 italic">{fallback}</p>;
    }
    return (
      <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero / Header Section */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-6">
          {/* Breadcrumb */}
          <Link 
            to="/schemes" 
            className="inline-flex items-center text-green-600 dark:text-green-400 hover:underline mb-4 text-sm"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-1" />
            Back to Schemes
          </Link>

          {/* Scheme Title & Meta */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-semibold">
                  {scheme.category || 'Scheme'}
                </span>
                {scheme.isFeatured && (
                  <span className="inline-flex items-center px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full text-sm font-semibold">
                    ⭐ Featured
                  </span>
                )}
                <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-semibold">
                  {scheme.ministry || 'Ministry of Agriculture'}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {scheme.schemeName}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span className="flex items-center">
                  <BuildingOfficeIcon className="w-4 h-4 mr-1" />
                  {scheme.district || 'All Districts'}
                </span>
                <span className="flex items-center">
                  <CurrencyRupeeIcon className="w-4 h-4 mr-1" />
                  {scheme.amount || 'Not specified'}
                </span>
                <span className="flex items-center">
                  <UserGroupIcon className="w-4 h-4 mr-1" />
                  {scheme.farmerType || 'All Farmers'}
                </span>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end">
              <div className="flex items-center text-red-500 dark:text-red-400">
                <ClockIcon className="w-5 h-5 mr-2" />
                <span className="font-semibold">
                  Deadline: {new Date(scheme.deadline).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Status: <span className="font-semibold text-green-600 dark:text-green-400">{scheme.status || 'Active'}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sticky top-4 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">📋 Quick Info</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Category</span>
                  <p className="font-medium text-gray-900 dark:text-white">{scheme.category || 'N/A'}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Ministry</span>
                  <p className="font-medium text-gray-900 dark:text-white">{scheme.ministry || 'N/A'}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Crop Type</span>
                  <p className="font-medium text-gray-900 dark:text-white">{scheme.cropType || 'All Crops'}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Farmer Type</span>
                  <p className="font-medium text-gray-900 dark:text-white">{scheme.farmerType || 'All Farmers'}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">District</span>
                  <p className="font-medium text-gray-900 dark:text-white">{scheme.district || 'All Districts'}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Views</span>
                  <p className="font-medium text-gray-900 dark:text-white">{scheme.views || 0} views</p>
                </div>
              </div>

              {/* Apply Button */}
              {scheme.applyLink && (
                <div className="mt-6">
                  <a
                    href={scheme.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    <LinkIcon className="w-5 h-5 mr-2" />
                    Apply Online
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="flex flex-wrap -mb-px">
                  {['overview', 'benefits', 'how-to-apply', 'references', 'details'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === tab
                          ? 'border-green-600 text-green-600 dark:text-green-400'
                          : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                      }`}
                    >
                      {tab === 'overview' && '📖 Overview'}
                      {tab === 'benefits' && '🎯 Benefits'}
                      {tab === 'how-to-apply' && '📋 How to Apply'}
                      {tab === 'references' && '📚 References'}
                      {tab === 'details' && '📝 Details'}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About This Scheme</h2>
                    <div className="prose prose-green dark:prose-invert max-w-none">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                        {scheme.description}
                      </p>
                    </div>
                    
                    {/* Eligibility */}
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                        <CheckCircleIcon className="w-5 h-5 mr-2 text-green-600" />
                        Eligibility Criteria
                      </h3>
                      {renderList(scheme.eligibility)}
                    </div>

                    {/* Crop & Farmer info */}
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Crop Type</span>
                        <p className="font-semibold text-gray-900 dark:text-white">{scheme.cropType || 'All Crops'}</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Farmer Type</span>
                        <p className="font-semibold text-gray-900 dark:text-white">{scheme.farmerType || 'All Farmers'}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Benefits Tab */}
                {activeTab === 'benefits' && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🎯 Benefits</h2>
                    {renderList(scheme.benefits, 'No specific benefits listed for this scheme.')}
                  </div>
                )}

                {/* How to Apply Tab */}
                {activeTab === 'how-to-apply' && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">📋 How to Apply</h2>
                    
                    {scheme.applicationSteps && scheme.applicationSteps.length > 0 ? (
                      <div className="space-y-4">
                        <p className="text-gray-600 dark:text-gray-400 mb-4">Follow these steps to apply for this scheme:</p>
                        <ol className="space-y-3">
                          {scheme.applicationSteps.map((step, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full flex items-center justify-center font-semibold text-sm">
                                {idx + 1}
                              </span>
                              <span className="text-gray-700 dark:text-gray-300 pt-1">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400 italic">
                        No application steps available. Visit the official website for more details.
                      </p>
                    )}

                    {/* Required Documents */}
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                        <DocumentTextIcon className="w-5 h-5 mr-2 text-blue-600" />
                        Required Documents
                      </h3>
                      {renderList(scheme.documents, 'No documents listed.')}
                    </div>

                    {/* Apply Link */}
                    {scheme.applyLink && (
                      <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                        <p className="text-gray-700 dark:text-gray-300 mb-3">
                          Ready to apply? Visit the official website:
                        </p>
                        <a
                          href={scheme.applyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-green-600 dark:text-green-400 hover:underline font-semibold"
                        >
                          <LinkIcon className="w-4 h-4 mr-2" />
                          {scheme.applyLink}
                        </a>
                      </div>
                    )}
                  </div>
                )}

                {/* References Tab */}
                {activeTab === 'references' && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">📚 References & Resources</h2>
                    
                    <div className="space-y-4">
                      {/* Official Links */}
                      {scheme.applyLink && (
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Official Website</h4>
                          <a
                            href={scheme.applyLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 dark:text-green-400 hover:underline"
                          >
                            {scheme.applyLink}
                          </a>
                        </div>
                      )}

                      {/* Ministry Info */}
                      {scheme.ministry && (
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Ministry</h4>
                          <p className="text-gray-700 dark:text-gray-300">{scheme.ministry}</p>
                        </div>
                      )}

                      {/* FAQ Section */}
                      {scheme.faqs && scheme.faqs.length > 0 && (
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                            <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2 text-blue-600" />
                            Frequently Asked Questions
                          </h4>
                          <div className="space-y-4">
                            {scheme.faqs.map((faq, idx) => (
                              <div key={idx} className="border-b border-gray-200 dark:border-gray-600 pb-3 last:border-0">
                                <p className="font-medium text-gray-900 dark:text-white">{faq.question}</p>
                                <p className="text-gray-600 dark:text-gray-400 mt-1">{faq.answer}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Details Tab */}
                {activeTab === 'details' && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">📝 Scheme Details</h2>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Scheme Name</span>
                          <p className="font-semibold text-gray-900 dark:text-white">{scheme.schemeName}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Category</span>
                          <p className="font-semibold text-gray-900 dark:text-white">{scheme.category || 'N/A'}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Amount</span>
                          <p className="font-semibold text-gray-900 dark:text-white">{scheme.amount || 'N/A'}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Status</span>
                          <p className="font-semibold text-gray-900 dark:text-white capitalize">{scheme.status || 'Active'}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Deadline</span>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {new Date(scheme.deadline).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Popularity</span>
                          <p className="font-semibold text-gray-900 dark:text-white">{scheme.popularity || 0}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemeDetail;