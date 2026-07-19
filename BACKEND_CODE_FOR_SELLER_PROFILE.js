// ============================================================
// BACKEND CODE FOR SELLER PROFILE SYSTEM
// Copy and paste this code into your backend server file
// ============================================================

// Add this to your existing Express server
// Make sure you have: express, cors packages installed
// npm install express cors

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ============================================================
// IN-MEMORY DATABASE (Replace with MongoDB/PostgreSQL in production)
// ============================================================
let sellers = [];

// ============================================================
// SELLER PROFILE ENDPOINTS
// ============================================================

// Get all sellers (optional - for admin)
app.get('/sellers', (req, res) => {
    res.json(sellers);
});

// Get seller by email - INDIVIDUAL ACCOUNT ACCESS
app.get('/sellers/:email', (req, res) => {
    const seller = sellers.find(s => s.email === req.params.email);
    if (seller) {
        res.json(seller);
    } else {
        res.status(404).json({ 
            message: 'Seller not found', 
            success: false 
        });
    }
});

// Create new seller - INDIVIDUAL ACCOUNT CREATION
app.post('/sellers', (req, res) => {
    const { email, name, role, created_at, last_log_in } = req.body;
    
    // Check if seller already exists
    const existingSeller = sellers.find(s => s.email === email);
    if (existingSeller) {
        // Update last login
        existingSeller.last_log_in = last_log_in || new Date().toISOString();
        console.log(`✅ Seller login: ${email}`);
        return res.json({ 
            message: 'Seller already exists', 
            seller: existingSeller,
            success: true 
        });
    }
    
    // Create new seller with individual account
    const newSeller = {
        email,
        fullName: name || '',
        phoneNumber: '',
        businessName: '',
        businessType: 'individual',
        bio: '',
        country: '',
        district: '',
        exactAddress: '',
        profileImage: '',
        role: role || 'seller',
        created_at: created_at || new Date().toISOString(),
        last_log_in: last_log_in || new Date().toISOString(),
        updated_at: new Date().toISOString()
    };
    
    sellers.push(newSeller);
    console.log(`✅ New seller account created: ${email}`);
    res.status(201).json({ 
        message: 'Seller account created successfully', 
        seller: newSeller,
        success: true 
    });
});

// Update seller profile - INDIVIDUAL ACCOUNT UPDATE
app.put('/sellers/:email', (req, res) => {
    const email = req.params.email;
    const sellerIndex = sellers.findIndex(s => s.email === email);
    
    if (sellerIndex === -1) {
        // Create new seller if doesn't exist
        const newSeller = {
            ...req.body,
            email,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };
        sellers.push(newSeller);
        console.log(`✅ Seller account created: ${email}`);
        return res.json({ 
            message: 'Seller account created successfully', 
            seller: newSeller,
            success: true 
        });
    }
    
    // Update existing seller (each seller can only update their own account)
    sellers[sellerIndex] = {
        ...sellers[sellerIndex],
        ...req.body,
        email, // Keep email unchanged (account identifier)
        updated_at: new Date().toISOString()
    };
    
    console.log(`✅ Seller profile updated: ${email}`);
    res.json({ 
        message: 'Seller profile updated successfully', 
        seller: sellers[sellerIndex],
        success: true 
    });
});

// Delete seller account - INDIVIDUAL ACCOUNT DELETION
app.delete('/sellers/:email', (req, res) => {
    const email = req.params.email;
    const sellerIndex = sellers.findIndex(s => s.email === email);
    
    if (sellerIndex === -1) {
        return res.status(404).json({ 
            message: 'Seller not found', 
            success: false 
        });
    }
    
    sellers.splice(sellerIndex, 1);
    console.log(`🗑️ Seller account deleted: ${email}`);
    res.json({ 
        message: 'Seller account deleted successfully', 
        success: true 
    });
});

// ============================================================
// START SERVER
// ============================================================
app.listen(port, () => {
    console.log('\n🌾 =====================================');
    console.log(`🚀 Agromart Seller API Server Started`);
    console.log(`📍 URL: http://localhost:${port}`);
    console.log('🌾 =====================================\n');
    console.log('📊 Available Endpoints:\n');
    console.log('👤 SELLER PROFILE (Individual Accounts):');
    console.log('   GET    /sellers           - Get all sellers');
    console.log('   GET    /sellers/:email    - Get individual seller account');
    console.log('   POST   /sellers           - Create new seller account');
    console.log('   PUT    /sellers/:email    - Update individual seller profile');
    console.log('   DELETE /sellers/:email    - Delete seller account\n');
    console.log('✅ Server ready! Each seller has their own individual account.\n');
});

// ============================================================
// NOTES FOR PRODUCTION:
// ============================================================
// 1. Replace in-memory array with a real database (MongoDB/PostgreSQL)
// 2. Add authentication middleware to verify users can only access their own data
// 3. Add input validation and sanitization
// 4. Add rate limiting for API endpoints
// 5. Use environment variables for sensitive data
// 6. Add logging system for monitoring
// ============================================================

// MONGODB EXAMPLE (if you want to use MongoDB):
/*
const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    fullName: String,
    phoneNumber: String,
    businessName: String,
    businessType: String,
    bio: String,
    country: String,
    district: String,
    exactAddress: String,
    profileImage: String,
    role: { type: String, default: 'seller' },
    created_at: { type: Date, default: Date.now },
    last_log_in: Date,
    updated_at: { type: Date, default: Date.now }
});

const Seller = mongoose.model('Seller', sellerSchema);

// Connect to MongoDB
mongoose.connect('your-mongodb-connection-string')
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// Then use Seller.find(), Seller.findOne(), Seller.create(), etc.
*/
