import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useCart } from '../../Context/CartContext/CartContext';
import MarketplaceChat from '../../Components/Marketplace/MarketplaceChat';
import ReviewSection, { RatingStars, getProductReviewStats } from '../../Components/Marketplace/ReviewSection';

const MarketPlace = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [orderQuantity, setOrderQuantity] = useState(1);
    const [chatProduct, setChatProduct] = useState(null);
    const { addToCart } = useCart();

    // Fetch products from backend
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            console.log('🔍 Fetching products from server...');
            // const response = await fetch('http://localhost:5000/products');
            const response = await fetch(`${import.meta.env.VITE_API_URL}/products`);

            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }

            const data = await response.json();
            console.log('📦 Raw response from server:', data);
            console.log('📦 Response type:', typeof data);
            console.log('📦 Is array?', Array.isArray(data));

            // Handle MongoDB backend response format
            let productsArray = [];
            if (data.success && data.products) {
                // MongoDB format: { success: true, products: [...] }
                productsArray = data.products;
                console.log('✅ MongoDB format detected');
            } else if (Array.isArray(data)) {
                // Direct array format
                productsArray = data;
                console.log('✅ Direct array format detected');
            } else {
                console.error('❌ Unknown data format:', data);
            }

            console.log('📊 Products array length:', productsArray.length);
            console.log('📊 First product:', productsArray[0]);

            setProducts(productsArray);
            setError(null);

            if (productsArray.length === 0) {
                console.warn('⚠️ No products found in database');
            }
        } catch (err) {
            console.error('❌ Error fetching products:', err);
            setError('Failed to load products. Make sure the server is running.');
            setProducts([]); // Reset to empty array on error
        } finally {
            setLoading(false);
        }
    };

    // Get unique categories from products
    const categories = ['All', ...new Set(products.map(p => p.category).filter(Boolean))];

    // Filter products based on category and search
    const filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // ProductCard Component
    const ProductCard = ({ product }) => {
        const displayPrice = product.offerPrice || product.price;
        const hasDiscount = product.offerPrice && product.offerPrice < product.price;
        const reviewStats = getProductReviewStats(product);

        // Image URL handling
        const getImageUrl = () => {
            if (product.imageUrl) {
                return product.imageUrl;
            }
            // Default placeholder based on category
            const placeholders = {
                'Potato': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop',
                'Onion': 'https://images.unsplash.com/photo-1587049352846-4a222e784faf?w=400&h=300&fit=crop',
                'Garlic': 'https://images.unsplash.com/photo-1566847438217-76e82d383f84?w=400&h=300&fit=crop',
                'Tomato': 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&h=300&fit=crop',
                'Rice': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop',
                'default': 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&h=300&fit=crop'
            };
            return placeholders[product.category] || placeholders['default'];
        };

        return (
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Product Image */}
                <div className="relative h-48 bg-gray-200">
                    <img
                        src={getImageUrl()}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML += '<div class="w-full h-full flex items-center justify-center text-gray-400 absolute inset-0"><span class="text-6xl">🌾</span></div>';
                        }}
                    />
                    {/* {hasDiscount && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                            SALE
                        </div>
                    )} */}
                    {/* {product.qualityGrade === 'A' && (
                        <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-bold">
                            ⭐ Premium
                        </div>
                    )} */}
                </div>

                {/* Product Details */}
                <div className="p-4">
                    {/* Category Badge */}
                    {product.category && (
                        <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mb-2">
                            {product.category}
                        </span>
                    )}

                    {/* Product Name */}
                    <h3 className="text-lg font-bold text-gray-800 mb-1 truncate">
                        {product.name}
                    </h3>

                    <div className="flex items-center gap-2 mb-2" aria-label={`${reviewStats.average.toFixed(1)} out of 5 stars from ${reviewStats.count} reviews`}>
                        <RatingStars value={reviewStats.average} size="small" />
                        <span className="text-xs text-gray-500">{reviewStats.average.toFixed(1)} ({reviewStats.count})</span>
                    </div>

                    {/* Variety */}
                    {product.variety && (
                        <p className="text-sm text-gray-600 mb-2">{product.variety}</p>
                    )}

                    {/* Description */}
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {product.description}
                    </p>

                    {/* Price Section */}
                    <div className="mb-3">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-green-600">
                                ৳{displayPrice}
                            </span>
                            <span className="text-sm text-gray-500">/{product.unit || 'kg'}</span>
                            {hasDiscount && (
                                <span className="text-sm text-gray-400 line-through">
                                    ৳{product.price}
                                </span>
                            )}
                        </div>
                        {product.quantity && (
                            <p className="text-xs text-gray-500 mt-1">
                                Available: {product.quantity} {product.unit || 'kg'}
                            </p>
                        )}
                    </div>

                    {/* Location & Quality */}
                    <div className="border-t pt-3 space-y-1">
                        {product.district && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span>📍</span>
                                <span>{product.district}{product.location ? `, ${product.location}` : ''}</span>
                            </div>
                        )}
                        {product.qualityGrade && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span>⭐</span>
                                <span>Grade {product.qualityGrade}</span>
                            </div>
                        )}
                    </div>

                    {/* Contact Button */}
                    {product.contactNumber && (
                        <button
                            onClick={() => {
                                setSelectedProduct(product);
                                setOrderQuantity(1);
                            }}
                            className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-200">
                            <span className="flex items-center justify-center gap-2">
                                <span>View Details</span>
                            </span>
                        </button>
                    )}

                    {/* Posted Date */}
                    {product.postedDate && (
                        <p className="text-xs text-gray-400 text-center mt-2">
                            Posted: {new Date(product.postedDate).toLocaleDateString()}
                        </p>
                    )}
                </div>
            </div>
        );
    };

    // Product Detail Modal Component
    const ProductDetailModal = ({ product, onClose }) => {
        if (!product) return null;

        const displayPrice = product.offerPrice || product.price;
        const totalPrice = displayPrice * orderQuantity;
        const harvestDate = product.postedDate ? new Date(product.postedDate).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }) : 'N/A';

        const handleAddToCart = () => {
            addToCart(product, orderQuantity);
            alert(`✅ Added ${orderQuantity} ${product.unit} of ${product.name} to cart!`);
            onClose();
        };

        const handleBuyNow = () => {
            addToCart(product, orderQuantity);
            onClose();
            navigate('/cart');
        };

        const increaseQuantity = () => {
            const availableQty = product.quantity || 1000;
            if (orderQuantity < availableQty) {
                setOrderQuantity(orderQuantity + 1);
            }
        };

        const decreaseQuantity = () => {
            if (orderQuantity > 1) {
                setOrderQuantity(orderQuantity - 1);
            }
        };

        const handleQuantityInput = (value) => {
            const num = parseInt(value) || 1;
            const availableQty = product.quantity || 1000;
            setOrderQuantity(Math.min(Math.max(1, num), availableQty));
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto" onClick={onClose}>
                <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full my-8 relative max-h-[calc(100vh-2rem)] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-4xl font-bold leading-none transition-colors z-10"
                    >
                        ×
                    </button>

                    <div className="p-5 pt-16 sm:p-7 sm:pt-16">
                        {/* Complete product details are always shown first. Reviews follow below this section. */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pb-8 border-b border-gray-200">
                            {/* Left Column - Image Only */}
                            <div>
                                <div className="relative h-[500px] rounded-2xl overflow-hidden">
                                    <img
                                        src={product.imageUrl || `https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&h=600&fit=crop`}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.src = 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&h=600&fit=crop';
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Right Column - Product Information */}
                            <div className="space-y-3">
                                {/* Product Name */}
                                <div>
                                    <h3 className="text-3xl font-bold text-gray-900">{product.name}</h3>
                                    {product.variety && (
                                        <p className="text-lg text-gray-600 mt-1">{product.variety}</p>
                                    )}
                                </div>

                                {/* Price */}
                                <div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-extrabold text-green-600">
                                            ৳{displayPrice}
                                        </span>
                                        <span className="text-lg text-gray-500">/ {product.unit || 'kg'}</span>
                                    </div>
                                    {product.offerPrice && product.offerPrice < product.price && (
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-lg text-gray-400 line-through">৳{product.price}</span>
                                            <span className="text-sm text-red-600 font-bold">
                                                SAVE ৳{product.price - product.offerPrice}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Category */}
                                <div>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-semibold">Category:</span> {product.category}
                                    </p>
                                </div>

                                {/* Description */}
                                <div>
                                    <h4 className="font-bold text-gray-800 mb-1 text-base">Description</h4>
                                    <p className="text-gray-700 text-sm leading-relaxed">{product.description}</p>
                                </div>

                                {/* Available Quantity and Minimum Order */}
                                <div className="flex gap-6">
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-semibold">Available Quantity:</span> {product.quantity} {product.unit || 'kg'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-semibold">Minimum Order:</span> 1 {product.unit || 'kg'}
                                        </p>
                                    </div>
                                </div>

                                {/* Location & Pickup */}
                                <div>
                                    <div className="flex gap-6">
                                        <p className="text-sm text-gray-700 flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                            </svg>
                                            <span className="font-bold">Location:</span> {product.district}
                                        </p>
                                        {product.location && (
                                            <p className="text-sm text-gray-700">
                                                🚚 <span className="font-bold">Pickup Address:</span> {product.location}
                                            </p>
                                        )}
                                    </div>

                                </div>

                                {/* Harvest Date */}
                                <div>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-semibold">Harvest Date:</span> {harvestDate}
                                    </p>
                                </div>

                                {/* Quantity Selector */}
                                <div>
                                    <label className="block font-bold text-gray-800 mb-2 text-base">
                                        Quantity ({product.unit || 'kg'})
                                    </label>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={decreaseQuantity}
                                            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-xl rounded-lg transition-colors"
                                        >
                                            −
                                        </button>
                                        <input
                                            type="number"
                                            value={orderQuantity}
                                            onChange={(e) => handleQuantityInput(e.target.value)}
                                            min="1"
                                            max={product.quantity || 1000}
                                            className="w-20 text-center text-xl font-bold py-2 focus:outline-none"
                                        />
                                        <button
                                            onClick={increaseQuantity}
                                            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-xl rounded-lg transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Total */}
                                <div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xl font-bold text-gray-800">Total:</span>
                                        <span className="text-4xl font-extrabold text-green-700">৳{totalPrice.toLocaleString()}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 text-right mt-1">
                                        {orderQuantity} {product.unit} × ৳{displayPrice}
                                    </p>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setChatProduct(product)}
                                        className="flex-1 px-6 py-3 bg-blue-50 border-2 border-blue-600 text-blue-700 font-bold text-base rounded-lg hover:bg-blue-100 transition-all duration-200"
                                    >
                                        💬 Ask Seller
                                    </button>
                                    <button
                                        onClick={handleAddToCart}
                                        className="flex-1 px-6 py-3 bg-white border-2 border-green-600 text-green-700 font-bold text-base rounded-lg hover:bg-green-50 transition-all duration-200"
                                    >
                                        🛒 Add to Cart
                                    </button>
                                    <button
                                        onClick={handleBuyNow}
                                        className="flex-1 px-6 py-3 bg-green-600 text-white font-bold text-base rounded-lg hover:bg-green-700 transition-all duration-200"
                                    >
                                        ⚡ Buy Now
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="pt-2">
                            <ReviewSection product={product} />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-green-800 mb-2">Marketplace</h1>
                    <p className="text-gray-600">Browse fresh agricultural products directly from farmers</p>
                </div>

                {/* Search and Filter Section */}
                <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search Bar */}
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="md:w-64">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            >
                                {categories.map((category, index) => (
                                    <option key={index} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Refresh Button */}
                        <button
                            onClick={fetchProducts}
                            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-200"
                        >
                            🔄 Refresh
                        </button>
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-4">
                    <p className="text-gray-600">
                        Showing <span className="font-semibold">{filteredProducts.length}</span> product(s)
                    </p>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
                            <p className="text-gray-600">Loading products...</p>
                        </div>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                        <p className="text-red-600 font-semibold mb-2">⚠️ {error}</p>
                        <p className="text-sm text-gray-600 mb-4">
                            Please run: <code className="bg-red-100 px-2 py-1 rounded">node server.js</code> or <code className="bg-red-100 px-2 py-1 rounded">npm run server</code>
                        </p>
                        <button
                            onClick={fetchProducts}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && filteredProducts.length === 0 && (
                    <div className="bg-white rounded-lg shadow-md p-12 text-center">
                        <span className="text-6xl mb-4 block">🌾</span>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">No Products Found</h3>
                        <p className="text-gray-600 mb-4">
                            {products.length === 0
                                ? "Be the first to add products to the marketplace!"
                                : "Try adjusting your search or filter criteria."}
                        </p>
                    </div>
                )}

                {/* Products Grid */}
                {!loading && !error && filteredProducts.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product._id || product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>

            {/* Product Detail Modal */}
            {selectedProduct && (
                <ProductDetailModal
                    product={selectedProduct}
                    onClose={() => {
                        setSelectedProduct(null);
                        setOrderQuantity(1);
                    }}
                />
            )}
            {chatProduct && <MarketplaceChat product={chatProduct} onClose={() => setChatProduct(null)} />}
        </div>
    );
};

export default MarketPlace;
