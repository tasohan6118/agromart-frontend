import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../../Context/LanguageContext/LanguageContext';

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const [orderDetails, setOrderDetails] = useState(null);
        const { language } = useLanguage();

        const text = language === 'bn'
            ? {
                    title: 'পেমেন্ট সফল হয়েছে! 🎉',
                    subtitle: 'আপনার অর্ডারের জন্য ধন্যবাদ। আপনার পেমেন্ট সফলভাবে সম্পন্ন হয়েছে।',
                    transactionId: 'লেনদেন আইডি',
                    deliveryDetails: 'ডেলিভারি তথ্য',
                    name: 'নাম',
                    email: 'ইমেইল',
                    phone: 'ফোন',
                    deliveryAddress: 'ডেলিভারি ঠিকানা',
                    orderSummary: 'অর্ডার সারাংশ',
                    paymentMethod: 'পেমেন্ট পদ্ধতি',
                    orderDate: 'অর্ডারের তারিখ',
                    totalPaid: 'মোট পরিশোধ',
                    paymentStatus: 'পেমেন্টের অবস্থা',
                    paid: 'পরিশোধিত',
                    orderStatus: 'অর্ডারের অবস্থা',
                    processing: 'প্রক্রিয়াধীন',
                    continueShopping: 'কেনাকাটা চালিয়ে যান',
                    backHome: 'হোমে ফিরে যান',
                    confirmation: 'একটি নিশ্চিতকরণ ইমেইল পাঠানো হয়েছে',
                    deliveryTime: 'আপনার অর্ডার ৩-৫ কর্মদিবসের মধ্যে পৌঁছে যাবে',
                }
            : {
                    title: 'Payment Successful! 🎉',
                    subtitle: 'Thank you for your order. Your payment has been processed successfully.',
                    transactionId: 'Transaction ID',
                    deliveryDetails: 'Delivery Details',
                    name: 'Name',
                    email: 'Email',
                    phone: 'Phone',
                    deliveryAddress: 'Delivery Address',
                    orderSummary: 'Order Summary',
                    paymentMethod: 'Payment Method',
                    orderDate: 'Order Date',
                    totalPaid: 'Total Paid',
                    paymentStatus: 'Payment Status',
                    paid: 'Paid',
                    orderStatus: 'Order Status',
                    processing: 'Processing',
                    continueShopping: 'Continue Shopping',
                    backHome: 'Back to Home',
                    confirmation: 'A confirmation email has been sent',
                    deliveryTime: 'Your order will be delivered within 3-5 business days',
                };

    const [searchParams] = useSearchParams();

    useEffect(() => {
        // --- SSLCommerz success redirect ---
        // SSLCommerz sends: val_id, tran_id, amount, card_type, store_amount, etc.
        const valId = searchParams.get('val_id');
        const tranId = searchParams.get('tran_id');
        const amount = searchParams.get('amount');
        const sslStatus = searchParams.get('status');

        if (valId && tranId && sslStatus === 'VALID') {
            // Build order details from SSLCommerz params
            const storedCustomerInfo = JSON.parse(sessionStorage.getItem('customerInfo') || 'null');
            const storedItems = JSON.parse(sessionStorage.getItem('cartItems') || '[]');
            const sslOrderDetails = {
                transactionId: tranId,
                customerInfo: storedCustomerInfo,
                orderTotal: parseFloat(amount) || 0,
                paymentMethod: 'SSLCommerz',
                mobileNumber: null,
                orderItems: storedItems,
                orderDate: new Date().toISOString(),
                status: 'success',
                valId
            };
            sessionStorage.setItem('orderDetails', JSON.stringify(sslOrderDetails));
            sessionStorage.removeItem('customerInfo');
            sessionStorage.removeItem('orderTotal');
            setOrderDetails(sslOrderDetails);
            return;
        }

        // --- Existing sessionStorage flow (dummy / mobile payments) ---
        const storedDetails = sessionStorage.getItem('orderDetails');
        
        if (!storedDetails) {
            navigate('/marketplace');
            return;
        }
        
        setOrderDetails(JSON.parse(storedDetails));
        
        // Clear order details from sessionStorage after displaying
        // sessionStorage.removeItem('orderDetails');
    }, [navigate, searchParams]);

    if (!orderDetails) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600"></div>
            </div>
        );
    }

    const downloadReceipt = () => {
        const details = orderDetails;
        const items = (details.orderItems || []).map((item) => `<tr><td>${item.name || 'Product'}</td><td>${item.quantity || 1}</td><td>৳${Number(item.offerPrice || item.price || 0).toLocaleString()}</td></tr>`).join('');
        const receipt = `<!doctype html><html><head><meta charset="utf-8"><title>AgroMart Payment Receipt</title><style>body{font-family:Arial,sans-serif;color:#26352b;max-width:720px;margin:40px auto;padding:24px}header{border-bottom:3px solid #198754;padding-bottom:16px;margin-bottom:24px}h1{color:#198754;margin:0 0 5px}table{width:100%;border-collapse:collapse;margin-top:20px}td,th{padding:10px;border-bottom:1px solid #ddd;text-align:left}.total{font-size:22px;font-weight:700;text-align:right;margin-top:24px}.muted{color:#66736a;font-size:13px}.success{color:#198754;font-weight:bold}</style></head><body><header><h1>AgroMart</h1><div class="muted">Official payment receipt</div></header><p class="success">Payment successful</p><p><b>Transaction ID:</b> ${details.transactionId}<br><b>Date:</b> ${new Date(details.orderDate).toLocaleString()}<br><b>Payment method:</b> ${details.paymentMethod}${details.mobileNumber ? `<br><b>Mobile number:</b> ${details.mobileNumber}` : ''}</p><p><b>Customer:</b> ${details.customerInfo?.name || ''}<br><b>Email:</b> ${details.customerInfo?.email || ''}<br><b>Phone:</b> ${details.customerInfo?.phone || ''}</p><table><thead><tr><th>Item</th><th>Qty</th><th>Price</th></tr></thead><tbody>${items || '<tr><td>Order items</td><td>-</td><td>-</td></tr>'}</tbody></table><div class="total">Total paid: ৳${Number(details.orderTotal || 0).toLocaleString()}</div><p class="muted">This is a dummy payment receipt generated by AgroMart. No real money was deducted.</p></body></html>`;
        const url = URL.createObjectURL(new Blob([receipt], { type: 'text/html;charset=utf-8' }));
        const link = document.createElement('a');
        link.href = url;
        link.download = `agromart-receipt-${details.transactionId}.html`;
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
            <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
                {/* Success Icon */}
                <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
                    <svg
                        className="w-12 h-12 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
                    {text.title}
                </h1>
                <p className="text-gray-600 mb-8 text-center">
                    {text.subtitle}
                </p>

                {/* Order Details */}
                <div className="space-y-4 mb-8">
                    {/* Transaction ID */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">{text.transactionId}</p>
                        <p className="text-lg font-mono font-semibold text-gray-800">
                            {orderDetails.transactionId}
                        </p>
                    </div>

                    {/* Customer Info */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <h3 className="font-semibold text-gray-800 mb-3 text-lg">{text.deliveryDetails}</h3>
                        <div className="text-sm text-gray-700 space-y-2">
                            <div className="flex justify-between">
                                <span className="font-medium">{text.name}:</span>
                                <span>{orderDetails.customerInfo?.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">{text.email}:</span>
                                <span>{orderDetails.customerInfo?.email}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">{text.phone}:</span>
                                <span>{orderDetails.customerInfo?.phone}</span>
                            </div>
                            {orderDetails.customerInfo?.address && (
                                <div className="pt-2 border-t border-gray-300">
                                    <p className="font-medium mb-1">{text.deliveryAddress}:</p>
                                    <p className="text-gray-600">
                                        {orderDetails.customerInfo.address}<br />
                                        {orderDetails.customerInfo.city}, {orderDetails.customerInfo.district}
                                        {orderDetails.customerInfo.postalCode && ` - ${orderDetails.customerInfo.postalCode}`}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <h3 className="font-semibold text-gray-800 mb-3 text-lg">{text.orderSummary}</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between text-gray-700">
                                <span>{text.paymentMethod}</span>
                                <span className="font-semibold capitalize">
                                    {orderDetails.paymentMethod === 'SSLCommerz'
                                        ? 'SSLCommerz'
                                        : orderDetails.paymentMethod === 'card'
                                            ? (language === 'bn' ? 'কার্ড পেমেন্ট' : 'Card Payment')
                                            : (language === 'bn' ? 'মোবাইল ব্যাংকিং' : 'Mobile Banking')}
                                </span>
                            </div>
                            <div className="flex justify-between text-gray-700">
                                <span>{text.orderDate}</span>
                                <span className="font-semibold">
                                    {new Date(orderDetails.orderDate).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                </span>
                            </div>
                            <div className="border-t border-gray-300 pt-3 mt-3 flex justify-between items-center">
                                <span className="font-bold text-gray-800 text-lg">{text.totalPaid}</span>
                                <span className="text-2xl font-bold text-green-600">
                                    ৳{orderDetails.orderTotal?.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Order Status */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">{text.paymentStatus}</p>
                                <p className="text-lg font-semibold text-green-600">
                                    ✓ {text.paid}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">{text.orderStatus}</p>
                                <p className="text-lg font-semibold text-green-600">
                                    📦 {text.processing}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                    <button
                        onClick={downloadReceipt}
                        className="w-full border-2 border-green-600 text-green-700 hover:bg-green-50 font-semibold py-3 px-6 rounded-lg transition"
                    >
                        Download payment receipt
                    </button>
                    <button
                        onClick={() => navigate('/marketplace')}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition"
                    >
                        {text.continueShopping}
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition"
                    >
                        {text.backHome}
                    </button>
                </div>

                {/* Confirmation Message */}
                <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                    <p className="text-sm text-gray-500 mb-2">
                        📧 {text.confirmation} to <strong>{orderDetails.customerInfo?.email}</strong>
                    </p>
                    <p className="text-xs text-gray-400">
                        {text.deliveryTime}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
