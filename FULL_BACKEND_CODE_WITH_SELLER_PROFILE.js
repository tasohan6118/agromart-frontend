const express=require('express');
const cors=require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app=express();
const port= process.env.PORT || 5000;

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: function (req, file, cb) {
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'));
        }
    }
});

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:5174'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
// Serve static files from uploads directory with proper headers
app.use('/uploads', express.static(uploadsDir, {
    setHeaders: (res, path) => {
        res.set('Cross-Origin-Resource-Policy', 'cross-origin');
        res.set('Access-Control-Allow-Origin', '*');
    }
}));

const uri = `mongodb+srv://${process.env.DB_user}:${process.env.DB_PASS}@cluster0.jex3ft8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// ============ 365-DAY REAL MARKET SIMULATION ============

// Base reference prices for different seasons
const seasonalBasePrices = {
    'Potato': {
        'peak_harvest': { // Nov-Feb (high supply, low price)
            'Dhaka': 22, 'Chittagong': 20, 'Rajshahi': 18, 'Chapainawabganj': 16, 'Dinajpur': 19, 'default': 20
        },
        'lean_season': { // Jun-Sep (low supply, high price)
            'Dhaka': 38, 'Chittagong': 36, 'Rajshahi': 32, 'Chapainawabganj': 30, 'Dinajpur': 33, 'default': 35
        },
        'normal': { // Other months
            'Dhaka': 30, 'Chittagong': 28, 'Rajshahi': 25, 'Chapainawabganj': 23, 'Dinajpur': 26, 'default': 27
        }
    },
    'Onion': {
        'peak_harvest': {
            'Dhaka': 35, 'Chittagong': 33, 'Rajshahi': 30, 'Chapainawabganj': 28, 'Dinajpur': 29, 'default': 32
        },
        'lean_season': {
            'Dhaka': 65, 'Chittagong': 62, 'Rajshahi': 58, 'Chapainawabganj': 55, 'Dinajpur': 57, 'default': 60
        },
        'normal': {
            'Dhaka': 48, 'Chittagong': 46, 'Rajshahi': 42, 'Chapainawabganj': 40, 'Dinajpur': 41, 'default': 44
        }
    },
    'Rice': {
        'peak_harvest': {
            'Dhaka': 45, 'Chittagong': 43, 'Rajshahi': 40, 'Chapainawabganj': 38, 'Dinajpur': 39, 'default': 42
        },
        'lean_season': {
            'Dhaka': 65, 'Chittagong': 63, 'Rajshahi': 58, 'Chapainawabganj': 56, 'Dinajpur': 57, 'default': 60
        },
        'normal': {
            'Dhaka': 55, 'Chittagong': 53, 'Rajshahi': 48, 'Chapainawabganj': 46, 'Dinajpur': 47, 'default': 50
        }
    },
    'Tomato': {
        'peak_harvest': {
            'Dhaka': 20, 'Chittagong': 18, 'Rajshahi': 15, 'Chapainawabganj': 12, 'Dinajpur': 14, 'default': 16
        },
        'lean_season': {
            'Dhaka': 80, 'Chittagong': 75, 'Rajshahi': 70, 'Chapainawabganj': 65, 'Dinajpur': 68, 'default': 72
        },
        'normal': {
            'Dhaka': 40, 'Chittagong': 38, 'Rajshahi': 35, 'Chapainawabganj': 32, 'Dinajpur': 34, 'default': 36
        }
    },
    'default': {
        'peak_harvest': { 'default': 25 },
        'lean_season': { 'default': 45 },
        'normal': { 'default': 35 }
    }
};

// Real historical events that affect prices (based on Bangladesh agriculture)
const marketEvents = {
    '2024-01-15': { type: 'festival_demand', impact: 1.25, description: 'Poush Parbon increased demand' },
    '2024-02-21': { type: 'festival_demand', impact: 1.30, description: 'International Mother Language Day' },
    '2024-03-17': { type: 'festival_demand', impact: 1.20, description: 'Sheikh Mujib Birthday' },
    '2024-03-26': { type: 'festival_demand', impact: 1.15, description: 'Independence Day' },
    '2024-04-14': { type: 'festival_demand', impact: 1.40, description: 'Bengali New Year - High demand' },
    '2024-05-01': { type: 'holiday', impact: 1.10, description: 'May Day' },
    '2024-06-15': { type: 'monsoon_start', impact: 0.85, description: 'Monsoon season begins - supply chain issues' },
    '2024-08-15': { type: 'flood_risk', impact: 0.70, description: 'Flood season - production uncertainty' },
    '2024-09-06': { type: 'festival_demand', impact: 1.35, description: 'Eid-ul-Adha - High meat and vegetable demand' },
    '2024-10-03': { type: 'festival_demand', impact: 1.25, description: 'Durga Puja' },
    '2024-11-07': { type: 'festival_demand', impact: 1.20, description: 'Eid-e-Milad-un-Nabi' },
    '2024-12-16': { type: 'festival_demand', impact: 1.15, description: 'Victory Day' },
    '2024-12-25': { type: 'festival_demand', impact: 1.10, description: 'Christmas' }
};

// Weather patterns affecting agriculture
const weatherPatterns = {
    '01': { pattern: 'winter', impact: 1.15 }, // January - winter, lower production
    '02': { pattern: 'late_winter', impact: 1.10 },
    '03': { pattern: 'spring', impact: 1.00 }, // Spring - good production
    '04': { pattern: 'summer', impact: 0.95 }, // Summer - some heat stress
    '05': { pattern: 'pre_monsoon', impact: 0.90 },
    '06': { pattern: 'monsoon', impact: 0.85 }, // Monsoon - logistics issues
    '07': { pattern: 'monsoon', impact: 0.80 },
    '08': { pattern: 'monsoon', impact: 0.75 }, // Peak monsoon - flood risks
    '09': { pattern: 'post_monsoon', impact: 0.85 },
    '10': { pattern: 'autumn', impact: 0.95 }, // Autumn - good conditions
    '11': { pattern: 'late_autumn', impact: 1.05 },
    '12': { pattern: 'early_winter', impact: 1.10 } // Winter - lower supply
};

function getSeasonalPhase(date) {
    const month = date.getMonth() + 1; // 1-12
    if (month >= 11 || month <= 2) return 'peak_harvest';    // Nov-Feb
    if (month >= 6 && month <= 9) return 'lean_season';      // Jun-Sep
    return 'normal';                                         // Mar-May, Oct
}

function get365DayPrice(category, district, date) {
    const dateKey = date.toISOString().split('T')[0];
    const monthKey = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
    
    // 1. Get base price for current season
    const seasonalData = seasonalBasePrices[category] || seasonalBasePrices['default'];
    const season = getSeasonalPhase(date);
    const districtData = seasonalData[season][district] || seasonalData[season]['default'];
    let price = districtData;
    
    // 2. Apply weather patterns
    const weather = weatherPatterns[monthKey];
    price *= weather.impact;
    
    // 3. Apply specific market events
    if (marketEvents[dateKey]) {
        price *= marketEvents[dateKey].impact;
    }
    
    // 4. Day-of-week effect (markets closed on Friday)
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 5) { // Friday - limited market activity
        price *= 1.08; // 8% higher on Fridays
    }
    
    // 5. Realistic daily fluctuations (based on date hash for consistency)
    const dateHash = date.getTime() % 1000;
    const dailyFluctuation = 0.9 + (dateHash / 1000) * 0.2; // 10% daily variation
    price *= dailyFluctuation;
    
    return Math.round(price * 100) / 100;
}

// Get comprehensive market analysis
function getMarketAnalysis(category, district, date) {
    const currentPrice = get365DayPrice(category, district, date);
    
    // Calculate 7-day trend
    const pricesLastWeek = [];
    for (let i = 6; i >= 0; i--) {
        const pastDate = new Date(date);
        pastDate.setDate(pastDate.getDate() - i);
        pricesLastWeek.push(get365DayPrice(category, district, pastDate));
    }
    
    const trend = pricesLastWeek[6] - pricesLastWeek[0];
    const trendPercentage = ((trend / pricesLastWeek[0]) * 100).toFixed(1);
    
    return {
        currentPrice,
        trend: trend > 0 ? 'up' : trend < 0 ? 'down' : 'stable',
        trendAmount: Math.abs(trend).toFixed(2),
        trendPercentage: Math.abs(trendPercentage),
        weeklyHigh: Math.max(...pricesLastWeek).toFixed(2),
        weeklyLow: Math.min(...pricesLastWeek).toFixed(2)
    };
}

// Helper function to validate product data
function validateProductData(product) {
    const errors = [];
    
    if (!product.name || product.name.trim().length === 0) {
        errors.push('Product name is required');
    }
    if (!product.category || product.category.trim().length === 0) {
        errors.push('Category is required');
    }
    if (!product.price || isNaN(product.price) || product.price <= 0) {
        errors.push('Valid price is required');
    }
    if (product.offerPrice && (isNaN(product.offerPrice) || product.offerPrice < 0)) {
        errors.push('Invalid offer price');
    }
    if (!product.district || product.district.trim().length === 0) {
        errors.push('District is required');
    }
    if (!product.sellerEmail || !product.sellerEmail.includes('@')) {
        errors.push('Valid seller email is required');
    }
    
    return errors;
}

async function run() {
  try {
    await client.connect();

    const userCollection=client.db('final-year-project').collection('users');
    const sellerCollection=client.db('final-year-project').collection('sellers');
    const productCollection=client.db('final-year-project').collection('products');

    // ==================== USER AUTHENTICATION ====================
    app.post('/users',async(req,res)=>{
        const email=req.body.email;
        const userExists=await userCollection.findOne({email})
        if(userExists){
            return res.status(200).send({message:'user already exists',inserted:false});
        }
        const user=req.body;
        const result=await userCollection.insertOne(user);
        res.send(result);
    })

    // ==================== SELLER AUTHENTICATION ====================
    app.post('/sellers',async(req,res)=>{
        const email=req.body.email;
        const sellerExists=await sellerCollection.findOne({email})
        if(sellerExists){
            return res.status(200).send({message:'seller already exists',inserted:false});
        }
        const seller=req.body;
        const result=await sellerCollection.insertOne(seller);
        res.send(result);
    })

    // ==================== SELLER PROFILE ENDPOINTS (INDIVIDUAL ACCOUNTS) ====================
    
    // Get all sellers with their profile images
    app.get('/sellers', async(req, res) => {
        try {
            const { limit = 50, page = 1 } = req.query;
            const skip = (parseInt(page) - 1) * parseInt(limit);
            
            const [sellers, totalCount] = await Promise.all([
                sellerCollection.find({})
                    .project({
                        email: 1,
                        fullName: 1,
                        businessName: 1,
                        businessType: 1,
                        profileImage: 1,
                        country: 1,
                        district: 1,
                        created_at: 1,
                        bio: 1
                    })
                    .sort({ created_at: -1 })
                    .skip(skip)
                    .limit(parseInt(limit))
                    .toArray(),
                sellerCollection.countDocuments({})
            ]);
            
            console.log(`✅ Fetched ${sellers.length} sellers`);
            res.json({ 
                success: true,
                sellers,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalSellers: totalCount,
                    totalPages: Math.ceil(totalCount / parseInt(limit))
                }
            });
        } catch (error) {
            console.error('Error fetching all sellers:', error);
            res.status(500).json({ 
                success: false,
                message: 'Failed to fetch sellers',
                error: error.message 
            });
        }
    });
    
    // Get seller profile by email - INDIVIDUAL ACCOUNT ACCESS
    app.get('/sellers/:email', async(req, res) => {
        try {
            const email = req.params.email;
            const seller = await sellerCollection.findOne({ email });
            
            if (seller) {
                // Update last access time
                await sellerCollection.updateOne(
                    { email },
                    { $set: { last_log_in: new Date().toISOString() } }
                );
                
                console.log(`✅ Seller profile accessed: ${email}`);
                res.json({ 
                    success: true,
                    ...seller 
                });
            } else {
                res.status(404).json({ 
                    message: 'Seller profile not found', 
                    success: false 
                });
            }
        } catch (error) {
            console.error('Error fetching seller profile:', error);
            res.status(500).json({ 
                success: false,
                message: 'Failed to fetch seller profile',
                error: error.message 
            });
        }
    });

    // Update seller profile - INDIVIDUAL ACCOUNT UPDATE
    app.put('/sellers/:email', async(req, res) => {
        try {
            const email = req.params.email;
            const updates = req.body;
            
            // Check if seller exists
            const existingSeller = await sellerCollection.findOne({ email });
            
            if (!existingSeller) {
                // Create new seller profile if doesn't exist
                const newSeller = {
                    ...updates,
                    email,
                    created_at: new Date().toISOString(),
                    last_log_in: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                };
                
                const result = await sellerCollection.insertOne(newSeller);
                console.log(`✅ New seller profile created: ${email}`);
                
                return res.json({ 
                    success: true,
                    message: 'Seller profile created successfully', 
                    seller: newSeller
                });
            }
            
            // Prepare update data (don't update email - it's the identifier)
            const updateData = {
                ...updates,
                updated_at: new Date().toISOString()
            };
            
            // Remove email from updates to prevent changing it
            delete updateData.email;
            
            // Update existing seller profile
            const result = await sellerCollection.updateOne(
                { email },
                { $set: updateData }
            );
            
            if (result.modifiedCount === 0) {
                return res.status(304).json({ 
                    success: false,
                    message: 'No changes made to profile'
                });
            }
            
            // Get updated seller data
            const updatedSeller = await sellerCollection.findOne({ email });
            
            console.log(`✅ Seller profile updated: ${email}`);
            res.json({ 
                success: true,
                message: 'Seller profile updated successfully', 
                seller: updatedSeller
            });
            
        } catch (error) {
            console.error('Error updating seller profile:', error);
            res.status(500).json({ 
                success: false,
                message: 'Failed to update seller profile',
                error: error.message 
            });
        }
    });

    // Delete seller account - INDIVIDUAL ACCOUNT DELETION (optional)
    app.delete('/sellers/:email', async(req, res) => {
        try {
            const email = req.params.email;
            
            // Check if seller has products
            const sellerProducts = await productCollection.countDocuments({ sellerEmail: email });
            
            if (sellerProducts > 0) {
                return res.status(400).json({ 
                    success: false,
                    message: `Cannot delete account. You have ${sellerProducts} active products. Please delete them first.`
                });
            }
            
            const result = await sellerCollection.deleteOne({ email });
            
            if (result.deletedCount === 0) {
                return res.status(404).json({ 
                    success: false,
                    message: 'Seller not found'
                });
            }
            
            console.log(`🗑️ Seller account deleted: ${email}`);
            res.json({ 
                success: true,
                message: 'Seller account deleted successfully'
            });
            
        } catch (error) {
            console.error('Error deleting seller:', error);
            res.status(500).json({ 
                success: false,
                message: 'Failed to delete seller account',
                error: error.message 
            });
        }
    });

    // ==================== PRODUCT ENDPOINTS ====================

    // Get all products with filtering and pagination
    app.get('/products', async(req, res) => {
        try {
            const { category, district, minPrice, maxPrice, status, search, page = 1, limit = 20 } = req.query;
            
            // Build filter query
            const filter = {};
            
            if (category) filter.category = category;
            if (district) filter.district = district;
            if (status) filter.status = status;
            
            if (minPrice || maxPrice) {
                filter.finalPrice = {};
                if (minPrice) filter.finalPrice.$gte = parseFloat(minPrice);
                if (maxPrice) filter.finalPrice.$lte = parseFloat(maxPrice);
            }
            
            // Search in name and description
            if (search) {
                filter.$or = [
                    { name: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } }
                ];
            }
            
            // Pagination
            const skip = (parseInt(page) - 1) * parseInt(limit);
            
            const [products, totalCount] = await Promise.all([
                productCollection.find(filter)
                    .sort({ postedDate: -1 })
                    .skip(skip)
                    .limit(parseInt(limit))
                    .toArray(),
                productCollection.countDocuments(filter)
            ]);
            
            res.send({ 
                success: true,
                products,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalProducts: totalCount,
                    totalPages: Math.ceil(totalCount / parseInt(limit))
                }
            });
        } catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).send({ 
                success: false,
                message: 'Failed to fetch products',
                error: error.message 
            });
        }
    })

    // Upload product image
    app.post('/upload', upload.single('image'), (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'No image file uploaded' 
                });
            }
            
            // Get the protocol and host from the request
            const protocol = req.protocol;
            const host = req.get('host');
            const imageUrl = `${protocol}://${host}/uploads/${req.file.filename}`;
            
            res.json({
                success: true,
                message: 'Image uploaded successfully',
                imageUrl: imageUrl,
                filename: req.file.filename,
                // Also provide relative path as fallback
                relativePath: `/uploads/${req.file.filename}`
            });
        } catch (error) {
            console.error('Upload error:', error);
            res.status(500).json({ 
                success: false, 
                message: 'Failed to upload image',
                error: error.message 
            });
        }
    });

    // Add new product (now supports imageUrl from upload)
    app.post('/products', async (req, res) => {
        try {
            const newProduct = req.body;
            
            // Validate required fields
            const validationErrors = validateProductData(newProduct);
            if (validationErrors.length > 0) {
                return res.status(400).send({ 
                    success: false,
                    message: 'Validation failed',
                    errors: validationErrors
                });
            }
            
            // Verify seller exists
            const sellerExists = await sellerCollection.findOne({ email: newProduct.sellerEmail });
            if (!sellerExists) {
                return res.status(404).send({ 
                    success: false,
                    message: 'Seller not found. Please register as a seller first.'
                });
            }
            
            // Add automatic fields
            newProduct.finalPrice = newProduct.offerPrice || newProduct.price;
            newProduct.postedDate = new Date().toISOString();
            newProduct.lastPriceUpdate = new Date().toISOString();
            newProduct.status = 'available';
            newProduct.views = 0;
            newProduct.inquiries = 0;
            newProduct.sellerName = sellerExists.name || sellerExists.fullName || 'Unknown Seller';
            newProduct.sellerPhone = sellerExists.phone || sellerExists.phoneNumber || '';

            console.log('Adding product:', { name: newProduct.name, seller: newProduct.sellerEmail });
            const result = await productCollection.insertOne(newProduct);
            
            // Send proper success response
            res.status(201).send({ 
                success: true,
                message: 'Product added successfully',
                inserted: true,
                productId: result.insertedId,
                product: { ...newProduct, _id: result.insertedId }
            });
        } catch (error) {
            console.error('Error adding product:', error);
            res.status(500).send({ 
                success: false,
                message: 'Failed to add product',
                error: error.message 
            });
        }
    });

    // Get single product by ID
    app.get('/products/:id', async (req, res) => {
        try {
            const productId = req.params.id;
            
            if (!ObjectId.isValid(productId)) {
                return res.status(400).send({ 
                    success: false,
                    message: 'Invalid product ID'
                });
            }
            
            const product = await productCollection.findOne({ _id: new ObjectId(productId) });
            
            if (!product) {
                return res.status(404).send({ 
                    success: false,
                    message: 'Product not found'
                });
            }
            
            // Increment view count
            await productCollection.updateOne(
                { _id: new ObjectId(productId) },
                { $inc: { views: 1 } }
            );
            
            res.send({ success: true, product });
        } catch (error) {
            console.error('Error fetching product:', error);
            res.status(500).send({ 
                success: false,
                message: 'Failed to fetch product',
                error: error.message 
            });
        }
    });

    // Get products by seller email
    app.get('/products/seller/:email', async (req, res) => {
        try {
            const sellerEmail = req.params.email;
            const products = await productCollection.find({ sellerEmail }).toArray();
            
            res.send({ 
                success: true,
                count: products.length,
                products 
            });
        } catch (error) {
            console.error('Error fetching seller products:', error);
            res.status(500).send({ 
                success: false,
                message: 'Failed to fetch seller products',
                error: error.message 
            });
        }
    });

    // Update product
    app.put('/products/:id', async (req, res) => {
        try {
            const productId = req.params.id;
            const updates = req.body;
            
            if (!ObjectId.isValid(productId)) {
                return res.status(400).send({ 
                    success: false,
                    message: 'Invalid product ID'
                });
            }
            
            // Verify product exists
            const existingProduct = await productCollection.findOne({ _id: new ObjectId(productId) });
            if (!existingProduct) {
                return res.status(404).send({ 
                    success: false,
                    message: 'Product not found'
                });
            }
            
            // Verify seller owns the product
            if (updates.sellerEmail && existingProduct.sellerEmail !== updates.sellerEmail) {
                return res.status(403).send({ 
                    success: false,
                    message: 'Not authorized to update this product'
                });
            }
            
            // Prepare update object
            const updateData = {};
            const allowedFields = ['name', 'description', 'category', 'price', 'offerPrice', 'district', 'imageUrl', 'status', 'quantity'];
            
            allowedFields.forEach(field => {
                if (updates[field] !== undefined) {
                    updateData[field] = updates[field];
                }
            });
            
            // Update finalPrice if price changed
            if (updates.price || updates.offerPrice) {
                updateData.finalPrice = updates.offerPrice || updates.price || existingProduct.price;
                updateData.lastPriceUpdate = new Date().toISOString();
            }
            
            const result = await productCollection.updateOne(
                { _id: new ObjectId(productId) },
                { $set: updateData }
            );
            
            if (result.modifiedCount === 0) {
                return res.status(304).send({ 
                    success: false,
                    message: 'No changes made to product'
                });
            }
            
            const updatedProduct = await productCollection.findOne({ _id: new ObjectId(productId) });
            
            res.send({ 
                success: true,
                message: 'Product updated successfully',
                product: updatedProduct
            });
        } catch (error) {
            console.error('Error updating product:', error);
            res.status(500).send({ 
                success: false,
                message: 'Failed to update product',
                error: error.message 
            });
        }
    });

    // Delete product
    app.delete('/products/:id', async (req, res) => {
        try {
            const productId = req.params.id;
            const { sellerEmail } = req.body;
            
            if (!ObjectId.isValid(productId)) {
                return res.status(400).send({ 
                    success: false,
                    message: 'Invalid product ID'
                });
            }
            
            // Verify product exists and seller owns it
            const product = await productCollection.findOne({ _id: new ObjectId(productId) });
            if (!product) {
                return res.status(404).send({ 
                    success: false,
                    message: 'Product not found'
                });
            }
            
            if (product.sellerEmail !== sellerEmail) {
                return res.status(403).send({ 
                    success: false,
                    message: 'Not authorized to delete this product'
                });
            }
            
            // Delete the product image if it exists
            if (product.imageUrl && product.imageUrl.includes('/uploads/')) {
                const filename = product.imageUrl.split('/uploads/')[1];
                const imagePath = path.join(uploadsDir, filename);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                    console.log('Deleted image:', filename);
                }
            }
            
            const result = await productCollection.deleteOne({ _id: new ObjectId(productId) });
            
            res.send({ 
                success: true,
                message: 'Product deleted successfully',
                deletedCount: result.deletedCount
            });
        } catch (error) {
            console.error('Error deleting product:', error);
            res.status(500).send({ 
                success: false,
                message: 'Failed to delete product',
                error: error.message 
            });
        }
    });

    // ============ 365-DAY DYNAMIC PRICING API ============
    app.post('/api/price-suggestion', async (req, res) => {
        try {
            const { category, district, qualityGrade } = req.body;
            const today = new Date();
            
            console.log('365-Day Price suggestion requested:', { category, district, qualityGrade, date: today });

            // Get comprehensive market analysis
            const marketAnalysis = getMarketAnalysis(category, district, today);
            
            // Apply quality adjustments
            const qualityMultipliers = { 
                'A': 1.15, 'B': 1.00, 'C': 0.85
            };
            const qualityMultiplier = qualityMultipliers[qualityGrade] || 1.0;
            
            // Competitive pricing (5% below market)
            const suggestedPrice = (marketAnalysis.currentPrice * qualityMultiplier * 0.95).toFixed(2);
            
            // Get season information
            const season = getSeasonalPhase(today);
            const seasonNames = {
                'peak_harvest': 'Peak Harvest Season (Lower Prices)',
                'lean_season': 'Lean Season (Higher Prices)', 
                'normal': 'Normal Season'
            };
            
            res.json({
                success: true,
                data: {
                    suggestedPrice: parseFloat(suggestedPrice),
                    marketPrice: parseFloat(marketAnalysis.currentPrice.toFixed(2)),
                    qualityAdjustment: ((qualityMultiplier - 1) * 100).toFixed(0),
                    district: district,
                    category: category,
                    explanation: `Based on current ${district} market conditions with ${qualityGrade} quality`,
                    marketTrend: marketAnalysis.trend,
                    trendAmount: marketAnalysis.trendAmount,
                    trendPercentage: marketAnalysis.trendPercentage,
                    weeklyHigh: marketAnalysis.weeklyHigh,
                    weeklyLow: marketAnalysis.weeklyLow,
                    season: seasonNames[season],
                    date: today.toISOString().split('T')[0],
                    note: 'Realistic 365-day market simulation with seasonal patterns'
                }
            });

        } catch (error) {
            console.error('Price suggestion error:', error);
            res.status(500).json({
                success: false,
                message: 'Unable to fetch price suggestion'
            });
        }
    });

    // New API: Get 30-day price forecast
    app.get('/api/price-forecast/:category/:district', async (req, res) => {
        try {
            const { category, district } = req.params;
            const today = new Date();
            
            const forecast = [];
            for (let i = 0; i < 30; i++) {
                const futureDate = new Date(today);
                futureDate.setDate(futureDate.getDate() + i);
                
                const price = get365DayPrice(category, district, futureDate);
                forecast.push({
                    date: futureDate.toISOString().split('T')[0],
                    price: parseFloat(price.toFixed(2)),
                    day: futureDate.toLocaleDateString('en-US', { weekday: 'short' }),
                    season: getSeasonalPhase(futureDate)
                });
            }
            
            res.json({
                success: true,
                data: {
                    category,
                    district,
                    forecast,
                    generated: today.toISOString()
                }
            });
            
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Unable to generate price forecast'
            });
        }
    });

    // New API: Get seasonal price ranges
    app.get('/api/seasonal-prices/:category/:district', async (req, res) => {
        try {
            const { category, district } = req.params;
            const today = new Date();
            const currentYear = today.getFullYear();
            
            const seasonalData = {};
            const seasons = ['peak_harvest', 'lean_season', 'normal'];
            
            seasons.forEach(season => {
                // Sample prices for each season
                const sampleDates = [
                    new Date(currentYear, 0, 15),   // Jan - peak_harvest
                    new Date(currentYear, 6, 15),   // Jul - lean_season  
                    new Date(currentYear, 3, 15)    // Apr - normal
                ];
                
                seasonalData[season] = sampleDates.map(date => ({
                    date: date.toISOString().split('T')[0],
                    price: parseFloat(get365DayPrice(category, district, date).toFixed(2)),
                    month: date.toLocaleDateString('en-US', { month: 'long' })
                }));
            });
            
            res.json({
                success: true,
                data: {
                    category,
                    district,
                    seasonalData,
                    note: 'Price variations across different seasons'
                }
            });
            
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Unable to fetch seasonal prices'
            });
        }
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("\n✅ Pinged your deployment. You successfully connected to MongoDB!");
    console.log("✅ Seller profile endpoints are active - Individual accounts ready!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/',(req,res)=>{
    res.send('🌾 Agromart Server with Individual Seller Accounts & 365-Day Dynamic Pricing');
});

app.listen(port,()=>{
    console.log(`\n🚀 Server running on port ${port}`);
    console.log(`📍 API: http://localhost:${port}`);
    console.log(`✅ Individual seller accounts enabled`);
    console.log(`✅ 365-Day Real Market Simulation active\n`);
});
