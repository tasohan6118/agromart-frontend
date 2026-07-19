// ============================================================
// ADD THESE SELLER PROFILE ENDPOINTS TO YOUR BACKEND
// Place this code after your existing app.post('/sellers',...) endpoint
// ============================================================

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

// Get all sellers (optional - for admin or marketplace display)
app.get('/sellers', async(req, res) => {
    try {
        const sellers = await sellerCollection.find({}).toArray();
        res.json({ 
            success: true,
            count: sellers.length,
            sellers 
        });
    } catch (error) {
        console.error('Error fetching sellers:', error);
        res.status(500).json({ 
            success: false,
            message: 'Failed to fetch sellers',
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

// ============================================================
// INSTRUCTIONS:
// ============================================================
// 1. Copy the code above
// 2. Paste it in your server.js file after the existing app.post('/sellers',...)
// 3. Make sure it's inside the run() function (before the MongoDB ping command)
// 4. Save and restart your server: node server.js
// 5. Test the endpoints:
//    - GET http://localhost:5000/sellers/:email
//    - PUT http://localhost:5000/sellers/:email
// ============================================================
