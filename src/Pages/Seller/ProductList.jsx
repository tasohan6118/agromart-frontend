import React, { useState, useEffect } from 'react';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Sample demo products for demonstration
    const demoProducts = [
        {
            _id: '1',
            name: 'Fresh Potatoes',
            variety: 'Red Potato',
            price: 32,
            finalPrice: 30,
            quantity: 500,
            unit: 'kg',
            district: 'Dhaka',
            isInStock: true,
            files: ['https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400']
        },
        {
            _id: '2',
            name: 'Organic Tomatoes',
            variety: 'Local Tomato',
            price: 45,
            finalPrice: 45,
            quantity: 200,
            unit: 'kg',
            district: 'Chittagong',
            isInStock: true,
            files: ['https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400']
        },
        {
            _id: '3',
            name: 'IRRI Rice',
            variety: 'IRRI-28',
            price: 55,
            finalPrice: 52,
            quantity: 0,
            unit: 'kg',
            district: 'Rajshahi',
            isInStock: false,
            files: ['https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400']
        },
        {
            _id: '4',
            name: 'Fresh Hilsa Fish',
            variety: 'Padma River',
            price: 1400,
            finalPrice: 1350,
            quantity: 50,
            unit: 'kg',
            district: 'Faridpur',
            isInStock: true,
            files: ['https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=400']
        },
        {
            _id: '5',
            name: 'Local Onions',
            variety: 'Red Onion',
            price: 48,
            finalPrice: 48,
            quantity: 0,
            unit: 'kg',
            district: 'Pabna',
            isInStock: false,
            files: ['https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400']
        }
    ];

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:5000/products');
            const data = await response.json();
            
            // If backend has products, use them; otherwise use demo products
            if (data && data.length > 0) {
                // Add isInStock field based on quantity if not present
                const productsWithStock = data.map(p => ({
                    ...p,
                    isInStock: p.isInStock !== undefined ? p.isInStock : p.quantity > 0
                }));
                setProducts(productsWithStock);
            } else {
                setProducts(demoProducts);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            // If backend fails, use demo products
            setProducts(demoProducts);
        } finally {
            setLoading(false);
        }
    };

    const toggleStockStatus = async (productId) => {
        // Update local state immediately
        setProducts(prevProducts =>
            prevProducts.map(product =>
                product._id === productId
                    ? { ...product, isInStock: !product.isInStock }
                    : product
            )
        );

        // Try to update on backend (optional)
        try {
            const product = products.find(p => p._id === productId);
            await fetch(`http://localhost:5000/products/${productId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    isInStock: !product.isInStock
                })
            });
        } catch (error) {
            console.log('Backend update failed, but local state updated');
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Product List</h2>

            {loading ? (
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading products...</p>
                </div>
            ) : products.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-600">No products available.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {products.map((product) => {
                        const isInStock = product.isInStock !== undefined ? product.isInStock : product.quantity > 0;
                        return (
                            <div 
                                key={product._id} 
                                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                            >
                                {/* Product Info */}
                                <div className="flex items-center gap-4">
                                    {product.files && product.files[0] ? (
                                        <img 
                                            src={product.files[0]} 
                                            alt={product.name}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                    ) : (
                                        <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-2xl">
                                            🌾
                                        </div>
                                    )}
                                    
                                    <div>
                                        <h3 className="font-semibold text-gray-800">{product.name}</h3>
                                        <p className="text-sm text-gray-600">
                                            {product.variety} • ৳{product.finalPrice || product.price}/{product.unit}
                                        </p>
                                    </div>
                                </div>

                                {/* Stock Toggle Button */}
                                <div className="flex items-center gap-3">
                                    <span className="text-sm text-gray-600">
                                        {product.quantity} {product.unit}
                                    </span>
                                    <button
                                        onClick={() => toggleStockStatus(product._id)}
                                        className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors cursor-pointer ${
                                            isInStock ? 'bg-green-500' : 'bg-gray-300'
                                        }`}
                                    >
                                        <span
                                            className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform shadow-md ${
                                                isInStock ? 'translate-x-7' : 'translate-x-1'
                                            }`}
                                        />
                                    </button>
                                    <span className={`text-sm font-medium min-w-[90px] ${
                                        isInStock ? 'text-green-600' : 'text-gray-500'
                                    }`}>
                                        {isInStock ? 'In Stock' : 'Out of Stock'}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ProductList;