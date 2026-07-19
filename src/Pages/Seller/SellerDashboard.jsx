import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router';
import userAuth from '../../Hooks/userAuth';


const SellerDashboard = () => {
    const { logOut, user } = userAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logOut()
            .then(() => {
                console.log('Logged out successfully');
                navigate('/seller-login');
            })
            .catch(error => {
                console.error('Logout error:', error);
            });
    }

    const dashboardicon = (
        <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Zm16 14a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2ZM4 13a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6Zm16-2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6Z" />
        </svg>
    );

    const overviewicon = (
        <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M7.111 20A3.111 3.111 0 0 1 4 16.889v-12C4 4.398 4.398 4 4.889 4h4.444a.89.89 0 0 1 .89.889v12A3.111 3.111 0 0 1 7.11 20Zm0 0h12a.889.889 0 0 0 .889-.889v-4.444a.889.889 0 0 0-.889-.89h-4.389a.889.889 0 0 0-.62.253l-3.767 3.665a.933.933 0 0 0-.146.185c-.868 1.433-1.581 1.858-3.078 2.12Zm0-3.556h.009m7.933-10.927 3.143 3.143a.889.889 0 0 1 0 1.257l-7.974 7.974v-8.8l3.574-3.574a.889.889 0 0 1 1.257 0Z" />
        </svg>
    );

    const chaticon = (
        <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 9h5m3 0h2M7 12h2m3 0h5M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6.616a1 1 0 0 0-.67.257l-2.88 2.592A.5.5 0 0 1 8 18.477V17a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
        </svg>
    );

    const profileicon = (
        <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeWidth="2" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
    );

    const sidebarLinks = [
        { name: "Add Product", path: "add-product", icon: dashboardicon },
        { name: "Product List", path: "product-list", icon: overviewicon },
        { name: "Orders", path: "orders", icon: chaticon },
        { name: "Messages", path: "messages", icon: chaticon },
        { name: "My Profile", path: "profile", icon: profileicon },
    ];




    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300">
                <a className="flex items-center">
                    <img className="h-9 mr-2" src="/images/Logo.jpg" alt="Agromart Logo" />
                    <h2 className="mt-2">Agromart</h2>
                </a>
                <div className="flex items-center gap-5 text-gray-500">
                    <p>Hi! {user?.displayName || user?.email || 'Seller'}</p>
                    <button onClick={handleLogout} className='border rounded-full text-sm px-4 py-1 hover:bg-red-50 hover:text-red-600 hover:border-red-600 transition'>Logout</button>
                </div>
            </div>

            <div className="flex flex-1">
                <div className="md:w-64 w-16 border-r min-h-full text-base border-gray-300 pt-4 flex flex-col transition-all duration-300">
                    {sidebarLinks.map((item, index) => (
                        <NavLink to={item.path} key={index}
                            className={({ isActive }) =>
                                `flex items-center py-3 px-4 gap-3 
                                ${isActive ? "border-r-4 md:border-r-[6px] bg-indigo-500/10 border-indigo-500 text-indigo-500"
                                    : "hover:bg-gray-100/90 border-white text-gray-700"
                                }`
                            }
                        >
                            {item.icon}
                            <p className="md:block hidden text-center">{item.name}</p>
                        </NavLink>
                    ))}
                </div>

                {/* Main content area where child routes render */}
                <div className="flex-1 p-6 bg-gray-50">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};
export default SellerDashboard;
