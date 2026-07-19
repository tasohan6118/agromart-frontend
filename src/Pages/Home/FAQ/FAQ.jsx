import React from 'react';
import { Link } from 'react-router';
import { useLanguage } from '../../../Context/LanguageContext/LanguageContext';

const FAQ = () => {
    const { language } = useLanguage();
    const text = language === 'bn'
      ? { title: 'সচরাচর জিজ্ঞাসিত প্রশ্ন (FAQ)', subtitle: 'আমাদের সবচেয়ে বেশি জিজ্ঞাসিত প্রশ্নগুলো দেখুন।', view: 'প্রশ্ন দেখুন →' }
      : { title: 'Frequently Asked Questions (FAQ)', subtitle: 'Browse our most frequently asked questions.', view: 'View Questions →' };

    return (
        <div className='py-8'>
          <h1 className='flex justify-center font-extrabold text-2xl'>{text.title}</h1> 
          <p className='flex justify-center'>{text.subtitle}</p> 
          
          <div className='flex justify-end px-8'>
            <Link to="/all-questions" className='text-blue-600 hover:underline flex items-center gap-1'>
              {text.view}
            </Link>
          </div>
        </div>
    );
};

export default FAQ;