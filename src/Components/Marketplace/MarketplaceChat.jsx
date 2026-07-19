// import React, { useEffect, useRef, useState } from 'react';
// import userAuth from '../../Hooks/userAuth';

// const API_URL = 'http://localhost:5000';

// const getJsonResponse = async (response) => {
//     const body = await response.text();
//     try {
//         return JSON.parse(body);
//     } catch {
//         throw new Error('Chat service is unavailable. Restart the backend with: node server.cjs');
//     }
// };

// const MarketplaceChat = ({ product, conversation: initialConversation, onClose, onConversationChange, viewer = 'buyer' }) => {
//     const { user } = userAuth();
//     const [conversation, setConversation] = useState(initialConversation || null);
//     const [message, setMessage] = useState('');
//     const [loading, setLoading] = useState(!initialConversation);
//     const [sending, setSending] = useState(false);
//     const [error, setError] = useState('');
//     const lastMessageRef = useRef(null);

//     useEffect(() => {
//         if (initialConversation || !product || !user?.email) return;
//         const loadConversation = async () => {
//             try {
//                 const response = await fetch(`${API_URL}/marketplace-conversations?email=${encodeURIComponent(user.email)}`);
//                 const data = await getJsonResponse(response);
//                 if (!response.ok) throw new Error(data.message || 'Unable to load this conversation.');
//                 const found = data.conversations?.find(item => item.productId === String(product._id) && item.buyerEmail === user.email.toLowerCase());
//                 if (found) setConversation(found);
//             } catch {
//                 setError('Unable to load this conversation.');
//             } finally { setLoading(false); }
//         };
//         loadConversation();
//     }, [initialConversation, product, user?.email]);

//     useEffect(() => lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' }), [conversation?.messages?.length]);

//     // Keep an open conversation in sync when the other person sends a message.
//     useEffect(() => {
//         if (!conversation?._id || !user?.email) return undefined;

//         const refreshConversation = async () => {
//             try {
//                 const response = await fetch(`${API_URL}/marketplace-conversations?email=${encodeURIComponent(user.email)}`);
//                 const data = await getJsonResponse(response);
//                 if (!response.ok) return;
//                 const latestConversation = data.conversations?.find(item => String(item._id) === String(conversation._id));
//                 if (!latestConversation) return;
//                 setConversation(current => {
//                     if (current?.updatedAt === latestConversation.updatedAt) return current;
//                     onConversationChange?.(latestConversation);
//                     return latestConversation;
//                 });
//             } catch {
//                 // A temporary refresh failure should not interrupt the current chat.
//             }
//         };

//         const refreshInterval = window.setInterval(refreshConversation, 5000);
//         return () => window.clearInterval(refreshInterval);
//     }, [conversation?._id, onConversationChange, user?.email]);

//     const sendMessage = async (event) => {
//         event.preventDefault();
//         const text = message.trim();
//         if (!text || !user?.email) return;
//         setSending(true); setError('');
//         try {
//             const endpoint = conversation ? `${API_URL}/marketplace-conversations/${conversation._id}/messages` : `${API_URL}/marketplace-conversations`;
//             const payload = conversation
//                 ? { senderEmail: user.email, senderName: user.displayName, message: text }
//                 : { productId: String(product._id), buyerEmail: user.email, buyerName: user.displayName, message: text };
//             const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
//             const data = await getJsonResponse(response);
//             if (!response.ok) throw new Error(data.message || 'Unable to send message');
//             setConversation(data.conversation); onConversationChange?.(data.conversation); setMessage('');
//         } catch (err) { setError(err.message); } finally { setSending(false); }
//     };

//     const sellerView = viewer === 'seller';
//     const otherPerson = conversation
//         ? (sellerView ? (conversation.buyerName || conversation.buyerEmail) : (conversation.sellerName || conversation.sellerEmail))
//         : (product?.sellerName || 'Seller');
//     return <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
//         <section className="flex h-[min(680px,90vh)] w-full max-w-xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl" onClick={event => event.stopPropagation()}>
//             <header className="flex items-center justify-between border-b bg-green-700 px-5 py-4 text-white"><div><p className="font-bold">{sellerView ? `Reply to ${otherPerson}` : `Chat with ${otherPerson}`}</p><p className="text-sm text-green-100">{conversation?.productName || product?.name}</p></div><button onClick={onClose} aria-label="Close chat" className="text-3xl leading-none">×</button></header>
//             <div className="flex-1 space-y-3 overflow-y-auto bg-gray-50 p-4">
//                 {loading && <p className="text-center text-sm text-gray-500">Loading conversation…</p>}
//                 {!loading && !conversation && <p className="rounded-lg bg-green-50 p-3 text-sm text-green-800">Ask the seller about freshness, delivery, quantity, or anything else before you order.</p>}
//                 {conversation?.messages?.map((item, index) => {
//                     const senderIsSeller = item.senderRole ? item.senderRole === 'seller' : item.senderEmail === conversation.sellerEmail;
//                     const mine = item.senderEmail === user?.email?.toLowerCase();
//                     const senderRole = senderIsSeller ? 'Seller' : 'Buyer';
//                     const senderName = item.senderName || (senderIsSeller ? conversation.sellerName : conversation.buyerName) || senderRole;
//                     const avatarLetter = senderName.charAt(0).toUpperCase();

//                     return <div key={`${item.sentAt}-${index}`} className={`flex items-end gap-2 ${mine ? 'justify-end' : 'justify-start'}`}>
//                         {!mine && <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-800" title={`${senderName} (${senderRole})`}>{avatarLetter}</div>}
//                         <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${mine ? 'rounded-br-sm bg-green-600 text-white' : 'rounded-bl-sm bg-white text-gray-800 shadow-sm'}`}>
//                             <p className={`mb-1 text-xs font-semibold ${mine ? 'text-green-100' : 'text-green-700'}`}>{mine ? `You · ${senderRole}` : `${senderName} · ${senderRole}`}</p>
//                             <p className="whitespace-pre-wrap">{item.text}</p>
//                             <p className={`mt-1 text-[10px] ${mine ? 'text-green-100' : 'text-gray-400'}`}>{new Date(item.sentAt).toLocaleString()}</p>
//                         </div>
//                         {mine && <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-700 text-xs font-bold text-white" title={`You (${senderRole})`}>{avatarLetter}</div>}
//                     </div>;
//                 })}<div ref={lastMessageRef} />
//             </div>
//             {error && <p className="px-4 pt-2 text-sm text-red-600">{error}</p>}
//             <form onSubmit={sendMessage} className="flex gap-2 border-t p-3"><input value={message} onChange={event => setMessage(event.target.value)} maxLength="2000" placeholder={sellerView ? 'Write a reply to the buyer…' : 'Write your message…'} className="min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:border-green-600 focus:outline-none" /><button disabled={sending || !message.trim()} className="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">{sending ? 'Sending…' : (sellerView ? 'Send reply' : 'Send')}</button></form>
//         </section>
//     </div>;
// };

// export default MarketplaceChat;

import React, { useEffect, useRef, useState } from 'react';
import userAuth from '../../Hooks/userAuth';

const API_URL = 'http://localhost:5000';

const getJsonResponse = async (response) => {
    const body = await response.text();
    try {
        return JSON.parse(body);
    } catch {
        throw new Error('Chat service is unavailable. Restart the backend with: node server.cjs');
    }
};

const MarketplaceChat = ({ product, conversation: initialConversation, onClose, onConversationChange, viewer = 'buyer' }) => {
    const { user } = userAuth();
    const [conversation, setConversation] = useState(initialConversation || null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(!initialConversation);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState('');
    const lastMessageRef = useRef(null);

    // Determine current user's role
    const myRole = viewer === 'seller' ? 'seller' : 'buyer';

    useEffect(() => {
        if (initialConversation || !product || !user?.email) return;
        const loadConversation = async () => {
            try {
                const response = await fetch(`${API_URL}/marketplace-conversations?email=${encodeURIComponent(user.email)}`);
                const data = await getJsonResponse(response);
                if (!response.ok) throw new Error(data.message || 'Unable to load this conversation.');
                const found = data.conversations?.find(item => item.productId === String(product._id) && item.buyerEmail === user.email.toLowerCase());
                if (found) setConversation(found);
            } catch {
                setError('Unable to load this conversation.');
            } finally { setLoading(false); }
        };
        loadConversation();
    }, [initialConversation, product, user?.email]);

    useEffect(() => lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' }), [conversation?.messages?.length]);

    // Keep an open conversation in sync when the other person sends a message.
    useEffect(() => {
        if (!conversation?._id || !user?.email) return undefined;

        const refreshConversation = async () => {
            try {
                const response = await fetch(`${API_URL}/marketplace-conversations?email=${encodeURIComponent(user.email)}`);
                const data = await getJsonResponse(response);
                if (!response.ok) return;
                const latestConversation = data.conversations?.find(item => String(item._id) === String(conversation._id));
                if (!latestConversation) return;
                setConversation(current => {
                    if (current?.updatedAt === latestConversation.updatedAt) return current;
                    onConversationChange?.(latestConversation);
                    return latestConversation;
                });
            } catch {
                // A temporary refresh failure should not interrupt the current chat.
            }
        };

        const refreshInterval = window.setInterval(refreshConversation, 5000);
        return () => window.clearInterval(refreshInterval);
    }, [conversation?._id, onConversationChange, user?.email]);

    const sendMessage = async (event) => {
        event.preventDefault();
        const text = message.trim();
        if (!text || !user?.email) return;
        setSending(true); setError('');
        try {
            const endpoint = conversation ? `${API_URL}/marketplace-conversations/${conversation._id}/messages` : `${API_URL}/marketplace-conversations`;
            const payload = conversation
                ? {
                    senderEmail: user.email,
                    senderName: user.displayName,
                    senderRole: myRole, // ✅ SEND ROLE
                    message: text
                }
                : {
                    productId: String(product._id),
                    buyerEmail: user.email,
                    buyerName: user.displayName,
                    senderRole: myRole, // ✅ SEND ROLE
                    message: text
                };

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await getJsonResponse(response);
            if (!response.ok) throw new Error(data.message || 'Unable to send message');
            setConversation(data.conversation);
            onConversationChange?.(data.conversation);
            setMessage('');
        } catch (err) { setError(err.message); }
        finally { setSending(false); }
    };

    const sellerView = viewer === 'seller';
    const otherPerson = conversation
        ? (sellerView ? (conversation.buyerName || conversation.buyerEmail) : (conversation.sellerName || conversation.sellerEmail))
        : (product?.sellerName || 'Seller');

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
            <section className="flex h-[min(680px,90vh)] w-full max-w-xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl" onClick={event => event.stopPropagation()}>
                <header className="flex items-center justify-between border-b bg-green-700 px-5 py-4 text-white">
                    <div>
                        <p className="font-bold">{sellerView ? `Reply to ${otherPerson}` : `Chat with ${otherPerson}`}</p>
                        <p className="text-sm text-green-100">{conversation?.productName || product?.name}</p>
                    </div>
                    <button onClick={onClose} aria-label="Close chat" className="text-3xl leading-none">×</button>
                </header>

                <div className="flex-1 space-y-3 overflow-y-auto bg-gray-50 p-4">
                    {loading && <p className="text-center text-sm text-gray-500">Loading conversation…</p>}
                    {!loading && !conversation && (
                        <p className="rounded-lg bg-green-50 p-3 text-sm text-green-800">
                            Ask the seller about freshness, delivery, quantity, or anything else before you order.
                        </p>
                    )}

                    {conversation?.messages?.map((item, index) => {
                        // ---- THE FIX: use senderRole ----
                        let isMine = false;
                        if (item.senderRole) {
                            isMine = item.senderRole === myRole;
                        } else {
                            // Fallback for old messages (backward compatibility)
                            if (viewer === 'seller') {
                                isMine = item.senderEmail === conversation.sellerEmail;
                            } else {
                                isMine = item.senderEmail === conversation.buyerEmail;
                            }
                        }

                        let senderName, senderRoleDisplay;
                        if (isMine) {
                            senderName = 'You';
                            senderRoleDisplay = myRole === 'seller' ? 'Seller' : 'Buyer';
                        } else {
                            // Other person
                            if (viewer === 'seller') {
                                senderName = conversation.buyerName || conversation.buyerEmail || 'Buyer';
                                senderRoleDisplay = 'Buyer';
                            } else {
                                senderName = conversation.sellerName || conversation.sellerEmail || 'Seller';
                                senderRoleDisplay = 'Seller';
                            }
                        }

                        const avatarLetter = senderName.charAt(0).toUpperCase();

                        return (
                            <div key={`${item.sentAt}-${index}`} className={`flex items-end gap-2 ${isMine ? 'justify-end' : 'justify-start'}`}>
                                {!isMine && (
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-800" title={`${senderName} (${senderRoleDisplay})`}>
                                        {avatarLetter}
                                    </div>
                                )}
                                <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${isMine ? 'rounded-br-sm bg-green-600 text-white' : 'rounded-bl-sm bg-white text-gray-800 shadow-sm'}`}>
                                    <p className={`mb-1 text-xs font-semibold ${isMine ? 'text-green-100' : 'text-green-700'}`}>
                                        {isMine ? `You · ${senderRoleDisplay}` : `${senderName} · ${senderRoleDisplay}`}
                                    </p>
                                    <p className="whitespace-pre-wrap">{item.text}</p>
                                    <p className={`mt-1 text-[10px] ${isMine ? 'text-green-100' : 'text-gray-400'}`}>
                                        {new Date(item.sentAt).toLocaleString()}
                                    </p>
                                </div>
                                {isMine && (
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-700 text-xs font-bold text-white" title={`You (${senderRoleDisplay})`}>
                                        {avatarLetter}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                    <div ref={lastMessageRef} />
                </div>

                {error && <p className="px-4 pt-2 text-sm text-red-600">{error}</p>}
                <form onSubmit={sendMessage} className="flex gap-2 border-t p-3">
                    <input
                        value={message}
                        onChange={event => setMessage(event.target.value)}
                        maxLength="2000"
                        placeholder={sellerView ? 'Write a reply to the buyer…' : 'Write your message…'}
                        className="min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:border-green-600 focus:outline-none"
                    />
                    <button
                        disabled={sending || !message.trim()}
                        className="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {sending ? 'Sending…' : (sellerView ? 'Send reply' : 'Send')}
                    </button>
                </form>
            </section>
        </div>
    );
};

export default MarketplaceChat;