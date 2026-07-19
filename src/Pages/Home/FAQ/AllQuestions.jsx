import React from 'react';
import { useLanguage } from '../../../Context/LanguageContext/LanguageContext';

const AllQuestions = () => {
    const { language } = useLanguage();

    const faqs = language === 'bn' ? [
        {
            id: 1,
            question: 'অ্যাগ্রোমার্ট কী?',
            answer: 'এই প্ল্যাটফর্মটি কৃষক ও ক্রেতাদের সরাসরি যুক্ত করে এবং কৃষিপণ্যের জন্য একটি বাজার তৈরি করে।'
        },
        {
            id:2,
            question:'অ্যাগ্রোমার্ট কি শুধু বড় কৃষকদের জন্য?',
            answer:'না, এটি ছোট থেকে বড় সব ধরনের কৃষকদের সহায়তার জন্য তৈরি।'
        },
        {
            id:3,
            question:'আমি কীভাবে এই প্ল্যাটফর্মে ফসল বিক্রি করবো?',
            answer:'অ্যাকাউন্ট তৈরি করে নিজের তথ্য পূরণ করুন। এরপর ফসলের ছবি, পরিমাণ এবং প্রত্যাশিত দাম দিয়ে পণ্য আপলোড করুন।'
        },
        {
            id:4,
            question:'বর্তমান বাজারদর কীভাবে দেখবো?',
            answer:'ওয়েবসাইটের লাইভ মার্কেট প্রাইস অংশে গিয়ে আপনার এলাকার বাজারদর দেখতে পারবেন।'
        },
        {
            id:5,
            question:'প্ল্যাটফর্মটি ব্যবহার করতে কোনো ফি লাগে?',
            answer:'সাধারণ কৃষকদের জন্য রেজিস্ট্রেশন ও ব্যবহার সম্পূর্ণ ফ্রি।'
        },
        {
            id:6,
            question:'ফোনে কিভাবে সেবা পাব?',
            answer:'কাস্টমার কেয়ারে কল করে আপনার তথ্য জানালে প্রতিনিধি আপনাকে সহায়তা করবে।'
        },
    ] : [
        {
            id: 1,
            question: "What is AgroMart?",
            answer: "This platform connects farmers directly with buyers, providing a marketplace for agricultural products."
        },
        {
            id:2,
            question:"Is AgroMart only for large farmers?",
            answer:"No, AgroMart is designed to support farmers of all sizes, from small-scale to large commercial operations."
        },
        {
            id:3,
            question:"Does AgroMart purchase agricultural products?",
            answer:"Yes, in special cases, we directly purchase crops from small farmers at fair prices through our own Stock House, and later resell them in wholesale or retail markets."
        },
        {
            id:4,
            question:"How can I sell crops on this platform?",
            answer:"To sell crops on AgroMart, you first need to create an account and complete your profile with basic information such as name, address, mobile number, and a photo. Then you can upload the crop details — including pictures, quantity, and expected price — and review offers from different buyers to select the most suitable one."
        },
        {
            id: 5,
            question: "How can I know the current market price?",
            answer: "You can view the current crop prices in your area by visiting the \"Live Market Price\" section on our website (www.AgroMart.com). We update the information daily based on local market rates."
        },
        {
            id: 6,
            question: "What types of crops can be sold on this platform?",
            answer: "All agricultural products can be sold on this platform, including rice, wheat, maize, potatoes, onions, tomatoes, vegetables, fruits, and spices."
        },
        {
            id: 7,
            question: "Is there a fee for using the platform?",
            answer: "Registration and usage are completely free for ordinary farmers. However, a nominal service fee may be charged for those conducting large-scale transactions under special services."
        },
        {
            id: 8,
            question: "Can I buy crops as a trader?",
            answer: "Absolutely! Traders can also register on KrishiPath Bazar and purchase crops from farmers either through a bidding process or by direct agreement."
        },
        {
            id: 9,
            question:"How will I receive payment after selling my crops?",
            answer:"The payment method is determined according to the agreement — cash, bKash, cash on delivery, or bank transfer. We ensure security and transparency in all types of transactions."
        },
        {
            id: 10,
            question:"Where can I get future crop price forecasts?",
            answer:"Through our AI-powered \"Price Forecast\" tool, you can get an idea of the demand and potential prices of different crops in various seasons. This information helps farmers make smart decisions."
        },
        {
            id: 11,
            question:"How can I reset my password?",
            answer:"To reset your password, go to the login page and click on the 'Forgot Password' link. Follow the instructions to receive a password reset link via email."
        },
        {
          id: 12,
          question:"What if I don’t have a smartphone? How can I use AgroMart?" ,
          answer:"We also provide SMS and phone call services. You can call our helpline to provide your sales information, and we will create your profile and handle the selling process on your behalf." 
        },
        {
            id: 13,
            question:"What should I do if I cannot upload photos online?",
            answer:"If you want, you can send photos through our local representative or \"Agriculture Assistant,\" or call our helpline for assistance. They will help take and upload the photos for you."
        },
        {
            id:14,
            question:"Can I get any advice on when to harvest my crops?",
            answer:"Yes, our agricultural calendar and AI-based forecasting service will help you determine the best time to harvest your crops and the optimal time to sell them in the market for a good price."
        },
        {
            id:15,
            question:"How can I receive services via phone?",
            answer:"You can call our customer care numbers (📞 01619880970) between 9 AM and 7 PM, and a representative will guide you through everything."
        }
    ];

    const title = language === 'bn' ? 'সব প্রশ্ন' : 'All Questions';

    return (
        <div className='max-w-4xl mx-auto py-8 px-4'>
            <h1 className='text-3xl font-bold text-center mb-6'>{title}</h1>
            <div className='space-y-4'>
                {faqs.map((faq) => (
                    <div key={faq.id} className="collapse collapse-arrow bg-base-200">
                        <input type="radio" name="faq-accordion" />
                        <div className="collapse-title text-xl font-medium">
                            {faq.question}
                        </div>
                        <div className="collapse-content">
                            <p>{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllQuestions;
