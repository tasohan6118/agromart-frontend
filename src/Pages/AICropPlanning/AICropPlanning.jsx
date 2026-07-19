import React, { useState } from 'react';

const AICropPlanning = () => {
    const [formData, setFormData] = useState({
        district: '',
        soilType: '',
        farmSize: '',
        budget: '',
        season: '',
        waterAvailability: '',
        previousCrop: ''
    });

    const [recommendations, setRecommendations] = useState(null);
    const [loading, setLoading] = useState(false);

    // Bangladesh districts
    const districts = ['Dhaka', 'Chittagong', 'Rajshahi', 'Chapainawabganj', 'Dinajpur', 'Rangpur', 'Sylhet', 'Mymensingh', 'Barisal', 'Khulna'];
    
    // Soil types
    const soilTypes = [
        { value: 'loamy', label: 'Loamy (Best for most crops)' },
        { value: 'clay', label: 'Clay (High water retention)' },
        { value: 'sandy', label: 'Sandy (Good drainage)' },
        { value: 'silt', label: 'Silt (Fertile & moisture-retentive)' },
        { value: 'red', label: 'Red Soil (Iron-rich)' },
        { value: 'alluvial', label: 'Alluvial (River basin soil)' }
    ];

    // Seasons
    const seasons = [
        { value: 'rabi', label: 'Rabi (Winter: Oct-Mar)' },
        { value: 'kharif', label: 'Kharif (Monsoon: Apr-Sep)' },
        { value: 'summer', label: 'Summer (Mar-Jun)' }
    ];

    // Water availability
    const waterLevels = [
        { value: 'abundant', label: 'Abundant (Irrigation + Rain)' },
        { value: 'moderate', label: 'Moderate (Limited irrigation)' },
        { value: 'low', label: 'Low (Rain-dependent)' }
    ];

    // Crop database with detailed information
    const cropDatabase = {
        rice: {
            name: 'Rice (ধান)',
            seasons: ['kharif', 'rabi'],
            soilTypes: ['clay', 'loamy', 'alluvial'],
            waterNeeds: ['abundant'],
            profitMargin: 35,
            investmentPerAcre: 25000,
            yieldPerAcre: 2500, // kg
            pricePerKg: 32,
            growthDays: 120,
            difficulty: 'Medium',
            marketDemand: 'Very High'
        },
        wheat: {
            name: 'Wheat (গম)',
            seasons: ['rabi'],
            soilTypes: ['loamy', 'clay', 'alluvial'],
            waterNeeds: ['moderate'],
            profitMargin: 30,
            investmentPerAcre: 20000,
            yieldPerAcre: 1800,
            pricePerKg: 28,
            growthDays: 110,
            difficulty: 'Easy',
            marketDemand: 'High'
        },
        potato: {
            name: 'Potato (আলু)',
            seasons: ['rabi'],
            soilTypes: ['loamy', 'sandy'],
            waterNeeds: ['moderate'],
            profitMargin: 45,
            investmentPerAcre: 30000,
            yieldPerAcre: 8000,
            pricePerKg: 22,
            growthDays: 90,
            difficulty: 'Easy',
            marketDemand: 'Very High'
        },
        onion: {
            name: 'Onion (পেঁয়াজ)',
            seasons: ['rabi'],
            soilTypes: ['loamy', 'sandy', 'alluvial'],
            waterNeeds: ['moderate'],
            profitMargin: 50,
            investmentPerAcre: 35000,
            yieldPerAcre: 6000,
            pricePerKg: 35,
            growthDays: 120,
            difficulty: 'Medium',
            marketDemand: 'Very High'
        },
        tomato: {
            name: 'Tomato (টমেটো)',
            seasons: ['rabi', 'summer'],
            soilTypes: ['loamy', 'sandy'],
            waterNeeds: ['moderate'],
            profitMargin: 55,
            investmentPerAcre: 40000,
            yieldPerAcre: 10000,
            pricePerKg: 40,
            growthDays: 80,
            difficulty: 'Medium',
            marketDemand: 'High'
        },
        jute: {
            name: 'Jute (পাট)',
            seasons: ['kharif'],
            soilTypes: ['loamy', 'clay', 'alluvial'],
            waterNeeds: ['abundant'],
            profitMargin: 40,
            investmentPerAcre: 18000,
            yieldPerAcre: 1800,
            pricePerKg: 45,
            growthDays: 120,
            difficulty: 'Easy',
            marketDemand: 'High'
        },
        maize: {
            name: 'Maize (ভুট্টা)',
            seasons: ['rabi', 'kharif'],
            soilTypes: ['loamy', 'sandy', 'alluvial'],
            waterNeeds: ['moderate'],
            profitMargin: 38,
            investmentPerAcre: 22000,
            yieldPerAcre: 3500,
            pricePerKg: 25,
            growthDays: 100,
            difficulty: 'Easy',
            marketDemand: 'High'
        },
        mustard: {
            name: 'Mustard (সরিষা)',
            seasons: ['rabi'],
            soilTypes: ['loamy', 'clay'],
            waterNeeds: ['low', 'moderate'],
            profitMargin: 42,
            investmentPerAcre: 15000,
            yieldPerAcre: 900,
            pricePerKg: 70,
            growthDays: 90,
            difficulty: 'Easy',
            marketDemand: 'Medium'
        },
        lentil: {
            name: 'Lentil (মসুর)',
            seasons: ['rabi'],
            soilTypes: ['loamy', 'sandy'],
            waterNeeds: ['low', 'moderate'],
            profitMargin: 35,
            investmentPerAcre: 12000,
            yieldPerAcre: 700,
            pricePerKg: 95,
            growthDays: 100,
            difficulty: 'Easy',
            marketDemand: 'High'
        },
        cauliflower: {
            name: 'Cauliflower (ফুলকপি)',
            seasons: ['rabi'],
            soilTypes: ['loamy'],
            waterNeeds: ['moderate'],
            profitMargin: 48,
            investmentPerAcre: 35000,
            yieldPerAcre: 9000,
            pricePerKg: 30,
            growthDays: 70,
            difficulty: 'Medium',
            marketDemand: 'High'
        },
        cabbage: {
            name: 'Cabbage (বাঁধাকপি)',
            seasons: ['rabi'],
            soilTypes: ['loamy', 'clay'],
            waterNeeds: ['moderate'],
            profitMargin: 45,
            investmentPerAcre: 32000,
            yieldPerAcre: 12000,
            pricePerKg: 20,
            growthDays: 75,
            difficulty: 'Easy',
            marketDemand: 'High'
        },
        eggplant: {
            name: 'Eggplant (বেগুন)',
            seasons: ['kharif', 'summer'],
            soilTypes: ['loamy', 'sandy'],
            waterNeeds: ['moderate'],
            profitMargin: 50,
            investmentPerAcre: 28000,
            yieldPerAcre: 8000,
            pricePerKg: 35,
            growthDays: 90,
            difficulty: 'Easy',
            marketDemand: 'High'
        },
        chili: {
            name: 'Chili (মরিচ)',
            seasons: ['kharif', 'summer'],
            soilTypes: ['loamy', 'sandy'],
            waterNeeds: ['moderate'],
            profitMargin: 60,
            investmentPerAcre: 30000,
            yieldPerAcre: 1500,
            pricePerKg: 120,
            growthDays: 120,
            difficulty: 'Medium',
            marketDemand: 'Very High'
        },
        cucumber: {
            name: 'Cucumber (শসা)',
            seasons: ['summer', 'kharif'],
            soilTypes: ['loamy', 'sandy'],
            waterNeeds: ['moderate'],
            profitMargin: 52,
            investmentPerAcre: 25000,
            yieldPerAcre: 7000,
            pricePerKg: 30,
            growthDays: 60,
            difficulty: 'Easy',
            marketDemand: 'Medium'
        },
        watermelon: {
            name: 'Watermelon (তরমুজ)',
            seasons: ['summer'],
            soilTypes: ['sandy', 'loamy'],
            waterNeeds: ['moderate'],
            profitMargin: 55,
            investmentPerAcre: 35000,
            yieldPerAcre: 15000,
            pricePerKg: 18,
            growthDays: 80,
            difficulty: 'Medium',
            marketDemand: 'High'
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const calculateRecommendations = () => {
        setLoading(true);
        
        setTimeout(() => {
            const suitableCrops = [];

            // Analyze each crop
            Object.keys(cropDatabase).forEach(cropKey => {
                const crop = cropDatabase[cropKey];
                let score = 0;
                let reasons = [];

                // Season match (40 points)
                if (crop.seasons.includes(formData.season)) {
                    score += 40;
                    reasons.push(`Perfect for ${formData.season} season`);
                } else {
                    return; // Skip crop if season doesn't match
                }

                // Soil type match (30 points)
                if (crop.soilTypes.includes(formData.soilType)) {
                    score += 30;
                    reasons.push(`Excellent for ${formData.soilType} soil`);
                } else {
                    score += 10; // Partial points
                    reasons.push(`Can grow in ${formData.soilType} soil with care`);
                }

                // Water availability match (20 points)
                if (crop.waterNeeds.includes(formData.waterAvailability)) {
                    score += 20;
                    reasons.push(`Matches ${formData.waterAvailability} water availability`);
                } else {
                    score += 5;
                }

                // Market demand (10 points)
                if (crop.marketDemand === 'Very High') {
                    score += 10;
                    reasons.push('High market demand');
                } else if (crop.marketDemand === 'High') {
                    score += 7;
                }

                // Calculate profitability
                const farmSizeNum = parseFloat(formData.farmSize) || 1;
                const totalInvestment = crop.investmentPerAcre * farmSizeNum;
                const totalRevenue = crop.yieldPerAcre * farmSizeNum * crop.pricePerKg;
                const totalProfit = totalRevenue - totalInvestment;
                const profitPercentage = ((totalProfit / totalInvestment) * 100).toFixed(0);

                // Budget consideration
                const budgetNum = parseFloat(formData.budget) || 0;
                if (budgetNum > 0) {
                    if (totalInvestment <= budgetNum) {
                        score += 10;
                        reasons.push('Fits within budget');
                    } else {
                        score -= 10;
                        reasons.push('Requires additional investment');
                    }
                }

                // Avoid planting same crop consecutively
                if (formData.previousCrop && cropKey === formData.previousCrop.toLowerCase()) {
                    score -= 20;
                    reasons.push('⚠️ Not recommended after same crop (crop rotation advised)');
                }

                suitableCrops.push({
                    ...crop,
                    key: cropKey,
                    score,
                    reasons,
                    totalInvestment,
                    totalRevenue,
                    totalProfit,
                    profitPercentage
                });
            });

            // Sort by score
            suitableCrops.sort((a, b) => b.score - a.score);

            // Take top 5
            const topCrops = suitableCrops.slice(0, 5);

            setRecommendations(topCrops);
            setLoading(false);
        }, 1500);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        calculateRecommendations();
    };

    const resetForm = () => {
        setFormData({
            district: '',
            soilType: '',
            farmSize: '',
            budget: '',
            season: '',
            waterAvailability: '',
            previousCrop: ''
        });
        setRecommendations(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-block p-3 bg-purple-100 rounded-full mb-4">
                        <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-3">AI Crop Planning</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Get intelligent crop recommendations based on your farm conditions, budget, and market trends
                    </p>
                </div>

                {!recommendations ? (
                    /* Input Form */
                    <div className="max-w-3xl mx-auto">
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* District */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            District <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            name="district"
                                            value={formData.district}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        >
                                            <option value="">Select District</option>
                                            {districts.map(d => (
                                                <option key={d} value={d}>{d}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Soil Type */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Soil Type <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            name="soilType"
                                            value={formData.soilType}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        >
                                            <option value="">Select Soil Type</option>
                                            {soilTypes.map(s => (
                                                <option key={s.value} value={s.value}>{s.label}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Farm Size */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Farm Size (Acres) <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            name="farmSize"
                                            value={formData.farmSize}
                                            onChange={handleChange}
                                            required
                                            step="0.1"
                                            min="0.1"
                                            placeholder="e.g., 2.5"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        />
                                    </div>

                                    {/* Budget */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Budget (৳) <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            name="budget"
                                            value={formData.budget}
                                            onChange={handleChange}
                                            required
                                            step="1000"
                                            min="1000"
                                            placeholder="e.g., 50000"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        />
                                    </div>

                                    {/* Season */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Planting Season <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            name="season"
                                            value={formData.season}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        >
                                            <option value="">Select Season</option>
                                            {seasons.map(s => (
                                                <option key={s.value} value={s.value}>{s.label}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Water Availability */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Water Availability <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            name="waterAvailability"
                                            value={formData.waterAvailability}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        >
                                            <option value="">Select Water Level</option>
                                            {waterLevels.map(w => (
                                                <option key={w.value} value={w.value}>{w.label}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Previous Crop */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Previous Crop (Optional)
                                        </label>
                                        <input
                                            type="text"
                                            name="previousCrop"
                                            value={formData.previousCrop}
                                            onChange={handleChange}
                                            placeholder="e.g., Rice, Wheat (for crop rotation advice)"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full mt-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Analyzing Your Farm...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            Get AI Recommendations
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                ) : (
                    /* Results Display */
                    <div className="space-y-6">
                        {/* Summary Card */}
                        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl shadow-lg p-8">
                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div>
                                    <h2 className="text-2xl font-bold mb-2">Your Crop Recommendations</h2>
                                    <p className="text-purple-100">
                                        Based on {formData.farmSize} acres in {formData.district} • Budget: ৳{parseFloat(formData.budget).toLocaleString()}
                                    </p>
                                </div>
                                <button
                                    onClick={resetForm}
                                    className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
                                >
                                    New Analysis
                                </button>
                            </div>
                        </div>

                        {/* Crop Cards */}
                        {recommendations.map((crop, index) => (
                            <div key={crop.key} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                <div className="p-6">
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl ${
                                                index === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
                                                index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500' :
                                                index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-600' :
                                                'bg-gradient-to-br from-purple-400 to-purple-600'
                                            }`}>
                                                {index + 1}
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold text-gray-800">{crop.name}</h3>
                                                <div className="flex items-center gap-3 mt-1">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                        crop.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                                                        crop.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-red-100 text-red-700'
                                                    }`}>
                                                        {crop.difficulty}
                                                    </span>
                                                    <span className="text-sm text-gray-500">{crop.growthDays} days to harvest</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-3xl font-bold text-green-600">
                                                +{crop.profitPercentage}%
                                            </div>
                                            <div className="text-sm text-gray-500">Expected Profit</div>
                                        </div>
                                    </div>

                                    {/* Financial Breakdown */}
                                    <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                                        <div>
                                            <div className="text-sm text-gray-600 mb-1">Investment</div>
                                            <div className="text-xl font-bold text-gray-800">৳{crop.totalInvestment.toLocaleString()}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-600 mb-1">Revenue</div>
                                            <div className="text-xl font-bold text-blue-600">৳{crop.totalRevenue.toLocaleString()}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-600 mb-1">Profit</div>
                                            <div className="text-xl font-bold text-green-600">৳{crop.totalProfit.toLocaleString()}</div>
                                        </div>
                                    </div>

                                    {/* Reasons */}
                                    <div className="mb-4">
                                        <h4 className="font-semibold text-gray-700 mb-2">Why this crop?</h4>
                                        <div className="space-y-2">
                                            {crop.reasons.map((reason, idx) => (
                                                <div key={idx} className="flex items-start gap-2">
                                                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                    <span className="text-sm text-gray-700">{reason}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Details Grid */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
                                        <div className="text-center">
                                            <div className="text-2xl mb-1">🌾</div>
                                            <div className="text-xs text-gray-600">Yield/Acre</div>
                                            <div className="font-semibold text-sm">{crop.yieldPerAcre} kg</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl mb-1">💰</div>
                                            <div className="text-xs text-gray-600">Market Price</div>
                                            <div className="font-semibold text-sm">৳{crop.pricePerKg}/kg</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl mb-1">📈</div>
                                            <div className="text-xs text-gray-600">Market Demand</div>
                                            <div className="font-semibold text-sm">{crop.marketDemand}</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl mb-1">⏱️</div>
                                            <div className="text-xs text-gray-600">Growth Period</div>
                                            <div className="font-semibold text-sm">{crop.growthDays} days</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Tips Section */}
                        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
                            <div className="flex items-start gap-3">
                                <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div>
                                    <h3 className="font-bold text-blue-900 mb-2">💡 Smart Farming Tips</h3>
                                    <ul className="space-y-1 text-sm text-blue-800">
                                        <li>• Practice crop rotation to maintain soil health and reduce pest problems</li>
                                        <li>• Check weather forecasts regularly for optimal planting and harvesting times</li>
                                        <li>• Consider market trends before large-scale cultivation</li>
                                        <li>• Use quality seeds and proper irrigation for maximum yield</li>
                                        <li>• Consult local agricultural officers for region-specific guidance</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AICropPlanning;
