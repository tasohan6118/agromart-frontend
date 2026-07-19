import React, { useState, useEffect } from 'react';
import { CartContext } from './CartContext';

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        // Load cart from localStorage on initial render
        const savedCart = localStorage.getItem('agromart-cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('agromart-cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, quantity) => {
        console.log('Adding to cart:', product, 'Quantity:', quantity);
        setCartItems(prevItems => {
            // Use _id if id doesn't exist (MongoDB format)
            const productId = product.id || product._id;
            
            if (!productId) {
                console.error('Product has no id or _id:', product);
                return prevItems;
            }
            
            // Check if product already exists in cart
            const existingItemIndex = prevItems.findIndex(item => {
                const itemId = item.id || item._id;
                return itemId === productId;
            });
            
            if (existingItemIndex > -1) {
                // Update quantity if product exists
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex].quantity += quantity;
                console.log('Updated existing item in cart:', updatedItems[existingItemIndex]);
                return updatedItems;
            } else {
                // Add new product to cart with normalized id
                const newItem = { ...product, id: productId, quantity };
                console.log('Added new item to cart:', newItem);
                return [...prevItems, newItem];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => {
            const itemId = item.id || item._id;
            return itemId !== productId;
        }));
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCartItems(prevItems =>
            prevItems.map(item => {
                const itemId = item.id || item._id;
                return itemId === productId ? { ...item, quantity: newQuantity } : item;
            })
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => {
            const price = item.offerPrice && item.offerPrice < item.price ? item.offerPrice : item.price;
            return total + (price * item.quantity);
        }, 0);
    };

    const getCartItemsCount = () => {
        return cartItems.reduce((count, item) => count + item.quantity, 0);
    };

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemsCount
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
