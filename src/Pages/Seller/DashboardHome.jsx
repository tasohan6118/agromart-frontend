import React from 'react';
import { useLanguage } from '../../Context/LanguageContext/LanguageContext';

const DashboardHome = () => {
        const { language } = useLanguage();
        const text = language === 'bn'
            ? {
                    welcome: 'বিক্রেতা ড্যাশবোর্ডে স্বাগতম',
                    subtitle: 'এখান থেকে আপনার পণ্য, অর্ডার এবং ব্যবসা পরিচালনা করুন।',
                    totalProducts: 'মোট পণ্য',
                    pendingOrders: 'অপেক্ষমাণ অর্ডার',
                    totalRevenue: 'মোট আয়',
                    hint: 'শুরু করতে সাইডবার থেকে একটি অপশন নির্বাচন করুন।',
                }
            : {
                    welcome: 'Welcome to Seller Dashboard',
                    subtitle: 'Manage your products, orders, and business from here.',
                    totalProducts: 'Total Products',
                    pendingOrders: 'Pending Orders',
                    totalRevenue: 'Total Revenue',
                    hint: 'Select an option from the sidebar to get started.',
                };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center">
                                <h1 className="text-3xl font-bold text-gray-800 mb-4">{text.welcome}</h1>
                                <p className="text-gray-600 mb-6">{text.subtitle}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="p-6 bg-indigo-50 rounded-lg">
                        <div className="text-indigo-600 text-3xl font-bold mb-2">0</div>
                        <div className="text-gray-600">{text.totalProducts}</div>
                    </div>
                    <div className="p-6 bg-green-50 rounded-lg">
                        <div className="text-green-600 text-3xl font-bold mb-2">0</div>
                        <div className="text-gray-600">{text.pendingOrders}</div>
                    </div>
                    <div className="p-6 bg-yellow-50 rounded-lg">
                        <div className="text-yellow-600 text-3xl font-bold mb-2">$0</div>
                        <div className="text-gray-600">{text.totalRevenue}</div>
                    </div>
                </div>
                
                <div className="mt-8">
                    <p className="text-gray-500">{text.hint}</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;