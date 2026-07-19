// src/pages/AdminSchemes.jsx
import React, { useState, useEffect } from 'react';
import { schemeService } from '../services/schemeService';

const AdminSchemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingScheme, setEditingScheme] = useState(null);
  const [formData, setFormData] = useState({
    schemeName: '',
    description: '',
    category: '',
    district: '',
    amount: '',
    deadline: '',
    cropType: '',
    farmerType: '',
    ministry: '',
    eligibility: [],
    benefits: [],
    documents: [],
    applicationSteps: [],
    applyLink: '',
    faqs: [],
    isFeatured: false,
    status: 'active',
    popularity: 0,
  });
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    setLoading(true);
    try {
      const data = await schemeService.getAll({ status: 'all', limit: 100 });
      if (data.success) {
        setSchemes(data.schemes);
      }
    } catch (error) {
      console.error('Error fetching schemes:', error);
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleArrayInput = (field, value) => {
    const arr = value.split(',').map(item => item.trim()).filter(item => item);
    setFormData(prev => ({ ...prev, [field]: arr }));
  };

  const handleFaqChange = (index, field, value) => {
    const updatedFaqs = [...formData.faqs];
    updatedFaqs[index][field] = value;
    setFormData(prev => ({ ...prev, faqs: updatedFaqs }));
  };

  const addFaq = () => {
    setFormData(prev => ({
      ...prev,
      faqs: [...prev.faqs, { question: '', answer: '' }]
    }));
  };

  const removeFaq = (index) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index)
    }));
  };

  const resetForm = () => {
    setFormData({
      schemeName: '',
      description: '',
      category: '',
      district: '',
      amount: '',
      deadline: '',
      cropType: '',
      farmerType: '',
      ministry: '',
      eligibility: [],
      benefits: [],
      documents: [],
      applicationSteps: [],
      applyLink: '',
      faqs: [],
      isFeatured: false,
      status: 'active',
      popularity: 0,
    });
    setEditingScheme(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      let response;
      if (editingScheme) {
        response = await schemeService.update(editingScheme._id, formData);
      } else {
        response = await schemeService.create(formData);
      }
      if (response.success) {
        setMessage({ type: 'success', text: `Scheme ${editingScheme ? 'updated' : 'created'} successfully!` });
        resetForm();
        fetchSchemes();
      } else {
        setMessage({ type: 'error', text: response.message || 'Operation failed' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'An error occurred' });
    }
  };

  const handleEdit = (scheme) => {
    setFormData({
      schemeName: scheme.schemeName || '',
      description: scheme.description || '',
      category: scheme.category || '',
      district: scheme.district || '',
      amount: scheme.amount || '',
      deadline: scheme.deadline || '',
      cropType: scheme.cropType || '',
      farmerType: scheme.farmerType || '',
      ministry: scheme.ministry || '',
      eligibility: scheme.eligibility || [],
      benefits: scheme.benefits || [],
      documents: scheme.documents || [],
      applicationSteps: scheme.applicationSteps || [],
      applyLink: scheme.applyLink || '',
      faqs: scheme.faqs || [],
      isFeatured: scheme.isFeatured || false,
      status: scheme.status || 'active',
      popularity: scheme.popularity || 0,
    });
    setEditingScheme(scheme);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this scheme?')) return;
    try {
      const response = await schemeService.delete(id);
      if (response.success) {
        setMessage({ type: 'success', text: 'Scheme deleted successfully!' });
        fetchSchemes();
      } else {
        setMessage({ type: 'error', text: response.message || 'Delete failed' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-700">📋 Manage Government Schemes</h1>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          + Add New Scheme
        </button>
      </div>

      {message && (
        <div className={`mb-4 p-3 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.text}
        </div>
      )}

      {showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">{editingScheme ? 'Edit Scheme' : 'Add New Scheme'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="schemeName"
                value={formData.schemeName}
                onChange={handleInputChange}
                placeholder="Scheme Name *"
                className="p-2 border rounded-lg"
                required
              />
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="p-2 border rounded-lg"
                required
              >
                <option value="">Select Category *</option>
                <option value="Subsidy">Subsidy</option>
                <option value="Loan">Loan</option>
                <option value="Training">Training</option>
                <option value="Seed Distribution">Seed Distribution</option>
                <option value="Fertilizer Support">Fertilizer Support</option>
                <option value="Financial Support">Financial Support</option>
                <option value="Market Support">Market Support</option>
              </select>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                placeholder="District (or 'All districts')"
                className="p-2 border rounded-lg"
              />
              <input
                type="text"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="Amount (e.g., ₹6,000/year)"
                className="p-2 border rounded-lg"
              />
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleInputChange}
                className="p-2 border rounded-lg"
                required
              />
              <input
                type="text"
                name="cropType"
                value={formData.cropType}
                onChange={handleInputChange}
                placeholder="Crop Type (e.g., Rice, Wheat)"
                className="p-2 border rounded-lg"
              />
              <input
                type="text"
                name="farmerType"
                value={formData.farmerType}
                onChange={handleInputChange}
                placeholder="Farmer Type (e.g., Small, Marginal)"
                className="p-2 border rounded-lg"
              />
              <input
                type="text"
                name="ministry"
                value={formData.ministry}
                onChange={handleInputChange}
                placeholder="Ministry"
                className="p-2 border rounded-lg"
              />
              <input
                type="text"
                name="applyLink"
                value={formData.applyLink}
                onChange={handleInputChange}
                placeholder="Apply Link (URL)"
                className="p-2 border rounded-lg"
              />
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleInputChange}
                  />
                  Featured
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="p-2 border rounded-lg"
                >
                  <option value="active">Active</option>
                  <option value="expired">Expired</option>
                  <option value="draft">Draft</option>
                </select>
                <input
                  type="number"
                  name="popularity"
                  value={formData.popularity}
                  onChange={handleInputChange}
                  placeholder="Popularity (0-100)"
                  className="p-2 border rounded-lg w-24"
                />
              </div>
            </div>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Description"
              className="w-full p-2 border rounded-lg"
              rows="3"
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">Eligibility (comma separated)</label>
                <input
                  type="text"
                  value={formData.eligibility.join(', ')}
                  onChange={(e) => handleArrayInput('eligibility', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="e.g., Small farmers, Aadhaar required"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Benefits (comma separated)</label>
                <input
                  type="text"
                  value={formData.benefits.join(', ')}
                  onChange={(e) => handleArrayInput('benefits', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="e.g., ₹6000/year, Direct transfer"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Documents (comma separated)</label>
                <input
                  type="text"
                  value={formData.documents.join(', ')}
                  onChange={(e) => handleArrayInput('documents', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="e.g., Aadhaar, Land records"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Application Steps (comma separated)</label>
                <input
                  type="text"
                  value={formData.applicationSteps.join(', ')}
                  onChange={(e) => handleArrayInput('applicationSteps', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Step 1, Step 2, ..."
                />
              </div>
            </div>

            <div>
              <label className="block font-medium mb-1">FAQs</label>
              {formData.faqs.map((faq, index) => (
                <div key={index} className="flex gap-2 mb-2 items-center">
                  <input
                    type="text"
                    placeholder="Question"
                    value={faq.question}
                    onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
                    className="flex-1 p-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Answer"
                    value={faq.answer}
                    onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
                    className="flex-1 p-2 border rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeFaq(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addFaq}
                className="text-green-600 hover:underline"
              >
                + Add FAQ
              </button>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                {editingScheme ? 'Update Scheme' : 'Create Scheme'}
              </button>
              <button
                type="button"
                onClick={() => { resetForm(); setShowForm(false); }}
                className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {schemes.map((scheme) => (
          <div key={scheme._id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700 flex flex-wrap items-center justify-between">
            <div className="flex-1 min-w-[200px]">
              <h3 className="text-lg font-semibold">{scheme.schemeName}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{scheme.category} • {scheme.district}</p>
              <p className="text-sm text-gray-500">Status: {scheme.status} {scheme.isFeatured && '⭐ Featured'}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(scheme)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(scheme._id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSchemes;