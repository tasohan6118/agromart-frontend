import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({ show: false, type: '', message: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validatePhone = (phone) => {
        // Bangladesh phone number format: 01XXXXXXXXX (11 digits)
        const phoneRegex = /^01[0-9]{9}$/;
        return phoneRegex.test(phone);
    };

    const showNotification = (type, message) => {
        setNotification({ show: true, type, message });
        setTimeout(() => {
            setNotification({ show: false, type: '', message: '' });
        }, 5000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate phone number
        if (!validatePhone(formData.phone)) {
            showNotification('error', 'Please enter a valid Bangladesh phone number (01XXXXXXXXX)');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/contact-messages', {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                subject: formData.subject,
                message: formData.message
            });

            if (response.data.success) {
                showNotification('success', 'Message sent successfully! We will get back to you soon.');
                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: ''
                });
            }
        } catch (error) {
            console.error('Error sending message:', error);
            showNotification('error', error.response?.data?.message || 'Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='py-8'>
            <h1 className='text-center text-3xl font-bold mb-2'>Stay Connected</h1>
            <p className='text-center font-medium mb-8'>We'd love to hear from you. Get in touch with us through any of the channels below.</p>
            
            {/* Notification */}
            {notification.show && (
                <div className={`max-w-7xl mx-auto px-4 mb-4 ${notification.type === 'success' ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700'} border px-4 py-3 rounded relative`} role="alert">
                    <span className="block sm:inline">{notification.message}</span>
                </div>
            )}

            {/* main div for contact form and map */}
            <div className='max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8'>
                {/* contact form div */}
                <div className='bg-white p-6 rounded-lg shadow-md'>
                    <form onSubmit={handleSubmit} className="flex flex-col text-sm text-slate-800">
                        <h1 className="text-3xl font-bold mb-6 text-center">Let's Get In Touch.</h1>
                        
                        <div className="w-full">
                            <label htmlFor="name" className="font-medium">Full Name</label>
                            <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.311 16.406a9.64 9.64 0 0 0-4.748-4.158 5.938 5.938 0 1 0-7.125 0 9.64 9.64 0 0 0-4.749 4.158.937.937 0 1 0 1.623.938c1.416-2.447 3.916-3.906 6.688-3.906 2.773 0 5.273 1.46 6.689 3.906a.938.938 0 0 0 1.622-.938M5.938 7.5a4.063 4.063 0 1 1 8.125 0 4.063 4.063 0 0 1-8.125 0" fill="#475569"/>
                                </svg>
                                <input 
                                    type="text" 
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="h-full px-2 w-full outline-none bg-transparent" 
                                    placeholder="Enter your full name" 
                                    required 
                                />
                            </div>

                            <label htmlFor="email" className="font-medium mt-4">Email Address</label>
                            <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.5 3.438h-15a.937.937 0 0 0-.937.937V15a1.563 1.563 0 0 0 1.562 1.563h13.75A1.563 1.563 0 0 0 18.438 15V4.375a.94.94 0 0 0-.938-.937m-2.41 1.874L10 9.979 4.91 5.313zM3.438 14.688v-8.18l5.928 5.434a.937.937 0 0 0 1.268 0l5.929-5.435v8.182z" fill="#475569"/>
                                </svg>
                                <input 
                                    type="email" 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="h-full px-2 w-full outline-none bg-transparent" 
                                    placeholder="Enter your email address" 
                                    required 
                                />
                            </div>

                            <label htmlFor="phone" className="font-medium mt-4">Phone Number</label>
                            <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.5 15.833a2.5 2.5 0 0 1-2.5 2.5h-.417a13.75 13.75 0 0 1-11.916-11.916V5.833a2.5 2.5 0 0 1 2.5-2.5h1.666a.833.833 0 0 1 .834.834v3.333a.833.833 0 0 1-.834.833h-.833a10 10 0 0 0 7.5 7.5v-.833a.833.833 0 0 1 .833-.833h3.334a.833.833 0 0 1 .833.833z" fill="#475569"/>
                                </svg>
                                <input 
                                    type="tel" 
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="h-full px-2 w-full outline-none bg-transparent" 
                                    placeholder="01XXXXXXXXX" 
                                    pattern="01[0-9]{9}"
                                    maxLength="11"
                                    required 
                                />
                            </div>

                            <label htmlFor="subject" className="font-medium mt-4">Subject</label>
                            <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.833 3.333H4.167a1.667 1.667 0 0 0-1.667 1.667v10a1.667 1.667 0 0 0 1.667 1.667h11.666a1.667 1.667 0 0 0 1.667-1.667V5a1.667 1.667 0 0 0-1.667-1.667M5.833 7.5h8.334M5.833 10h8.334M5.833 12.5h5" stroke="#475569" strokeWidth="1.5" strokeLinecap="round"/>
                                </svg>
                                <input 
                                    type="text" 
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="h-full px-2 w-full outline-none bg-transparent" 
                                    placeholder="Enter subject" 
                                    required 
                                />
                            </div>

                            <label htmlFor="message" className="font-medium mt-4">Message</label>
                            <textarea 
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="4" 
                                className="w-full mt-2 p-3 bg-transparent border border-slate-300 rounded-lg resize-none outline-none focus:ring-2 focus-within:ring-indigo-400 transition-all" 
                                placeholder="Enter your message" 
                                required
                            ></textarea>
                            
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="flex items-center justify-center gap-1 mt-5 bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-300 disabled:cursor-not-allowed text-white py-2.5 w-full rounded-full transition"
                            >
                                {loading ? 'Sending...' : 'Submit Form'}
                                <svg className="mt-0.5" width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m18.038 10.663-5.625 5.625a.94.94 0 0 1-1.328-1.328l4.024-4.023H3.625a.938.938 0 0 1 0-1.875h11.484l-4.022-4.025a.94.94 0 0 1 1.328-1.328l5.625 5.625a.935.935 0 0 1-.002 1.33" fill="#fff"/>
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
                
                {/* Address and map section */}
                <div className='flex flex-col gap-6'>
                    <div className='bg-white p-6 rounded-lg shadow-md'>
                        <h1 className='font-bold text-2xl mb-4 text-indigo-600'>Address</h1>
                        <div className='space-y-2 text-gray-700'>
                            <p className='flex items-center gap-2'>
                                <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>01619880970</span>
                            </p>
                            <p className='flex items-center gap-2'>
                                <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span>contact@example.com</span>
                            </p>
                            <p className='flex items-start gap-2'>
                                <svg className="w-5 h-5 text-indigo-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>Chapai Nawabganj Sadar, Chapai Nawabganj</span>
                            </p>
                        </div>
                    </div>

                    <div className='bg-white p-4 rounded-lg shadow-md'>
                        <h1 className='font-bold text-2xl mb-4 text-indigo-600'>Our Location</h1>
                        
                        {/* Google Map Embed */}
                        <div className='w-full overflow-hidden rounded-lg'>
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115634.4362486885!2d88.20819667910157!3d24.59882559999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fc5e77dc51f9c9%3A0x66aa3ec867d6e93f!2sChapainawabganj!5e0!3m2!1sen!2sbd!4v1733058000000!5m2!1sen!2sbd" 
                                width="100%" 
                                height="300" 
                                style={{ border: 0 }}
                                allowFullScreen="" 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                                className='rounded-lg'
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
