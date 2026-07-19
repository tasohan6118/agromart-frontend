import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const PaymentCancel = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const transactionId = searchParams.get('tran_id') || '';

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
            <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                {/* Cancel Icon */}
                <div className="mx-auto w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-12 h-12 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                    </svg>
                </div>

                <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Cancelled ⚠️</h1>
                <p className="text-gray-500 mb-6">
                    You have cancelled the payment. Your order has not been placed and no money has been deducted.
                </p>

                {transactionId && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 text-left">
                        <p className="text-sm text-gray-500 mb-1">Transaction Reference</p>
                        <p className="font-mono text-sm font-semibold text-gray-800 break-all">{transactionId}</p>
                    </div>
                )}

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-sm text-blue-800 text-left">
                    <p>
                        Your cart items are still saved. You can go back and complete the payment whenever you're ready.
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    <button
                        id="retry-payment-cancel-btn"
                        onClick={() => navigate('/payment')}
                        className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all"
                    >
                        🔄 Try Payment Again
                    </button>
                    <button
                        id="back-to-cart-cancel-btn"
                        onClick={() => navigate('/cart')}
                        className="w-full py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
                    >
                        ← Back to Cart
                    </button>
                    <button
                        id="continue-shopping-cancel-btn"
                        onClick={() => navigate('/marketplace')}
                        className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold rounded-xl transition-all"
                    >
                        🛍️ Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentCancel;
