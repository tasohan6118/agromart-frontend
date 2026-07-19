import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const PaymentFail = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [details, setDetails] = useState({});

    useEffect(() => {
        // SSLCommerz sends query params on failure
        const transactionId = searchParams.get('tran_id') || '';
        const error = searchParams.get('error') || 'Payment could not be processed.';
        const status = searchParams.get('status') || 'FAILED';
        setDetails({ transactionId, error, status });
    }, [searchParams]);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
            <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                {/* Fail Icon */}
                <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>

                <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Failed ❌</h1>
                <p className="text-gray-500 mb-6">
                    Unfortunately your payment could not be completed. No money has been deducted.
                </p>

                {details.transactionId && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 text-left">
                        <p className="text-sm text-gray-500 mb-1">Transaction Reference</p>
                        <p className="font-mono text-sm font-semibold text-gray-800 break-all">{details.transactionId}</p>
                        {details.error && (
                            <p className="text-sm text-red-600 mt-2">Reason: {details.error}</p>
                        )}
                    </div>
                )}

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 text-sm text-yellow-800 text-left">
                    <p className="font-semibold mb-1">What to do next:</p>
                    <ul className="list-disc list-inside space-y-1 text-yellow-700">
                        <li>Check your internet connection and try again</li>
                        <li>Make sure you have sufficient balance</li>
                        <li>Try a different payment method</li>
                        <li>Contact your bank if the issue persists</li>
                    </ul>
                </div>

                <div className="flex flex-col gap-3">
                    <button
                        id="retry-payment-btn"
                        onClick={() => navigate('/payment')}
                        className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all"
                    >
                        🔄 Try Again
                    </button>
                    <button
                        id="back-to-cart-fail-btn"
                        onClick={() => navigate('/cart')}
                        className="w-full py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
                    >
                        ← Back to Cart
                    </button>
                    <button
                        id="go-home-fail-btn"
                        onClick={() => navigate('/')}
                        className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold rounded-xl transition-all"
                    >
                        Go to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentFail;
