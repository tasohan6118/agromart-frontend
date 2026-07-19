import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icon issue in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MarketPrices = () => {
    const [selectedMarket, setSelectedMarket] = useState(null);

    // Function to generate dynamic prices based on date and market location
    const getDynamicPrice = (basePrice, marketId, date = new Date()) => {
        const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
        const seed = dayOfYear + marketId * 7; // Different seed for each market
        // Generate variation between -15% to +15% for regional differences
        const variation = (Math.sin(seed * 0.1) * 0.12) + (Math.cos(seed * 0.05) * 0.08) + (Math.sin(marketId * 0.3) * 0.05);
        const newPrice = Math.round(basePrice * (1 + variation));
        return newPrice;
    };

    // Product images mapping
    const productImages = {
        'Rice Miniket (per kg)': '🌾',
        'Rice Najirshail (per kg)': '🌾',
        'Rice BR-28 (per kg)': '🌾',
        'Rice (per kg)': '🌾',
        'Potato (per kg)': '🥔',
        'Tomato (per kg)': '🍅',
        'Onion Local (per kg)': '🧅',
        'Onion (per kg)': '🧅',
        'Onion Imported (per kg)': '🧅',
        'Garlic Local (per kg)': '🧄',
        'Garlic (per kg)': '🧄',
        'Garlic Imported (per kg)': '🧄',
        'Ginger (per kg)': '🫚',
        'Green Chili (per kg)': '🌶️',
        'Carrot (per kg)': '🥕',
        'Cabbage (per kg)': '🥬',
        'Cauliflower (per kg)': '🥦',
        'Eggplant (per kg)': '🍆',
        'Cucumber (per kg)': '🥒',
        'Bitter Gourd (per kg)': '🥒',
        'Bottle Gourd (per kg)': '🥒',
        'Ridge Gourd (per kg)': '🥒',
        'Pumpkin (per kg)': '🎃',
        'Radish (per kg)': '🥕',
        'Spinach (per kg)': '🥬',
        'Beans (per kg)': '🫘',
        'Papaya (per kg)': '🍈',
        'Lemon (per 4pcs)': '🍋',
        'Lemon (per dozen)': '🍋',
        'Lemon (per kg)': '🍋',
        'Banana (per dozen)': '🍌',
        'Apple (per kg)': '🍎',
        'Chicken Broiler (per kg)': '🐔',
        'Chicken (per kg)': '🐔',
        'Chicken Desi (per kg)': '🐔',
        'Beef (per kg)': '🥩',
        'Mutton (per kg)': '🐑',
        'Eggs (per dozen)': '🥚',
        'Milk (per liter)': '🥛',
        'Hilsa Fish (per kg)': '🐟',
        'Rohu Fish (per kg)': '🐟',
        'Fish Rui (per kg)': '🐟',
        'Fish (per kg)': '🐟',
        'Pangas Fish (per kg)': '🐟',
        'Prawn (per kg)': '🦐',
        'Crab (per kg)': '🦀',
        'Shrimp (per kg)': '🦐',
        'Dry Fish (per kg)': '🐟',
        'Squid (per kg)': '🦑',
        'Carp Fish (per kg)': '🐟',
        'Catla (per kg)': '🐟',
        'Tilapia (per kg)': '🐟',
        'Soybean Oil (per liter)': '🛢️',
        'Mustard Oil (per liter)': '🛢️',
        'Palm Oil (per liter)': '🛢️',
        'Sugar (per kg)': '🍬',
        'Salt (per kg)': '🧂',
        'Wheat Flour (per kg)': '🌾',
        'Wheat (per kg)': '🌾',
        'Lentils Masoor (per kg)': '🫘',
        'Chickpea (per kg)': '🫘',
        'Red Chili Powder (per kg)': '🌶️',
        'Pineapple (per piece)': '🍍',
        'Orange (per kg)': '🍊',
        'Mango (per kg)': '🥭',
        'Litchi (per kg)': '🍒',
        'Jackfruit (per kg)': '🥭',
        'Guava (per kg)': '🍐',
        'Coconut (per piece)': '🥥',
        'Corn (per kg)': '🌽',
        'Mustard (per kg)': '🌾',
        'Green Peas (per kg)': '🫛',
        'Brinjal (per kg)': '🍆',
        'Pointed Gourd (per kg)': '🥒',
        'Lady Finger (per kg)': '🫑',
        'Watermelon (per kg)': '🍉',
        'Betel Nut (per kg)': '🌰',
        'Turnip (per kg)': '🥕',
        'Oyster (per kg)': '🦪'
    };

    // Base prices for each item (these are the reference prices)
    const basePrices = {
        'Rice Miniket (per kg)': 60,
        'Rice Najirshail (per kg)': 55,
        'Rice BR-28 (per kg)': 52,
        'Rice (per kg)': 52,
        'Potato (per kg)': 28,
        'Tomato (per kg)': 40,
        'Onion Local (per kg)': 45,
        'Onion (per kg)': 43,
        'Onion Imported (per kg)': 55,
        'Garlic Local (per kg)': 180,
        'Garlic (per kg)': 185,
        'Garlic Imported (per kg)': 220,
        'Ginger (per kg)': 200,
        'Green Chili (per kg)': 80,
        'Carrot (per kg)': 60,
        'Cabbage (per kg)': 25,
        'Cauliflower (per kg)': 40,
        'Eggplant (per kg)': 50,
        'Cucumber (per kg)': 35,
        'Bitter Gourd (per kg)': 55,
        'Bottle Gourd (per kg)': 38,
        'Ridge Gourd (per kg)': 40,
        'Pumpkin (per kg)': 28,
        'Radish (per kg)': 25,
        'Spinach (per kg)': 20,
        'Beans (per kg)': 60,
        'Papaya (per kg)': 35,
        'Lemon (per 4pcs)': 20,
        'Lemon (per dozen)': 35,
        'Lemon (per kg)': 120,
        'Banana (per dozen)': 60,
        'Apple (per kg)': 280,
        'Chicken Broiler (per kg)': 220,
        'Chicken (per kg)': 215,
        'Chicken Desi (per kg)': 450,
        'Beef (per kg)': 650,
        'Mutton (per kg)': 850,
        'Eggs (per dozen)': 140,
        'Milk (per liter)': 75,
        'Hilsa Fish (per kg)': 1300,
        'Rohu Fish (per kg)': 350,
        'Fish Rui (per kg)': 330,
        'Fish (per kg)': 330,
        'Pangas Fish (per kg)': 220,
        'Prawn (per kg)': 800,
        'Crab (per kg)': 600,
        'Shrimp (per kg)': 720,
        'Dry Fish (per kg)': 900,
        'Squid (per kg)': 550,
        'Carp Fish (per kg)': 280,
        'Catla (per kg)': 320,
        'Tilapia (per kg)': 180,
        'Soybean Oil (per liter)': 165,
        'Mustard Oil (per liter)': 180,
        'Palm Oil (per liter)': 140,
        'Sugar (per kg)': 85,
        'Salt (per kg)': 35,
        'Wheat Flour (per kg)': 48,
        'Wheat (per kg)': 40,
        'Lentils Masoor (per kg)': 120,
        'Chickpea (per kg)': 110,
        'Red Chili Powder (per kg)': 450,
        'Pineapple (per piece)': 60,
        'Orange (per kg)': 180,
        'Mango (per kg)': 120,
        'Litchi (per kg)': 150,
        'Jackfruit (per kg)': 40,
        'Guava (per kg)': 45,
        'Coconut (per piece)': 50,
        'Corn (per kg)': 35,
        'Mustard (per kg)': 95,
        'Green Peas (per kg)': 85,
        'Brinjal (per kg)': 52,
        'Pointed Gourd (per kg)': 60,
        'Lady Finger (per kg)': 50,
        'Watermelon (per kg)': 35,
        'Betel Nut (per kg)': 350,
        'Turnip (per kg)': 28,
        'Oyster (per kg)': 450
    };

    // Generate dynamic prices for markets with location-based variation
    const generateMarketPrices = (items, marketId) => {
        return items.map(item => {
            const itemName = item.item;
            const basePrice = basePrices[itemName] || 50;
            const dynamicPrice = getDynamicPrice(basePrice, marketId);
            return {
                item: itemName,
                price: `${dynamicPrice} BDT`
            };
        });
    };

    // Comprehensive market data from all 64 districts of Bangladesh with daily changing prices
    const baseMarkets = [
        // Dhaka Division - Dhaka District
        { id: 1, name: 'Karwan Bazar', location: 'Dhaka', coordinates: [23.7506, 90.3919], items: [
            { item: 'Rice Miniket (per kg)' }, { item: 'Rice Najirshail (per kg)' }, { item: 'Rice BR-28 (per kg)' },
            { item: 'Potato (per kg)' }, { item: 'Tomato (per kg)' }, { item: 'Onion Local (per kg)' },
            { item: 'Onion Imported (per kg)' }, { item: 'Garlic Local (per kg)' }, { item: 'Garlic Imported (per kg)' },
            { item: 'Ginger (per kg)' }, { item: 'Green Chili (per kg)' }, { item: 'Carrot (per kg)' },
            { item: 'Cabbage (per kg)' }, { item: 'Cauliflower (per kg)' }, { item: 'Eggplant (per kg)' },
            { item: 'Cucumber (per kg)' }, { item: 'Bitter Gourd (per kg)' }, { item: 'Bottle Gourd (per kg)' },
            { item: 'Ridge Gourd (per kg)' }, { item: 'Pumpkin (per kg)' }, { item: 'Radish (per kg)' },
            { item: 'Spinach (per kg)' }, { item: 'Beans (per kg)' }, { item: 'Papaya (per kg)' },
            { item: 'Lemon (per 4pcs)' }, { item: 'Banana (per dozen)' }, { item: 'Apple (per kg)' },
            { item: 'Chicken Broiler (per kg)' }, { item: 'Chicken Desi (per kg)' }, { item: 'Beef (per kg)' },
            { item: 'Mutton (per kg)' }, { item: 'Eggs (per dozen)' }, { item: 'Milk (per liter)' },
            { item: 'Hilsa Fish (per kg)' }, { item: 'Rohu Fish (per kg)' }, { item: 'Pangas Fish (per kg)' },
            { item: 'Soybean Oil (per liter)' }, { item: 'Mustard Oil (per liter)' }, { item: 'Palm Oil (per liter)' },
            { item: 'Sugar (per kg)' }, { item: 'Salt (per kg)' }, { item: 'Wheat Flour (per kg)' },
            { item: 'Lentils Masoor (per kg)' }, { item: 'Chickpea (per kg)' }, { item: 'Red Chili Powder (per kg)' }
        ]},
        { id: 2, name: 'Mohammadpur Market', location: 'Dhaka', coordinates: [23.7644, 90.3605], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Tomato (per kg)' },
            { item: 'Onion (per kg)' }, { item: 'Green Chili (per kg)' }, { item: 'Garlic (per kg)' },
            { item: 'Ginger (per kg)' }, { item: 'Eggplant (per kg)' }, { item: 'Beans (per kg)' },
            { item: 'Chicken (per kg)' }, { item: 'Beef (per kg)' }, { item: 'Eggs (per dozen)' }
        ]},
        { id: 3, name: 'Jatrabari Bazar', location: 'Dhaka', coordinates: [23.7100, 90.4333], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Tomato (per kg)' },
            { item: 'Onion (per kg)' }, { item: 'Carrot (per kg)' }, { item: 'Soybean Oil (per liter)' }
        ]},
        
        // Gazipur District
        { id: 4, name: 'Tongi Bazar', location: 'Gazipur', coordinates: [23.8929, 90.4035], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Tomato (per kg)' },
            { item: 'Onion (per kg)' }, { item: 'Green Chili (per kg)' }, { item: 'Chicken (per kg)' },
            { item: 'Beef (per kg)' }, { item: 'Eggs (per dozen)' }
        ]},
        
        // Narayanganj District
        { id: 5, name: 'Chashara Bazar', location: 'Narayanganj', coordinates: [23.6238, 90.5000], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Hilsa Fish (per kg)' },
            { item: 'Rohu Fish (per kg)' }
        ]},
        
        // Tangail District
        { id: 6, name: 'Tangail Sadar Bazar', location: 'Tangail', coordinates: [24.2513, 89.9167], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Tomato (per kg)' },
            { item: 'Onion (per kg)' }, { item: 'Green Chili (per kg)' }, { item: 'Chicken (per kg)' }
        ]},
        
        // Kishoreganj District
        { id: 7, name: 'Kishoreganj Sadar', location: 'Kishoreganj', coordinates: [24.4260, 90.7767], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Fish Rui (per kg)' }
        ]},
        
        // Manikganj District
        { id: 8, name: 'Manikganj Bazar', location: 'Manikganj', coordinates: [23.8617, 90.0003], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Tomato (per kg)' }
        ]},
        
        // Munshiganj District
        { id: 9, name: 'Munshiganj Sadar', location: 'Munshiganj', coordinates: [23.5422, 90.5305], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Hilsa Fish (per kg)' }
        ]},
        
        // Narsingdi District
        { id: 10, name: 'Narsingdi Bazar', location: 'Narsingdi', coordinates: [23.9229, 90.7177], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Tomato (per kg)' }
        ]},
        
        // Rajbari District
        { id: 11, name: 'Rajbari Sadar', location: 'Rajbari', coordinates: [23.7574, 89.6447], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Onion (per kg)' }
        ]},
        
        // Madaripur District
        { id: 12, name: 'Madaripur Bazar', location: 'Madaripur', coordinates: [23.1742, 90.1870], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Fish (per kg)' }
        ]},
        
        // Gopalganj District
        { id: 13, name: 'Gopalganj Sadar', location: 'Gopalganj', coordinates: [23.0050, 89.8266], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Tomato (per kg)' }
        ]},
        
        // Shariatpur District
        { id: 14, name: 'Shariatpur Bazar', location: 'Shariatpur', coordinates: [23.2423, 90.4348], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Onion (per kg)' }
        ]},
        
        // Faridpur District
        { id: 15, name: 'Faridpur Sadar', location: 'Faridpur', coordinates: [23.6070, 89.8429], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Hilsa Fish (per kg)' }
        ]},

        // Chittagong Division - Chittagong District
        { id: 16, name: 'Badamtoli Bazar', location: 'Chittagong', coordinates: [22.3475, 91.8123], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Tomato (per kg)' },
            { item: 'Hilsa Fish (per kg)' }, { item: 'Prawn (per kg)' }, { item: 'Crab (per kg)' },
            { item: 'Shrimp (per kg)' }, { item: 'Dry Fish (per kg)' }, { item: 'Chicken (per kg)' }
        ]},
        { id: 17, name: 'Reazuddin Bazar', location: 'Chittagong', coordinates: [22.3569, 91.7832], items: [
            { item: 'Tomato (per kg)' }, { item: 'Eggplant (per kg)' }, { item: 'Cucumber (per kg)' },
            { item: 'Cauliflower (per kg)' }, { item: 'Beans (per kg)' }
        ]},
        
        // Cox's Bazar District
        { id: 18, name: "Cox's Bazar Sadar", location: "Cox's Bazar", coordinates: [21.4272, 92.0058], items: [
            { item: 'Rice (per kg)' }, { item: 'Hilsa Fish (per kg)' }, { item: 'Prawn (per kg)' },
            { item: 'Dry Fish (per kg)' }, { item: 'Crab (per kg)' }
        ]},
        
        // Comilla District
        { id: 19, name: 'Badurtala Bazar', location: 'Comilla', coordinates: [23.4607, 91.1809], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Tomato (per kg)' },
            { item: 'Onion (per kg)' }, { item: 'Brinjal (per kg)' }, { item: 'Pointed Gourd (per kg)' }
        ]},
        
        // Feni District
        { id: 20, name: 'Feni Sadar', location: 'Feni', coordinates: [23.0159, 91.3976], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Tomato (per kg)' }
        ]},
        
        // Brahmanbaria District
        { id: 21, name: 'Brahmanbaria Sadar', location: 'Brahmanbaria', coordinates: [23.9570, 91.1119], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Onion (per kg)' }
        ]},
        
        // Rangamati District
        { id: 22, name: 'Rangamati Sadar', location: 'Rangamati', coordinates: [22.7324, 92.2985], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Pineapple (per piece)' }
        ]},
        
        // Noakhali District
        { id: 23, name: 'Noakhali Sadar', location: 'Noakhali', coordinates: [22.8696, 91.0995], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Hilsa Fish (per kg)' }
        ]},
        
        // Chandpur District
        { id: 24, name: 'Chandpur Sadar', location: 'Chandpur', coordinates: [23.2332, 90.6712], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Hilsa Fish (per kg)' }
        ]},
        
        // Lakshmipur District
        { id: 25, name: 'Lakshmipur Bazar', location: 'Lakshmipur', coordinates: [22.9447, 90.8281], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Fish (per kg)' }
        ]},
        
        // Khagrachhari District
        { id: 26, name: 'Khagrachhari Sadar', location: 'Khagrachhari', coordinates: [23.1193, 91.9847], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Pineapple (per piece)' }
        ]},
        
        // Bandarban District
        { id: 27, name: 'Bandarban Sadar', location: 'Bandarban', coordinates: [22.1953, 92.2183], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Orange (per kg)' }
        ]},

        // Rajshahi Division - Rajshahi District
        { id: 28, name: 'Shaheb Bazar', location: 'Rajshahi', coordinates: [24.3745, 88.6042], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Tomato (per kg)' },
            { item: 'Onion (per kg)' }, { item: 'Mango (per kg)' }, { item: 'Litchi (per kg)' },
            { item: 'Spinach (per kg)' }, { item: 'Lemon (per dozen)' }, { item: 'Jackfruit (per kg)' }
        ]},
        { id: 29, name: 'Binodpur Bazar', location: 'Rajshahi', coordinates: [24.3636, 88.6241], items: [
            { item: 'Papaya (per kg)' }, { item: 'Guava (per kg)' }, { item: 'Ginger (per kg)' }
        ]},
        
        // Bogra District
        { id: 30, name: 'Boro Bazar', location: 'Bogra', coordinates: [24.8465, 89.3770], items: [
            { item: 'Rice (per kg)' }, { item: 'Wheat (per kg)' }, { item: 'Corn (per kg)' },
            { item: 'Mustard (per kg)' }, { item: 'Chickpea (per kg)' }, { item: 'Green Peas (per kg)' }
        ]},
        
        // Pabna District
        { id: 31, name: 'Pabna Sadar', location: 'Pabna', coordinates: [24.0064, 89.2372], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Tomato (per kg)' }
        ]},
        
        // Sirajganj District
        { id: 32, name: 'Sirajganj Bazar', location: 'Sirajganj', coordinates: [24.4533, 89.7006], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Fish (per kg)' }
        ]},
        
        // Natore District
        { id: 33, name: 'Natore Sadar', location: 'Natore', coordinates: [24.4206, 89.0000], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Mango (per kg)' }
        ]},
        
        // Naogaon District
        { id: 34, name: 'Naogaon Bazar', location: 'Naogaon', coordinates: [24.8133, 88.9283], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Tomato (per kg)' }
        ]},
        
        // Joypurhat District
        { id: 35, name: 'Joypurhat Sadar', location: 'Joypurhat', coordinates: [25.0968, 89.0227], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Onion (per kg)' }
        ]},
        
        // Chapainawabganj District
        { id: 36, name: 'Chapainawabganj Bazar', location: 'Chapainawabganj', coordinates: [24.5965, 88.2775], items: [
            { item: 'Rice (per kg)' }, { item: 'Mango (per kg)' }, { item: 'Potato (per kg)' }
        ]},

        // Khulna Division - Khulna District
        { id: 37, name: 'Daulatpur Bazar', location: 'Khulna', coordinates: [22.8456, 89.5403], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Tomato (per kg)' },
            { item: 'Onion (per kg)' }, { item: 'Pumpkin (per kg)' }, { item: 'Green Chili (per kg)' },
            { item: 'Shrimp (per kg)' }
        ]},
        { id: 38, name: 'Shibbari Market', location: 'Khulna', coordinates: [22.8150, 89.5680], items: [
            { item: 'Carp Fish (per kg)' }, { item: 'Catla (per kg)' }, { item: 'Tilapia (per kg)' },
            { item: 'Dry Fish (per kg)' }
        ]},
        
        // Bagerhat District
        { id: 39, name: 'Bagerhat Sadar', location: 'Bagerhat', coordinates: [22.6602, 89.7852], items: [
            { item: 'Rice (per kg)' }, { item: 'Shrimp (per kg)' }, { item: 'Crab (per kg)' }
        ]},
        
        // Jessore District
        { id: 40, name: 'Jessore Sadar', location: 'Jessore', coordinates: [23.1634, 89.2182], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Tomato (per kg)' },
            { item: 'Guava (per kg)' }
        ]},
        
        // Jhenaidah District
        { id: 41, name: 'Jhenaidah Bazar', location: 'Jhenaidah', coordinates: [23.5450, 89.1539], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Tomato (per kg)' }
        ]},
        
        // Magura District
        { id: 42, name: 'Magura Sadar', location: 'Magura', coordinates: [23.4855, 89.4198], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Onion (per kg)' }
        ]},
        
        // Narail District
        { id: 43, name: 'Narail Bazar', location: 'Narail', coordinates: [23.1725, 89.4840], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Fish (per kg)' }
        ]},
        
        // Satkhira District
        { id: 44, name: 'Satkhira Sadar', location: 'Satkhira', coordinates: [22.7185, 89.0700], items: [
            { item: 'Rice (per kg)' }, { item: 'Shrimp (per kg)' }, { item: 'Potato (per kg)' }
        ]},
        
        // Meherpur District
        { id: 45, name: 'Meherpur Bazar', location: 'Meherpur', coordinates: [23.7622, 88.6318], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Tomato (per kg)' }
        ]},
        
        // Kushtia District
        { id: 46, name: 'Kushtia Sadar', location: 'Kushtia', coordinates: [23.9013, 89.1202], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Onion (per kg)' }
        ]},
        
        // Chuadanga District
        { id: 47, name: 'Chuadanga Bazar', location: 'Chuadanga', coordinates: [23.6401, 88.8411], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Tomato (per kg)' }
        ]},

        // Sylhet Division - Sylhet District
        { id: 48, name: 'Bandarbazar', location: 'Sylhet', coordinates: [24.8949, 91.8687], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Tomato (per kg)' },
            { item: 'Onion (per kg)' }, { item: 'Eggplant (per kg)' }, { item: 'Pineapple (per piece)' },
            { item: 'Orange (per kg)' }
        ]},
        { id: 49, name: 'Shahjalal Uposhohor', location: 'Sylhet', coordinates: [24.9045, 91.8611], items: [
            { item: 'Chicken (per kg)' }, { item: 'Beef (per kg)' }, { item: 'Mutton (per kg)' },
            { item: 'Eggs (per dozen)' }, { item: 'Milk (per liter)' }
        ]},
        
        // Moulvibazar District
        { id: 50, name: 'Moulvibazar Sadar', location: 'Moulvibazar', coordinates: [24.4829, 91.7314], items: [
            { item: 'Rice (per kg)' }, { item: 'Pineapple (per piece)' }, { item: 'Lemon (per kg)' }
        ]},
        
        // Habiganj District
        { id: 51, name: 'Habiganj Sadar', location: 'Habiganj', coordinates: [24.3745, 91.4153], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Tomato (per kg)' }
        ]},
        
        // Sunamganj District
        { id: 52, name: 'Sunamganj Bazar', location: 'Sunamganj', coordinates: [25.0658, 91.3950], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Fish (per kg)' }
        ]},

        // Barishal Division - Barishal District
        { id: 53, name: 'Chawk Bazar', location: 'Barishal', coordinates: [22.7010, 90.3535], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Tomato (per kg)' },
            { item: 'Onion (per kg)' }, { item: 'Watermelon (per kg)' }, { item: 'Hilsa Fish (per kg)' }
        ]},
        
        // Bhola District
        { id: 54, name: 'Bhola Sadar', location: 'Bhola', coordinates: [22.6859, 90.6482], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Hilsa Fish (per kg)' }
        ]},
        
        // Patuakhali District
        { id: 55, name: 'Patuakhali Sadar', location: 'Patuakhali', coordinates: [22.3596, 90.3298], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Coconut (per piece)' }
        ]},
        
        // Pirojpur District
        { id: 56, name: 'Pirojpur Bazar', location: 'Pirojpur', coordinates: [22.5791, 89.9759], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Fish (per kg)' }
        ]},
        
        // Jhalokathi District
        { id: 57, name: 'Jhalokathi Sadar', location: 'Jhalokathi', coordinates: [22.6406, 90.1987], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Betel Nut (per kg)' }
        ]},
        
        // Barguna District
        { id: 58, name: 'Barguna Bazar', location: 'Barguna', coordinates: [22.1596, 90.1119], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Dry Fish (per kg)' }
        ]},

        // Rangpur Division - Rangpur District
        { id: 59, name: 'Natun Bazar', location: 'Rangpur', coordinates: [25.7439, 89.2752], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Tomato (per kg)' },
            { item: 'Onion (per kg)' }, { item: 'Cauliflower (per kg)' }, { item: 'Radish (per kg)' },
            { item: 'Turnip (per kg)' }
        ]},
        
        // Dinajpur District
        { id: 60, name: 'Dinajpur Sadar', location: 'Dinajpur', coordinates: [25.6217, 88.6354], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Litchi (per kg)' }
        ]},
        
        // Gaibandha District
        { id: 61, name: 'Gaibandha Bazar', location: 'Gaibandha', coordinates: [25.3285, 89.5430], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Onion (per kg)' }
        ]},
        
        // Kurigram District
        { id: 62, name: 'Kurigram Sadar', location: 'Kurigram', coordinates: [25.8073, 89.6299], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Tomato (per kg)' }
        ]},
        
        // Lalmonirhat District
        { id: 63, name: 'Lalmonirhat Bazar', location: 'Lalmonirhat', coordinates: [25.9923, 89.2847], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Cauliflower (per kg)' }
        ]},
        
        // Nilphamari District
        { id: 64, name: 'Nilphamari Sadar', location: 'Nilphamari', coordinates: [25.9316, 88.8562], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Onion (per kg)' }
        ]},
        
        // Panchagarh District
        { id: 65, name: 'Panchagarh Bazar', location: 'Panchagarh', coordinates: [26.3411, 88.5541], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Tomato (per kg)' }
        ]},
        
        // Thakurgaon District
        { id: 66, name: 'Thakurgaon Sadar', location: 'Thakurgaon', coordinates: [26.0336, 88.4616], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Mango (per kg)' }
        ]},

        // Mymensingh Division - Mymensingh District
        { id: 67, name: 'Sadar Bazar', location: 'Mymensingh', coordinates: [24.7471, 90.4203], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Tomato (per kg)' },
            { item: 'Onion (per kg)' }, { item: 'Lady Finger (per kg)' }, { item: 'Bottle Gourd (per kg)' }
        ]},
        
        // Jamalpur District
        { id: 68, name: 'Jamalpur Sadar', location: 'Jamalpur', coordinates: [24.9375, 89.9372], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Tomato (per kg)' }
        ]},
        
        // Netrokona District
        { id: 69, name: 'Netrokona Bazar', location: 'Netrokona', coordinates: [24.8103, 90.7275], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Fish (per kg)' }
        ]},
        
        // Sherpur District
        { id: 70, name: 'Sherpur Sadar', location: 'Sherpur', coordinates: [25.0204, 90.0152], items: [
            { item: 'Rice (per kg)' }, { item: 'Potato (per kg)' }, { item: 'Pineapple (per piece)' }
        ]},
    ];

    // Convert base markets to actual markets with dynamic prices (location-specific)
    const markets = baseMarkets.map(market => ({
        ...market,
        prices: generateMarketPrices(market.items, market.id)
    }));

    console.log('Product Images:', productImages);
    console.log('Markets:', markets);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">Daily Market Prices</h1>
                <p className="text-center text-gray-600 mb-8">Click on any market location to view today's commodity prices</p>

                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Map Section */}
                    <div className="bg-white rounded-lg shadow-lg p-4">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Market Locations</h2>
                        <MapContainer 
                            center={[23.8103, 90.4125]} 
                            zoom={7} 
                            style={{ height: '600px', borderRadius: '8px' }}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            {markets.map(market => (
                                <Marker 
                                    key={market.id} 
                                    position={market.coordinates}
                                    eventHandlers={{
                                        click: () => setSelectedMarket(market)
                                    }}
                                >
                                    <Popup>
                                        <strong>{market.name}</strong><br />
                                        {market.location}<br />
                                        <span className="text-sm text-blue-600 cursor-pointer">Click to view prices</span>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </div>

                    {/* Price Display Section */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Commodity Prices</h2>
                        
                        {selectedMarket ? (
                            <div>
                                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg mb-4">
                                    <h3 className="text-2xl font-bold text-gray-800">{selectedMarket.name}</h3>
                                    <p className="text-gray-600">{selectedMarket.location}</p>
                                    <p className="text-sm text-gray-500 mt-2">Updated: {new Date().toLocaleDateString()}</p>
                                </div>

                                <div className="space-y-2 max-h-[500px] overflow-y-auto">
                                    {selectedMarket.prices.map((price, index) => (
                                        <div 
                                            key={index} 
                                            className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="text-3xl">{productImages[price.item] || '🌾'}</span>
                                                <span className="font-medium text-gray-700">{price.item}</span>
                                            </div>
                                            <span className="text-green-600 font-bold">{price.price}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-center">
                                <svg className="w-24 h-24 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <p className="text-gray-500 text-lg">Select a market from the map to view prices</p>
                                <p className="text-gray-400 text-sm mt-2">Click on any marker to see daily commodity rates</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketPrices;
