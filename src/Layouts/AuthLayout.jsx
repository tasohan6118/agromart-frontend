import React from 'react';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className="min-h-screen bg-base-200 flex flex-col">
            {/* Top logo */}
            <div className="p-3 flex items-center">
                <img
                    className="w-16 h-12"
                    src="/images/logo-remove.png"
                    alt="AgroMart Logo"
                />
                <h1 className="text-xl font-bold">AgroMart</h1>
            </div>

            {/* Main section */}
            <div className="flex flex-1 items-center justify-center px-8 gap-6">
                {/* Outlet Section */}
                <div className="flex items-center justify-center">
                    <Outlet />
                </div>

                {/* Image Section */}
                <div className="flex items-center justify-center">
                    <img
                        src="/images/images (3).jpeg"
                        className="rounded-lg shadow-2xl h-64 w-80"
                        alt="Auth Illustration"
                    />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
