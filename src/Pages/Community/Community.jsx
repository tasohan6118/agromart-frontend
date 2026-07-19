import React, { useState, useEffect } from 'react';
import axios from 'axios';
import userAuth from '../../Hooks/userAuth';

const Community = () => {
    const { user } = userAuth();
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [sortBy, setSortBy] = useState('recent');

    const categories = [
        { id: 'all', name: 'All Topics', icon: '🌐', color: 'gray' },
        { id: 'crop-management', name: 'Crop Management', icon: '🌾', color: 'green' },
        { id: 'pest-control', name: 'Pest Control', icon: '🐛', color: 'red' },
        { id: 'market-prices', name: 'Market & Prices', icon: '💰', color: 'yellow' },
        { id: 'weather', name: 'Weather & Climate', icon: '🌤️', color: 'blue' },
        { id: 'equipment', name: 'Equipment & Tools', icon: '🚜', color: 'orange' },
        { id: 'success-stories', name: 'Success Stories', icon: '🏆', color: 'purple' }
    ];

    useEffect(() => {
        fetchPosts();
    }, []);

    useEffect(() => {
        filterAndSortPosts();
    }, [posts, selectedCategory, searchQuery, sortBy]);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/community-posts');
            setPosts(response.data.posts || []);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const filterAndSortPosts = () => {
        let filtered = [...posts];

        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(post => post.category === selectedCategory);
        }

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(post =>
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.content.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Sort posts
        if (sortBy === 'recent') {
            filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (sortBy === 'popular') {
            filtered.sort((a, b) => b.upvotes - a.upvotes);
        } else if (sortBy === 'active') {
            filtered.sort((a, b) => b.commentCount - a.commentCount);
        }

        setFilteredPosts(filtered);
    };

    const getCategoryColor = (categoryId) => {
        const category = categories.find(c => c.id === categoryId);
        return category ? category.color : 'gray';
    };

    const getCategoryIcon = (categoryId) => {
        const category = categories.find(c => c.id === categoryId);
        return category ? category.icon : '📌';
    };

    const getCategoryName = (categoryId) => {
        const category = categories.find(c => c.id === categoryId);
        return category ? category.name : categoryId;
    };

    const formatTimeAgo = (date) => {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        
        if (seconds < 60) return 'Just now';
        if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
        if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
        return new Date(date).toLocaleDateString();
    };

    const handleUpvote = async (postId) => {
        if (!user) {
            alert('Please login to upvote posts');
            return;
        }

        try {
            await axios.patch(`http://localhost:5000/community-posts/${postId}/upvote`, {
                userEmail: user.email
            });
            fetchPosts();
        } catch (error) {
            console.error('Error upvoting post:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-600 to-green-600 text-white py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-block p-3 bg-white/20 rounded-full mb-4">
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h1 className="text-4xl font-bold mb-3">Community Support</h1>
                        <p className="text-teal-100 text-lg mb-6">Connect with fellow farmers, share knowledge, and grow together</p>
                        <button
                            onClick={() => {
                                if (!user) {
                                    alert('Please login to create a post');
                                    return;
                                }
                                setShowCreateModal(true);
                            }}
                            className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-teal-50 transition-colors inline-flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Ask a Question
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                                <h3 className="font-bold text-gray-800 mb-4">Categories</h3>
                                <div className="space-y-2">
                                    {categories.map(category => (
                                        <button
                                            key={category.id}
                                            onClick={() => setSelectedCategory(category.id)}
                                            className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
                                                selectedCategory === category.id
                                                    ? `bg-${category.color}-100 text-${category.color}-700 font-semibold`
                                                    : 'hover:bg-gray-100 text-gray-700'
                                            }`}
                                        >
                                            <span className="text-2xl">{category.icon}</span>
                                            <span className="text-sm">{category.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-3">
                            {/* Search and Filter Bar */}
                            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                                <div className="flex flex-col md:flex-row gap-4">
                                    <div className="flex-1">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Search discussions..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                            />
                                            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                    >
                                        <option value="recent">Most Recent</option>
                                        <option value="popular">Most Popular</option>
                                        <option value="active">Most Active</option>
                                    </select>
                                </div>
                            </div>

                            {/* Posts List */}
                            {loading ? (
                                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
                                    <p className="text-gray-500 mt-4">Loading discussions...</p>
                                </div>
                            ) : filteredPosts.length === 0 ? (
                                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                                    <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No discussions found</h3>
                                    <p className="text-gray-500 mb-4">Be the first to start a conversation!</p>
                                    <button
                                        onClick={() => setShowCreateModal(true)}
                                        className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                                    >
                                        Create Post
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {filteredPosts.map(post => (
                                        <div
                                            key={post._id}
                                            onClick={() => setSelectedPost(post)}
                                            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                                        >
                                            <div className="p-6">
                                                <div className="flex items-start gap-4">
                                                    {/* Upvote Section */}
                                                    <div className="flex flex-col items-center gap-1">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleUpvote(post._id);
                                                            }}
                                                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                        >
                                                            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                                            </svg>
                                                        </button>
                                                        <span className="font-bold text-lg text-gray-800">{post.upvotes || 0}</span>
                                                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                                            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                            </svg>
                                                        </button>
                                                    </div>

                                                    {/* Post Content */}
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <span className={`px-3 py-1 bg-${getCategoryColor(post.category)}-100 text-${getCategoryColor(post.category)}-700 text-xs font-semibold rounded-full`}>
                                                                {getCategoryIcon(post.category)} {getCategoryName(post.category)}
                                                            </span>
                                                            {post.isSolved && (
                                                                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                                                                    ✓ Solved
                                                                </span>
                                                            )}
                                                        </div>
                                                        <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-teal-600">
                                                            {post.title}
                                                        </h3>
                                                        <p className="text-gray-600 mb-3 line-clamp-2">
                                                            {post.content}
                                                        </p>
                                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                                                                    <span className="text-teal-700 font-semibold text-xs">
                                                                        {post.authorName?.charAt(0).toUpperCase() || 'U'}
                                                                    </span>
                                                                </div>
                                                                <span className="font-medium text-gray-700">{post.authorName}</span>
                                                            </div>
                                                            <span>•</span>
                                                            <span>{formatTimeAgo(post.createdAt)}</span>
                                                            <span>•</span>
                                                            <div className="flex items-center gap-1">
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                                                </svg>
                                                                <span>{post.commentCount || 0} comments</span>
                                                            </div>
                                                            <span>•</span>
                                                            <div className="flex items-center gap-1">
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                                </svg>
                                                                <span>{post.views || 0} views</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Create Post Modal */}
            {showCreateModal && <CreatePostModal onClose={() => setShowCreateModal(false)} onSuccess={fetchPosts} user={user} categories={categories} />}

            {/* Post Detail Modal */}
            {selectedPost && <PostDetailModal post={selectedPost} onClose={() => setSelectedPost(null)} onUpdate={fetchPosts} user={user} />}
        </div>
    );
};

// Create Post Modal Component
const CreatePostModal = ({ onClose, onSuccess, user, categories }) => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Check if user is logged in
        if (!user || !user.email) {
            alert('Please login first to create a post');
            onClose();
            return;
        }
        
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/community-posts', {
                ...formData,
                authorEmail: user.email,
                authorName: user.displayName || user.email.split('@')[0]
            });
            
            if (response.data.success) {
                alert('Post created successfully!');
                onSuccess();
                onClose();
            }
        } catch (error) {
            console.error('Error creating post:', error);
            const errorMessage = error.response?.data?.message || error.message || 'Failed to create post. Please make sure the backend server is running.';
            alert(`Error: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Create New Post</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Category <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                >
                                    <option value="">Select a category</option>
                                    {categories.filter(c => c.id !== 'all').map(cat => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.icon} {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                    placeholder="What's your question or topic?"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    required
                                    rows="6"
                                    placeholder="Provide details about your question or discussion..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
                            >
                                {loading ? 'Posting...' : 'Post Question'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

// Post Detail Modal Component
const PostDetailModal = ({ post, onClose, onUpdate, user }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchComments();
        incrementViews();
    }, [post._id]);

    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/community-posts/${post._id}/comments`);
            setComments(response.data.comments || []);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const incrementViews = async () => {
        try {
            await axios.patch(`http://localhost:5000/community-posts/${post._id}/view`);
            onUpdate();
        } catch (error) {
            console.error('Error incrementing views:', error);
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert('Please login to comment');
            return;
        }

        setLoading(true);
        try {
            await axios.post(`http://localhost:5000/community-posts/${post._id}/comments`, {
                content: newComment,
                authorEmail: user.email,
                authorName: user.displayName || user.email.split('@')[0]
            });
            setNewComment('');
            fetchComments();
            onUpdate();
        } catch (error) {
            console.error('Error posting comment:', error);
            alert('Failed to post comment');
        } finally {
            setLoading(false);
        }
    };

    const formatTimeAgo = (date) => {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        if (seconds < 60) return 'Just now';
        if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
        return new Date(date).toLocaleDateString();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-800">Discussion</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-6">
                    {/* Post Content */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                                    <span className="text-teal-700 font-semibold">
                                        {post.authorName?.charAt(0).toUpperCase() || 'U'}
                                    </span>
                                </div>
                                <div>
                                    <div className="font-medium text-gray-700">{post.authorName}</div>
                                    <div className="text-xs">{formatTimeAgo(post.createdAt)}</div>
                                </div>
                            </div>
                            <span>•</span>
                            <span>{post.views || 0} views</span>
                            <span>•</span>
                            <span>{post.upvotes || 0} upvotes</span>
                        </div>
                        <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
                            {post.content}
                        </div>
                    </div>

                    {/* Comments Section */}
                    <div className="border-t pt-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">
                            {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
                        </h3>

                        {/* Comment Form */}
                        <form onSubmit={handleCommentSubmit} className="mb-6">
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder={user ? "Share your thoughts..." : "Please login to comment"}
                                disabled={!user}
                                rows="3"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent mb-2"
                            />
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={!user || !newComment.trim() || loading}
                                    className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Posting...' : 'Post Comment'}
                                </button>
                            </div>
                        </form>

                        {/* Comments List */}
                        <div className="space-y-4">
                            {comments.map(comment => (
                                <div key={comment._id} className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-teal-700 font-semibold">
                                                {comment.authorName?.charAt(0).toUpperCase() || 'U'}
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-semibold text-gray-800">{comment.authorName}</span>
                                                <span className="text-xs text-gray-500">{formatTimeAgo(comment.createdAt)}</span>
                                            </div>
                                            <p className="text-gray-700 whitespace-pre-wrap">{comment.content}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Community;
