import React, { useCallback, useEffect, useState } from 'react';
import userAuth from '../../Hooks/userAuth';
import MarketplaceChat from '../../Components/Marketplace/MarketplaceChat';

const getJsonResponse = async (response) => {
    const body = await response.text();
    try {
        return JSON.parse(body);
    } catch {
        throw new Error('Chat service is unavailable. Restart the backend with: node server.cjs');
    }
};

const Messages = () => {
    const { user } = userAuth();
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const loadConversations = useCallback(async (showLoading = true) => {
        if (!user?.email) return;
        try {
            if (showLoading) setLoading(true);
            const response = await fetch(`http://localhost:5000/marketplace-conversations?email=${encodeURIComponent(user.email)}&role=seller`);
            const data = await getJsonResponse(response);
            if (!response.ok) throw new Error(data.message || 'Unable to load messages');
            setConversations(data.conversations || []);
        } catch (err) { setError(err.message); } finally { if (showLoading) setLoading(false); }
    }, [user?.email]);
    useEffect(() => {
        loadConversations();
        const refreshInterval = window.setInterval(() => loadConversations(false), 5000);
        return () => window.clearInterval(refreshInterval);
    }, [loadConversations]);
    const updateConversation = updated => { setConversations(current => [updated, ...current.filter(item => item._id !== updated._id)]); setSelectedConversation(updated); };
    return <div className="mx-auto max-w-5xl"><div className="mb-6"><h1 className="text-3xl font-bold text-gray-800">Buyer messages</h1><p className="mt-1 text-gray-600">Reply to questions about your marketplace products.</p></div><div className="overflow-hidden rounded-xl bg-white shadow">
        {loading && <p className="p-6 text-gray-500">Loading messages…</p>}{error && <p className="p-6 text-red-600">{error}</p>}{!loading && !error && conversations.length === 0 && <p className="p-8 text-center text-gray-500">No buyer inquiries yet.</p>}
        {conversations.map(conversation => {
            const latest = conversation.messages?.at(-1);
            const openConversation = () => setSelectedConversation(conversation);

            return <div key={conversation._id} className="flex items-center gap-4 border-b p-4 transition hover:bg-green-50">
                <button onClick={openConversation} className="flex min-w-0 flex-1 items-center gap-4 text-left" aria-label={`Open conversation with ${conversation.buyerName || conversation.buyerEmail}`}>
                    {conversation.productImage ? <img src={conversation.productImage} alt="" className="h-12 w-12 rounded-lg object-cover" /> : <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">🌾</div>}
                    <div className="min-w-0 flex-1">
                        <p className="font-semibold text-gray-800">{conversation.buyerName || conversation.buyerEmail}</p>
                        <p className="text-sm text-gray-600">{conversation.productName}</p>
                        <p className="truncate text-sm text-gray-500">{latest?.text}</p>
                    </div>
                </button>
                <div className="flex shrink-0 flex-col items-end gap-2">
                    <time className="text-xs text-gray-400">{new Date(conversation.updatedAt).toLocaleDateString()}</time>
                    <button onClick={openConversation} className="rounded-lg bg-green-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-green-700">Reply</button>
                </div>
            </div>;
        })}
    </div>{selectedConversation && <MarketplaceChat viewer="seller" conversation={selectedConversation} onClose={() => { setSelectedConversation(null); loadConversations(); }} onConversationChange={updateConversation} />}</div>;
};
export default Messages;
