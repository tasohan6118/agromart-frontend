import React from 'react';
import { useLanguage } from '../../../Context/LanguageContext/LanguageContext';

const AboutUs = () => {
    const { language } = useLanguage();

    const content = language === 'bn'
      ? {
          title: 'আমাদের সম্পর্কে',
          intro: 'অ্যাগ্রো মার্ট - চাঁপাইনবাবগঞ্জ থেকে শুরু হওয়া একটি ছাত্র-নেতৃত্বাধীন ডিজিটাল কৃষি উদ্যোগ। আমাদের মূল ফোকাস কৃষি বাজার প্ল্যাটফর্ম, যেখানে কৃষক ও ব্যবসায়ীরা ন্যায্য দামে সরাসরি লেনদেন করতে পারে এবং রিয়েল-টাইম বাজারদর দেখতে পারে।',
          goal: 'আমাদের লক্ষ্য',
          values: 'আমাদের মূল্যবোধ',
          activities: 'আমাদের কার্যক্রম ও প্রযুক্তি',
          future: 'ভবিষ্যৎ লক্ষ্য',
        }
      : {
          title: 'About Us',
          intro: 'Agro Mart is a student-led digital agriculture initiative that originated from ChapaiNawabganj. Our main focus is the Krishi Bazar platform, where farmers and traders can directly trade at fair prices and view real-time market rates.',
          goal: 'Our Goal',
          values: 'Our values',
          activities: 'Our Activities and Technology',
          future: 'Future Goal',
        };
    return (
        <div>
               <h1 className='flex justify-center font-bold text-3xl mb-4 mt-8 text-green-700'>{content.title}</h1>
               <p className='font-medium text-xl mb-8 px-8 text-center'>{content.intro}</p>

                 <div className='flex mb-2'>
                    <img className="w-[480px] h-[260px] ml-8 rounded-xl" src="/public/images/our-mission.webp" alt="" />
                      <div className='ml-16'>
                         <h1 className='mb-4 font-extrabold text-2xl text-green-700'>{content.goal}</h1>
                         <div className='space-y-3'>
                            <div className='flex items-start gap-3'>
                                <span className='text-green-600 text-xl mt-1'>✓</span>
                                <p className='text-gray-700 leading-relaxed'>Establishing stock houses in every upazila to make marketing convenient for farmers</p>
                            </div>
                            <div className='flex items-start gap-3'>
                                <span className='text-green-600 text-xl mt-1'>✓</span>
                                <p className='text-gray-700 leading-relaxed'>Ensuring fair prices for farmers by providing real-time market prices and demand-supply information</p>
                            </div>
                            <div className='flex items-start gap-3'>
                                <span className='text-green-600 text-xl mt-1'>✓</span>
                                <p className='text-gray-700 leading-relaxed'>Using our own data center and AI models to generate future price predictions, enabling farmers to make decisions in advance</p>
                            </div>
                         </div>
                      </div>
                 </div>
                <h1 className='font-extrabold text-2xl text-green-700 mb-8 mt-8 flex justify-center'>{content.values}</h1>
      <div className='flex gap-4'>
                   {/* card-1 */}
                 <div className='mb-4'>
                    <div className="card bg-base-300 w-80 shadow-sm">
  <div className="card-body">
    <h2 className="card-title text-green-700 flex items-center gap-3">
      <div className='bg-green-100 p-2 rounded-lg'>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      </div>
      Integrity
    </h2>
    <p className='text-gray-700'>By maintaining price transparency and accuracy of information, we create a trustworthy environment</p>
  </div>
</div>
                 </div>
                 {/* card-2 */}
                  <div className='mb-4'>
                    <div className="card bg-base-300 w-80 shadow-sm">
  <div className="card-body">
    <h2 className="card-title text-green-700 flex items-center gap-3">
      <div className='bg-green-100 p-2 rounded-lg'>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      </div>
      Innovation
    </h2>
    <p className='text-gray-700'>We are making agriculture easier and more modern through in-house solutions and our own AI technology.</p>
  </div>
</div>
                 </div>
                 {/* card-3 */}
                  <div className='mb-4'>
                    <div className="card bg-base-300 w-80 h-40 shadow-sm">
  <div className="card-body">
    <h2 className="card-title text-green-700 flex items-center gap-3">
      <div className='bg-green-100 p-2 rounded-lg'>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </div>
      Farmer-Centric Approach
    </h2>
    <p className='text-gray-700'>In all decision-making, the interests of farmers are given the highest priority.</p>
  </div>
</div>
                 </div>
                 {/* card-4 */}
                  <div className='mb-4'>
                    <div className="card bg-base-300 w-75 shadow-sm">
  <div className="card-body">
    <h2 className="card-title text-green-700 flex items-center gap-3">
      <div className='bg-green-100 p-2 rounded-lg'>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
      Collaboration
    </h2>
    <p className='text-gray-700'>We work together with local communities and partners to ensure sustainable development.</p>
  </div>
</div>
                 </div>
      </div>
      <h1 className='flex justify-center font-extrabold text-2xl text-green-700 mb-12 mt-8'>{content.activities}</h1>
      <div className='grid grid-cols-3 mb-4'>
        {/* card-1 */}
        <div className="card bg-base-300 w-96 shadow-sm mb-4 mr-2">
  <div className="card-body">
    <h2 className="card-title text-green-700 flex items-center gap-3">
      <div className='bg-green-100 p-2 rounded-lg'>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
      MarketPlace
    </h2>
    <p className='text-gray-700'>Separate login, bidding, and transaction systems for farmers and traders.</p>
    <div className="card-actions justify-end">
      
    </div>
  </div>

</div>
        {/*  card-2*/}
        <div className="card bg-base-300 w-96 shadow-sm mb-4">
  <div className="card-body">
    <h2 className="card-title text-green-700 flex items-center gap-3">
      <div className='bg-green-100 p-2 rounded-lg'>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      </div>
      Stock House (pilot)
    </h2>
    <p className='text-gray-700'>Fair prices and effective market access for small-scale farmers.</p>
    <div className="card-actions justify-end">
     
    </div>
  </div>
</div>
{/* card-3 */}
<div className="card bg-base-300 w-96 h-34 shadow-sm">
  <div className="card-body">
    <h2 className="card-title text-green-700 flex items-center gap-3">
      <div className='bg-green-100 p-2 rounded-lg'>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      </div>
      Live Market Price Updates
    </h2>
    <p className='text-gray-700'>Collecting real-time prices from agents and scrapers.</p>
    <div className="card-actions justify-end">
     
    </div>
  </div>
</div>
{/* card-4 */}
<div className="card bg-base-300 w-96 shadow-sm">
  <div className="card-body">
    <h2 className="card-title text-green-700 flex items-center gap-3">
      <div className='bg-green-100 p-2 rounded-lg'>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      </div>
      AI Price Prediction
    </h2>
    <p className='text-gray-700'>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div className="card-actions justify-end">
     
    </div>
  </div>
</div>
{/* card-5 */}
<div className="card bg-base-300 w-96 shadow-sm">
  <div className="card-body">
    <h2 className="card-title text-green-700 flex items-center gap-3">
      <div className='bg-green-100 p-2 rounded-lg'>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      </div>
      Data Center
    </h2>
    <p className='text-gray-700'>Storing all data and training models using a mini server.</p>
    <div className="card-actions justify-end">
     
    </div>
  </div>
</div>
      </div>

      <h1 className='flex justify-center font-extrabold text-2xl text-green-700 mb-8 mt-8'>{content.future}</h1>
      <div className='grid grid-cols-3 mb-4'>
        {/* card-1 */}
        <div className="card bg-base-300 w-96 shadow-sm">
  <div className="card-body">
    <h2 className="card-title text-green-700 flex items-center gap-3">
      <div className='bg-green-100 p-2 rounded-lg'>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      Expansion of Stock Houses
    </h2>
    <p className='text-gray-700'>Establishing stock houses in other sub-districts across the country.</p>
    <div className="card-actions justify-end">
    
    </div>
  </div>
</div>
{/* card-2 */}
<div className="card bg-base-300 w-96 shadow-sm">
  <div className="card-body">
    <h2 className="card-title text-green-700 flex items-center gap-3">
      <div className='bg-green-100 p-2 rounded-lg'>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      </div>
      Launching the mobile app
    </h2>
    <p className='text-gray-700'>A smart app to deliver services directly to the hands of farmers.</p>
    <div className="card-actions justify-end">
    
    </div>
  </div>
</div>
{/* card-3 */}
<div className="card bg-base-300 w-96 shadow-sm">
  <div className="card-body">
    <h2 className="card-title text-green-700 flex items-center gap-3">
      <div className='bg-green-100 p-2 rounded-lg'>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
      Partnership
    </h2>
    <p className='text-gray-700'>Ensuring fairness through public-private partnership.</p>
    <div className="card-actions justify-end">
    
    </div>
  </div>
</div>
      </div>
      
        </div>
    );
};

export default AboutUs;