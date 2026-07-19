import React from 'react';
import { useLanguage } from '../../../Context/LanguageContext/LanguageContext';

const AgroMart = () => {
    const { language } = useLanguage();

    const content = language === 'bn'
      ? {
          title: 'কেন অ্যাগ্রোমার্ট বেছে নেবেন',
          items: [
            'অ্যাগ্রোমার্ট শুধু তথ্য দেয় না, গ্রামীণ কৃষক সহজে বুঝতে পারেন এমনভাবে উপস্থাপন করে।',
            'বাজারদর, আবহাওয়ার আপডেট, পরামর্শ এবং সহায়তা সেবা - সব এক জায়গায়।',
            'স্থানীয় প্রতিনিধি, বাজার বিশ্লেষণ এবং সঠিক আপডেট একত্রে পাওয়া যায়।',
            'শুধু তথ্য নয়, বাস্তবসম্মত সিদ্ধান্ত নেওয়ার সুযোগও দেয়।',
            'এআই ভিত্তিক ফসলের দাম অনুমান, চার্ট-বট এবং আধুনিক ফিচার (শীঘ্রই)।',
            'বাংলাদেশের জন্য তৈরি - স্থানীয় ভাষা ও প্রেক্ষাপটে।',
          ],
        }
      : {
          title: 'Why Choose AgroMart',
          items: [
            'AgroMart not only provides information, but presents it in a way that even a rural farmer can easily understand.',
            'Market prices, weather updates, advice, and support services - all in one place.',
            'Integration of official farmer information: local representatives, market analysis, and accurate updates.',
            'Not just information - the opportunity to make practical, actionable decisions.',
            'AI-based crop price prediction, chart-bot, and other modern features (upcoming).',
            'Designed for Bangladesh - in the local language and in the local context.',
          ],
        };

    return (
        <div className='py-8 px-4'>
            <h1 className='text-center text-3xl font-bold mb-6'>{content.title}</h1>
            <div className='max-w-4xl mx-auto space-y-4'>
                {content.items.map((item) => (
                    <div key={item} className='flex items-start gap-3 bg-green-50 p-4 rounded-lg hover:shadow-md transition-shadow'>
                        <div className='bg-green-600 rounded-full p-1 mt-1 flex-shrink-0'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <p className='text-gray-700'>{item}</p>
                    </div>
                ))}


            </div>
            
            

        </div>
    );
};

export default AgroMart;