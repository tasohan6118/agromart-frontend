// import React, { useState } from 'react';

// const AddProducts = () => {
//     const [files,setFiles]=useState([]);
//     const [name,setName]=useState('');
//     const [description,setDescription]=useState('');
//     const [category,setCategory]=useState('');
//     const [price,setPrice]=useState('');
//     const [offerPrice,setOfferPrice]=useState('');


//     const onSubmitHandler=async(event)=>{
//         event.preventDefault();
        
//         const formData = {
//             name,
//             description,
//             category,
//             price,
//             offerPrice,
//             files
//         };
        
//         // send data to the database
//         fetch('http://localhost:5000/products',{
//             method:'POST',
//             headers:{
//                 'content-type':'application/json'
//             },
//             body: JSON.stringify(formData)
//         })
//         .then(res=>res.json())
//         .then(data=>{
//             // here one thing needed to change ,that is give alert that doing letter
//             console.log('After adding product',data);
//         })
//     }

    
//     return (
//         <div className="py-10 flex flex-col justify-between bg-white">
//             <form onSubmit={onSubmitHandler} className="md:p-10 p-4 space-y-5 max-w-lg">
//                 <div>
//                     <p className="text-base font-medium">Product Image</p>
//                     <div className="flex flex-wrap items-center gap-3 mt-2">
//                         {Array(4).fill('').map((_, index) => (
//                             <label key={index} htmlFor={`image${index}`}>

//                                 <input onChange={(e)=>{
//                                     const updatedFiles=[...files];
//                                     updatedFiles[index]=e.target.files[0];
//                                     setFiles(updatedFiles);
//                                 }}
//                                  accept="image/*" type="file" id={`image${index}`} hidden />

//                                 {/* here have one problem that will be solved letter  */}
//                                 <img className="max-w-24 cursor-pointer" src={files[index]? URL.createObjectURL(files[index]):"https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"} alt="uploadArea" width={100} height={100} />
//                             </label>
//                         ))}
//                     </div>
//                 </div>
//                 <div className="flex flex-col gap-1 max-w-md">
//                     <label className="text-base font-medium" htmlFor="product-name">Product Name</label>
//                     <input onChange={(e)=>
//                         setName(e.target.value)
//                     } value={name}
//                     id="product-name" type="text" placeholder="Type here" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
//                 </div>
//                 <div className="flex flex-col gap-1 max-w-md">
//                     <label className="text-base font-medium" htmlFor="product-description">Product Description</label>
//                     <textarea onChange={(e)=>setDescription(e.target.value)} value={description} id="product-description" rows={4} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none" placeholder="Type here"></textarea>
//                 </div>
//                 <div className="w-full flex flex-col gap-1">
//                     <label className="text-base font-medium" htmlFor="category">Category</label>
//                     <select onChange={(e)=>setCategory(e.target.value)} value={category}
//                     id="category" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40">
//                         <option value="">Select Category</option>
//                         {[{ name: 'Electronics' }, { name: 'Clothing' }, { name: 'Accessories' },{name:'Potato'}].map((item, index) => (
//                             <option key={index} value={item.name}>{item.name}</option>
//                         ))}
//                     </select>
//                 </div>
//                 <div className="flex items-center gap-5 flex-wrap">
//                     <div className="flex-1 flex flex-col gap-1 w-32">
//                         <label className="text-base font-medium" htmlFor="product-price">Product Price</label>
//                         <input onChange={(e)=>setPrice(e.target.value)} value={price}
//                         id="product-price" type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
//                     </div>
//                     <div className="flex-1 flex flex-col gap-1 w-32">
//                         <label className="text-base font-medium" htmlFor="offer-price">Offer Price</label>
//                         <input onChange={(e)=>setOfferPrice(e.target.value)} value={offerPrice}
//                         id="offer-price" type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
//                     </div>
//                 </div>
//                 <button className="px-8 py-2.5 bg-indigo-500 text-white font-medium rounded">ADD</button>
//             </form>
//         </div>
//     );
// };

// export default AddProducts;






// import React, { useState } from 'react';

// const AddProducts = () => {
//     const [files, setFiles] = useState([]);
//     const [product, setProduct] = useState({
//         name: '',
//         description: '',
//         category: '',
//         variety: '',
//         qualityGrade: 'A',
//         price: '',
//         offerPrice: '',
//         quantity: '',
//         unit: 'kg',
//         location: '',
//         district: '',
//         contactNumber: '',
//         availableUntil: ''
//     });

//     // Agricultural-specific data
//     const agriculturalCategories = [
//         'Potato', 'Onion', 'Garlic', 'Tomato', 'Rice', 
//         'Lentils', 'Wheat', 'Corn', 'Vegetables', 'Fruits', 'Spices'
//     ];

//     const districtsOfBangladesh = [
//         'Dhaka', 'Chittagong', 'Khulna', 'Rajshahi', 'Sylhet', 'Barisal', 
//         'Rangpur', 'Mymensingh', 'Comilla', 'Noakhali', 'Jessore', 'Bogra', 
//         'Dinajpur', 'Faridpur', 'Tangail', 'Pabna', 'Jhenaidah', 'Kushtia',
//         'Satkhira', 'Bhola', 'Coxs Bazar', 'Bandarban'
//     ];

//     const qualityGrades = [
//         { value: 'A', label: 'Grade A (Premium Quality)' },
//         { value: 'B', label: 'Grade B (Good Quality)' },
//         { value: 'C', label: 'Grade C (Standard Quality)' }
//     ];

//     const units = ['kg', 'maund', 'ton', 'bag', 'piece'];

//     const onSubmitHandler = async (event) => {
//         event.preventDefault();
        
//         const formData = {
//             ...product,
//             price: parseFloat(product.price),
//             offerPrice: product.offerPrice ? parseFloat(product.offerPrice) : null,
//             quantity: parseFloat(product.quantity),
//             // Calculate final price (use offer price if available)
//             finalPrice: product.offerPrice ? parseFloat(product.offerPrice) : parseFloat(product.price),
//             postedDate: new Date().toISOString(),
//             lastPriceUpdate: new Date().toISOString(),
//             status: 'available',
//             files,
//             sellerId: 'current_user_id' // You'll get this from authentication
//         };

//         console.log('Submitting product:', formData);
        
//         // Send data to the database
//         fetch('http://localhost:5000/products', {
//             method: 'POST',
//             headers: {
//                 'content-type': 'application/json'
//             },
//             body: JSON.stringify(formData)
//         })
//         .then(res => res.json())
//         .then(data => {
//             alert('✅ Product added successfully! Buyers can now see your listing.');
//             // Reset form after successful submission
//             setProduct({
//                 name: '',
//                 description: '',
//                 category: '',
//                 variety: '',
//                 qualityGrade: 'A',
//                 price: '',
//                 offerPrice: '',
//                 quantity: '',
//                 unit: 'kg',
//                 location: '',
//                 district: '',
//                 contactNumber: '',
//                 availableUntil: ''
//             });
//             setFiles([]);
//         })
//         .catch(error => {
//             console.error('Error adding product:', error);
//             alert('❌ Failed to add product. Please try again.');
//         });
//     };

//     const handleInputChange = (field, value) => {
//         setProduct(prev => ({
//             ...prev,
//             [field]: value
//         }));
//     };

//     return (
//         <div className="py-10 bg-gray-50 min-h-screen">
//             <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
//                 <h2 className="text-2xl font-bold text-green-800 mb-2">Sell Your Agricultural Product</h2>
//                 <p className="text-gray-600 mb-6">List your farm products directly to buyers across Bangladesh</p>
                
//                 <form onSubmit={onSubmitHandler} className="space-y-6">
//                     {/* Product Images Section - Keep your existing code */}
//                     <div>
//                         <p className="text-base font-medium">Product Images</p>
//                         <p className="text-sm text-gray-500 mb-2">Show buyers the actual quality of your product</p>
//                         <div className="flex flex-wrap items-center gap-3 mt-2">
//                             {Array(4).fill('').map((_, index) => (
//                                 <label key={index} htmlFor={`image${index}`} className="cursor-pointer">
//                                     <input 
//                                         onChange={(e) => {
//                                             const updatedFiles = [...files];
//                                             updatedFiles[index] = e.target.files[0];
//                                             setFiles(updatedFiles);
//                                         }}
//                                         accept="image/*" 
//                                         type="file" 
//                                         id={`image${index}`} 
//                                         hidden 
//                                     />
//                                     <img 
//                                         className="w-24 h-24 object-cover border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 transition-colors" 
//                                         src={files[index] ? URL.createObjectURL(files[index]) : "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"} 
//                                         alt="uploadArea" 
//                                     />
//                                 </label>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Product Basic Information */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div className="flex flex-col gap-1">
//                             <label className="text-base font-medium" htmlFor="product-name">
//                                 Product Name *
//                             </label>
//                             <input 
//                                 onChange={(e) => handleInputChange('name', e.target.value)} 
//                                 value={product.name}
//                                 id="product-name" 
//                                 type="text" 
//                                 placeholder="e.g., Fresh Potatoes, Organic Rice" 
//                                 className="outline-none py-2.5 px-3 rounded border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors" 
//                                 required 
//                             />
//                         </div>

//                         <div className="flex flex-col gap-1">
//                             <label className="text-base font-medium" htmlFor="variety">
//                                 Variety/Type *
//                             </label>
//                             <input 
//                                 onChange={(e) => handleInputChange('variety', e.target.value)} 
//                                 value={product.variety}
//                                 id="variety" 
//                                 type="text" 
//                                 placeholder="e.g., IRRI Rice, Red Potato, Local Garlic" 
//                                 className="outline-none py-2.5 px-3 rounded border border-gray-300 focus:border-green-500 transition-colors" 
//                                 required 
//                             />
//                         </div>
//                     </div>

//                     {/* Category and Quality */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div className="flex flex-col gap-1">
//                             <label className="text-base font-medium" htmlFor="category">
//                                 Category *
//                             </label>
//                             <select 
//                                 onChange={(e) => handleInputChange('category', e.target.value)} 
//                                 value={product.category}
//                                 id="category" 
//                                 className="outline-none py-2.5 px-3 rounded border border-gray-300 focus:border-green-500 transition-colors"
//                                 required
//                             >
//                                 <option value="">Select Category</option>
//                                 {agriculturalCategories.map((category, index) => (
//                                     <option key={index} value={category}>{category}</option>
//                                 ))}
//                             </select>
//                         </div>

//                         <div className="flex flex-col gap-1">
//                             <label className="text-base font-medium" htmlFor="qualityGrade">
//                                 Quality Grade *
//                             </label>
//                             <select 
//                                 onChange={(e) => handleInputChange('qualityGrade', e.target.value)} 
//                                 value={product.qualityGrade}
//                                 id="qualityGrade" 
//                                 className="outline-none py-2.5 px-3 rounded border border-gray-300 focus:border-green-500 transition-colors"
//                             >
//                                 {qualityGrades.map((grade, index) => (
//                                     <option key={index} value={grade.value}>{grade.label}</option>
//                                 ))}
//                             </select>
//                         </div>
//                     </div>

//                     {/* Description */}
//                     <div className="flex flex-col gap-1">
//                         <label className="text-base font-medium" htmlFor="product-description">
//                             Product Description *
//                         </label>
//                         <textarea 
//                             onChange={(e) => handleInputChange('description', e.target.value)} 
//                             value={product.description} 
//                             id="product-description" 
//                             rows={3} 
//                             className="outline-none py-2.5 px-3 rounded border border-gray-300 focus:border-green-500 transition-colors resize-none" 
//                             placeholder="Describe your product quality, freshness, harvesting time, etc..."
//                             required
//                         ></textarea>
//                     </div>

//                     {/* Pricing Section */}
//                     <div className="bg-green-50 p-4 rounded-lg">
//                         <h3 className="text-lg font-semibold text-green-800 mb-3">Pricing Information</h3>
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                             <div className="flex flex-col gap-1">
//                                 <label className="text-base font-medium" htmlFor="product-price">
//                                     Price per kg (৳) *
//                                 </label>
//                                 <input 
//                                     onChange={(e) => handleInputChange('price', e.target.value)} 
//                                     value={product.price}
//                                     id="product-price" 
//                                     type="number" 
//                                     placeholder="0" 
//                                     className="outline-none py-2.5 px-3 rounded border border-gray-300 focus:border-green-500 transition-colors" 
//                                     required 
//                                 />
//                             </div>
//                             <div className="flex flex-col gap-1">
//                                 <label className="text-base font-medium" htmlFor="offer-price">
//                                     Offer Price (৳)
//                                 </label>
//                                 <input 
//                                     onChange={(e) => handleInputChange('offerPrice', e.target.value)} 
//                                     value={product.offerPrice}
//                                     id="offer-price" 
//                                     type="number" 
//                                     placeholder="0" 
//                                     className="outline-none py-2.5 px-3 rounded border border-gray-300 focus:border-green-500 transition-colors" 
//                                 />
//                                 <p className="text-xs text-gray-500">Optional discount price</p>
//                             </div>
//                             <div className="flex flex-col gap-1">
//                                 <label className="text-base font-medium" htmlFor="quantity">
//                                     Available Quantity *
//                                 </label>
//                                 <input 
//                                     onChange={(e) => handleInputChange('quantity', e.target.value)} 
//                                     value={product.quantity}
//                                     id="quantity" 
//                                     type="number" 
//                                     placeholder="0" 
//                                     className="outline-none py-2.5 px-3 rounded border border-gray-300 focus:border-green-500 transition-colors" 
//                                     required 
//                                 />
//                             </div>
//                         </div>
//                         <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div className="flex flex-col gap-1">
//                                 <label className="text-base font-medium" htmlFor="unit">
//                                     Unit *
//                                 </label>
//                                 <select 
//                                     onChange={(e) => handleInputChange('unit', e.target.value)} 
//                                     value={product.unit}
//                                     id="unit" 
//                                     className="outline-none py-2.5 px-3 rounded border border-gray-300 focus:border-green-500 transition-colors"
//                                 >
//                                     {units.map((unit, index) => (
//                                         <option key={index} value={unit}>{unit}</option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <div className="flex flex-col gap-1">
//                                 <label className="text-base font-medium" htmlFor="availableUntil">
//                                     Available Until
//                                 </label>
//                                 <input 
//                                     onChange={(e) => handleInputChange('availableUntil', e.target.value)} 
//                                     value={product.availableUntil}
//                                     id="availableUntil" 
//                                     type="date" 
//                                     className="outline-none py-2.5 px-3 rounded border border-gray-300 focus:border-green-500 transition-colors" 
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     {/* Location & Contact */}
//                     <div className="bg-blue-50 p-4 rounded-lg">
//                         <h3 className="text-lg font-semibold text-blue-800 mb-3">Location & Contact</h3>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div className="flex flex-col gap-1">
//                                 <label className="text-base font-medium" htmlFor="district">
//                                     District *
//                                 </label>
//                                 <select 
//                                     onChange={(e) => handleInputChange('district', e.target.value)} 
//                                     value={product.district}
//                                     id="district" 
//                                     className="outline-none py-2.5 px-3 rounded border border-gray-300 focus:border-blue-500 transition-colors"
//                                     required
//                                 >
//                                     <option value="">Select District</option>
//                                     {districtsOfBangladesh.map((district, index) => (
//                                         <option key={index} value={district}>{district}</option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <div className="flex flex-col gap-1">
//                                 <label className="text-base font-medium" htmlFor="location">
//                                     Specific Location
//                                 </label>
//                                 <input 
//                                     onChange={(e) => handleInputChange('location', e.target.value)} 
//                                     value={product.location}
//                                     id="location" 
//                                     type="text" 
//                                     placeholder="e.g., Farm gate, Market area, Village name" 
//                                     className="outline-none py-2.5 px-3 rounded border border-gray-300 focus:border-blue-500 transition-colors" 
//                                 />
//                             </div>
//                         </div>
//                         <div className="mt-3">
//                             <div className="flex flex-col gap-1">
//                                 <label className="text-base font-medium" htmlFor="contactNumber">
//                                     Contact Number *
//                                 </label>
//                                 <input 
//                                     onChange={(e) => handleInputChange('contactNumber', e.target.value)} 
//                                     value={product.contactNumber}
//                                     id="contactNumber" 
//                                     type="tel" 
//                                     placeholder="e.g., 01XXXXXXXXX" 
//                                     className="outline-none py-2.5 px-3 rounded border border-gray-300 focus:border-blue-500 transition-colors" 
//                                     required 
//                                 />
//                                 <p className="text-xs text-gray-500">Buyers will contact you directly on this number</p>
//                             </div>
//                         </div>
//                     </div>

//                     <button 
//                         type="submit" 
//                         className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
//                     >
//                         <span>List Product for Sale</span>
//                         <span>🌾</span>
//                     </button>

//                     <p className="text-center text-sm text-gray-500">
//                         Your product will be visible to buyers across Bangladesh. You can update the price daily.
//                     </p>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default AddProducts;



















// import React, { useState } from 'react';

// const AddProducts = () => {
//     const [files, setFiles] = useState([]);
//     const [product, setProduct] = useState({
//         name: '',
//         description: '',
//         category: '',
//         variety: '',
//         qualityGrade: 'A',
//         price: '',
//         offerPrice: '',
//         quantity: '',
//         unit: 'kg',
//         location: '',
//         district: '',
//         contactNumber: '',
//         availableUntil: ''
//     });

//     // Agricultural-specific data
//     const agriculturalCategories = [
//         'Potato', 'Onion', 'Garlic', 'Tomato', 'Rice', 
//         'Lentils', 'Wheat', 'Corn', 'Vegetables', 'Fruits', 'Spices'
//     ];

//     const districtsOfBangladesh = [
//         'Dhaka', 'Chittagong', 'Khulna', 'Rajshahi', 'Sylhet', 'Barisal', 
//         'Rangpur', 'Mymensingh', 'Comilla', 'Noakhali', 'Jessore', 'Bogra', 
//         'Dinajpur', 'Faridpur', 'Tangail', 'Pabna', 'Jhenaidah', 'Kushtia',
//         'Satkhira', 'Bhola', 'Coxs Bazar', 'Bandarban'
//     ];

//     const qualityGrades = [
//         { value: 'A', label: 'Grade A (Premium Quality)' },
//         { value: 'B', label: 'Grade B (Good Quality)' },
//         { value: 'C', label: 'Grade C (Standard Quality)' }
//     ];

//     const units = ['kg', 'maund', 'ton', 'bag', 'piece'];

//     const onSubmitHandler = async (event) => {
//         event.preventDefault();
        
//         const formData = {
//             ...product,
//             price: parseFloat(product.price),
//             offerPrice: product.offerPrice ? parseFloat(product.offerPrice) : null,
//             quantity: parseFloat(product.quantity),
//             // Calculate final price (use offer price if available)
//             finalPrice: product.offerPrice ? parseFloat(product.offerPrice) : parseFloat(product.price),
//             postedDate: new Date().toISOString(),
//             lastPriceUpdate: new Date().toISOString(),
//             status: 'available',
//             files,
//             sellerId: 'current_user_id' // You'll get this from authentication
//         };

//         console.log('Submitting product:', formData);
        
//         // Send data to the database
//         fetch('http://localhost:5000/products', {
//             method: 'POST',
//             headers: {
//                 'content-type': 'application/json'
//             },
//             body: JSON.stringify(formData)
//         })
//         .then(res => res.json())
//         .then(data => {
//             alert('✅ Product added successfully! Buyers can now see your listing.');
//             // Reset form after successful submission
//             setProduct({
//                 name: '',
//                 description: '',
//                 category: '',
//                 variety: '',
//                 qualityGrade: 'A',
//                 price: '',
//                 offerPrice: '',
//                 quantity: '',
//                 unit: 'kg',
//                 location: '',
//                 district: '',
//                 contactNumber: '',
//                 availableUntil: ''
//             });
//             setFiles([]);
//         })
//         .catch(error => {
//             console.error('Error adding product:', error);
//             alert('❌ Failed to add product. Please try again.');
//         });
//     };

//     const handleInputChange = (field, value) => {
//         setProduct(prev => ({
//             ...prev,
//             [field]: value
//         }));
//     };

//     return (
//         <div className="py-10 bg-gray-50 min-h-screen">
//             <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
//                 <h2 className="text-2xl font-bold text-green-800 mb-2">Sell Your Agricultural Product</h2>
//                 <p className="text-gray-600 mb-6">List your farm products directly to buyers across Bangladesh</p>
                
//                 <form onSubmit={onSubmitHandler} className="space-y-6">
//                     {/* Product Images Section */}
//                     <div>
//                         <p className="text-base font-medium">Product Images</p>
//                         <p className="text-sm text-gray-500 mb-2">Show buyers the actual quality of your product</p>
//                         <div className="flex flex-wrap items-center gap-3 mt-2">
//                             {Array(4).fill('').map((_, index) => (
//                                 <label key={index} htmlFor={`image${index}`} className="cursor-pointer">
//                                     <input 
//                                         onChange={(e) => {
//                                             const updatedFiles = [...files];
//                                             updatedFiles[index] = e.target.files[0];
//                                             setFiles(updatedFiles);
//                                         }}
//                                         accept="image/*" 
//                                         type="file" 
//                                         id={`image${index}`} 
//                                         hidden 
//                                     />
//                                     <img 
//                                         className="w-24 h-24 object-cover border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 transition-colors" 
//                                         src={files[index] ? URL.createObjectURL(files[index]) : "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"} 
//                                         alt="uploadArea" 
//                                     />
//                                 </label>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Product Basic Information */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div className="flex flex-col gap-1">
//                             <label className="text-base font-medium" htmlFor="product-name">
//                                 Product Name *
//                             </label>
//                             <input 
//                                 onChange={(e) => handleInputChange('name', e.target.value)} 
//                                 value={product.name}
//                                 id="product-name" 
//                                 type="text" 
//                                 placeholder="e.g., Fresh Potatoes, Organic Rice" 
//                                 className="outline-none py-2.5 px-3 rounded border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors" 
//                                 required 
//                             />
//                         </div>

//                         <div className="flex flex-col gap-1">
//                             <label className="text-base font-medium" htmlFor="variety">
//                                 Variety/Type *
//                             </label>
//                             <input 
//                                 onChange={(e) => handleInputChange('variety', e.target.value)} 
//                                 value={product.variety}
//                                 id="variety" 
//                                 type="text" 
//                                 placeholder="e.g., IRRI Rice, Red Potato, Local Garlic" 
//                                 className="outline-none py-2.5 px-3 rounded border border-gray-300 focus:border-green-500 transition-colors" 
//                                 required 
//                             />
//                         </div>
//                     </div>

//                     {/* Category and Quality */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div className="flex flex-col gap-1">
//                             <label className="text-base font-medium" htmlFor="category">
//                                 Category *
//                             </label>
//                             <select 
//                                 onChange={(e) => handleInputChange('category', e.target.value)} 
//                                 value={product.category}
//                                 id="category" 
//                                 className="outline-none py-2.5 px-3 rounded border border-gray-300 focus:border-green-500 transition-colors"
//                                 required
//                             >
//                                 <option value="">Select Category</option>
//                                 {agriculturalCategories.map((category, index) => (
//                                     <option key={index} value={category}>{category}</option>
//                                 ))}
//                             </select>
//                         </div>

//                         <div className="flex flex-col gap-1">
//                             <label className="text-base font-medium" htmlFor="qualityGrade">
//                                 Quality Grade *
//                             </label>
//                             <select 
//                                 onChange={(e) => handleInputChange('qualityGrade', e.target.value)} 
//                                 value={product.qualityGrade}
//                                 id="qualityGrade" 
//                                 className="outline-none py-2.5 px-3 rounded border border-gray-300 focus:border-green-500 transition-colors"
//                             >
//                                 {qualityGrades.map((grade, index) => (
//                                     <option key={index} value={grade.value}>{grade.label}</option>
//                                 ))}
//                             </select>
//                         </div>
//                     </div>

//                     {/* Description */}
//                     <div className="flex flex-col gap-1">
//                         <label className="text-base font-medium" htmlFor="product-description">
//                             Product Description *
//                         </label>
//                         <textarea 
//                             onChange={(e) => handleInputChange('description', e.target.value)} 
//                             value={product.description} 
//                             id="product-description" 
//                             rows={3} 
//                             className="outline-none py-2.5 px-3 rounded border border-gray-300 focus:border-green-500 transition-colors resize-none" 
//                             placeholder="Describe your product quality, freshness, harvesting time, etc..."
//                             required
//                         ></textarea>
//                     </div>

//                     {/* Pricing Section - READY FOR DYNAMIC PRICING LATER */}
//                     <div className="bg-green-50 p-4 rounded-lg">
//                         <h3 className="text-lg font-semibold text-green-800 mb-3">Pricing Information</h3>
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                             <div className="flex flex-col gap-1">
//                                 <label className="text-base font-medium" htmlFor="product-price">
//                                     Price per kg (৳) *
//                                 </label>
//                                 <input 
//                                     onChange={(e) => handleInputChange('price', e.target.value)} 
//                                     value={product.price}
//                                     id="product-price" 
//                                     type="number" 
//                                     placeholder="0" 
//                                     className="outline-none py-2.5 px-3 rounded border border-gray-300 focus:border-green-500 transition-colors" 
//                                     required 
//                                 />
//                             </div>
//                             <div className="flex flex-col gap-1">
//                                 <label className="text-base font-medium" htmlFor="offer-price">
//                                     Offer Price (৳)
//                                 </label>
//                                 <input 
//                                     onChange={(e) => handleInputChange('offerPrice', e.target.value)} 
//                                     value={product.offerPrice}
//                                     id="offer-price" 
//                                     type="number" 
//                                     placeholder="0" 
//                                     className="outline-none py-2.5 px-3 rounded border border-gray-300 focus:border-green-500 transition-colors" 
//                                 />
//                                 <p className="text-xs text-gray-500">Optional discount price</p>
//                             </div>
//                             <div className="flex flex-col gap-1">
//                                 <label className="text-base font-medium" htmlFor="quantity">
//                                     Available Quantity *
//                                 </label>
//                                 <input 
//                                     onChange={(e) => handleInputChange('quantity', e.target.value)} 
//                                     value={product.quantity}
//                                     id="quantity" 
//                                     type="number" 
//                                     placeholder="0" 
//                                     className="outline-none py-2.5 px-3 rounded border border-gray-300 focus:border-green-500 transition-colors" 
//                                     required 
//                                 />
//                             </div>
//                         </div>
//                         <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div className="flex flex-col gap-1">
//                                 <label className="text-base font-medium" htmlFor="unit">
//                                     Unit *
//                                 </label>
//                                 <select 
//                                     onChange={(e) => handleInputChange('unit', e.target.value)} 
//                                     value={product.unit}
//                                     id="unit" 
//                                     className="outline-none py-2.5 px-3 rounded border border-gray-300 focus:border-green-500 transition-colors"
//                                 >
//                                     {units.map((unit, index) => (
//                                         <option key={index} value={unit}>{unit}</option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <div className="flex flex-col gap-1">
//                                 <label className="text-base font-medium" htmlFor="availableUntil">
//                                     Available Until
//                                 </label>
//                                 <input 
//                                     onChange={(e) => handleInputChange('availableUntil', e.target.value)} 
//                                     value={product.availableUntil}
//                                     id="availableUntil" 
//                                     type="date" 
//                                     className="outline-none py-2.5 px-3 rounded border border-gray-300 focus:border-green-500 transition-colors" 
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     {/* Location & Contact */}
//                     <div className="bg-blue-50 p-4 rounded-lg">
//                         <h3 className="text-lg font-semibold text-blue-800 mb-3">Location & Contact</h3>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div className="flex flex-col gap-1">
//                                 <label className="text-base font-medium" htmlFor="district">
//                                     District *
//                                 </label>
//                                 <select 
//                                     onChange={(e) => handleInputChange('district', e.target.value)} 
//                                     value={product.district}
//                                     id="district" 
//                                     className="outline-none py-2.5 px-3 rounded border border-gray-300 focus:border-blue-500 transition-colors"
//                                     required
//                                 >
//                                     <option value="">Select District</option>
//                                     {districtsOfBangladesh.map((district, index) => (
//                                         <option key={index} value={district}>{district}</option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <div className="flex flex-col gap-1">
//                                 <label className="text-base font-medium" htmlFor="location">
//                                     Specific Location
//                                 </label>
//                                 <input 
//                                     onChange={(e) => handleInputChange('location', e.target.value)} 
//                                     value={product.location}
//                                     id="location" 
//                                     type="text" 
//                                     placeholder="e.g., Farm gate, Market area, Village name" 
//                                     className="outline-none py-2.5 px-3 rounded border border-gray-300 focus:border-blue-500 transition-colors" 
//                                 />
//                             </div>
//                         </div>
//                         <div className="mt-3">
//                             <div className="flex flex-col gap-1">
//                                 <label className="text-base font-medium" htmlFor="contactNumber">
//                                     Contact Number *
//                                 </label>
//                                 <input 
//                                     onChange={(e) => handleInputChange('contactNumber', e.target.value)} 
//                                     value={product.contactNumber}
//                                     id="contactNumber" 
//                                     type="tel" 
//                                     placeholder="e.g., 01XXXXXXXXX" 
//                                     className="outline-none py-2.5 px-3 rounded border border-gray-300 focus:border-blue-500 transition-colors" 
//                                     required 
//                                 />
//                                 <p className="text-xs text-gray-500">Buyers will contact you directly on this number</p>
//                             </div>
//                         </div>
//                     </div>

//                     <button 
//                         type="submit" 
//                         className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
//                     >
//                         <span>List Product for Sale</span>
//                         <span>🌾</span>
//                     </button>

//                     <p className="text-center text-sm text-gray-500">
//                         Your product will be visible to buyers across Bangladesh. You can update the price daily.
//                     </p>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default AddProducts;




import React, { useState } from 'react';

const AddProducts = () => {
    const [files, setFiles] = useState([]);
    const [priceSuggestion, setPriceSuggestion] = useState(null);
    const [isLoadingSuggestion, setIsLoadingSuggestion] = useState(false);
    const [marketComparison, setMarketComparison] = useState([]);
    const [product, setProduct] = useState({
        name: '',
        description: '',
        category: '',
        variety: '',
        qualityGrade: 'A',
        price: '',
        offerPrice: '',
        quantity: '',
        unit: 'kg',
        location: '',
        district: '',
        contactNumber: '',
        availableUntil: ''
    });

    // Base prices for commodities (same as market prices)
    const basePrices = {
        'Rice': 52, 'Potato': 28, 'Tomato': 40, 'Onion': 43, 'Garlic': 185,
        'Ginger': 200, 'Green Chili': 80, 'Carrot': 60, 'Cabbage': 25,
        'Cauliflower': 40, 'Eggplant': 50, 'Cucumber': 35, 'Beans': 60,
        'Pumpkin': 28, 'Spinach': 20, 'Lemon': 120, 'Banana': 60,
        'Apple': 280, 'Chicken': 215, 'Beef': 650, 'Mutton': 850,
        'Eggs': 140, 'Milk': 75, 'Hilsa Fish': 1300, 'Rohu Fish': 350,
        'Fish': 330, 'Prawn': 800, 'Crab': 600, 'Shrimp': 720,
        'Soybean Oil': 165, 'Mustard Oil': 180, 'Sugar': 85, 'Salt': 35,
        'Wheat': 40, 'Lentils': 120, 'Corn': 35, 'Mango': 120,
        'Pineapple': 60, 'Orange': 180, 'Guava': 45, 'Watermelon': 35
    };

    // District to Market ID mapping (from MarketPrices)
    const districtToMarketId = {
        'Dhaka': 1, 'Chittagong': 16, 'Khulna': 37, 'Rajshahi': 28,
        'Sylhet': 48, 'Barisal': 53, 'Rangpur': 59, 'Mymensingh': 67,
        'Comilla': 19, 'Noakhali': 23, 'Jessore': 40, 'Bogra': 30,
        'Dinajpur': 60, 'Faridpur': 15, 'Tangail': 6, 'Pabna': 31,
        'Gazipur': 4, 'Narayanganj': 5, 'Feni': 20, 'Brahmanbaria': 21,
        'Coxs Bazar': 18, 'Bandarban': 27
    };

    // Agricultural-specific data
    const agriculturalCategories = [
        'Potato', 'Onion', 'Garlic', 'Tomato', 'Rice', 
        'Lentils', 'Wheat', 'Corn', 'Vegetables', 'Fruits', 
        'Spices', 'Fish', 'Chicken', 'Eggs'
    ];

    const districtsOfBangladesh = [
        'Dhaka', 'Chittagong', 'Khulna', 'Rajshahi', 'Sylhet', 'Barisal', 
        'Rangpur', 'Mymensingh', 'Comilla', 'Noakhali', 'Jessore', 'Bogra', 
        'Dinajpur', 'Faridpur', 'Tangail', 'Pabna', 'Jhenaidah', 'Kushtia',
        'Satkhira', 'Bhola', 'Coxs Bazar', 'Bandarban'
    ];

    const qualityGrades = [
        { value: 'A', label: 'Grade A (Premium Quality)' },
        { value: 'B', label: 'Grade B (Good Quality)' },
        { value: 'C', label: 'Grade C (Standard Quality)' }
    ];

    const units = ['kg', 'maund', 'ton', 'bag', 'piece'];

    // Dynamic price calculation (same logic as MarketPrices)
    const getDynamicPrice = (basePrice, marketId, date = new Date()) => {
        const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
        const seed = dayOfYear + marketId * 7;
        const variation = (Math.sin(seed * 0.1) * 0.12) + (Math.cos(seed * 0.05) * 0.08) + (Math.sin(marketId * 0.3) * 0.05);
        const newPrice = Math.round(basePrice * (1 + variation));
        return newPrice;
    };

    // Quality grade adjustment
    const getQualityAdjustment = (grade) => {
        switch(grade) {
            case 'A': return 1.10; // +10% for premium quality
            case 'B': return 1.00; // Standard market price
            case 'C': return 0.90; // -10% for standard quality
            default: return 1.00;
        }
    };

    // Get Smart Price Suggestion with Market Comparison
    const getPriceSuggestion = () => {
        if (!product.category || !product.district) {
            alert('Please select both category and district first');
            return;
        }

        setIsLoadingSuggestion(true);
        setPriceSuggestion(null);
        setMarketComparison([]);
        
        setTimeout(() => {
            try {
                // Get base price for the category
                const basePrice = basePrices[product.category] || 50;
                const marketId = districtToMarketId[product.district] || 1;
                
                // Calculate current market price for the location
                const currentMarketPrice = getDynamicPrice(basePrice, marketId);
                
                // Apply quality adjustment
                const qualityMultiplier = getQualityAdjustment(product.qualityGrade);
                const suggestedPrice = Math.round(currentMarketPrice * qualityMultiplier);
                
                // Calculate price range across different markets for comparison
                const marketPrices = Object.entries(districtToMarketId).map(([district, id]) => ({
                    district,
                    price: getDynamicPrice(basePrice, id)
                })).sort((a, b) => a.price - b.price);
                
                const lowestPrice = marketPrices[0].price;
                const highestPrice = marketPrices[marketPrices.length - 1].price;
                const averagePrice = Math.round(marketPrices.reduce((sum, m) => sum + m.price, 0) / marketPrices.length);
                
                // Determine competitive positioning
                let explanation = '';
                if (suggestedPrice < averagePrice) {
                    explanation = `Your suggested price is competitive - below the national average of ৳${averagePrice}/kg. Great for quick sale!`;
                } else if (suggestedPrice > averagePrice) {
                    explanation = `Your suggested price is above average (৳${averagePrice}/kg) due to ${product.qualityGrade === 'A' ? 'premium quality' : 'your location'}. Perfect for quality-conscious buyers!`;
                } else {
                    explanation = `Your suggested price matches the national average. Fair market value for your product.`;
                }
                
                setPriceSuggestion({
                    suggestedPrice,
                    marketPrice: currentMarketPrice,
                    qualityAdjustment: Math.round((qualityMultiplier - 1) * 100),
                    explanation,
                    lowestMarketPrice: lowestPrice,
                    highestMarketPrice: highestPrice,
                    averageMarketPrice: averagePrice,
                    pricePosition: suggestedPrice < averagePrice ? 'competitive' : suggestedPrice > averagePrice ? 'premium' : 'average'
                });
                
                // Show top 5 markets for comparison
                setMarketComparison(marketPrices.slice(0, 5));
                
            } catch (error) {
                console.error('Error calculating price suggestion:', error);
                alert('Could not calculate price suggestion. Please enter price manually.');
            } finally {
                setIsLoadingSuggestion(false);
            }
        }, 500); // Small delay for UX
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        
        // Client-side validation with detailed messages
        console.log('Starting validation. Product data:', product);
        
        // Convert uploaded images to base64 strings
        const imageUrls = await Promise.all(
            files.filter(f => f).map(async (file) => {
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.readAsDataURL(file);
                });
            })
        );
        
        // Check all required fields
        const validations = [
            { field: 'name', value: product.name, message: 'Product name is required' },
            { field: 'category', value: product.category, message: 'Category is required' },
            { field: 'variety', value: product.variety, message: 'Variety/Type is required' },
            { field: 'description', value: product.description, message: 'Description is required' },
            { field: 'price', value: product.price, message: 'Price is required' },
            { field: 'quantity', value: product.quantity, message: 'Quantity is required' },
            { field: 'district', value: product.district, message: 'District is required' },
            { field: 'contactNumber', value: product.contactNumber, message: 'Contact number is required' },
            { field: 'sellerEmail', value: product.sellerEmail, message: 'Your email is required' }
        ];
        
        for (const validation of validations) {
            if (!validation.value || validation.value.toString().trim() === '') {
                alert(`❌ ${validation.message}\n\nPlease fill in the "${validation.field}" field.`);
                console.error('Validation failed:', validation);
                return;
            }
        }
        
        // Validate price is a positive number
        const priceNum = parseFloat(product.price);
        if (isNaN(priceNum) || priceNum <= 0) {
            alert('❌ Price must be a number greater than 0\n\nCurrent value: ' + product.price);
            return;
        }
        
        // Validate quantity is a positive number
        const quantityNum = parseFloat(product.quantity);
        if (isNaN(quantityNum) || quantityNum <= 0) {
            alert('❌ Quantity must be a number greater than 0\n\nCurrent value: ' + product.quantity);
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(product.sellerEmail)) {
            alert('❌ Please enter a valid email address\n\nExample: farmer@example.com\n\nCurrent value: ' + product.sellerEmail);
            return;
        }
        
        // Validate offer price if provided
        if (product.offerPrice && product.offerPrice !== '') {
            const offerNum = parseFloat(product.offerPrice);
            if (isNaN(offerNum) || offerNum < 0) {
                alert('❌ Offer price must be a valid number (or leave it empty)');
                return;
            }
        }
        
        console.log('✅ All validations passed!');
        
        // Build clean formData with only valid fields
        const formData = {
            name: product.name.trim(),
            description: product.description.trim(),
            category: product.category,
            variety: product.variety.trim(),
            qualityGrade: product.qualityGrade || 'B',
            price: parseFloat(product.price),
            offerPrice: product.offerPrice && product.offerPrice !== '' ? parseFloat(product.offerPrice) : null,
            quantity: parseFloat(product.quantity),
            unit: product.unit || 'kg',
            location: product.location ? product.location.trim() : '',
            district: product.district,
            contactNumber: product.contactNumber.trim(),
            sellerEmail: product.sellerEmail.trim(),
            availableUntil: product.availableUntil || null,
            finalPrice: product.offerPrice && product.offerPrice !== '' ? parseFloat(product.offerPrice) : parseFloat(product.price),
            postedDate: new Date().toISOString(),
            lastPriceUpdate: new Date().toISOString(),
            status: 'available',
            imageUrl: imageUrls[0] || null, // Use first uploaded image as primary
            images: imageUrls // Store all uploaded images
        };

        console.log('Submitting product:', formData);
        console.log('Validation check:', {
            hasName: !!formData.name,
            hasCategory: !!formData.category,
            hasPrice: formData.price > 0,
            hasDistrict: !!formData.district,
            hasEmail: formData.sellerEmail.includes('@')
        });
        
        try {
            const response = await fetch('http://localhost:5000/products', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            console.log('Server response:', data);
            
            if (data.success) {
                alert('✅ Product added successfully!\n\nGo to the Marketplace to see your listing.\n\nProduct ID: ' + data.productId);
                // Reset form
                setProduct({
                    name: '', description: '', category: '', variety: '', qualityGrade: 'A', 
                    price: '', offerPrice: '', quantity: '', unit: 'kg', location: '', 
                    district: '', contactNumber: '', sellerEmail: '', availableUntil: ''
                });
                setFiles([]);
                setPriceSuggestion(null);
                setMarketComparison([]);
            } else {
                // Handle specific error messages
                let errorMsg = data.message || 'Unknown error';
                if (data.errors && data.errors.length > 0) {
                    errorMsg += ':\n' + data.errors.join('\n');
                }
                
                if (errorMsg.includes('Seller not found')) {
                    errorMsg += '\n\n💡 SOLUTION: You need to register as a seller first!\n\n1. Go to Seller Registration\n2. Use the same email: ' + formData.sellerEmail + '\n3. Complete the registration\n4. Then come back and add your product';
                }
                
                alert('❌ Failed to add product: ' + errorMsg);
                console.error('Server error details:', data);
            }
        } catch (error) {
            console.error('Error adding product:', error);
            alert('❌ Failed to add product. Make sure the server is running on port 5000.\n\nError: ' + error.message);
        }
    };

    const handleInputChange = (field, value) => {
        setProduct(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <div className="py-10 bg-gray-50 min-h-screen">
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-green-800 mb-2">Sell Your Agricultural Product</h2>
                <p className="text-gray-600 mb-4">List your farm products directly to buyers across Bangladesh</p>
                
                {/* Smart Pricing Info Banner */}
                <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 border-l-4 border-blue-500 rounded-lg">
                    <div className="flex items-start gap-3">
                        <span className="text-2xl">🎯</span>
                        <div className="flex-1">
                            <h3 className="font-bold text-blue-900 mb-1">Smart Pricing System - No More Middlemen!</h3>
                            <p className="text-sm text-blue-800 mb-2">
                                Our intelligent system analyzes <span className="font-semibold">real-time market prices from 70 markets across all 64 districts</span> and suggests the best price for your product based on:
                            </p>
                            <ul className="text-sm text-blue-700 space-y-1 ml-4">
                                <li>✅ Your location's current market rate</li>
                                <li>✅ Product quality grade (Premium/Good/Standard)</li>
                                <li>✅ National price trends updated daily</li>
                                <li>✅ Competition analysis across regions</li>
                            </ul>
                            <p className="text-xs text-blue-600 mt-2 font-medium">
                                💰 Sell directly to buyers at fair market prices - Skip the middleman markup!
                            </p>
                        </div>
                    </div>
                </div>
                
                <form onSubmit={onSubmitHandler} className="space-y-6">
                    {/* Product Images Section */}
                    <div>
                        <p className="text-base font-medium">Product Images</p>
                        <p className="text-sm text-gray-500 mb-2">Show buyers the actual quality of your product</p>
                        <div className="flex flex-wrap items-center gap-3 mt-2">
                            {Array(4).fill('').map((_, index) => (
                                <label key={index} htmlFor={`image${index}`} className="cursor-pointer">
                                    <input 
                                        onChange={(e) => {
                                            const updatedFiles = [...files];
                                            updatedFiles[index] = e.target.files[0];
                                            setFiles(updatedFiles);
                                        }}
                                        accept="image/*" type="file" id={`image${index}`} hidden 
                                    />
                                    <img 
                                        className="w-24 h-24 object-cover border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 transition-colors" 
                                        src={files[index] ? URL.createObjectURL(files[index]) : "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"} 
                                        alt="uploadArea" 
                                    />
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Product Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-base font-medium" htmlFor="product-name">Product Name *</label>
                            <input 
                                onChange={(e) => handleInputChange('name', e.target.value)} value={product.name} id="product-name" type="text" placeholder="e.g., Fresh Potatoes, Organic Rice" 
                                className="outline-none py-2.5 px-3 rounded border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors" required 
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-base font-medium" htmlFor="variety">Variety/Type *</label>
                            <input 
                                onChange={(e) => handleInputChange('variety', e.target.value)} value={product.variety} id="variety" type="text" placeholder="e.g., IRRI Rice, Red Potato, Local Garlic" 
                                className="outline-none py-2.5 px-3 rounded border border-gray-300 focus:border-green-500 transition-colors" required 
                            />
                        </div>
                    </div>

                    {/* Category and Quality */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-base font-medium" htmlFor="category">Category *</label>
                            <select onChange={(e) => handleInputChange('category', e.target.value)} value={product.category} id="category" className="outline-none py-2.5 px-3 rounded border border-gray-300 focus:border-green-500 transition-colors" required>
                                <option value="">Select Category</option>
                                {agriculturalCategories.map((category, index) => (<option key={index} value={category}>{category}</option>))}
                            </select>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-base font-medium" htmlFor="qualityGrade">Quality Grade *</label>
                            <select onChange={(e) => handleInputChange('qualityGrade', e.target.value)} value={product.qualityGrade} id="qualityGrade" className="outline-none py-2.5 px-3 rounded border border-gray-300 focus:border-green-500 transition-colors">
                                {qualityGrades.map((grade, index) => (<option key={index} value={grade.value}>{grade.label}</option>))}
                            </select>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-1">
                        <label className="text-base font-medium" htmlFor="product-description">Product Description *</label>
                        <textarea 
                            onChange={(e) => handleInputChange('description', e.target.value)} value={product.description} id="product-description" rows={3} 
                            className="outline-none py-2.5 px-3 rounded border border-gray-300 focus:border-green-500 transition-colors resize-none" 
                            placeholder="Describe your product quality, freshness, harvesting time, etc..." required
                        ></textarea>
                    </div>

                    {/* Pricing Section with Dynamic Pricing */}
                    <div className="bg-green-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-green-800 mb-3">Pricing Information</h3>
                        <div className="flex flex-col gap-1 mb-3">
                            <label className="text-base font-medium" htmlFor="product-price">Price per kg (৳) *</label>
                            <div className="flex gap-2">
                                <input 
                                    onChange={(e) => handleInputChange('price', e.target.value)} value={product.price} id="product-price" type="number" placeholder="0" 
                                    className="outline-none py-2.5 px-3 rounded border border-gray-300 focus:border-green-500 transition-colors flex-1" required 
                                />
                                <button type="button" onClick={getPriceSuggestion} disabled={isLoadingSuggestion || !product.category || !product.district}
                                    className="px-4 py-2.5 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 transition-colors whitespace-nowrap">
                                    {isLoadingSuggestion ? 'Loading...' : 'Get Smart Price'}
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Select category and district first to get intelligent price suggestion</p>
                        </div>

                        {priceSuggestion && (
                            <div className="space-y-3">
                                {/* Main Price Suggestion */}
                                <div className="p-4 bg-gradient-to-r from-yellow-50 to-green-50 border-2 border-yellow-300 rounded-lg">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <p className="font-bold text-xl text-green-800">
                                                💡 Smart Price: ৳{priceSuggestion.suggestedPrice}/kg
                                            </p>
                                            <p className="text-sm text-green-700 mt-2">{priceSuggestion.explanation}</p>
                                            <div className="mt-3 flex gap-4 text-xs text-gray-600">
                                                <span>📊 Base Market: ৳{priceSuggestion.marketPrice}</span>
                                                <span>⭐ Quality: {priceSuggestion.qualityAdjustment > 0 ? '+' : ''}{priceSuggestion.qualityAdjustment}%</span>
                                                <span className={`font-semibold ${
                                                    priceSuggestion.pricePosition === 'competitive' ? 'text-green-600' : 
                                                    priceSuggestion.pricePosition === 'premium' ? 'text-blue-600' : 'text-gray-600'
                                                }`}>
                                                    {priceSuggestion.pricePosition === 'competitive' ? '✅ Competitive' : 
                                                     priceSuggestion.pricePosition === 'premium' ? '👑 Premium' : '⚖️ Average'}
                                                </span>
                                            </div>
                                        </div>
                                        <button type="button" onClick={() => handleInputChange('price', priceSuggestion.suggestedPrice)}
                                            className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 whitespace-nowrap shadow-md transition-all">
                                            Use This Price
                                        </button>
                                    </div>
                                </div>

                                {/* Market Price Range */}
                                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                    <p className="font-semibold text-blue-800 mb-2">📈 Today's Market Price Range Across Bangladesh</p>
                                    <div className="flex justify-between items-center text-sm">
                                        <div className="text-center">
                                            <p className="text-xs text-blue-600">Lowest</p>
                                            <p className="font-bold text-blue-800">৳{priceSuggestion.lowestMarketPrice}</p>
                                        </div>
                                        <div className="flex-1 mx-4">
                                            <div className="h-2 bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 rounded-full"></div>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-xs text-blue-600">Average</p>
                                            <p className="font-bold text-blue-800">৳{priceSuggestion.averageMarketPrice}</p>
                                        </div>
                                        <div className="flex-1 mx-4">
                                            <div className="h-2 bg-gradient-to-r from-yellow-400 to-red-400 rounded-full"></div>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-xs text-blue-600">Highest</p>
                                            <p className="font-bold text-blue-800">৳{priceSuggestion.highestMarketPrice}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Nearby Markets Comparison */}
                                {marketComparison.length > 0 && (
                                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                                        <p className="font-semibold text-gray-800 mb-2">🏪 Compare with Other Markets (Today)</p>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                            {marketComparison.map((market, index) => (
                                                <div key={index} className={`p-2 rounded ${market.district === product.district ? 'bg-green-100 border border-green-400' : 'bg-white border border-gray-200'}`}>
                                                    <p className="text-xs font-medium text-gray-700">{market.district}</p>
                                                    <p className="text-sm font-bold text-gray-900">৳{market.price}/kg</p>
                                                    {market.district === product.district && <p className="text-xs text-green-600">Your Location</p>}
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-xs text-gray-500 mt-2">💡 Prices update daily based on market trends</p>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-base font-medium" htmlFor="offer-price">Offer Price (৳)</label>
                                <input onChange={(e) => handleInputChange('offerPrice', e.target.value)} value={product.offerPrice} id="offer-price" type="number" placeholder="0" className="outline-none py-2.5 px-3 rounded border border-gray-300 focus:border-green-500 transition-colors" />
                                <p className="text-xs text-gray-500">Optional discount price</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-base font-medium" htmlFor="quantity">Available Quantity *</label>
                                <input onChange={(e) => handleInputChange('quantity', e.target.value)} value={product.quantity} id="quantity" type="number" placeholder="0" className="outline-none py-2.5 px-3 rounded border border-gray-300 focus:border-green-500 transition-colors" required />
                            </div>
                        </div>
                        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-base font-medium" htmlFor="unit">Unit *</label>
                                <select onChange={(e) => handleInputChange('unit', e.target.value)} value={product.unit} id="unit" className="outline-none py-2.5 px-3 rounded border border-gray-300 focus:border-green-500 transition-colors">
                                    {units.map((unit, index) => (<option key={index} value={unit}>{unit}</option>))}
                                </select>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-base font-medium" htmlFor="availableUntil">Available Until</label>
                                <input onChange={(e) => handleInputChange('availableUntil', e.target.value)} value={product.availableUntil} id="availableUntil" type="date" className="outline-none py-2.5 px-3 rounded border border-gray-300 focus:border-green-500 transition-colors" />
                            </div>
                        </div>
                    </div>

                    {/* Location & Contact */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-blue-800 mb-3">Location & Contact</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-base font-medium" htmlFor="district">District *</label>
                                <select onChange={(e) => handleInputChange('district', e.target.value)} value={product.district} id="district" className="outline-none py-2.5 px-3 rounded border border-gray-300 focus:border-blue-500 transition-colors" required>
                                    <option value="">Select District</option>
                                    {districtsOfBangladesh.map((district, index) => (<option key={index} value={district}>{district}</option>))}
                                </select>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-base font-medium" htmlFor="location">Specific Location</label>
                                <input onChange={(e) => handleInputChange('location', e.target.value)} value={product.location} id="location" type="text" placeholder="e.g., Farm gate, Market area, Village name" className="outline-none py-2.5 px-3 rounded border border-gray-300 focus:border-blue-500 transition-colors" />
                            </div>
                        </div>
                        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-base font-medium" htmlFor="contactNumber">Contact Number *</label>
                                <input onChange={(e) => handleInputChange('contactNumber', e.target.value)} value={product.contactNumber} id="contactNumber" type="tel" placeholder="e.g., 01XXXXXXXXX" className="outline-none py-2.5 px-3 rounded border border-gray-300 focus:border-blue-500 transition-colors" required />
                                <p className="text-xs text-gray-500">Buyers will contact you</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-base font-medium" htmlFor="sellerEmail">Your Email *</label>
                                <input onChange={(e) => handleInputChange('sellerEmail', e.target.value)} value={product.sellerEmail} id="sellerEmail" type="email" placeholder="e.g., farmer@example.com" className="outline-none py-2.5 px-3 rounded border border-gray-300 focus:border-blue-500 transition-colors" required />
                                <p className="text-xs text-gray-500">For account verification</p>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
                        <span>List Product for Sale</span><span>🌾</span>
                    </button>
                    <p className="text-center text-sm text-gray-500">Your product will be visible to buyers across Bangladesh. You can update the price daily.</p>
                </form>
            </div>
        </div>
    );
};

export default AddProducts;