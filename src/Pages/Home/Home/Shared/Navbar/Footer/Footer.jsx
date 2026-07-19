import React from 'react';
import { Link } from 'react-router';
import { useLanguage } from '../../../../../../Context/LanguageContext/LanguageContext';

const Footer = () => {
    const { language } = useLanguage();

    const content = {
      en: {
        tagline: 'Helping farmers understand tools, prices, and services in one place.',
        quickLinks: 'Quick Links',
        legal: 'Legal',
        contact: 'Contact',
        home: 'Home',
        about: 'About Us',
        services: 'Services',
        howItWorks: 'How it works',
        terms: 'Terms of services',
        privacy: 'Privacy policy',
        cookie: 'Cookie policy',
        dataProtection: 'Data Protection',
      },
      bn: {
        tagline: 'কৃষকদের জন্য টুল, বাজারদর এবং সেবা সহজ ভাষায় এক জায়গায়।',
        quickLinks: 'দ্রুত লিংক',
        legal: 'আইনি তথ্য',
        contact: 'যোগাযোগ',
        home: 'হোম',
        about: 'আমাদের সম্পর্কে',
        services: 'সেবা',
        howItWorks: 'কিভাবে কাজ করে',
        terms: 'সেবার শর্তাবলি',
        privacy: 'গোপনীয়তা নীতি',
        cookie: 'কুকি নীতি',
        dataProtection: 'ডাটা সুরক্ষা',
      },
    };

    const text = content[language];

    return (
        <div>
            <footer className="footer sm:footer-horizontal bg-[#0B1120] text-base-content p-10 rounded-2xl">
  <aside>
  <div className='flex'> 
    <img className="w-20 h-20" src="/public/images/logo-remove.png" alt="logo" />
   <h1 className='pt-8 font-bold text-xl -ml-4 text-white'><span className='text-green-400'>Agro</span>Mart</h1>
   </div>
    <p className='text-white'>
      AgroMart
      <br />
      {text.tagline}
    </p>
  </aside>
  <nav className='text-white'>
    <h6 className="footer-title">{text.quickLinks}</h6>
    <Link to="/" className="link link-hover">{text.home}</Link>
    <Link to="/about" className="link link-hover">{text.about}</Link>
    <Link to="/services" className="link link-hover">{text.services}</Link>
    <Link to="/how-it-works" className="link link-hover">{text.howItWorks}</Link>
  </nav>
 
  <nav className='text-white'>
    <h6 className="footer-title">{text.legal}</h6>
    <a className="link link-hover">{text.terms}</a>
    <a className="link link-hover">{text.privacy}</a>
    <a className="link link-hover">{text.cookie}</a>
    <a className="link link-hover">{text.dataProtection}</a>
    
  </nav>

   <nav className='text-white'>
    <h6 className="footer-title">{text.contact}</h6>
    <a className="link link-hover">+8801752364895</a>
    <a className="link link-hover">tasnimahammedsohan@gmail.com</a>
    <a className="link link-hover">Pstu,Patuakhali,Bangladesh</a>
   
  </nav>
</footer>
        </div>
    );
};

export default Footer;