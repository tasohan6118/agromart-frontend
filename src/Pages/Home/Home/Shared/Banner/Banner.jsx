import React from 'react';
import { Link } from 'react-router';
import { useLanguage } from '../../../../../Context/LanguageContext/LanguageContext';

const Banner = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'Welcome to AgroMart',
      subtitle: 'Connecting farmers with trusted agricultural support in real time',
      description: 'AgroMart helps farmers buy inputs, check market prices, access training, and grow their income from one simple platform.',
      button: 'View More',
    },
    bn: {
      title: 'অ্যাগ্রোমার্টে স্বাগতম',
      subtitle: 'বিশ্বস্ত কৃষি সহায়তা এবং বাজার তথ্য এখন রিয়েল টাইমে',
      description: 'অ্যাগ্রোমার্ট কৃষকদের জন্য একই প্ল্যাটফর্মে কৃষি উপকরণ কেনা, বাজারদর দেখা, প্রশিক্ষণ নেওয়া এবং আয় বাড়ানোর সুযোগ দেয়।',
      button: 'আরও দেখুন',
    },
  };

  const text = content[language];

  return (
    <div>
      <div
        className="hero lg:h-[500px] mt-4 mb-4 rounded-2xl"
        style={{
          background: 'linear-gradient(120deg, #f9fbe7, #e8f5e9, #fffde7, #e3f2fd)',
        }}
      >
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src="/public/images/hero(sohan).jpg"
            className="lg:max-w-4xl rounded-lg shadow-2xl h-[300px]"
            alt="AgroBanner"
          />
          <div>
            <h1 className="text-5xl font-bold pb-8">{text.title}</h1>
            <h2 className="text-3xl">{text.subtitle}</h2>
            <p className="py-6">
              {text.description}
            </p>
            <Link to="/about" className="btn btn-outline btn-primary btn-sm">
              {text.button}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;