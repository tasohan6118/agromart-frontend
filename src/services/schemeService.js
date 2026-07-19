// // src/services/schemeService.js
// const API_URL = 'http://localhost:5000/api';

// export const schemeService = {
//   // Get all schemes with filters
//   getAll: async (filters = {}) => {
//     const params = new URLSearchParams(filters).toString();
//     const response = await fetch(`${API_URL}/schemes?${params}`);
//     return response.json();
//   },
  
//   // Get single scheme by ID
//   getById: async (id) => {
//     const response = await fetch(`${API_URL}/schemes/${id}`);
//     return response.json();
//   },
  
//   // Create new scheme (admin only)
//   create: async (data) => {
//     const response = await fetch(`${API_URL}/schemes`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data)
//     });
//     return response.json();
//   },
  
//   // Update scheme (admin only)
//   update: async (id, data) => {
//     const response = await fetch(`${API_URL}/schemes/${id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data)
//     });
//     return response.json();
//   },
  
//   // Delete scheme (admin only)
//   delete: async (id) => {
//     const response = await fetch(`${API_URL}/schemes/${id}`, {
//       method: 'DELETE'
//     });
//     return response.json();
//   },
  
//   // Get categories for filters
//   getCategories: async () => {
//     const response = await fetch(`${API_URL}/schemes/categories`);
//     return response.json();
//   },
  
//   // Get statistics
//   getStats: async () => {
//     const response = await fetch(`${API_URL}/schemes/stats`);
//     return response.json();
//   }
// };
// src/services/schemeService.js
// const API_BASE = '/api/schemes'; // adjust

// export const schemeService = {
//   // Get all schemes with filters and pagination
//   getAll: async (params) => {
//     // Build query string
//     const query = new URLSearchParams(params).toString();
//     const response = await fetch(`${API_BASE}?${query}`);
//     return response.json();
//   },

//   // Get a single scheme by ID
//   getById: async (id) => {
//     const response = await fetch(`${API_BASE}/${id}`);
//     return response.json();
//   },

//   // Highlight endpoints (could be separate or part of getAll)
//   getFeatured: async () => {
//     const response = await fetch(`${API_BASE}/featured`);
//     return response.json();
//   },
//   getRecent: async ({ limit = 4 } = {}) => {
//     const response = await fetch(`${API_BASE}/recent?limit=${limit}`);
//     return response.json();
//   },
//   getPopular: async ({ limit = 4 } = {}) => {
//     const response = await fetch(`${API_BASE}/popular?limit=${limit}`);
//     return response.json();
//   },
//   getExpiring: async ({ limit = 4 } = {}) => {
//     const response = await fetch(`${API_BASE}/expiring?limit=${limit}`);
//     return response.json();
//   },
// };


// src/services/schemeService.js

// ⚙️ Set this to your backend URL (change port if needed)
const API_BASE = 'http://localhost:5000/api/schemes';

/**
 * Parse response text as JSON with error handling.
 */
const handleResponse = async (response) => {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch (e) {
    console.error('❌ Server returned invalid JSON. Raw response (first 200 chars):', text.substring(0, 200));
    throw new Error('Server returned invalid JSON. Check API URL and CORS.');
  }
};

/**
 * Build a query string from an object of parameters.
 */
const buildQuery = (params) => {
  const query = new URLSearchParams();
  Object.keys(params).forEach(key => {
    if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
      query.append(key, params[key]);
    }
  });
  return query.toString();
};

export const schemeService = {
  /**
   * Get all schemes with filters, pagination, and sorting.
   */
  getAll: async (params = {}) => {
    const queryString = buildQuery(params);
    const url = queryString ? `${API_BASE}?${queryString}` : API_BASE;
    console.log('🔍 Fetching schemes from:', url);
    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
    return handleResponse(response);
  },

  /**
   * Get a single scheme by ID.
   */
  getById: async (id) => {
    const response = await fetch(`${API_BASE}/${id}`);
    return handleResponse(response);
  },

  /**
   * Get featured schemes.
   */
  getFeatured: async (options = { limit: 4 }) => {
    const params = { featured: true, limit: options.limit };
    const queryString = buildQuery(params);
    const response = await fetch(`${API_BASE}?${queryString}`);
    const data = await handleResponse(response);
    return data.schemes || data;
  },

  /**
   * Get recently added schemes.
   */
  getRecent: async (options = { limit: 4 }) => {
    const params = { sort: 'createdAt', order: 'desc', limit: options.limit };
    const queryString = buildQuery(params);
    const response = await fetch(`${API_BASE}?${queryString}`);
    const data = await handleResponse(response);
    return data.schemes || data;
  },

  /**
   * Get popular schemes.
   */
  getPopular: async (options = { limit: 4 }) => {
    const params = { sort: 'popularity', order: 'desc', limit: options.limit };
    const queryString = buildQuery(params);
    const response = await fetch(`${API_BASE}?${queryString}`);
    const data = await handleResponse(response);
    return data.schemes || data;
  },

  /**
   * Get expiring soon schemes.
   */
  getExpiring: async (options = { limit: 4 }) => {
    const params = { sort: 'deadline', order: 'asc', limit: options.limit };
    const queryString = buildQuery(params);
    const response = await fetch(`${API_BASE}?${queryString}`);
    const data = await handleResponse(response);
    return data.schemes || data;
  },

  // ========== ADMIN CRUD OPERATIONS ==========

  /**
   * Create a new scheme.
   */
  create: async (schemeData) => {
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(schemeData),
    });
    return handleResponse(response);
  },

  /**
   * Update an existing scheme.
   */
  update: async (id, schemeData) => {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(schemeData),
    });
    return handleResponse(response);
  },

  /**
   * Delete a scheme.
   */
  delete: async (id) => {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },
};