import React, { useState, useEffect } from 'react';
import userAuth from '../../Hooks/userAuth';
import useAxios from '../../Axios/useAxios';
import { updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';

const SellerProfile = () => {
    const { user } = userAuth();
    const axiosInstance = useAxios();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');
    const [sellerData, setSellerData] = useState(null);
    
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        businessName: '',
        businessType: 'individual',
        bio: '',
        country: '',
        district: '',
        exactAddress: '',
        profileImage: ''
    });

    const countries = [
        'Bangladesh', 'India', 'Pakistan', 'Nepal', 'Sri Lanka', 'Afghanistan',
        'United States', 'United Kingdom', 'Canada', 'Australia', 'Other'
    ];

    const bangladeshDistricts = [
        'Dhaka', 'Chittagong', 'Rajshahi', 'Khulna', 'Barisal', 'Sylhet',
        'Rangpur', 'Mymensingh', 'Comilla', 'Gazipur', 'Narayanganj', 'Bogra',
        'Jessore', 'Dinajpur', 'Kushtia', 'Pabna', 'Tangail', 'Faridpur'
    ];

    const businessTypes = ['Individual', 'Partnership', 'Company', 'Cooperative'];

    useEffect(() => {
        if (user?.email) {
            loadSellerProfile();
        }
    }, [user]);

    const loadSellerProfile = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`/sellers/${user.email}`);
            if (response.data) {
                setSellerData(response.data);
                setFormData({
                    fullName: response.data.fullName || user.displayName || '',
                    email: response.data.email || user.email || '',
                    phoneNumber: response.data.phoneNumber || '',
                    businessName: response.data.businessName || '',
                    businessType: response.data.businessType || 'individual',
                    bio: response.data.bio || '',
                    country: response.data.country || '',
                    district: response.data.district || '',
                    exactAddress: response.data.exactAddress || '',
                    profileImage: response.data.profileImage || user.photoURL || ''
                });
            }
        } catch (error) {
            console.log('Profile not found, using defaults:', error);
            setFormData({
                fullName: user.displayName || '',
                email: user.email || '',
                phoneNumber: '',
                businessName: '',
                businessType: 'individual',
                bio: '',
                country: '',
                district: '',
                exactAddress: '',
                profileImage: user.photoURL || ''
            });
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            setMessage('❌ Image size must be less than 5MB');
            setTimeout(() => setMessage(''), 3000);
            return;
        }

        // Validate file type
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            setMessage('❌ Only JPG, PNG, GIF, and WEBP images are allowed');
            setTimeout(() => setMessage(''), 3000);
            return;
        }

        const formDataImg = new FormData();
        formDataImg.append('image', file);

        try {
            setUploading(true);
            setMessage('📤 Uploading image...');
            
            // Upload to your backend server
            const response = await axiosInstance.post('/upload', formDataImg, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            if (response.data.success) {
                const imageUrl = response.data.imageUrl;
                setFormData(prev => ({
                    ...prev,
                    profileImage: imageUrl
                }));
                setMessage('✅ Image uploaded successfully!');
                setTimeout(() => setMessage(''), 3000);
            } else {
                setMessage('❌ Failed to upload image');
                setTimeout(() => setMessage(''), 3000);
            }
        } catch (error) {
            console.error('Image upload error:', error);
            setMessage('❌ Failed to upload image. Make sure the backend server is running.');
            setTimeout(() => setMessage(''), 5000);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            // Update Firebase display name and photo
            if (formData.fullName !== user.displayName || formData.profileImage !== user.photoURL) {
                await updateProfile(auth.currentUser, {
                    displayName: formData.fullName,
                    photoURL: formData.profileImage
                });
            }

            // Update seller profile in backend
            const updatedData = {
                ...formData,
                updated_at: new Date().toISOString()
            };

            await axiosInstance.put(`/sellers/${user.email}`, updatedData);
            
            setMessage('✅ Profile updated successfully!');
            setIsEditing(false);
            loadSellerProfile();
            
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Error updating profile:', error);
            if (error.code === 'ERR_NETWORK') {
                setMessage('❌ Cannot connect to server. Please start the backend server.');
            } else {
                setMessage('❌ Failed to update profile. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        loadSellerProfile();
        setMessage('');
    };

    if (loading && !formData.email) {
        return (
            <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Header Section - Simple */}
                <div className="px-8 py-10 bg-white border-b-2 border-gray-100">
                    <div className="flex flex-col items-center justify-center text-center gap-6">
                        {/* Profile Image */}
                        <div className="relative">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg bg-gray-100">
                                {formData.profileImage ? (
                                    <img 
                                        src={formData.profileImage} 
                                        alt="Profile" 
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600 text-4xl font-bold">
                                        {formData.fullName ? formData.fullName.charAt(0).toUpperCase() : 'S'}
                                    </div>
                                )}
                            </div>
                            {isEditing && (
                                <label className="absolute bottom-0 right-0 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full cursor-pointer shadow-lg transition">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <input 
                                        type="file" 
                                        className="hidden" 
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        disabled={uploading}
                                    />
                                </label>
                            )}
                            {uploading && (
                                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                                </div>
                            )}
                        </div>
                        
                        {/* Seller Info - Simple */}
                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-gray-800 mb-1">{formData.fullName || 'Seller'}</h1>
                            <p className="text-gray-600 mb-2">{formData.email}</p>
                            {formData.businessName && (
                                <p className="text-gray-700 font-semibold">🏪 {formData.businessName}</p>
                            )}
                            <div className="flex items-center gap-2 mt-3 justify-center">
                                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                                    Seller Account
                                </span>
                                {sellerData?.created_at && (
                                    <span className="text-gray-500 text-sm">
                                        Since {new Date(sellerData.created_at).toLocaleDateString()}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="px-8 py-6">
                    {/* Messages */}
                    {message && (
                        <div className={`mb-6 p-4 rounded-lg ${
                            message.includes('✅') 
                                ? 'bg-green-50 border border-green-200 text-green-700' 
                                : 'bg-red-50 border border-red-200 text-red-700'
                        }`}>
                            {message}
                        </div>
                    )}

                    {/* Edit Button */}
                    {!isEditing && (
                        <div className="flex justify-end mb-6">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition shadow-md"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Edit Profile
                            </button>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            {/* Personal Information */}
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Personal Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Full Name */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                placeholder="Enter your full name"
                                            />
                                        ) : (
                                            <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-700">
                                                {formData.fullName || 'Not provided'}
                                            </p>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Email Address
                                        </label>
                                        <p className="px-4 py-3 bg-gray-100 rounded-lg text-gray-500">
                                            {formData.email}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                                    </div>

                                    {/* Phone Number */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Phone Number *
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="tel"
                                                name="phoneNumber"
                                                value={formData.phoneNumber}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                placeholder="+880 1XXX-XXXXXX"
                                            />
                                        ) : (
                                            <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-700">
                                                {formData.phoneNumber || 'Not provided'}
                                            </p>
                                        )}
                                    </div>

                                    {/* Business Type */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Business Type
                                        </label>
                                        {isEditing ? (
                                            <select
                                                name="businessType"
                                                value={formData.businessType}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            >
                                                {businessTypes.map(type => (
                                                    <option key={type} value={type.toLowerCase()}>
                                                        {type}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-700 capitalize">
                                                {formData.businessType || 'Not provided'}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Business Information */}
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Business Information</h3>
                                <div className="grid grid-cols-1 gap-6">
                                    {/* Business Name */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Business Name
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="businessName"
                                                value={formData.businessName}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                placeholder="Your business or farm name"
                                            />
                                        ) : (
                                            <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-700">
                                                {formData.businessName || 'Not provided'}
                                            </p>
                                        )}
                                    </div>

                                    {/* Bio */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            About Your Business
                                        </label>
                                        {isEditing ? (
                                            <textarea
                                                name="bio"
                                                value={formData.bio}
                                                onChange={handleInputChange}
                                                rows="4"
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                                                placeholder="Tell buyers about your business, products, and farming practices..."
                                            />
                                        ) : (
                                            <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-700 min-h-[100px]">
                                                {formData.bio || 'No description provided'}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Address Information */}
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Address Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Country */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Country *
                                        </label>
                                        {isEditing ? (
                                            <select
                                                name="country"
                                                value={formData.country}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            >
                                                <option value="">Select Country</option>
                                                {countries.map(country => (
                                                    <option key={country} value={country}>
                                                        {country}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-700">
                                                {formData.country || 'Not provided'}
                                            </p>
                                        )}
                                    </div>

                                    {/* District */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            District/State *
                                        </label>
                                        {isEditing ? (
                                            formData.country === 'Bangladesh' ? (
                                                <select
                                                    name="district"
                                                    value={formData.district}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                >
                                                    <option value="">Select District</option>
                                                    {bangladeshDistricts.map(district => (
                                                        <option key={district} value={district}>
                                                            {district}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <input
                                                    type="text"
                                                    name="district"
                                                    value={formData.district}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                    placeholder="Enter your district/state"
                                                />
                                            )
                                        ) : (
                                            <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-700">
                                                {formData.district || 'Not provided'}
                                            </p>
                                        )}
                                    </div>

                                    {/* Exact Address */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Exact Address *
                                        </label>
                                        {isEditing ? (
                                            <textarea
                                                name="exactAddress"
                                                value={formData.exactAddress}
                                                onChange={handleInputChange}
                                                required
                                                rows="2"
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                                                placeholder="House/Farm No, Village/Street, Area, Postal Code"
                                            />
                                        ) : (
                                            <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-700">
                                                {formData.exactAddress || 'Not provided'}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        {isEditing && (
                            <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                                    disabled={loading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md"
                                    disabled={loading || uploading}
                                >
                                    {loading && (
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    )}
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        )}
                    </form>

                    {/* Account Stats */}
                    {!isEditing && (
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-green-50 px-4 py-3 rounded-lg border border-green-200">
                                    <p className="text-sm text-gray-600">Account Status</p>
                                    <p className="font-semibold text-green-700">Active</p>
                                </div>
                                <div className="bg-indigo-50 px-4 py-3 rounded-lg border border-indigo-200">
                                    <p className="text-sm text-gray-600">Account Type</p>
                                    <p className="font-semibold text-indigo-700">Seller</p>
                                </div>
                                <div className="bg-purple-50 px-4 py-3 rounded-lg border border-purple-200">
                                    <p className="text-sm text-gray-600">Last Login</p>
                                    <p className="font-semibold text-purple-700 text-sm">
                                        {sellerData?.last_log_in ? new Date(sellerData.last_log_in).toLocaleDateString() : 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SellerProfile;
