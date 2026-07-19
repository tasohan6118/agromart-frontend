// import React from 'react';
// import Banner from './Shared/Banner/Banner';
// import Services from '../../Services/Services';
// import { useLoaderData } from 'react-router';
// import FAQ from '../FAQ/FAQ';
// import AgroMart from '../Why Agromart/AgroMart';

// const Home = () => {
//     const data=useLoaderData();
//     console.log(data)
    
//     return (
//         <div>
//             <Banner></Banner>
//             <Services data={data}></Services>
//             <AgroMart></AgroMart>
//             <FAQ></FAQ>
//         </div>
//     );
// };

// export default Home;


// import React, { useState } from 'react';
// import Banner from './Shared/Banner/Banner';
// import Services from '../../Services/Services';
// import { useLoaderData } from 'react-router';
// import FAQ from '../FAQ/FAQ';
// import AgroMart from '../Why Agromart/AgroMart';
// import Chatbot from '../Components/Chatbot/Chatbot';

// const Home = () => {
//     const data = useLoaderData();
//     console.log(data);
    
//     // State to control chatbot visibility
//     const [isChatOpen, setIsChatOpen] = useState(false);

//     return (
//         <div>
//             <Banner></Banner>
//             <Services data={data}></Services>
//             <AgroMart></AgroMart>
//             <FAQ></FAQ>

//             {/* Floating Chat Button - Right Bottom */}
//             <button 
//                 onClick={() => setIsChatOpen(true)}
//                 style={{
//                     position: 'fixed',
//                     bottom: '30px',
//                     right: '30px',
//                     backgroundColor: '#2e7d32',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: '50px',
//                     padding: '16px 24px',
//                     fontSize: '16px',
//                     fontWeight: 'bold',
//                     cursor: 'pointer',
//                     boxShadow: '0 6px 25px rgba(46, 125, 50, 0.4)',
//                     zIndex: '999',
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '10px',
//                     transition: 'transform 0.3s, box-shadow 0.3s',
//                 }}
//                 onMouseEnter={(e) => {
//                     e.currentTarget.style.transform = 'scale(1.08)';
//                     e.currentTarget.style.boxShadow = '0 8px 35px rgba(46, 125, 50, 0.5)';
//                 }}
//                 onMouseLeave={(e) => {
//                     e.currentTarget.style.transform = 'scale(1)';
//                     e.currentTarget.style.boxShadow = '0 6px 25px rgba(46, 125, 50, 0.4)';
//                 }}
//             >
//                 <span style={{ fontSize: '24px' }}>🤖</span>
//                 Chat with AgriBot
//             </button>

//             {/* Chatbot Modal */}
//             {isChatOpen && <Chatbot onClose={() => setIsChatOpen(false)} />}
//         </div>
//     );
// };

// export default Home;

import React, { useState } from 'react';
import Banner from './Shared/Banner/Banner';
import Services from '../../Services/Services';
import { useLoaderData } from 'react-router';
import FAQ from '../FAQ/FAQ';
import AgroMart from '../Why Agromart/AgroMart';
import Chatbot from '../../../Components/Seller/Chatbot/Chatbot';  // ← FIXED

const Home = () => {
    const data = useLoaderData();
    console.log(data);
    
    const [isChatOpen, setIsChatOpen] = useState(false);

    return (
        <div>
            <Banner></Banner>
            <Services data={data}></Services>
            <AgroMart></AgroMart>
            <FAQ></FAQ>

            <button 
                onClick={() => setIsChatOpen(true)}
                style={{
                    position: 'fixed',
                    bottom: '30px',
                    right: '30px',
                    backgroundColor: '#2e7d32',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50px',
                    padding: '16px 24px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    boxShadow: '0 6px 25px rgba(46, 125, 50, 0.4)',
                    zIndex: '999',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.08)';
                    e.currentTarget.style.boxShadow = '0 8px 35px rgba(46, 125, 50, 0.5)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 6px 25px rgba(46, 125, 50, 0.4)';
                }}
            >
                <span style={{ fontSize: '24px' }}>🤖</span>
                Chat with AgriBot
            </button>

            {isChatOpen && <Chatbot onClose={() => setIsChatOpen(false)} />}
        </div>
    );
};

export default Home;
