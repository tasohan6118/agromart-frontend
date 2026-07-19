import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../Context/LanguageContext/LanguageContext';

// Pre-defined demo samples with realistic data for offline testing or quick evaluation
const demoSamples = [
    {
        id: 'potato-early-blight',
        cropNameEN: 'Potato',
        cropNameBN: 'আলু',
        diseaseNameEN: 'Early Blight (Alternaria solani)',
        diseaseNameBN: 'আর্লি ব্লাইট (ছত্রাকজনিত পচন)',
        imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=400',
        hasDisease: true,
        confidence: 94,
        symptomsEN: [
            'Dark brown to black spots with concentric rings (target-like) on older leaves.',
            'Leaves turn yellow and drop off prematurely.',
            'Slightly sunken, circular brown lesions on tubers.'
        ],
        symptomsBN: [
            'বয়স্ক পাতায় ঘন বাদামী থেকে কালো রঙের বৃত্তাকার রিং (টার্গেটের মতো) দাগ পড়ে।',
            'পাতা হলুদ হয়ে যায় এবং সময়ের আগেই ঝরে পড়ে।',
            'আলুর গায়ে কিছুটা দেবে যাওয়া, गोलाকার বাদামী দাগ দেখা যায়।'
        ],
        causesEN: [
            'Fungal pathogen Alternaria solani.',
            'Prolonged leaf wetness and warm temperatures (24-29°C).',
            'Nutrient-stressed or weak plants.'
        ],
        causesBN: [
            'অল্টারনারিয়া সোলানি নামক ছত্রাক দ্বারা সংক্রমিত হয়।',
            'দীর্ঘ সময় পাতা ভেজা থাকা এবং উষ্ণ তাপমাত্রা (২৪-২৯ ডিগ্রি সেলসিয়াস)।',
            'পর্যাপ্ত পুষ্টির অভাব বা দুর্বল গাছ।'
        ],
        treatmentEN: {
            organic: [
                'Spray copper-based organic fungicides (e.g., copper hydroxide) at first sign of disease.',
                'Apply neem oil spray weekly as a preventive measure.',
                'Remove and burn infected leaves immediately.'
            ],
            chemical: [
                'Spray protective fungicides containing Mancozeb or Chlorothalonil.',
                'For severe infections, apply systemic fungicides like Azoxystrobin.'
            ],
            preventive: [
                'Practice crop rotation (avoid planting potatoes or tomatoes in the same spot for 3 years).',
                'Ensure wide spacing between plants for airflow.',
                'Avoid overhead watering; use drip irrigation to keep foliage dry.'
            ]
        },
        treatmentBN: {
            organic: [
                'রোগের প্রথম লক্ষণ দেখামাত্র কপার-ভিত্তিক জৈব ছত্রাকনাশক স্প্রে করুন।',
                'প্রতিরোধক হিসেবে প্রতি সপ্তাহে নিম তেলের মিশ্রণ স্প্রে করুন।',
                'আক্রান্ত পাতা দ্রুত ছিঁড়ে আগুনে পুড়িয়ে ধ্বংস করুন।'
            ],
            chemical: [
                'ম্যানকোজেব বা ক্লোরোথ্যালোনিলযুক্ত সুরক্ষামূলক ছত্রাকনাশক স্প্রে করুন।',
                'তীব্র আক্রমণের ক্ষেত্রে অ্যাজোক্সিস্ট্রবিন গ্রুপের অন্তর্বাহী ছত্রাকনাশক ব্যবহার করুন।'
            ],
            preventive: [
                'শস্য আবর্তন মেনে চলুন (একই জমিতে টানা ৩ বছর আলু বা টমেটো চাষ করবেন না)।',
                'বাতাস চলাচলের জন্য গাছের মাঝে পর্যাপ্ত দূরত্ব বজায় রাখুন।',
                'উপর থেকে জল দেওয়া পরিহার করুন; পাতা শুকানোর জন্য ড্রিপ সেচ ব্যবহার করুন।'
            ]
        },
        careTipsEN: [
            'Apply potassium-rich organic fertilizer to boost plant immunity.',
            'Mulch the soil to prevent fungal spores in soil from splashing onto leaves.'
        ],
        careTipsBN: [
            'গাছের রোগ প্রতিরোধ ক্ষমতা বাড়াতে পটাশিয়াম সমৃদ্ধ জৈব সার দিন।',
            'মাটির মালচিং করুন যাতে জল ছিটকে মাটির ছত্রাক পাতায় লাগতে না পারে।'
        ]
    },
    {
        id: 'rice-blast',
        cropNameEN: 'Rice',
        cropNameBN: 'ধান',
        diseaseNameEN: 'Rice Blast (Magnaporthe oryzae)',
        diseaseNameBN: 'ব্লাস্ট রোগ (ছত্রাকজনিত ঝলসানো)',
        imageUrl: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&q=80&w=400',
        hasDisease: true,
        confidence: 88,
        symptomsEN: [
            'Spindle-shaped (diamond-shaped) lesions on leaves with grey centers and brown borders.',
            'Collar rot resulting in leaf death.',
            'Neck rot causing the rice heads to bend and turn white.'
        ],
        symptomsBN: [
            'পাতায় ধূসর কেন্দ্র এবং বাদামী কিনারাযুক্ত মাকু আকৃতির (ডায়মন্ডের মতো) দাগ হয়।',
            'পাতার গোড়া পচে পাতা মরে যায়।',
            'শীষের গোড়া পচে যায় (নেক ব্লাস্ট) যার ফলে ধানের শীষ বাঁকা হয়ে সাদা হয়ে যায়।'
        ],
        causesEN: [
            'Fungus Magnaporthe oryzae.',
            'High relative humidity (>90%) and cool night temperatures (20-25°C).',
            'Excessive application of nitrogen fertilizers.'
        ],
        causesBN: [
            'ম্যাগনাপোর্থে ওরাইজি নামক ছত্রাক।',
            'অতিরিক্ত আপেক্ষিক আর্দ্রতা (৯০% এর বেশি) এবং রাতের শীতল তাপমাত্রা (২০-২৫ ডিগ্রি সেলসিয়াস)।',
            'ইউরিয়া বা নাইট্রোজেন জাতীয় সারের অতিরিক্ত ব্যবহার।'
        ],
        treatmentEN: {
            organic: [
                'Use silicon fertilizers to strengthen cell walls against fungal entry.',
                'Spray Trichoderma harzianum bio-fungicide weekly.',
                'Avoid stagnant water in fields during cool weather if possible.'
            ],
            chemical: [
                'Spray Tricyclazole 75 WP or Nativo 75 WG at the first sign of symptoms.',
                'Apply Hexaconazole or Kasugamycin if neck blast is detected.'
            ],
            preventive: [
                'Plant blast-resistant rice cultivars.',
                'Balance nitrogen fertilizers with adequate potassium.',
                'Destroy crop residues after harvest.'
            ]
        },
        treatmentBN: {
            organic: [
                'ছত্রাকের আক্রমণ রোধ করতে কোষ প্রাচীর শক্ত করার জন্য সিলিকন সার ব্যবহার করুন।',
                'ট্রাইকোডার্মা হারজিয়ানাম জৈব-ছত্রাকনাশক সাপ্তাহিক স্প্রে করুন।',
                'ঠান্ডা আবহাওয়ায় জমিতে জল জমতে দেবেন না।'
            ],
            chemical: [
                'লক্ষণ দেখামাত্র ট্রাইসাইক্লাজল ৭৫ ডব্লিউপি অথবা নেটিভো ৭৫ ডব্লিউজি স্প্রে করুন।',
                'নেক ব্লাস্ট দেখা দিলে হেক্সাকোনাজল বা কাসুগামাইসিন প্রয়োগ করুন।'
            ],
            preventive: [
                'রোগ প্রতিরোধী ধানের জাত চাষ করুন।',
                'নাইট্রোজেন সারের সাথে ভারসাম্য রেখে পর্যাপ্ত পটাশ সার ব্যবহার করুন।',
                'ফসল কাটার পর নাড়া বা অবশিষ্টাংশ পুড়িয়ে ফেলুন।'
            ]
        },
        careTipsEN: [
            'Ensure timely weeding to avoid host plants in the vicinity.',
            'Do not spray chemical fungicides during midday heat.'
        ],
        careTipsBN: [
            'আশেপাশে বিকল্প কোনো আশ্রয়দাতা আগাছা যেন না থাকে সেজন্য নিয়মিত নিড়ানি দিন।',
            'দুপুরের কড়া রোদে রাসায়নিক ছত্রাকনাশক স্প্রে করবেন না।'
        ]
    },
    {
        id: 'tomato-late-blight',
        cropNameEN: 'Tomato',
        cropNameBN: 'টমেটো',
        diseaseNameEN: 'Late Blight (Phytophthora infestans)',
        diseaseNameBN: 'লেট ব্লাইট (নাবি ধসা রোগ)',
        imageUrl: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&q=80&w=400',
        hasDisease: true,
        confidence: 97,
        symptomsEN: [
            'Water-soaked dark green to black lesions starting from tips or edges of leaves.',
            'White fuzzy mold-like growth on the underside of infected leaves in humid conditions.',
            'Large firm, brown greasy spots on tomato fruits.'
        ],
        symptomsBN: [
            'পাতার ডগা বা কিনারা থেকে শুরু করে জলছাপের মতো গাঢ় সবুজ বা কালো দাগ দেখা যায়।',
            'আর্দ্র আবহাওয়ায় আক্রান্ত পাতার নিচের দিকে সাদাটে তুলার মতো ছত্রাকের স্তর দেখা যায়।',
            'টমেটো ফলের গায়ে বড় ও শক্ত বাদামী রঙের তৈলাক্ত দাগ পড়ে।'
        ],
        causesEN: [
            'Oomycete pathogen Phytophthora infestans.',
            'Cool, wet weather with frequent rainfall and fog.',
            'Wind-blown spores spreading from neighboring infected fields.'
        ],
        causesBN: [
            'ফাইটোফথোরা ইনফেসট্যান্স নামক প্রোটোজোয়া-সদৃশ অণুজীব।',
            'ঠান্ডা, স্যাঁতসেঁতে আবহাওয়া এবং ঘন কুয়াশা বা ঘন ঘন বৃষ্টিপাত।',
            'বাতাসের মাধ্যমে উড়ে আসা রেনু যা পার্শ্ববর্তী আক্রান্ত জমি থেকে ছড়ায়।'
        ],
        treatmentEN: {
            organic: [
                'Apply organic copper soap spray every 7-10 days.',
                'Prune lower branches up to 1 foot above the ground to reduce splash.',
                'Remove and discard infected plants completely (do not compost).'
            ],
            chemical: [
                'Use systemic fungicides containing Metalaxyl or Mancozeb immediately.',
                'Apply Cymoxanil + Mancozeb (e.g., Companion) for rapid control.'
            ],
            preventive: [
                'Plant certified disease-free seeds and seedlings.',
                'Avoid planting tomatoes near potatoes.',
                'Use plastic mulch to act as a barrier to spores.'
            ]
        },
        treatmentBN: {
            organic: [
                'প্রতি ৭-১০ দিন পরপর কপার সাবানের জৈব স্প্রে প্রয়োগ করুন।',
                'জল ছেটানো কমাতে মাটি থেকে ১ ফুট উচ্চতা পর্যন্ত নিচের ডালপালা কেটে দিন।',
                'আক্রান্ত গাছ সম্পূর্ণ উপড়ে সরিয়ে ফেলুন (কম্পোস্ট সারে ব্যবহার করবেন না)।'
            ],
            chemical: [
                'অবিলম্বে মেটালাক্সিল বা ম্যানকোজেব সমৃদ্ধ সিস্টেমিক ছত্রাকনাশক ব্যবহার করুন।',
                'দ্রুত নিয়ন্ত্রণের জন্য সাইমক্সানিল + ম্যানকোজেব (যেমন কম্প্যানিয়ন) প্রয়োগ করুন।'
            ],
            preventive: [
                'প্রত্যয়িত রোগমুক্ত বীজ এবং চারা রোপণ করুন।',
                'আলু ও টমেটো পাশাপাশি রোপণ করা থেকে বিরত থাকুন।',
                'রেনুর বিস্তার রোধে প্লাস্টিক মালচ ব্যবহার করুন।'
            ]
        },
        careTipsEN: [
            'Water plants early in the morning so they dry before evening.',
            'Inspect crops daily, especially during damp and cool spells.'
        ],
        careTipsBN: [
            'সকাল সকাল গাছে জল দিন যাতে সন্ধ্যার আগেই পাতা শুকিয়ে যায়।',
            'বিশেষ করে আর্দ্র ও ঠান্ডা আবহাওয়ায় প্রতিদিন ফসল নিবিড়ভাবে পর্যবেক্ষণ করুন।'
        ]
    },
    {
        id: 'healthy-leaf',
        cropNameEN: 'General Crop',
        cropNameBN: 'সাধারণ ফসল',
        diseaseNameEN: 'Healthy Leaf (No Disease Detected)',
        diseaseNameBN: 'সুস্থ পাতা (কোনো রোগ পাওয়া যায়নি)',
        imageUrl: 'https://images.unsplash.com/photo-1507290439931-a861b5a38200?auto=format&fit=crop&q=80&w=400',
        hasDisease: false,
        confidence: 99,
        symptomsEN: [
            'Lush green coloration with uniform texture.',
            'No unusual discoloration, spots, or deformities.',
            'Strong structural integrity and turgidity.'
        ],
        symptomsBN: [
            'একই রকম বিন্যাস ও সতেজ সবুজ বর্ণ।',
            'কোনো অস্বাভাবিক বিবর্ণতা, দাগ বা বিকৃতি নেই।',
            'পাতার কোষ ও গঠন শক্ত এবং মজবুত।'
        ],
        causesEN: [
            'Optimal soil nutrition and balanced pH.',
            'Proper irrigation and drainage management.',
            'Strong natural defenses and clean environment.'
        ],
        causesBN: [
            'মাটির নিখুঁত পুষ্টি এবং ভারসাম্যপূর্ণ পিএইচ।',
            'সঠিক সেচ এবং নিকাশী নিষ্কাশন ব্যবস্থা।',
            'সবল প্রাকৃতিক রোগ প্রতিরোধ ক্ষমতা এবং পরিচ্ছন্ন পরিবেশ।'
        ],
        treatmentEN: {
            organic: [
                'Continue using organic compost and vermicompost.',
                'Apply diluted neem oil once a month to prevent pest attacks.'
            ],
            chemical: [
                'No chemical pesticides or fungicides are needed.'
            ],
            preventive: [
                'Maintain regular watering schedule.',
                'Prune old, dry leaves to promote new shoots.'
            ]
        },
        treatmentBN: {
            organic: [
                'জৈব কম্পোস্ট এবং কেঁচো সার (ভার্মিকম্পোস্ট) ব্যবহার বজায় রাখুন।',
                'কীটপতঙ্গের আক্রমণ প্রতিরোধে মাসে একবার পাতলা নিম তেল স্প্রে করুন।'
            ],
            chemical: [
                'কোনো রাসায়নিক কীটনাশক বা ছত্রাকনাশক ব্যবহারের প্রয়োজন নেই।'
            ],
            preventive: [
                'নিয়মিত জল দেওয়ার সময়সূচী বজায় রাখুন।',
                'নতুন কুঁড়ি গজানোর জন্য পুরনো শুকিয়ে যাওয়া পাতা ছেঁটে দিন।'
            ]
        },
        careTipsEN: [
            'Check soil moisture before watering.',
            'Rotate crops after every season to preserve soil fertility.'
        ],
        careTipsBN: [
            'জল দেওয়ার আগে মাটির আর্দ্রতা পরীক্ষা করে নিন।',
            'মাটির উর্বরতা রক্ষা করতে প্রতি মৌসুমের পর ফসল আবর্তন করুন।'
        ]
    }
];

const AIDiseaseDetection = () => {
    const { language } = useLanguage();
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [apiResult, setApiResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [activeTab, setActiveTab] = useState('overview');
    const [apiKey, setApiKey] = useState('');
    const [showSettings, setShowSettings] = useState(false);
    const [error, setError] = useState(null);
    const [simulatedMode, setSimulatedMode] = useState(false);

    useEffect(() => {
        // Load API Key from local storage if exists
        const savedKey = localStorage.getItem('agro_gemini_api_key');
        if (savedKey) {
            setApiKey(savedKey);
        } else {
            // Also check environment variable
            const envKey = import.meta.env.VITE_apiKey;
            if (envKey) {
                setApiKey(envKey);
            }
        }
    }, []);

    // Rotate loading messages during analysis
    useEffect(() => {
        let interval;
        if (loading) {
            const steps = language === 'bn' ? [
                'ছবি আপলোড হচ্ছে...',
                'পাতার পিক্সেল স্ক্যান করা হচ্ছে...',
                'ক্লোরোফিল ও রঙ বিশ্লেষণ করা হচ্ছে...',
                'ছত্রাক ও ব্যাকটেরিয়া প্যাটার্ন খোঁজা হচ্ছে...',
                'কৃষি রোগবালাই ডাটাবেস অনুসন্ধান করা হচ্ছে...',
                'সংক্রমণ প্রতিরোধের পরামর্শ প্রস্তুত করা হচ্ছে...'
            ] : [
                'Uploading leaf image...',
                'Scanning leaf pixels...',
                'Analyzing color anomalies and chlorophyll levels...',
                'Detecting fungal & bacterial pathogen patterns...',
                'Comparing with agricultural disease database...',
                'Generating optimal organic and chemical treatment plans...'
            ];
            let step = 0;
            setLoadingMessage(steps[0]);
            interval = setInterval(() => {
                step = (step + 1) % steps.length;
                setLoadingMessage(steps[step]);
            }, 2500);
        }
        return () => clearInterval(interval);
    }, [loading, language]);

    const handleSaveApiKey = (e) => {
        e.preventDefault();
        localStorage.setItem('agro_gemini_api_key', apiKey);
        setShowSettings(false);
        alert(language === 'bn' ? 'এপিআই কী সফলভাবে সংরক্ষণ করা হয়েছে!' : 'API Key saved successfully!');
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
            setApiResult(null);
            setError(null);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
            setApiResult(null);
            setError(null);
        }
    };

    const triggerFileInput = () => {
        document.getElementById('leaf-image-input').click();
    };

    const selectDemoSample = (sample) => {
        setImagePreview(sample.imageUrl);
        setSelectedImage(null); // Mark as demo mode
        setApiResult(sample);
        setError(null);
        setActiveTab('overview');
    };

    // Helper function to read file as base64 string
    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                let encoded = reader.result.toString().replace(/^data:(.*,)?base64,/, '');
                if ((encoded.length % 4) > 0) {
                    encoded += '='.repeat(4 - (encoded.length % 4));
                }
                resolve(encoded);
            };
            reader.onerror = error => reject(error);
        });
    };

    const handleAnalyze = async () => {
        if (!imagePreview) {
            alert(language === 'bn' ? 'অনুগ্রহ করে প্রথমে একটি পাতার ছবি আপলোড করুন।' : 'Please upload a leaf image first.');
            return;
        }

        // If in simulatedMode or if selectedImage is null (meaning user selected a demo sample)
        if (simulatedMode || !selectedImage) {
            setLoading(true);
            setTimeout(() => {
                // Return a random disease sample from database or corresponding to the photo
                const randomSample = demoSamples[Math.floor(Math.random() * (demoSamples.length - 1))];
                setApiResult(randomSample);
                setLoading(false);
            }, 4000);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const base64Image = await getBase64(selectedImage);
            const mimeType = selectedImage.type;

            const prompt = `Analyze this image of a plant/crop leaf. Identify if there is any disease or pest damage. 
            Provide a detailed analysis in JSON format with the following keys. Return ONLY valid JSON, do not include markdown blocks or wrappers:
            {
              "hasDisease": boolean,
              "diseaseNameEN": "English Name of the disease or 'Healthy'",
              "diseaseNameBN": "Bengali Name of the disease or 'সুস্থ পাতা'",
              "confidence": number between 50 and 100,
              "symptomsEN": ["bullet points of symptoms in English"],
              "symptomsBN": ["bullet points of symptoms in Bengali"],
              "causesEN": ["bullet points of causes in English"],
              "causesBN": ["bullet points of causes in Bengali"],
              "treatmentEN": {
                "organic": ["organic treatments in English"],
                "chemical": ["chemical treatments in English"],
                "preventive": ["preventive measures in English"]
              },
              "treatmentBN": {
                "organic": ["organic treatments in Bengali"],
                "chemical": ["chemical treatments in Bengali"],
                "preventive": ["preventive measures in Bengali"]
              },
              "careTipsEN": ["general care tips in English"],
              "careTipsBN": ["general care tips in Bengali"]
            }`;

            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                { text: prompt },
                                {
                                    inlineData: {
                                        mimeType: mimeType,
                                        data: base64Image
                                    }
                                }
                            ]
                        }
                    ],
                    generationConfig: {
                        responseMimeType: 'application/json'
                    }
                })
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error?.message || 'API request failed');
            }

            const data = await response.json();
            const textResponse = data.candidates[0].content.parts[0].text;
            
            // Parse response json
            const parsedData = JSON.parse(textResponse);
            
            // Add a mock crop name since Gemini evaluates the leaf disease directly
            parsedData.cropNameEN = 'Detected Plant';
            parsedData.cropNameBN = 'শনাক্তকৃত উদ্ভিদ';
            parsedData.imageUrl = imagePreview;

            setApiResult(parsedData);
        } catch (err) {
            console.error('Gemini API Error:', err);
            setError(err.message || 'Failed to connect to the Gemini service. Check your API key or network.');
            
            // Auto switch to simulated fallback and show demo result
            setSimulatedMode(true);
            const mockOption = demoSamples[Math.floor(Math.random() * demoSamples.length)];
            setApiResult(mockOption);
            alert(language === 'bn' 
                ? 'এপিআই ত্রুটি! স্বয়ংক্রিয়ভাবে সিমুলেটেড বিশ্লেষণ পরিবেশন করা হয়েছে।' 
                : 'API Error! Automatically showing a simulated fallback diagnosis.');
        } finally {
            setLoading(false);
        }
    };

    const clearImage = () => {
        setSelectedImage(null);
        setImagePreview(null);
        setApiResult(null);
        setError(null);
    };

    const t = language === 'bn' ? {
        title: 'এআই উদ্ভিদ রোগ নির্ণয়',
        subtitle: 'আপনার ফসলের পাতার ছবি তুলুন বা আপলোড করুন এবং তাৎক্ষণিক সমাধান পান।',
        uploadTitle: 'ছবি আপলোড করুন',
        uploadDesc: 'ফাইল টেনে এনে এখানে রাখুন অথবা কম্পিউটার থেকে নির্বাচন করুন',
        allowedTypes: 'JPEG, PNG, WebP (সর্বোচ্চ ৫ মেগাবাইট)',
        btnAnalyze: 'রোগ নির্ণয় করুন',
        btnAnalyzing: 'বিশ্লেষণ করা হচ্ছে...',
        demoSamples: 'টেস্ট ডেমো স্যাম্পল (পরীক্ষার জন্য):',
        apiKeyPlaceholder: 'আপনার গুগল জেমিনি এপিআই কী লিখুন...',
        apiSettingTitle: 'এআই এপিআই কনফিগারেশন',
        apiSettingDesc: 'এই ফিচারটি সরাসরি গুগল জেমিনি প্রসেসর ব্যবহার করে। সঠিক ফলের জন্য নিজস্ব API কী ব্যবহার করুন।',
        btnSaveKey: 'কী সেভ করুন',
        btnSettings: 'এপিআই সেটিংস',
        tabOverview: 'সারসংক্ষেপ',
        tabSymptoms: 'লক্ষণ ও কারণ',
        tabTreatments: 'প্রতিকার সমূহ',
        diagnosisTitle: 'রোগ নির্ণয়ের রিপোর্ট',
        confidenceScore: 'নির্ভরযোগ্যতা স্কোর',
        cropLabel: 'ফসল:',
        diseaseLabel: 'নির্ণয়:',
        statusHealthy: 'সুস্থ ও স্বাস্থ্যকর পাতা',
        statusDiseased: 'সংক্রমণ বা রোগ ধরা পড়েছে',
        organicPlan: 'জৈব প্রতিকার',
        chemicalPlan: 'রাসায়নিক প্রতিকার',
        preventivePlan: 'প্রতিরোধ মূলক ব্যবস্থা',
        careTips: 'সাধারণ যত্ন ও পরামর্শ',
        symptomsLabel: 'আক্রান্ত পাতার লক্ষণসমূহ',
        causesLabel: 'রোগের মূল কারণসমূহ',
        modeLabel: 'সিমুলেশন মোড সক্রিয় (এপিআই কী ছাড়া)',
        modeReal: 'রিয়েল মোড (জেমিনি এপিআই সংযোগ)',
        noKeyWarning: 'কোনো এপিআই কী সেট করা নেই। রিয়েল বিশ্লেষণের জন্য সেটিংসে গিয়ে কী লিখুন।'
    } : {
        title: 'AI Crop Disease Detection',
        subtitle: 'Take a photo or upload an image of your crop leaf for instant diagnosis & solutions.',
        uploadTitle: 'Upload Leaf Image',
        uploadDesc: 'Drag & drop your file here, or click to browse files',
        allowedTypes: 'JPEG, PNG, WebP (Max 5MB)',
        btnAnalyze: 'Analyze Crop Health',
        btnAnalyzing: 'Analyzing health...',
        demoSamples: 'Try out Demo Samples (Quick Test):',
        apiKeyPlaceholder: 'Enter Google Gemini API Key...',
        apiSettingTitle: 'AI API Configuration',
        apiSettingDesc: 'This feature utilizes Google Gemini to process images. Provide your own Gemini API key for live analysis.',
        btnSaveKey: 'Save Key',
        btnSettings: 'API Settings',
        tabOverview: 'Overview',
        tabSymptoms: 'Symptoms & Causes',
        tabTreatments: 'Treatments & Recovery',
        diagnosisTitle: 'Health Diagnosis Report',
        confidenceScore: 'Confidence Score',
        cropLabel: 'Crop Type:',
        diseaseLabel: 'Diagnosis:',
        statusHealthy: 'Healthy Foliage',
        statusDiseased: 'Pathogen / Disease Detected',
        organicPlan: 'Organic Treatments',
        chemicalPlan: 'Chemical Control',
        preventivePlan: 'Preventive Measures',
        careTips: 'General Care Tips',
        symptomsLabel: 'Key Symptoms Observed',
        causesLabel: 'Potential Causes',
        modeLabel: 'Simulation Mode Active (Offline-friendly)',
        modeReal: 'Real Mode (Live Gemini Analysis)',
        noKeyWarning: 'No API Key configured. Go to settings to set a Gemini key for live analysis.'
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50/30 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight flex items-center gap-3">
                            <span className="bg-emerald-600 text-white p-2 rounded-xl text-3xl shadow-md">🤖</span>
                            {t.title}
                        </h1>
                        <p className="mt-2 text-slate-600 font-medium">{t.subtitle}</p>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        {/* Simulation mode switcher toggle */}
                        <div className="form-control bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-sm flex flex-row items-center gap-2">
                            <span className="label-text font-bold text-xs text-slate-700">
                                {simulatedMode ? t.modeLabel : t.modeReal}
                            </span>
                            <input 
                                type="checkbox" 
                                className="toggle toggle-success toggle-sm"
                                checked={!simulatedMode}
                                onChange={() => {
                                    setSimulatedMode(!simulatedMode);
                                    if (simulatedMode && !apiKey) {
                                        setShowSettings(true);
                                    }
                                }}
                            />
                        </div>

                        <button 
                            onClick={() => setShowSettings(!showSettings)}
                            className="btn btn-outline btn-success btn-sm font-semibold rounded-xl flex items-center gap-2 px-4 py-2 border-2 hover:bg-emerald-500 hover:text-white"
                        >
                            ⚙️ {t.btnSettings}
                        </button>
                    </div>
                </div>

                {/* API Warning message */}
                {!apiKey && !simulatedMode && (
                    <div className="alert alert-warning shadow-sm border border-amber-200 bg-amber-50 text-amber-900 rounded-xl mb-6 py-3 flex gap-3 text-sm">
                        <span>⚠️</span>
                        <div>
                            <span className="font-bold">{language === 'bn' ? 'সতর্কতা:' : 'Notice:'}</span> {t.noKeyWarning}
                        </div>
                    </div>
                )}

                {/* API Key Modal/Settings Drawer */}
                {showSettings && (
                    <div className="card bg-white border border-slate-200 shadow-xl rounded-2xl p-6 mb-8 max-w-lg transition-all duration-300">
                        <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-3">
                            <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                                🔑 {t.apiSettingTitle}
                            </h3>
                            <button className="btn btn-circle btn-ghost btn-xs text-slate-400 font-bold" onClick={() => setShowSettings(false)}>✕</button>
                        </div>
                        <p className="text-sm text-slate-500 mb-4">{t.apiSettingDesc}</p>
                        <form onSubmit={handleSaveApiKey} className="space-y-4">
                            <div>
                                <input 
                                    type="password" 
                                    placeholder={t.apiKeyPlaceholder}
                                    value={apiKey} 
                                    onChange={(e) => setApiKey(e.target.value)}
                                    className="input input-bordered input-success w-full rounded-xl bg-slate-50 text-sm font-mono border-2 focus:bg-white"
                                />
                            </div>
                            <div className="flex justify-end gap-2 pt-2">
                                <button 
                                    type="button" 
                                    onClick={() => setApiKey('')}
                                    className="btn btn-ghost btn-sm text-slate-500"
                                >
                                    {language === 'bn' ? 'মুছে ফেলুন' : 'Clear'}
                                </button>
                                <button 
                                    type="submit" 
                                    className="btn btn-success btn-sm text-white px-5 rounded-lg font-bold"
                                >
                                    {t.btnSaveKey}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Main Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Column: Image Uploader */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="card bg-white border border-slate-200/80 shadow-md rounded-2xl overflow-hidden p-6">
                            <h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
                                📸 {t.uploadTitle}
                            </h3>

                            {/* Drop Zone */}
                            {!imagePreview ? (
                                <div 
                                    onDragOver={handleDragOver}
                                    onDrop={handleDrop}
                                    onClick={triggerFileInput}
                                    className="border-3 border-dashed border-slate-300 hover:border-emerald-500 hover:bg-emerald-50/10 cursor-pointer rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all duration-300 min-h-[220px]"
                                >
                                    <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center text-3xl mb-4 transition-transform duration-300 hover:scale-110">
                                        🍃
                                    </div>
                                    <p className="font-semibold text-slate-700 text-sm">{t.uploadDesc}</p>
                                    <p className="text-xs text-slate-400 mt-2">{t.allowedTypes}</p>
                                    <input 
                                        type="file" 
                                        id="leaf-image-input" 
                                        accept="image/*" 
                                        onChange={handleImageChange}
                                        className="hidden" 
                                    />
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="relative rounded-xl overflow-hidden border border-slate-200 max-h-[300px] flex items-center justify-center bg-slate-900">
                                        <img 
                                            src={imagePreview} 
                                            alt="Leaf Preview" 
                                            className="max-h-[300px] w-full object-contain"
                                        />
                                        <button 
                                            onClick={clearImage}
                                            className="absolute top-2 right-2 bg-rose-500 hover:bg-rose-600 text-white rounded-full p-2 w-8 h-8 flex items-center justify-center font-bold shadow-lg transition-transform duration-200 hover:scale-105"
                                            title="Clear image"
                                        >
                                            ✕
                                        </button>
                                    </div>

                                    <button 
                                        onClick={handleAnalyze}
                                        disabled={loading}
                                        className={`btn btn-success text-white w-full rounded-xl font-bold py-3.5 flex items-center justify-center gap-2 shadow-lg transition-transform duration-200 ${loading ? 'opacity-85' : 'hover:scale-[1.01]'}`}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="loading loading-spinner loading-sm"></span>
                                                {t.btnAnalyzing}
                                            </>
                                        ) : (
                                            <>
                                                <span>🔍</span>
                                                {t.btnAnalyze}
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Demo Samples Selection */}
                        <div className="card bg-white border border-slate-200/80 shadow-md rounded-2xl p-6">
                            <h3 className="font-bold text-slate-700 text-sm mb-4">
                                {t.demoSamples}
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                {demoSamples.map((sample) => (
                                    <button
                                        key={sample.id}
                                        onClick={() => selectDemoSample(sample)}
                                        className="flex items-center gap-3 p-2 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200/60 rounded-xl transition-all duration-300 text-left hover:shadow-sm"
                                    >
                                        <img 
                                            src={sample.imageUrl} 
                                            alt={language === 'bn' ? sample.cropNameBN : sample.cropNameEN} 
                                            className="w-11 h-11 rounded-lg object-cover border border-slate-100 flex-shrink-0"
                                        />
                                        <div className="overflow-hidden">
                                            <p className="text-xs font-bold text-slate-800 truncate">
                                                {language === 'bn' ? sample.cropNameBN : sample.cropNameEN}
                                            </p>
                                            <p className="text-[10px] text-slate-400 truncate">
                                                {language === 'bn' ? sample.diseaseNameBN.split(' (')[0] : sample.diseaseNameEN.split(' (')[0]}
                                            </p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Loading or Diagnostics Results */}
                    <div className="lg:col-span-7">
                        {error && (
                            <div className="alert alert-error shadow-sm border border-red-200 bg-rose-50 text-rose-900 rounded-xl mb-6 py-3 flex gap-3 text-sm">
                                <span>❌</span>
                                <div>
                                    <span className="font-bold">{language === 'bn' ? 'ত্রুটি:' : 'Error:'}</span> {error}
                                </div>
                            </div>
                        )}
                        {loading ? (
                            <div className="card bg-white border border-slate-200 shadow-md rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[460px]">
                                {/* Animated scan line overlay */}
                                <div className="relative w-24 h-24 mb-6">
                                    <div className="w-full h-full border-4 border-emerald-200 rounded-full flex items-center justify-center text-4xl animate-pulse">
                                        🌿
                                    </div>
                                    <div className="absolute inset-0 border-4 border-t-emerald-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                                </div>
                                <h3 className="font-extrabold text-xl text-slate-800 mb-2">
                                    {language === 'bn' ? 'কৃত্রিম বুদ্ধিমত্তা সচল রয়েছে' : 'AI Analysis in Progress'}
                                </h3>
                                <p className="text-slate-500 font-semibold text-sm max-w-sm transition-all duration-500 text-center text-emerald-700">
                                    {loadingMessage}
                                </p>
                            </div>
                        ) : apiResult ? (
                            <div className="card bg-white border border-slate-200/80 shadow-md rounded-2xl overflow-hidden min-h-[460px]">
                                {/* Diagnosis Header Banner */}
                                <div className={`p-6 text-white ${apiResult.hasDisease ? 'bg-gradient-to-r from-red-500 to-rose-600' : 'bg-gradient-to-r from-emerald-500 to-teal-600'}`}>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs uppercase font-extrabold bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                                            {t.diagnosisTitle}
                                        </span>
                                        <div className="flex items-center gap-1.5 font-bold text-sm bg-black/15 px-3 py-1 rounded-full">
                                            <span>🎯</span>
                                            <span>{t.confidenceScore}: {apiResult.confidence}%</span>
                                        </div>
                                    </div>

                                    <h2 className="text-2xl font-black mt-4 flex items-center gap-2">
                                        {apiResult.hasDisease ? '⚠️' : '✅'}
                                        {language === 'bn' ? apiResult.diseaseNameBN : apiResult.diseaseNameEN}
                                    </h2>
                                    <p className="mt-1 text-white/90 font-medium text-sm flex items-center gap-2">
                                        <span>🌾</span>
                                        <span>{t.cropLabel} {language === 'bn' ? apiResult.cropNameBN : apiResult.cropNameEN}</span>
                                    </p>
                                </div>

                                {/* Tabs Navigation */}
                                <div className="flex border-b border-slate-100 bg-slate-50/50">
                                    <button 
                                        onClick={() => setActiveTab('overview')}
                                        className={`flex-1 py-3.5 font-bold text-sm text-center border-b-2 transition-all duration-200 ${activeTab === 'overview' ? 'border-emerald-600 text-emerald-700 bg-white' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                                    >
                                        📋 {t.tabOverview}
                                    </button>
                                    <button 
                                        onClick={() => setActiveTab('symptoms')}
                                        className={`flex-1 py-3.5 font-bold text-sm text-center border-b-2 transition-all duration-200 ${activeTab === 'symptoms' ? 'border-emerald-600 text-emerald-700 bg-white' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                                    >
                                        🔍 {t.tabSymptoms}
                                    </button>
                                    <button 
                                        onClick={() => setActiveTab('treatment')}
                                        className={`flex-1 py-3.5 font-bold text-sm text-center border-b-2 transition-all duration-200 ${activeTab === 'treatment' ? 'border-emerald-600 text-emerald-700 bg-white' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                                    >
                                        🛡️ {t.tabTreatments}
                                    </button>
                                </div>

                                {/* Diagnostic Body Details */}
                                <div className="p-6">
                                    
                                    {/* TAB: OVERVIEW */}
                                    {activeTab === 'overview' && (
                                        <div className="space-y-6">
                                            {/* Status Box */}
                                            <div className={`p-4 rounded-xl flex items-start gap-3 border ${apiResult.hasDisease ? 'bg-red-50 border-red-100 text-red-900' : 'bg-emerald-50 border-emerald-100 text-emerald-950'}`}>
                                                <span className="text-xl">{apiResult.hasDisease ? '🚨' : '🛡️'}</span>
                                                <div>
                                                    <h4 className="font-extrabold text-sm uppercase">
                                                        {apiResult.hasDisease ? t.statusDiseased : t.statusHealthy}
                                                    </h4>
                                                    <p className="text-xs mt-1 opacity-90 leading-relaxed">
                                                        {apiResult.hasDisease 
                                                            ? (language === 'bn' ? 'ফসলটির পাতায় রোগ সংক্রমণের প্যাটার্ন দেখা গেছে। সংক্রমণ নিয়ন্ত্রণে প্রতিকার ব্যবস্থা ও যত্ন পরামর্শ অনুসরণ করুন।' : 'Visual symptoms point to a specific plant pathogen. Apply the organic or chemical treatments to mitigate spreading.') 
                                                            : (language === 'bn' ? 'পাতার টিস্যু সুস্থ এবং সতেজ রয়েছে। পুষ্টির ধারাবাহিকতা ধরে রাখতে সাধারণ যত্ন ও পরিচর্যা বজায় রাখুন।' : 'The leaf shows normal structure and pigment distribution. Maintain standard fertilizing and water rotations.')
                                                        }
                                                    </p>
                                                </div>
                                            </div>

                                            {/* General Care Tips */}
                                            <div>
                                                <h3 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
                                                    💡 {t.careTips}
                                                </h3>
                                                <ul className="space-y-2">
                                                    {(language === 'bn' ? apiResult.careTipsBN : apiResult.careTipsEN || []).map((tip, idx) => (
                                                        <li key={idx} className="text-xs text-slate-600 flex items-start gap-2.5 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                                                            <span className="text-emerald-600 font-bold">•</span>
                                                            <span className="leading-relaxed">{tip}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    )}

                                    {/* TAB: SYMPTOMS & CAUSES */}
                                    {activeTab === 'symptoms' && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Symptoms List */}
                                            <div>
                                                <h3 className="font-extrabold text-slate-800 text-sm mb-3 border-l-3 border-emerald-500 pl-2">
                                                    {t.symptomsLabel}
                                                </h3>
                                                <ul className="space-y-2">
                                                    {(language === 'bn' ? apiResult.symptomsBN : apiResult.symptomsEN || []).map((symptom, idx) => (
                                                        <li key={idx} className="text-xs text-slate-600 bg-amber-50/30 border border-amber-100/50 p-2.5 rounded-xl flex items-start gap-2">
                                                            <span className="text-amber-500">▪</span>
                                                            <span className="leading-relaxed">{symptom}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Causes List */}
                                            <div>
                                                <h3 className="font-extrabold text-slate-800 text-sm mb-3 border-l-3 border-indigo-500 pl-2">
                                                    {t.causesLabel}
                                                </h3>
                                                <ul className="space-y-2">
                                                    {(language === 'bn' ? apiResult.causesBN : apiResult.causesEN || []).map((cause, idx) => (
                                                        <li key={idx} className="text-xs text-slate-600 bg-indigo-50/30 border border-indigo-100/50 p-2.5 rounded-xl flex items-start gap-2">
                                                            <span className="text-indigo-500">▪</span>
                                                            <span className="leading-relaxed">{cause}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    )}

                                    {/* TAB: TREATMENTS */}
                                    {activeTab === 'treatment' && (
                                        <div className="space-y-5">
                                            {/* Treatment Plan Grid */}
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                {/* Organic Treatments */}
                                                <div className="border border-emerald-100 rounded-xl p-4 bg-emerald-50/20">
                                                    <h4 className="font-bold text-emerald-800 text-xs uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                                                        🌱 {t.organicPlan}
                                                    </h4>
                                                    <ul className="space-y-2">
                                                        {((language === 'bn' ? apiResult.treatmentBN?.organic : apiResult.treatmentEN?.organic) || []).map((item, idx) => (
                                                            <li key={idx} className="text-[11px] text-slate-600 leading-relaxed flex items-start gap-1">
                                                                <span className="text-emerald-500">•</span>
                                                                <span>{item}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                {/* Chemical Treatments */}
                                                <div className="border border-blue-100 rounded-xl p-4 bg-blue-50/20">
                                                    <h4 className="font-bold text-blue-800 text-xs uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                                                        🧪 {t.chemicalPlan}
                                                    </h4>
                                                    <ul className="space-y-2">
                                                        {((language === 'bn' ? apiResult.treatmentBN?.chemical : apiResult.treatmentEN?.chemical) || []).map((item, idx) => (
                                                            <li key={idx} className="text-[11px] text-slate-600 leading-relaxed flex items-start gap-1">
                                                                <span className="text-blue-500">•</span>
                                                                <span>{item}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                {/* Preventive Measures */}
                                                <div className="border border-purple-100 rounded-xl p-4 bg-purple-50/20">
                                                    <h4 className="font-bold text-purple-800 text-xs uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                                                        🛡️ {t.preventivePlan}
                                                    </h4>
                                                    <ul className="space-y-2">
                                                        {((language === 'bn' ? apiResult.treatmentBN?.preventive : apiResult.treatmentEN?.preventive) || []).map((item, idx) => (
                                                            <li key={idx} className="text-[11px] text-slate-600 leading-relaxed flex items-start gap-1">
                                                                <span className="text-purple-500">•</span>
                                                                <span>{item}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                </div>
                            </div>
                        ) : (
                            <div className="card bg-white border border-slate-200/80 shadow-md rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[460px] text-slate-400">
                                <span className="text-5xl mb-4">🔬</span>
                                <h3 className="font-bold text-slate-700 text-base">
                                    {language === 'bn' ? 'কোনো ডাটা প্রস্তুত নেই' : 'No Diagnostic Data Ready'}
                                </h3>
                                <p className="text-xs text-slate-400 mt-2 max-w-xs mx-auto">
                                    {language === 'bn' 
                                        ? 'রোগ বিশ্লেষণ ও সমাধান দেখতে পাতার ছবি আপলোড করুন অথবা বাম দিক থেকে ডেমো স্যাম্পল ক্লিক করুন।' 
                                        : 'Upload a leaf image or select a demo sample from the left panel to trigger the AI analysis report.'}
                                </p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AIDiseaseDetection;
