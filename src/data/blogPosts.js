export const BLOG_CATEGORIES = [
  { id: 'all', label: { en: 'All', bn: 'সব' }, icon: '📚' },
  { id: 'agriculture', label: { en: 'Agriculture', bn: 'কৃষি' }, icon: '🌱' },
  { id: 'finance', label: { en: 'Finance', bn: 'অর্থ' }, icon: '📈' },
  { id: 'technology', label: { en: 'Technology', bn: 'প্রযুক্তি' }, icon: '💻' },
  { id: 'success-stories', label: { en: 'Success Stories', bn: 'সাফল্যের গল্প' }, icon: '❤️' },
];

export const SEED_BLOG_POSTS = [
  {
    slug: 'modern-techniques-rice-cultivation-bangladesh',
    title: {
      en: 'Modern Techniques for Rice Cultivation in Bangladesh',
      bn: 'বাংলাদেশে ধান চাষের আধুনিক কৌশল',
    },
    excerpt: {
      en: 'Learn about the latest farming techniques that can boost your rice yield by up to 30%. We cover irrigation methods, seed selection, and pest management strategies.',
      bn: 'আপনার ধান উৎপাদন ৩০% পর্যন্ত বাড়াতে পারে এমন আধুনিক চাষাবাদ কৌশল সম্পর্কে জানুন। সেচ পদ্ধতি, বীজ নির্বাচন এবং পোকামাকড় নিয়ন্ত্রণ কৌশল কভার করা হয়েছে।',
    },
    category: 'agriculture',
    categoryLabel: { en: 'Agriculture Tips', bn: 'কৃষি পরামর্শ' },
    authorName: 'Dr. Abdul Karim',
    authorBio: {
      en: 'Agricultural scientist with 15 years of experience in rice cultivation research at BRRI.',
      bn: 'BRRI-তে ১৫ বছরের ধান চাষ গবেষণার অভিজ্ঞতাসম্পন্ন কৃষি বিজ্ঞানী।',
    },
    authorImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop',
    imageUrl: 'https://images.unsplash.com/photo-1574943329840-758a48c1be94?w=1200&h=600&fit=crop',
    readTime: 5,
    tags: ['Rice Farming', 'Irrigation', 'Pest Management', 'BRRI'],
    likes: 42,
    createdAt: '2026-01-10T08:00:00.000Z',
    sections: [
      {
        title: { en: 'Introduction to Modern Rice Farming', bn: 'আধুনিক ধান চাষের পরিচিতি' },
        content: {
          en: 'Rice is the staple food of Bangladesh, and improving rice cultivation methods is crucial for both food security and farmer livelihoods. With climate change and rising input costs, adopting modern techniques can significantly increase yields while reducing waste.',
          bn: 'ধান বাংলাদেশের প্রধান খাদ্য। খাদ্য নিরাপত্তা ও কৃষকের জীবিকার জন্য ধান চাষের পদ্ধতি উন্নত করা অত্যন্ত গুরুত্বপূর্ণ। জলবায়ু পরিবর্তন ও উৎপাদন খরচ বৃদ্ধির সময় আধুনিক কৌশল গ্রহণ উৎপাদন বাড়াতে এবং অপচয় কমাতে সাহায্য করে।',
        },
      },
      {
        title: { en: '1. Selecting High-Yield Varieties', bn: '১. উচ্চ ফলনশীল জাত নির্বাচন' },
        content: {
          en: 'Choosing the right rice variety is the foundation of a successful harvest. BRRI-developed varieties are specifically adapted to Bangladeshi conditions.',
          bn: 'সঠিক ধান জাত নির্বাচন সফল ফসলের ভিত্তি। BRRI-র উন্নীত জাতগুলো বাংলাদেশের পরিবেশের জন্য বিশেষভাবে উপযোগী।',
        },
        list: [
          { en: 'BRRI Dhan 28: High yield, suitable for Boro season', bn: 'BRRI ধান ২৮: উচ্চ ফলন, বোরো মৌসুমে উপযোগী' },
          { en: 'BRRI Dhan 29: Tolerant to salinity and drought', bn: 'BRRI ধান ২৯: লবণাক্ততা ও খরা সহনশীল' },
          { en: 'BRRI Dhan 64: Short duration, ideal for Aman season', bn: 'BRRI ধান ৬৪: স্বল্পমেয়াদী, আমন মৌসুমে আদর্শ' },
        ],
      },
      {
        title: { en: '2. Optimal Irrigation Practices', bn: '২. সর্বোত্তম সেচ পদ্ধতি' },
        content: {
          en: 'Alternate Wetting and Drying (AWD) is a water-saving technique that can reduce irrigation water use by 15-30% without compromising yield. Monitor water levels using a perforated pipe inserted into the field.',
          bn: 'Alternate Wetting and Drying (AWD) একটি জল সাশ্রয়ী কৌশল যা ফলন কম না করে ১৫-৩০% সেচ পানি সাশ্রয় করতে পারে। ক্ষেতে স্থাপিত ছিদ্রযুক্ত পাইপ দিয়ে জলের স্তর পর্যবেক্ষণ করুন।',
        },
      },
    ],
  },
  {
    slug: 'how-to-access-microfinance-loans-for-your-farm',
    title: {
      en: 'How to Access Microfinance Loans for Your Farm',
      bn: 'আপনার খামারের জন্য কীভাবে মাইক্রোফাইন্যান্স ঋণ পাবেন',
    },
    excerpt: {
      en: 'A step-by-step guide to applying for agricultural microfinance loans through PKSF, BRAC, and government schemes for smallholder farmers.',
      bn: 'ক্ষুদ্র কৃষকদের জন্য PKSF, BRAC এবং সরকারি প্রকল্পের মাধ্যমে কৃষি মাইক্রোফাইন্যান্স ঋণের জন্য আবেদন করার ধাপে ধাপে নির্দেশিকা।',
    },
    category: 'finance',
    categoryLabel: { en: 'Finance', bn: 'অর্থ' },
    authorName: 'Fatema Begum',
    authorBio: {
      en: 'Rural finance specialist helping farmers access credit and government subsidies across Bangladesh.',
      bn: 'বাংলাদেশ জুড়ে কৃষকদের ঋণ ও সরকারি ভর্তুকি পেতে সহায়তা করা গ্রামীণ অর্থ বিশেষজ্ঞ।',
    },
    authorImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=600&fit=crop',
    readTime: 4,
    tags: ['Microfinance', 'Loans', 'PKSF', 'Farm Credit'],
    likes: 28,
    createdAt: '2026-01-08T10:00:00.000Z',
    sections: [
      {
        title: { en: 'Understanding Agricultural Microfinance', bn: 'কৃষি মাইক্রোফাইন্যান্স বোঝা' },
        content: {
          en: 'Microfinance institutions offer small loans tailored for farmers who may not qualify for traditional bank credit. These loans typically range from ৳10,000 to ৳500,000 with flexible repayment aligned to harvest cycles.',
          bn: 'মাইক্রোফাইন্যান্স প্রতিষ্ঠানগুলো ক্ষুদ্র কৃষকদের জন্য বিশেষভাবে তৈরি ছোট ঋণ দেয় যারা সাধারণত ব্যাংক ঋণের যোগ্য নন। এই ঋণ সাধারণত ১০,০০০ থেকে ৫,০০,০০০ টাকা পর্যন্ত হয় এবং ফসল কাটার সময়ের সাথে সামঞ্জস্যপূর্ণ পরিশোধের সুবিধা থাকে।',
        },
      },
    ],
  },
  {
    slug: 'smart-gadgets-transforming-bangladesh-agriculture',
    title: {
      en: 'Smart Gadgets Transforming Bangladesh Agriculture',
      bn: 'বাংলাদেশের কৃষিকে বদলে দিচ্ছে স্মার্ট গ্যাজেট',
    },
    excerpt: {
      en: 'From soil sensors to drone-based crop monitoring, discover affordable smart farming tools that Bangladeshi farmers are adopting today.',
      bn: 'মাটি সেন্সর থেকে ড্রোন-ভিত্তিক ফসল পর্যবেক্ষণ—আজ বাংলাদেশি কৃষকরা যে সাশ্রয়ী স্মার্ট কৃষি সরঞ্জাম গ্রহণ করছেন তা জানুন।',
    },
    category: 'technology',
    categoryLabel: { en: 'Technology', bn: 'প্রযুক্তি' },
    authorName: 'Sarah Rahman',
    authorBio: {
      en: 'Agri-tech journalist covering digital innovation in South Asian farming communities.',
      bn: 'দক্ষিণ এশিয়ার কৃষি সম্প্রদায়ে ডিজিটাল উদ্ভাবন নিয়ে কাজ করা কৃষি-প্রযুক্তি সাংবাদিক।',
    },
    authorImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop',
    imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&h=600&fit=crop',
    readTime: 6,
    tags: ['Smart Farming', 'IoT', 'Drones', 'Agri-Tech'],
    likes: 35,
    createdAt: '2026-01-05T09:00:00.000Z',
    sections: [
      {
        title: { en: 'The Rise of Precision Agriculture', bn: 'নির্ভুল কৃষির উত্থান' },
        content: {
          en: 'Precision agriculture uses technology to observe, measure, and respond to crop variability. In Bangladesh, affordable soil moisture sensors and mobile apps are making this accessible to smallholder farmers for the first time.',
          bn: 'নির্ভুল কৃষি প্রযুক্তি ব্যবহার করে ফসলের পরিবর্তনশীলতা পর্যবেক্ষণ, পরিমাপ ও প্রতিক্রিয়া জানায়। বাংলাদেশে সাশ্রয়ী মাটির আর্দ্রতা সেন্সর ও মোবাইল অ্যাপ প্রথমবারের মতো ক্ষুদ্র কৃষকদের কাছে এটি সহজলভ্য করছে।',
        },
      },
    ],
  },
  {
    slug: 'from-debt-to-profit-a-farmers-success-story',
    title: {
      en: "From Debt to Profit: A Farmer's Success Story",
      bn: 'ঋণ থেকে লাভ: এক কৃষকের সাফল্যের গল্প',
    },
    excerpt: {
      en: 'How Rajshahi farmer Mohammad Ali turned his 2-acre plot into a profitable organic vegetable farm using AgroMart marketplace and community support.',
      bn: 'রাজশাহীর কৃষক মোহাম্মদ আলী কীভাবে AgroMart মার্কেটপ্লেস ও কমিউনিটি সহায়তায় তার ২ একর জমিকে লাভজনক জৈব সবজি খামারে রূপান্তরিত করেছেন।',
    },
    category: 'success-stories',
    categoryLabel: { en: 'Success Stories', bn: 'সাফল্যের গল্প' },
    authorName: 'AgroMart Team',
    authorBio: {
      en: 'Sharing inspiring stories from farmers across Bangladesh who are transforming their livelihoods through digital agriculture.',
      bn: 'ডিজিটাল কৃষির মাধ্যমে জীবিকা পরিবর্তন করছেন এমন বাংলাদেশের কৃষকদের অনুপ্রেরণামূলক গল্প শেয়ার করছি।',
    },
    authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    imageUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&h=600&fit=crop',
    readTime: 5,
    tags: ['Success Story', 'Organic Farming', 'Marketplace'],
    likes: 51,
    createdAt: '2025-12-28T11:00:00.000Z',
    sections: [
      {
        title: { en: 'Starting Over', bn: 'নতুন করে শুরু' },
        content: {
          en: 'In 2023, Mohammad Ali was struggling with debt from conventional rice farming. After attending a local agricultural training program, he switched to organic vegetables and listed his produce on AgroMart.',
          bn: '২০২৩ সালে মোহাম্মদ আলী ঐতিহ্যবাহী ধান চাষ থেকে ঋণের বোঝায় ছিলেন। স্থানীয় কৃষি প্রশিক্ষণে অংশ নেওয়ার পর তিনি জৈব সবজিতে স্থানান্তরিত হন এবং AgroMart-এ তার পণ্য তালিকাভুক্ত করেন।',
        },
      },
    ],
  },
];

export const SEED_BLOG_COMMENTS = [
  {
    slug: 'modern-techniques-rice-cultivation-bangladesh',
    authorName: 'Abdul Haque',
    authorEmail: 'abdul.haque@example.com',
    content: 'This article was very helpful for understanding modern farming techniques. Thank you AgroMart!',
    createdAt: '2026-01-12T14:00:00.000Z',
  },
  {
    slug: 'modern-techniques-rice-cultivation-bangladesh',
    authorName: 'Fatima Akter',
    authorEmail: 'fatima.akter@example.com',
    content: 'The BRRI variety recommendations are exactly what I needed for this Boro season.',
    createdAt: '2026-01-11T09:30:00.000Z',
  },
];

export const getLocalized = (value, language) => {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return value[language] || value.en || '';
};

export const formatBlogDate = (dateStr, language = 'en') => {
  const date = new Date(dateStr);
  return date.toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', {
    year: 'numeric',
    month: language === 'bn' ? 'long' : 'short',
    day: 'numeric',
  });
};

export const formatBlogDateLong = (dateStr, language = 'en') => {
  const date = new Date(dateStr);
  return date.toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
