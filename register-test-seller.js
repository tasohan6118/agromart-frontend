// Quick script to register a test seller in MongoDB
// Run this with: node register-test-seller.js

const testSeller = {
    email: 'testseller@example.com',  // Change this to your test email
    name: 'Test Farmer',
    phone: '01234567890'
};

console.log('\n📝 Registering Test Seller...\n');
console.log('Seller Email:', testSeller.email);
console.log('Seller Name:', testSeller.name);

fetch('http://localhost:5000/sellers', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(testSeller)
})
.then(res => res.json())
.then(data => {
    console.log('\n✅ Response:', data);
    if (data.inserted !== false) {
        console.log('\n✅ SUCCESS! Test seller registered!');
        console.log('\n💡 Now you can add products using this email:', testSeller.email);
    } else {
        console.log('\n⚠️ Seller already exists. You can use this email:', testSeller.email);
    }
})
.catch(error => {
    console.error('\n❌ Error:', error.message);
    console.log('\n⚠️ Make sure your server is running on port 5000');
});
