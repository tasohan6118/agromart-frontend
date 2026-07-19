import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { useCart } from '../../Context/CartContext/CartContext';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

const mobileProviders = {
    bKash: { color: '#e2136e', soft: '#fff0f6', logo: 'bK', label: 'bKash' },
    Nagad: { color: '#f97316', soft: '#fff7ed', logo: 'N', label: 'Nagad' },
    Rocket: { color: '#6d28d9', soft: '#f5f3ff', logo: 'R', label: 'Rocket' }
};

const maskPhone = (phone) => phone.length > 6 ? `${phone.slice(0, 3)}••••${phone.slice(-4)}` : phone;

const Payment = () => {
    const navigate = useNavigate();
    const { clearCart } = useCart();
    const [customerInfo, setCustomerInfo] = useState(null);
    const [orderTotal, setOrderTotal] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('sslcommerz');
    // Mobile banking states
    const [selectedProvider, setSelectedProvider] = useState('bKash');
    const [modalOpen, setModalOpen] = useState(false);
    const [step, setStep] = useState('phone');
    const [mobileNumber, setMobileNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [pin, setPin] = useState('');
    const [verificationId, setVerificationId] = useState('');
    const [channels, setChannels] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [busy, setBusy] = useState(false);
    const [sslLoading, setSslLoading] = useState(false);

    const provider = mobileProviders[selectedProvider];

    useEffect(() => {
        const info = sessionStorage.getItem('customerInfo');
        const total = sessionStorage.getItem('orderTotal');
        if (!info || !total) { navigate('/cart'); return; }
        setCustomerInfo(JSON.parse(info));
        setOrderTotal(Number(total));
    }, [navigate]);

    const orderItems = useMemo(() => JSON.parse(sessionStorage.getItem('cartItems') || '[]'), []);

    const resetFeedback = () => { setError(''); setMessage(''); };

    /* ─── SSLCommerz (real payment gateway) ─── */
    const payWithSSLCommerz = async () => {
        setSslLoading(true);
        setError('');
        try {
            // const response = await axios.post(`${API_URL}/create-payment`, {
            //     amount: orderTotal,
            //     customerInfo,
            //     orderItems
            // });

    //         const response = await axios.post(`${API_URL}/create-payment`, {
    // order_total: orderTotal,   // ✅ Fixed! Matches backend expectation
    // customerInfo,
    // orderItems
// });


await axios.post(`${API_URL}/create-payment`, {
    orderTotal,
    customerInfo,
    orderItems
});




            // Redirect browser to SSLCommerz hosted payment page
            window.location.href = response.data.url;
        } catch (err) {
            setSslLoading(false);
            setError(err.response?.data?.message || 'Unable to initialize SSLCommerz payment. Please check if the server is running.');
        }
    };

    /* ─── Dummy mobile banking (demo/test) ─── */
    const openMobileModal = (providerName) => {
        setSelectedProvider(providerName);
        setStep('phone');
        setMobileNumber(customerInfo?.phone || '');
        setOtp(''); setPin(''); setVerificationId('');
        resetFeedback();
        setModalOpen(true);
    };

    const sendOtp = async () => {
        const normalized = mobileNumber.replace(/\D/g, '');
        if (!/^01[3-9]\d{8}$/.test(normalized)) {
            setError('Enter a valid Bangladesh mobile number: 01XXXXXXXXX');
            return;
        }
        setBusy(true); resetFeedback();
        try {
            const response = await axios.post(`${API_URL}/verification/send-otp`, {
                phone: normalized,
                email: customerInfo?.email,
                purpose: 'payment',
                provider: selectedProvider
            });
            setMobileNumber(normalized);
            setVerificationId(response.data.verificationId);
            setChannels(response.data.channels || ['sms']);
            setStep('otp');
            setMessage('Verification code sent successfully.');
        } catch (requestError) {
            setError(requestError.response?.data?.message || 'Could not send OTP. Check server SMS configuration.');
        } finally { setBusy(false); }
    };

    const verifyOtp = async () => {
        if (!/^\d{6}$/.test(otp)) { setError('Enter the 6-digit verification code.'); return; }
        setBusy(true); resetFeedback();
        try {
            await axios.post(`${API_URL}/verification/verify-otp`, { verificationId, otp });
            setStep('pin');
            setMessage('Mobile number verified.');
        } catch (requestError) {
            setError(requestError.response?.data?.message || 'The OTP is invalid or expired.');
        } finally { setBusy(false); }
    };

    const completePayment = async () => {
        if (!/^\d{4,5}$/.test(pin)) { setError('Enter your 4 or 5 digit PIN.'); return; }
        setBusy(true); resetFeedback(); setStep('processing');
        await new Promise((resolve) => setTimeout(resolve, 1500));
        await savePayment({ paymentMethod: selectedProvider, mobileNumber });
    };

    const savePayment = async ({ paymentMethod: method, mobileNumber: phone } = {}) => {
        const transactionId = `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`;
        const orderDate = new Date().toISOString();
        const orderDetails = {
            transactionId, customerInfo, orderTotal,
            paymentMethod: method || paymentMethod,
            mobileNumber: phone || null, orderItems, orderDate, status: 'success'
        };
        try {
            await axios.post(`${API_URL}/payments`, {
                transactionId, customerInfo, orderItems, orderTotal, subtotal: orderTotal,
                deliveryFee: 0, tax: 0, paymentMethod: method || paymentMethod,
                paymentType: 'dummy', paymentStatus: 'completed', orderStatus: 'processing',
                orderDate, mobileNumber: phone || null
            });
        } catch (requestError) { console.error('Payment record could not be saved:', requestError); }
        sessionStorage.setItem('orderDetails', JSON.stringify(orderDetails));
        clearCart();
        sessionStorage.removeItem('customerInfo');
        sessionStorage.removeItem('orderTotal');
        navigate('/payment-success');
    };

    if (!customerInfo) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-green-600" />
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-green-800 mb-2">💳 Payment</h1>
                    <p className="text-gray-600">Choose your preferred payment method to complete your order</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* ── Payment Methods ── */}
                    <div className="lg:col-span-2 space-y-5">

                        {/* SSLCommerz Option */}
                        <div
                            onClick={() => setPaymentMethod('sslcommerz')}
                            className={`rounded-2xl border-2 p-6 cursor-pointer transition-all ${
                                paymentMethod === 'sslcommerz'
                                    ? 'border-green-600 bg-green-50 shadow-md'
                                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                            }`}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                    paymentMethod === 'sslcommerz' ? 'border-green-600' : 'border-gray-300'
                                }`}>
                                    {paymentMethod === 'sslcommerz' && (
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-600" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="bg-green-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                                            RECOMMENDED
                                        </div>
                                        <span className="text-xs text-green-700 font-semibold bg-green-100 px-2 py-0.5 rounded">
                                            🔒 Secure & Real
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">Pay via SSLCommerz</h3>
                                    <p className="text-sm text-gray-500 mb-4">
                                        Supports bKash, Nagad, Rocket, Visa, Mastercard, American Express & more — all in one gateway.
                                    </p>

                                    {/* Accepted payment logos */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {[
                                            { label: 'bKash', color: '#e2136e', textColor: 'white' },
                                            { label: 'Nagad', color: '#f97316', textColor: 'white' },
                                            { label: 'Rocket', color: '#6d28d9', textColor: 'white' },
                                            { label: 'VISA', color: '#1a1f71', textColor: 'white' },
                                            { label: 'MasterCard', color: '#eb001b', textColor: 'white' },
                                            { label: 'DBBL', color: '#005b9a', textColor: 'white' },
                                        ].map((brand) => (
                                            <span
                                                key={brand.label}
                                                className="text-xs font-bold px-2.5 py-1 rounded"
                                                style={{ backgroundColor: brand.color, color: brand.textColor }}
                                            >
                                                {brand.label}
                                            </span>
                                        ))}
                                        <span className="text-xs font-semibold px-2.5 py-1 rounded bg-gray-100 text-gray-600">
                                            +20 more
                                        </span>
                                    </div>

                                    {paymentMethod === 'sslcommerz' && (
                                        <div>
                                            {error && (
                                                <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
                                                    ⚠️ {error}
                                                </div>
                                            )}
                                            <button
                                                id="pay-sslcommerz-btn"
                                                onClick={(e) => { e.stopPropagation(); payWithSSLCommerz(); }}
                                                disabled={sslLoading}
                                                className="w-full py-4 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-bold text-lg rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                                            >
                                                {sslLoading ? (
                                                    <>
                                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                        Redirecting to SSLCommerz…
                                                    </>
                                                ) : (
                                                    <>
                                                        🔒 Pay ৳{orderTotal.toLocaleString()} via SSLCommerz
                                                    </>
                                                )}
                                            </button>
                                            <p className="text-xs text-center text-gray-400 mt-2">
                                                You will be redirected to the SSLCommerz secure payment portal
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Dummy Mobile Banking Option */}
                        <div
                            onClick={() => setPaymentMethod('mobile')}
                            className={`rounded-2xl border-2 p-6 cursor-pointer transition-all ${
                                paymentMethod === 'mobile'
                                    ? 'border-orange-400 bg-orange-50 shadow-md'
                                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                            }`}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                    paymentMethod === 'mobile' ? 'border-orange-500' : 'border-gray-300'
                                }`}>
                                    {paymentMethod === 'mobile' && (
                                        <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-xs text-orange-700 font-semibold bg-orange-100 px-2 py-0.5 rounded">
                                            🧪 Demo / Test Only
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">📱 Mobile Banking (Demo)</h3>
                                    <p className="text-sm text-gray-500 mb-4">
                                        Simulated OTP + PIN verification — no real money is deducted. For testing only.
                                    </p>

                                    {paymentMethod === 'mobile' && (
                                        <div className="grid grid-cols-3 gap-3">
                                            {Object.entries(mobileProviders).map(([name, item]) => (
                                                <button
                                                    type="button"
                                                    key={name}
                                                    id={`pay-${name.toLowerCase()}-btn`}
                                                    onClick={(e) => { e.stopPropagation(); openMobileModal(name); }}
                                                    className="rounded-xl border border-gray-200 p-4 hover:shadow-md hover:-translate-y-0.5 transition bg-white"
                                                    style={{ borderTop: `4px solid ${item.color}` }}
                                                >
                                                    <span
                                                        className="mx-auto grid h-10 w-10 place-items-center rounded-full text-white font-bold"
                                                        style={{ backgroundColor: item.color }}
                                                    >
                                                        {item.logo}
                                                    </span>
                                                    <strong className="block mt-2 text-sm" style={{ color: item.color }}>
                                                        {item.label}
                                                    </strong>
                                                    <span className="block text-[11px] text-gray-500 mt-1">Test pay</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Info Banner */}
                        <div className="flex gap-3 rounded-xl bg-blue-50 border border-blue-200 p-4 text-sm text-blue-800">
                            <span className="text-lg">ℹ️</span>
                            <p>
                                <strong>Using SSLCommerz Sandbox:</strong> You can test with sandbox credentials.
                                Use any sandbox test card or mobile number provided by SSLCommerz.
                                No real money will be charged.
                            </p>
                        </div>
                    </div>

                    {/* ── Order Summary Sidebar ── */}
                    <aside className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-md p-6 h-fit">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>
                            <div className="space-y-3 mb-5 max-h-52 overflow-y-auto">
                                {orderItems.map((item, index) => (
                                    <div key={item._id || item.id || index} className="flex gap-3 pb-3 border-b border-gray-100">
                                        <img
                                            src={item.imageUrl || 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=100&h=100&fit=crop'}
                                            alt={item.name}
                                            className="w-14 h-14 object-cover rounded-lg"
                                        />
                                        <div className="flex-1">
                                            <p className="font-semibold text-sm text-gray-800">{item.name}</p>
                                            <p className="text-xs text-gray-600">
                                                {item.quantity} {item.unit || 'kg'} × ৳{(item.offerPrice && item.offerPrice < item.price ? item.offerPrice : item.price).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between text-gray-700">
                                    <span>Subtotal</span>
                                    <span className="font-semibold">৳{orderTotal.toLocaleString()}</span>
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
                                    <span className="text-2xl font-bold text-green-700">৳{orderTotal.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                        <button
                            id="back-to-checkout-btn"
                            onClick={() => navigate('/checkout')}
                            className="w-full py-3 bg-white border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all"
                        >
                            ← Back to Checkout
                        </button>
                    </aside>
                </div>
            </div>

            {/* ── Mobile Banking Demo Modal ── */}
            {modalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
                    onClick={() => !busy && setModalOpen(false)}
                >
                    <div
                        className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="p-5 text-white" style={{ backgroundColor: provider.color }}>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-white/75">Demo Payment</p>
                                    <h2 className="text-2xl font-bold mt-1">{provider.label}</h2>
                                </div>
                                <button
                                    type="button"
                                    id="close-modal-btn"
                                    onClick={() => setModalOpen(false)}
                                    disabled={busy}
                                    className="text-2xl text-white/80 hover:text-white"
                                >
                                    ×
                                </button>
                            </div>
                            <div className="mt-4 flex items-center justify-between rounded-xl bg-white/15 px-4 py-3">
                                <span className="text-sm text-white/80">Amount</span>
                                <strong className="text-xl">৳{orderTotal.toLocaleString()}</strong>
                            </div>
                        </div>

                        {/* Demo badge */}
                        <div className="bg-orange-50 border-b border-orange-200 px-6 py-2 flex items-center gap-2">
                            <span className="text-orange-600 text-xs">🧪</span>
                            <p className="text-xs text-orange-700 font-semibold">
                                DEMO MODE — No real money deducted
                            </p>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6">
                            {/* Steps indicator */}
                            <div className="mb-6 flex items-center justify-between text-xs font-semibold">
                                <span className={step === 'phone' ? 'text-gray-900' : 'text-gray-400'}>1. Mobile</span>
                                <span className={step === 'otp' ? 'text-gray-900' : 'text-gray-400'}>2. OTP</span>
                                <span className={step === 'pin' || step === 'processing' ? 'text-gray-900' : 'text-gray-400'}>3. PIN</span>
                            </div>

                            {step === 'phone' && (
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">Enter account number</h3>
                                    <p className="mt-1 text-sm text-gray-500">We'll send a verification code to this mobile number.</p>
                                    <input
                                        autoFocus
                                        id="mobile-number-input"
                                        value={mobileNumber}
                                        onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 11))}
                                        placeholder="01XXXXXXXXX"
                                        className="mt-5 w-full rounded-xl border border-gray-300 px-4 py-4 text-center text-xl tracking-widest"
                                    />
                                    {error && <p className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</p>}
                                    <button
                                        id="send-otp-btn"
                                        type="button"
                                        onClick={sendOtp}
                                        disabled={busy}
                                        className="mt-5 w-full rounded-xl py-3.5 font-bold text-white disabled:opacity-60"
                                        style={{ backgroundColor: provider.color }}
                                    >
                                        {busy ? 'Sending OTP…' : 'Continue securely'}
                                    </button>
                                </div>
                            )}

                            {step === 'otp' && (
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">Verify your OTP</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Enter the 6-digit code sent to {maskPhone(mobileNumber)}{channels.includes('email') ? ' and your email' : ''}.
                                    </p>
                                    <input
                                        autoFocus
                                        id="otp-input"
                                        inputMode="numeric"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                        placeholder="••••••"
                                        className="mt-5 w-full rounded-xl border border-gray-300 px-4 py-4 text-center text-2xl tracking-[.5em]"
                                    />
                                    {message && <p className="mt-3 text-sm text-green-700">{message}</p>}
                                    {error && <p className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</p>}
                                    <button
                                        id="verify-otp-btn"
                                        type="button"
                                        onClick={verifyOtp}
                                        disabled={busy}
                                        className="mt-5 w-full rounded-xl py-3.5 font-bold text-white disabled:opacity-60"
                                        style={{ backgroundColor: provider.color }}
                                    >
                                        {busy ? 'Verifying…' : 'Verify OTP'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => { setStep('phone'); resetFeedback(); }}
                                        className="mt-3 w-full text-sm font-semibold text-gray-500"
                                    >
                                        Use a different number
                                    </button>
                                </div>
                            )}

                            {step === 'pin' && (
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">Enter your PIN</h3>
                                    <p className="mt-1 text-sm text-gray-500">Your number is verified. Enter your {provider.label} PIN to confirm.</p>
                                    <div className="mt-5 rounded-xl p-4 text-center" style={{ backgroundColor: provider.soft }}>
                                        <span className="text-sm text-gray-500">Demo payment amount</span>
                                        <strong className="block text-2xl mt-1" style={{ color: provider.color }}>
                                            ৳{orderTotal.toLocaleString()}
                                        </strong>
                                    </div>
                                    <input
                                        autoFocus
                                        id="pin-input"
                                        type="password"
                                        inputMode="numeric"
                                        value={pin}
                                        onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 5))}
                                        placeholder="••••"
                                        className="mt-5 w-full rounded-xl border border-gray-300 px-4 py-4 text-center text-2xl tracking-[.5em]"
                                    />
                                    {message && <p className="mt-3 text-sm text-green-700">{message}</p>}
                                    {error && <p className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</p>}
                                    <button
                                        id="confirm-payment-btn"
                                        type="button"
                                        onClick={completePayment}
                                        disabled={busy}
                                        className="mt-5 w-full rounded-xl py-3.5 font-bold text-white disabled:opacity-60"
                                        style={{ backgroundColor: provider.color }}
                                    >
                                        {busy ? 'Confirming…' : 'Confirm payment'}
                                    </button>
                                </div>
                            )}

                            {step === 'processing' && (
                                <div className="py-8 text-center">
                                    <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-green-600" />
                                    <h3 className="mt-5 text-xl font-bold">Confirming payment</h3>
                                    <p className="mt-2 text-sm text-gray-500">Please do not close this window.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Payment;
