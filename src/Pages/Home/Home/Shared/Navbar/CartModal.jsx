import React from 'react';
import { useNavigate } from 'react-router';
import { useCart } from '../../../../../Context/CartContext/CartContext';

const CartModal = ({ onClose }) => {
    const navigate = useNavigate();
    const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity < 1) return;
        updateQuantity(productId, newQuantity);
    };

    const handleCheckout = () => {
        onClose();
        navigate('/cart');
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        🛒 Shopping Cart
                        <span className="bg-white text-green-600 text-sm px-3 py-1 rounded-full">
                            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                        </span>
                    </h2>
                    <button 
                        onClick={onClose}
                        className="text-white hover:text-gray-200 text-3xl font-bold leading-none transition-colors"
                    >
                        ×
                    </button>
                </div>

                {/* Cart Items */}
                <div className="p-6 overflow-y-auto max-h-[60vh]">
                    {cartItems.length === 0 ? (
                        <div className="text-center py-12">
                            <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">Your cart is empty</h3>
                            <p className="text-gray-500">Add some products to get started!</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {cartItems.map((item) => {
                                const displayPrice = item.offerPrice && item.offerPrice < item.price ? item.offerPrice : item.price;
                                const itemTotal = displayPrice * item.quantity;
                                const itemId = item.id || item._id;

                                return (
                                    <div key={itemId} className="flex gap-4 bg-gray-50 p-4 rounded-xl hover:shadow-md transition-shadow">{/* Product Image */}
                                        <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
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
                                            <p className="text-sm text-gray-600 mb-2">{item.category}</p>
                                            
                                            <div className="flex items-center gap-4">
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
                                                <p className="text-sm text-gray-600">Item Total</p>
                                                <p className="text-xl font-bold text-gray-900">৳{itemTotal.toLocaleString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Footer with Total and Actions */}
                {cartItems.length > 0 && (
                    <div className="border-t border-gray-200 p-6 bg-gray-50">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <p className="text-sm text-gray-600">Total Amount</p>
                                <p className="text-3xl font-bold text-green-700">৳{getCartTotal().toLocaleString()}</p>
                            </div>
                            <button 
                                onClick={clearCart}
                                className="text-red-600 hover:text-red-800 font-semibold text-sm transition-colors"
                            >
                                Clear Cart
                            </button>
                        </div>
                        
                        <div className="flex gap-3">
                            <button 
                                onClick={onClose}
                                className="flex-1 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-all"
                            >
                                Continue Shopping
                            </button>
                            <button 
                                onClick={handleCheckout}
                                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-lg hover:from-green-700 hover:to-green-800 transition-all"
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartModal;
