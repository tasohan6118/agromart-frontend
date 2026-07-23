import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../Context/LanguageContext/LanguageContext';

const serviceCatalog = {
  seeds: {
    key: 'seeds',
    department: 'BADC',
    departmentName: 'Bangladesh Agricultural Development Corporation',
    officeName: 'Seed Distribution and Irrigation Office',
    address: 'Krishi Bhaban, Dhaka, Bangladesh',
    phone: '+880 2-8181234',
    email: 'seed@badc.gov.bd',
    website: 'www.badc.gov.bd',
    hours: 'Sun-Thu, 9:00 AM - 5:00 PM',
    responsible: 'Seed Supply & Irrigation Wing',
    services: ['Certified seed distribution', 'Seed quality guidance', 'Irrigation support', 'Subsidy information'],
    documents: ['NID', 'Farmer registration', 'Land papers', 'Passport photo'],
    notices: ['Seed availability updates', 'Application deadline notice', 'Subsidy announcement'],
    mapQuery: 'Bangladesh Agricultural Development Corporation Dhaka',
    pinText: 'BADC Office Marker',
    mapCaption: 'Use this preview to connect Google Maps later.',
  },
  soilTest: {
    key: 'soilTest',
    department: 'SRDI',
    departmentName: 'Soil Resource Development Institute',
    officeName: 'Soil Testing & Laboratory Desk',
    address: 'Farmgate, Dhaka, Bangladesh',
    phone: '+880 2-9123456',
    email: 'info@srdi.gov.bd',
    website: 'www.srdi.gov.bd',
    hours: 'Sun-Thu, 9:00 AM - 4:30 PM',
    responsible: 'Soil Analysis Unit',
    services: ['Soil nutrient testing', 'Fertilizer recommendation', 'Field sampling guidance', 'Test report issuance'],
    documents: ['NID', 'Farmer registration', 'Sample soil bag', 'Phone number'],
    notices: ['Test slot booking', 'Sample collection schedule', 'Report collection alert'],
    mapQuery: 'Soil Resource Development Institute Dhaka',
    pinText: 'SRDI Lab Marker',
    mapCaption: 'Laboratory preview for future map integration.',
  },
  livestock: {
    key: 'livestock',
    department: 'DLS',
    departmentName: 'Department of Livestock Services',
    officeName: 'Veterinary Support Office',
    address: 'Khamarbari, Dhaka, Bangladesh',
    phone: '+880 2-5512345',
    email: 'support@dls.gov.bd',
    website: 'www.dls.gov.bd',
    hours: 'Sun-Thu, 9:00 AM - 5:00 PM',
    responsible: 'Veterinary & Livestock Division',
    services: ['Vaccination support', 'Animal treatment advice', 'Feed guidance', 'Breeding assistance'],
    documents: ['NID', 'Farmer registration', 'Livestock count list', 'Passport photo'],
    notices: ['Vaccination camp dates', 'Disease warning bulletin', 'Emergency helpline notice'],
    mapQuery: 'Department of Livestock Services Bangladesh',
    pinText: 'DLS Office Marker',
    mapCaption: 'Veterinary support preview for later map wiring.',
  },
  fisheries: {
    key: 'fisheries',
    department: 'DoF',
    departmentName: 'Department of Fisheries',
    officeName: 'Fisheries Service Desk',
    address: 'Matshya Bhaban, Dhaka, Bangladesh',
    phone: '+880 2-9567890',
    email: 'service@fisheries.gov.bd',
    website: 'www.fisheries.gov.bd',
    hours: 'Sun-Thu, 9:00 AM - 5:00 PM',
    responsible: 'Aquaculture Support Wing',
    services: ['Fish farming advice', 'Pond management support', 'Feed suggestions', 'Stocking guidance'],
    documents: ['NID', 'Farmer registration', 'Pond ownership paper', 'Passport photo'],
    notices: ['Pond rehab notice', 'Fish fry distribution schedule', 'Training calendar'],
    mapQuery: 'Department of Fisheries Dhaka',
    pinText: 'DoF Office Marker',
    mapCaption: 'Fisheries desk preview for future map integration.',
  },
  loan: {
    key: 'loan',
    department: 'Agricultural Credit',
    departmentName: 'Bangladesh Krishi Bank Desk',
    officeName: 'Agricultural Loan Information Office',
    address: 'Motijheel, Dhaka, Bangladesh',
    phone: '+880 2-9560001',
    email: 'loan@krishibank.org.bd',
    website: 'www.krishibank.org.bd',
    hours: 'Sun-Thu, 10:00 AM - 4:00 PM',
    responsible: 'Agricultural Loan Unit',
    services: ['Loan information', 'Application support', 'Repayment schedule', 'Subsidy guidance'],
    documents: ['NID', 'Farmer registration', 'Land documents', 'Bank account'],
    notices: ['Loan window updates', 'Interest subsidy notice', 'Document verification alert'],
    mapQuery: 'Bangladesh Krishi Bank Dhaka',
    pinText: 'Loan Desk Marker',
    mapCaption: 'Credit desk preview for later backend map data.',
  },
  machinery: {
    key: 'machinery',
    department: 'DAE',
    departmentName: 'Department of Agricultural Extension',
    officeName: 'Machinery & Subsidy Counter',
    address: 'Khamarbari, Dhaka, Bangladesh',
    phone: '+880 2-9111222',
    email: 'machinery@dae.gov.bd',
    website: 'www.dae.gov.bd',
    hours: 'Sun-Thu, 9:00 AM - 5:00 PM',
    responsible: 'Mechanization Support Wing',
    services: ['Machinery subsidy', 'Equipment guidance', 'Operator training', 'Maintenance tips'],
    documents: ['NID', 'Farmer registration', 'Land papers', 'Passport photo'],
    notices: ['Subsidy application dates', 'Training schedule', 'Machine distribution notice'],
    mapQuery: 'Department of Agricultural Extension Bangladesh',
    pinText: 'DAE Machinery Marker',
    mapCaption: 'Mechanization desk preview for later integration.',
  },
  cropDisease: {
    key: 'cropDisease',
    department: 'DAE',
    departmentName: 'Plant Protection Wing, DAE',
    officeName: 'Crop Disease Support Desk',
    address: 'Khamarbari, Dhaka, Bangladesh',
    phone: '+880 2-9123999',
    email: 'plantprotection@dae.gov.bd',
    website: 'www.dae.gov.bd',
    hours: 'Sun-Thu, 9:00 AM - 5:00 PM',
    responsible: 'Plant Protection Wing',
    services: ['Disease diagnosis', 'Pest control advice', 'Spray schedule', 'Expert referral'],
    documents: ['Leaf photo', 'NID', 'Farmer registration', 'Field location'],
    notices: ['Pest outbreak alert', 'Treatment protocol', 'Spray safety guidance'],
    mapQuery: 'Plant Protection Wing DAE Dhaka',
    pinText: 'Plant Protection Marker',
    mapCaption: 'Disease desk preview until backend data arrives.',
  },
  storage: {
    key: 'storage',
    department: 'DAM',
    departmentName: 'Department of Agricultural Marketing',
    officeName: 'Storage & Market Support Office',
    address: 'Motijheel, Dhaka, Bangladesh',
    phone: '+880 2-9554455',
    email: 'storage@dam.gov.bd',
    website: 'www.dam.gov.bd',
    hours: 'Sun-Thu, 9:00 AM - 5:00 PM',
    responsible: 'Storage & Post-Harvest Wing',
    services: ['Storage guidance', 'Warehouse information', 'Post-harvest advice', 'Market linkage support'],
    documents: ['NID', 'Farmer registration', 'Stock details', 'Contact number'],
    notices: ['Warehouse vacancy notice', 'Storage fee update', 'Collection deadline'],
    mapQuery: 'Department of Agricultural Marketing Dhaka',
    pinText: 'DAM Office Marker',
    mapCaption: 'Storage office preview for the frontend flow.',
  },
  disaster: {
    key: 'disaster',
    department: 'DAE',
    departmentName: 'Disaster & Recovery Support Desk',
    officeName: 'Emergency Agriculture Help Desk',
    address: 'Khamarbari, Dhaka, Bangladesh',
    phone: '+880 2-9110888',
    email: 'disaster@dae.gov.bd',
    website: 'www.dae.gov.bd',
    hours: '24/7 hotline support',
    responsible: 'Disaster Recovery Cell',
    services: ['Damage assessment', 'Emergency support', 'Seed recovery help', 'Recovery guidance'],
    documents: ['NID', 'Damage photos', 'Farmer registration', 'Field address'],
    notices: ['Storm alert', 'Recovery scheme notice', 'Emergency hotline'],
    mapQuery: 'Department of Agricultural Extension Dhaka',
    pinText: 'Emergency Marker',
    mapCaption: 'Emergency support preview for future backend integration.',
  },
  training: {
    key: 'training',
    department: 'DAE',
    departmentName: 'Training Coordination Unit',
    officeName: 'Farmer Training Office',
    address: 'Khamarbari, Dhaka, Bangladesh',
    phone: '+880 2-9551122',
    email: 'training@dae.gov.bd',
    website: 'www.dae.gov.bd',
    hours: 'Sun-Thu, 9:00 AM - 5:00 PM',
    responsible: 'Training & Extension Unit',
    services: ['Government training', 'Demo field support', 'Certificate guidance', 'Extension advice'],
    documents: ['NID', 'Farmer registration', 'Passport photo', 'Phone number'],
    notices: ['Training batch notice', 'Registration deadline', 'Venue update'],
    mapQuery: 'Training Coordination Unit DAE Bangladesh',
    pinText: 'Training Office Marker',
    mapCaption: 'Training office preview for the frontend-only view.',
  },
};

const needOptions = [
  { key: 'seeds', emoji: '🌱' },
  { key: 'soilTest', emoji: '🧪' },
  { key: 'livestock', emoji: '🐄' },
  { key: 'fisheries', emoji: '🐟' },
  { key: 'loan', emoji: '💰' },
  { key: 'machinery', emoji: '🚜' },
  { key: 'cropDisease', emoji: '🌿' },
  { key: 'storage', emoji: '📦' },
  { key: 'disaster', emoji: '🌧️' },
  { key: 'training', emoji: '🎓' },
];

const GovernmentServices = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [selectedNeed, setSelectedNeed] = useState('seeds');

  const text = useMemo(() => {
    return language === 'bn'
      ? {
          eyebrow: 'AGRO MART • সরকারি কৃষি সেবা',
          title: 'Where Should I Go?',
          subtitle: 'আপনার সমস্যা বাছাই করুন, আর সিস্টেম আপনাকে সঠিক সরকারি বিভাগ, অফিস তথ্য, সেবা, কাগজপত্র এবং দিকনির্দেশনা দেখাবে।',
          selectTitle: 'আপনার প্রয়োজন নির্বাচন করুন',
          recommendationTitle: 'Agro Mart Recommendation Engine',
          officeTitle: 'সম্পূর্ণ অফিস তথ্য',
          servicesTitle: 'উপলব্ধ সেবা',
          docsTitle: 'প্রয়োজনীয় কাগজপত্র',
          mapTitle: 'ইন্টারেক্টিভ Google Map',
          extraTitle: 'অতিরিক্ত সহায়ক তথ্য',
          back: 'ফিচারে ফিরে যান',
          visit: 'অফিসে যাওয়ার আগে প্রস্তুতি',
          mapNote: 'এই মানচিত্রটি এখনো frontend preview; backend যুক্ত হলে real map data আসবে।',
          footer: 'Farmer visits the office and receives government agricultural service.',
          step1: 'সমস্যা নির্বাচন',
          step2: 'বিভাগ চিহ্নিত',
          step3: 'অফিস তথ্য',
          step4: 'সেবা ও কাগজপত্র',
          step5: 'অফিসে যাত্রা',
        }
      : {
          eyebrow: 'AGRO MART • Government Agriculture Services',
          title: 'Where Should I Go?',
          subtitle: 'Select your need or problem and the system will show the correct department, office information, services, documents, and directions.',
          selectTitle: 'Choose your need',
          recommendationTitle: 'Agro Mart Recommendation Engine',
          officeTitle: 'Complete Office Information',
          servicesTitle: 'Available Services',
          docsTitle: 'Required Documents',
          mapTitle: 'Interactive Google Map',
          extraTitle: 'Additional Helpful Information',
          back: 'Back to Features',
          visit: 'Prepare before visiting the office',
          mapNote: 'This map is a frontend preview for now; real map data can be connected later.',
          footer: 'Farmer visits the office and receives government agricultural service.',
          step1: 'Pick a problem',
          step2: 'Identify department',
          step3: 'View office details',
          step4: 'Check services and docs',
          step5: 'Visit the office',
        };
  }, [language]);

  const selected = serviceCatalog[selectedNeed];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.16),_transparent_30%),linear-gradient(180deg,_#f5fff8_0%,_#f7fafc_45%,_#ffffff_100%)] py-10">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-700">
              {text.eyebrow}
            </span>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">{text.title}</h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">{text.subtitle}</p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/features')}
            className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-emerald-300 hover:text-emerald-700"
          >
            {text.back}
          </button>
        </div>

        <div className="mt-8 grid gap-4 rounded-3xl border border-emerald-100 bg-white/80 p-5 shadow-sm backdrop-blur sm:grid-cols-5">
          {[text.step1, text.step2, text.step3, text.step4, text.step5].map((step, index) => (
            <div key={step} className="rounded-2xl bg-slate-50 p-4 text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                {index + 1}
              </div>
              <p className="mt-3 text-sm font-semibold text-slate-700">{step}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{text.selectTitle}</h2>
                <p className="mt-1 text-sm text-slate-500">{text.visit}</p>
              </div>
              <div className="rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-700">
                {selected.department}
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {needOptions.map((option) => {
                const item = serviceCatalog[option.key];
                const active = selectedNeed === option.key;

                return (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => setSelectedNeed(option.key)}
                    className={`rounded-2xl border p-4 text-left transition ${active ? 'border-emerald-500 bg-emerald-50 shadow-sm' : 'border-slate-200 bg-white hover:border-emerald-200 hover:bg-emerald-50/50'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-xl text-lg ${active ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
                        {option.emoji}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {language === 'bn' ? translateNeedLabel(option.key).bn : translateNeedLabel(option.key).en}
                        </p>
                        <p className="text-xs text-slate-500">{item.department}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-lime-50 p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-700">{text.recommendationTitle}</p>
                  <h3 className="mt-2 text-3xl font-black text-slate-900">
                    {selected.department} · {selected.departmentName}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                    {selected.officeName} is the best match for your current need. Use the office details below to prepare your visit.
                  </p>
                </div>
                <div className="rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-emerald-100">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">Responsible</p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">{selected.responsible}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
                  <h4 className="text-lg font-bold text-slate-900">{text.officeTitle}</h4>
                  <div className="mt-4 space-y-3 text-sm text-slate-600">
                    <p><span className="font-semibold text-slate-800">Office:</span> {selected.officeName}</p>
                    <p><span className="font-semibold text-slate-800">Address:</span> {selected.address}</p>
                    <p><span className="font-semibold text-slate-800">Phone:</span> {selected.phone}</p>
                    <p><span className="font-semibold text-slate-800">Email:</span> {selected.email}</p>
                    <p><span className="font-semibold text-slate-800">Website:</span> {selected.website}</p>
                    <p><span className="font-semibold text-slate-800">Hours:</span> {selected.hours}</p>
                  </div>
                </div>

                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
                  <h4 className="text-lg font-bold text-slate-900">{text.mapTitle}</h4>
                  <div className="mt-4 rounded-2xl border border-dashed border-emerald-300 bg-emerald-50 p-5">
                    <p className="text-sm font-semibold text-emerald-800">📍 {selected.pinText}</p>
                    <p className="mt-2 text-sm text-emerald-900/80">Current user location, directions, and distance can be connected in the backend later.</p>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selected.mapQuery)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
                    >
                      Get Directions
                    </a>
                  </div>
                  <p className="mt-3 text-xs leading-5 text-slate-500">{text.mapNote}</p>
                </div>
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900">{text.servicesTitle}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {selected.services.map((service) => (
                  <span key={service} className="rounded-full bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800">
                    ✓ {service}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900">{text.docsTitle}</h3>
              <ul className="mt-4 space-y-3">
                {selected.documents.map((document) => (
                  <li key={document} className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-700">📄</span>
                    {document}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900">{text.extraTitle}</h3>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                {selected.notices.map((notice) => (
                  <div key={notice} className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-3">
                    {notice}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-10 rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
          <p className="text-center text-sm font-medium text-slate-600">{text.footer}</p>
        </div>
      </div>
    </div>
  );
};

function translateNeedLabel(key) {
  const labels = {
    seeds: { en: 'Seeds', bn: 'বীজ' },
    soilTest: { en: 'Soil Test', bn: 'মাটি পরীক্ষা' },
    livestock: { en: 'Livestock', bn: 'পশুপালন' },
    fisheries: { en: 'Fisheries', bn: 'মৎস্য' },
    loan: { en: 'Loan', bn: 'ঋণ' },
    machinery: { en: 'Machinery', bn: 'যন্ত্রপাতি' },
    cropDisease: { en: 'Crop Disease', bn: 'ফসলের রোগ' },
    storage: { en: 'Storage', bn: 'সংরক্ষণ' },
    disaster: { en: 'Disaster', bn: 'দুর্যোগ' },
    training: { en: 'Training', bn: 'প্রশিক্ষণ' },
  };

  return labels[key] || labels.seeds;
}

export default GovernmentServices;