import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../Context/LanguageContext/LanguageContext';

const accentStyles = {
  emerald: {
    border: 'border-emerald-100 hover:border-emerald-300',
    icon: 'bg-emerald-50',
    badge: 'bg-emerald-50 text-emerald-700',
  },
  sky: {
    border: 'border-sky-100 hover:border-sky-300',
    icon: 'bg-sky-50',
    badge: 'bg-sky-50 text-sky-700',
  },
  violet: {
    border: 'border-violet-100 hover:border-violet-300',
    icon: 'bg-violet-50',
    badge: 'bg-violet-50 text-violet-700',
  },
  rose: {
    border: 'border-rose-100 hover:border-rose-300',
    icon: 'bg-rose-50',
    badge: 'bg-rose-50 text-rose-700',
  },
  teal: {
    border: 'border-teal-100 hover:border-teal-300',
    icon: 'bg-teal-50',
    badge: 'bg-teal-50 text-teal-700',
  },
  amber: {
    border: 'border-amber-100 hover:border-amber-300',
    icon: 'bg-amber-50',
    badge: 'bg-amber-50 text-amber-700',
  },
  orange: {
    border: 'border-orange-100 hover:border-orange-300',
    icon: 'bg-orange-50',
    badge: 'bg-orange-50 text-orange-700',
  },
  green: {
    border: 'border-green-100 hover:border-green-300',
    icon: 'bg-green-50',
    badge: 'bg-green-50 text-green-700',
  },
};

const cardBase = 'group rounded-3xl border bg-white p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-500';

function FeatureCard({ title, description, accent, icon, stats, onClick, disabled = false }) {
  const styles = accentStyles[accent] || accentStyles.emerald;

  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      className={`${cardBase} ${styles.border} ${disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
      aria-disabled={disabled}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${styles.icon} text-2xl`}>
            {icon}
          </div>
          <h3 className="text-xl font-bold text-slate-900">{title}</h3>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${styles.badge}`}>
          {disabled ? 'Soon' : 'Open'}
        </span>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-600">{description}</p>

      <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
        {stats.map((stat) => (
          <span key={stat} className="rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500">
            {stat}
          </span>
        ))}
      </div>
    </button>
  );
}

const Features = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const text = language === 'bn'
    ? {
        title: 'আমাদের ফিচার',
        subtitle: 'কৃষক ও ক্রেতাদের জন্য তৈরি স্মার্ট টুলগুলো অন্বেষণ করুন',
        governmentTitle: 'সরকারি কৃষি সেবা',
        governmentDesc: 'আপনার সমস্যা অনুযায়ী সঠিক সরকারি বিভাগ, অফিস তথ্য, কাগজপত্র, সেবা এবং দিকনির্দেশনা খুঁজে নিন।',
        marketTitle: 'দৈনিক বাজারদর',
        marketDesc: 'বাংলাদেশের বিভিন্ন বাজারের রিয়েল-টাইম পণ্যের দাম দেখুন।',
        weatherTitle: 'আবহাওয়া পূর্বাভাস',
        weatherDesc: 'কৃষি সিদ্ধান্তের জন্য সঠিক আবহাওয়ার তথ্য ও পরামর্শ পান।',
        aiCropTitle: 'এআই ফসল পরিকল্পনা',
        aiCropDesc: 'মাটি, আবহাওয়া ও বাজার পরিস্থিতি দেখে ফসলের পরামর্শ নিন।',
        diseaseTitle: 'এআই রোগ নির্ণয়',
        diseaseDesc: 'ফসলের পাতার ছবি দিয়ে সম্ভাব্য রোগ ও করণীয় জেনে নিন।',
        calendarTitle: 'স্মার্ট ফসল ক্যালেন্ডার',
        calendarDesc: 'জেলা অনুযায়ী বপন, পরিচর্যা ও সংগ্রহের সময়সূচি দেখুন।',
        schemesTitle: 'সরকারি প্রকল্পসমূহ',
        schemesDesc: 'কৃষি ভর্তুকি, ঋণ, প্রশিক্ষণ, বিনামূল্যে বীজ ও সার সহায়তা সম্পর্কে জানুন।',
        communityTitle: 'কমিউনিটি সাপোর্ট',
        communityDesc: 'অন্য কৃষকদের সাথে যুক্ত হন, অভিজ্ঞতা ভাগ করুন এবং সাহায্য নিন।',
        assistantTitle: 'এআই সহকারী',
        assistantDesc: 'কৃষি প্রশ্নের দ্রুত উত্তর ও বিশেষজ্ঞ পরামর্শের জন্য এআই সহকারীর সাথে কথা বলুন।',
      }
    : {
        title: 'Our Features',
        subtitle: 'Explore smart tools built for farmers and buyers',
        governmentTitle: 'Government Agriculture Services',
        governmentDesc: 'Find the right department, office details, documents, services, and directions based on your problem.',
        marketTitle: 'Daily Market Prices',
        marketDesc: 'Check real-time commodity prices from major Bangladesh markets.',
        weatherTitle: 'Weather Forecasting',
        weatherDesc: 'Get accurate weather insights and farming recommendations.',
        aiCropTitle: 'AI Crop Planning',
        aiCropDesc: 'Get crop suggestions based on soil, weather, and market conditions.',
        diseaseTitle: 'AI Disease Detection',
        diseaseDesc: 'Upload a crop leaf image to identify likely diseases and next steps.',
        calendarTitle: 'Smart Crop Calendar',
        calendarDesc: 'See sowing, care, and harvesting schedules by district.',
        schemesTitle: 'Government Schemes',
        schemesDesc: 'Discover subsidies, loans, training, free seeds, and fertilizer support programs.',
        communityTitle: 'Community Support',
        communityDesc: 'Connect with fellow farmers, share experience, and get help.',
        assistantTitle: 'AI Assistant',
        assistantDesc: 'Chat with the AI assistant for quick farming answers and expert guidance.',
      };

  const handleMarketPricesClick = () => {
    sessionStorage.setItem('marketPricesAccess', 'true');
    navigate('/market-prices');
  };

  const featureCards = [
    { title: text.marketTitle, description: text.marketDesc, accent: 'emerald', icon: '📊', stats: ['70+ markets', '80+ products'], onClick: handleMarketPricesClick },
    { title: text.weatherTitle, description: text.weatherDesc, accent: 'sky', icon: '☁️', stats: ['5-day forecast', 'Farm tips'], onClick: () => navigate('/weather') },
    { title: text.aiCropTitle, description: text.aiCropDesc, accent: 'violet', icon: '🌱', stats: ['AI powered', 'Smart advice'], onClick: () => navigate('/ai-crop-planning') },
    { title: text.diseaseTitle, description: text.diseaseDesc, accent: 'rose', icon: '🧬', stats: ['Leaf scan', 'Instant result'], onClick: () => navigate('/ai-disease-detection') },
    { title: text.calendarTitle, description: text.calendarDesc, accent: 'teal', icon: '📅', stats: ['12 months', '50+ crops'], onClick: () => navigate('/crop-calendar') },
    { title: text.schemesTitle, description: text.schemesDesc, accent: 'amber', icon: '🏛️', stats: ['Subsidies', 'Loans & training'], onClick: () => navigate('/schemes') },
    { title: text.communityTitle, description: text.communityDesc, accent: 'amber', icon: '👥', stats: ['Peer support', 'Help & share'], onClick: () => navigate('/community') },
    { title: text.assistantTitle, description: text.assistantDesc, accent: 'orange', icon: '💬', stats: ['24/7 chat', 'Expert help'], disabled: true, onClick: () => {} },
    { title: text.governmentTitle, description: text.governmentDesc, accent: 'green', icon: '🏛️', stats: ['Department match', 'Office info'], onClick: () => navigate('/government-services') },
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.12),_transparent_34%),linear-gradient(180deg,_#f8fffb_0%,_#f7fafc_45%,_#ffffff_100%)] py-14">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">
            Agromart feature hub
          </span>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">{text.title}</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">{text.subtitle}</p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {featureCards.map((card) => (
            <FeatureCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;