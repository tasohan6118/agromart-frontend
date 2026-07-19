import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useCart } from '../../Context/CartContext/CartContext';
import useAuth from '../../Hooks/userAuth';

const Checkout = () => {
    const navigate = useNavigate();
    const { cartItems, getCartTotal, clearCart } = useCart();
    const { user } = useAuth();
    
    const [customerInfo, setCustomerInfo] = useState({
        name: user?.displayName || '',
        email: user?.email || '',
        phone: '',
        address: '',
        city: '',
        district: '',
        postalCode: ''
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!customerInfo.name.trim()) newErrors.name = 'Name is required';
        if (!customerInfo.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!customerInfo.phone.trim()) {
            newErrors.phone = 'Phone is required';
        } else if (!/^(\+8801|01)[3-9]\d{8}$/.test(customerInfo.phone)) {
            newErrors.phone = 'Invalid phone number (use 01XXXXXXXXX)';
        }
        if (!customerInfo.address.trim()) newErrors.address = 'Address is required';
        if (!customerInfo.city.trim()) newErrors.city = 'City is required';
        if (!customerInfo.district.trim()) newErrors.district = 'District is required';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleProceedToPayment = () => {
        if (cartItems.length === 0) {
            alert('⚠️ Your cart is empty!');
            navigate('/marketplace');
            return;
        }

        if (validateForm()) {
            // Store customer info in sessionStorage for payment page
            sessionStorage.setItem('customerInfo', JSON.stringify(customerInfo));
            sessionStorage.setItem('orderTotal', getCartTotal());
            sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
            navigate('/payment');
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Cart is Empty</h2>
                    <p className="text-gray-600 mb-6">Please add items to cart before checkout</p>
                    <button 
                        onClick={() => navigate('/marketplace')}
                        className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700"
                    >
                        Go to Marketplace
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-green-800 mb-2">📦 Checkout</h1>
                    <p className="text-gray-600">Complete your order information</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Customer Information Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Delivery Information</h2>
                            
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Full Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={customerInfo.name}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                                            placeholder="Enter your full name"
                                        />
                                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Email Address <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={customerInfo.email}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                                            placeholder="example@email.com"
                                        />
                                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Phone Number <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={customerInfo.phone}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                                        placeholder="01712345678"
                                    />
                                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Street Address <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="address"
                                        value={customerInfo.address}
                                        onChange={handleInputChange}
                                        rows="3"
                                        className={`w-full px-4 py-3 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                                        placeholder="House, Road, Area"
                                    />
                                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            City <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={customerInfo.city}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                                            placeholder="e.g., Dhaka"
                                        />
                                        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            District <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="district"
                                            value={customerInfo.district}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border ${errors.district ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                                            placeholder="e.g., Dhaka"
                                        />
                                        {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Postal Code
                                        </label>
                                        <input
                                            type="text"
                                            name="postalCode"
                                            value={customerInfo.postalCode}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            placeholder="1000"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>
                            
                            {/* Cart Items */}
                            <div className="mb-4 max-h-64 overflow-y-auto">
                                {cartItems.map((item) => {
                                    const itemId = item.id || item._id;
                                    const displayPrice = item.offerPrice && item.offerPrice < item.price ? item.offerPrice : item.price;
                                    return (
                                        <div key={itemId} className="flex gap-3 mb-3 pb-3 border-b border-gray-200">
                                            <img 
                                                src={item.imageUrl || 'https://via.placeholder.com/60'}
                                                alt={item.name}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                            <div className="flex-1">
                                                <p className="font-semibold text-sm text-gray-800">{item.name}</p>
                                                <p className="text-xs text-gray-600">{item.quantity} {item.unit} × ৳{displayPrice}</p>
                                                <p className="text-sm font-bold text-green-600">৳{(displayPrice * item.quantity).toLocaleString()}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Price Breakdown */}
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-gray-700">
                                    <span>Subtotal</span>
                                    <span className="font-semibold">৳{getCartTotal().toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>Delivery Fee</span>
                                    <span className="font-semibold text-green-600">Free</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>Tax</span>
                                    <span className="font-semibold">৳0</span>
                                </div>
                                <div className="border-t pt-3 flex justify-between">
                                    <span className="text-lg font-bold text-gray-900">Total</span>
                                    <span className="text-2xl font-bold text-green-700">৳{getCartTotal().toLocaleString()}</span>
                                </div>
                            </div>

                            <button 
                                onClick={handleProceedToPayment}
                                className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold text-lg rounded-lg transition-all shadow-lg hover:shadow-xl"
                            >
                                💳 Proceed to Payment
                            </button>
                        </div>

                        <button 
                            onClick={() => navigate('/cart')}
                            className="w-full py-3 bg-white border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-all"
                        >
                            ← Back to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
