import React from 'react';
import { useNavigate } from 'react-router';
import { useCart } from '../../Context/CartContext/CartContext';

const Cart = () => {
    const navigate = useNavigate();
    const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity < 1) return;
        updateQuantity(productId, newQuantity);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-green-800 mb-2">🛒 Shopping Cart</h1>
                    <p className="text-gray-600">Review your items and proceed to checkout</p>
                </div>

                {cartItems.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-md p-12 text-center">
                        <svg className="w-32 h-32 mx-auto text-gray-300 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <h3 className="text-2xl font-semibold text-gray-600 mb-4">Your cart is empty</h3>
                        <p className="text-gray-500 mb-6">Add some products to get started!</p>
                        <button
                            onClick={() => navigate('/marketplace')}
                            className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Browse Products
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Cart Items Section */}
                        <div className="lg:col-span-2 space-y-4">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        Cart Items ({cartItems.length})
                                    </h2>
                                    <button
                                        onClick={clearCart}
                                        className="text-red-600 hover:text-red-800 font-semibold text-sm transition-colors"
                                    >
                                        Clear Cart
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {cartItems.map((item) => {
                                        const displayPrice = item.offerPrice && item.offerPrice < item.price ? item.offerPrice : item.price;
                                        const itemTotal = displayPrice * item.quantity;
                                        const itemId = item.id || item._id;

                                        return (
                                            <div key={itemId} className="flex gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
                                                {/* Product Image */}
                                                <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200">
                                                    <img
                                                        src={item.imageUrl || 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=200&h=200&fit=crop'}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.target.src = 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=200&h=200&fit=crop';
                                                        }}
                                                    />
                                                </div>

                                                {/* Product Details */}
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-gray-900 text-lg mb-1">{item.name}</h3>
                                                    <p className="text-sm text-gray-600 mb-3">{item.category}</p>

                                                    <div className="flex items-center gap-6">
                                                        {/* Price */}
                                                        <div>
                                                            <span className="text-lg font-bold text-green-600">৳{displayPrice}</span>
                                                            <span className="text-sm text-gray-500"> / {item.unit || 'kg'}</span>
                                                            {item.offerPrice && item.offerPrice < item.price && (
                                                                <span className="text-sm text-gray-400 line-through ml-2">৳{item.price}</span>
                                                            )}
                                                        </div>

                                                        {/* Quantity Controls */}
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={() => handleQuantityChange(itemId, item.quantity - 1)}
                                                                className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-lg font-bold transition-colors"
                                                            >
                                                                −
                                                            </button>
                                                            <span className="w-12 text-center font-bold text-lg">{item.quantity}</span>
                                                            <button
                                                                onClick={() => handleQuantityChange(itemId, item.quantity + 1)}
                                                                className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-lg font-bold transition-colors"
                                                            >
                                                                +
                                                            </button>
                                                            <span className="text-sm text-gray-600">{item.unit || 'kg'}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Item Total & Remove */}
                                                <div className="flex flex-col items-end justify-between">
                                                    <button
                                                        onClick={() => removeFromCart(itemId)}
                                                        className="text-red-500 hover:text-red-700 font-semibold text-sm transition-colors"
                                                    >
                                                        Remove
                                                    </button>
                                                    <div className="text-right">
                                                        <p className="text-sm text-gray-600">Total</p>
                                                        <p className="text-xl font-bold text-gray-900">৳{itemTotal.toLocaleString()}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Order Summary Section */}
                        <div className="space-y-6">
                            {/* Order Summary */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-gray-700">
                                        <span>Subtotal ({cartItems.length} items)</span>
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
                                        <span className="text-lg font-bold text-gray-900">Total Amount</span>
                                        <span className="text-2xl font-bold text-green-700">৳{getCartTotal().toLocaleString()}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => navigate('/checkout')}
                                    className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold text-lg rounded-lg transition-all shadow-lg hover:shadow-xl"
                                >
                                    🔒 Proceed to Checkout
                                </button>

                                <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                                    <div className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <div className="text-sm text-green-800">
                                            <p className="font-semibold">Secure Checkout</p>
                                            <p>Your payment information is safe and encrypted</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Continue Shopping */}
                            <button
                                onClick={() => navigate('/marketplace')}
                                className="w-full py-3 bg-white border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-all"
                            >
                                ← Continue Shopping
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
