const API_BASE = 'http://localhost:5001/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('agrirent_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

const handleResponse = async (response) => {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const errorMsg = data.message || `Request failed with status ${response.status}`;
    throw new Error(errorMsg);
  }
  return data;
};

export const api = {
  auth: {
    login: async (email, password) => {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      return handleResponse(res);
    },
    register: async (userData) => {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      return handleResponse(res);
    },
    getMe: async () => {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: getAuthHeaders()
      });
      return handleResponse(res);
    },
    updateProfile: async (profileData) => {
      const res = await fetch(`${API_BASE}/auth/profile`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(profileData)
      });
      return handleResponse(res);
    }
  },

  equipment: {
    getAll: async (params = {}) => {
      const query = new URLSearchParams();
      Object.entries(params).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== '') {
          query.append(key, val);
        }
      });
      const url = `${API_BASE}/equipment${query.toString() ? `?${query.toString()}` : ''}`;
      const res = await fetch(url);
      return handleResponse(res);
    },
    getById: async (id) => {
      const res = await fetch(`${API_BASE}/equipment/${id}`);
      return handleResponse(res);
    },
    create: async (data) => {
      const res = await fetch(`${API_BASE}/equipment`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      return handleResponse(res);
    },
    update: async (id, data) => {
      const res = await fetch(`${API_BASE}/equipment/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
      });
      return handleResponse(res);
    },
    delete: async (id) => {
      const res = await fetch(`${API_BASE}/equipment/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      return handleResponse(res);
    },
    toggleAvailability: async (id) => {
      const res = await fetch(`${API_BASE}/equipment/${id}/availability`, {
        method: 'PATCH',
        headers: getAuthHeaders()
      });
      return handleResponse(res);
    },
    getOwnerFleet: async () => {
      const res = await fetch(`${API_BASE}/equipment/owner/fleet`, {
        headers: getAuthHeaders()
      });
      return handleResponse(res);
    }
  },

  categories: {
    getAll: async () => {
      const res = await fetch(`${API_BASE}/categories`);
      return handleResponse(res);
    }
  },

  bookings: {
    create: async (bookingData) => {
      const res = await fetch(`${API_BASE}/bookings`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(bookingData)
      });
      return handleResponse(res);
    },
    getMyBookings: async () => {
      const res = await fetch(`${API_BASE}/bookings/my`, {
        headers: getAuthHeaders()
      });
      return handleResponse(res);
    },
    getOwnerBookings: async () => {
      const res = await fetch(`${API_BASE}/bookings/owner`, {
        headers: getAuthHeaders()
      });
      return handleResponse(res);
    },
    updateStatus: async (id, status) => {
      const res = await fetch(`${API_BASE}/bookings/${id}/status`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status })
      });
      return handleResponse(res);
    }
  },

  favorites: {
    getAll: async () => {
      const res = await fetch(`${API_BASE}/favorites`, {
        headers: getAuthHeaders()
      });
      return handleResponse(res);
    },
    toggle: async (id) => {
      const res = await fetch(`${API_BASE}/favorites/${id}`, {
        method: 'POST',
        headers: getAuthHeaders()
      });
      return handleResponse(res);
    }
  },

  contact: {
    submit: async (messageData) => {
      const res = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(messageData)
      });
      return handleResponse(res);
    }
  },

  articles: {
    getAll: async (params = {}) => {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${API_BASE}/articles${query ? `?${query}` : ''}`);
      return handleResponse(res);
    },
    getBySlug: async (slug) => {
      const res = await fetch(`${API_BASE}/articles/${slug}`);
      return handleResponse(res);
    }
  },

  stats: {
    getPlatform: async () => {
      const res = await fetch(`${API_BASE}/stats/platform`);
      return handleResponse(res);
    },
    getOwner: async () => {
      const res = await fetch(`${API_BASE}/stats/owner`, {
        headers: getAuthHeaders()
      });
      return handleResponse(res);
    },
    getFarmer: async () => {
      const res = await fetch(`${API_BASE}/stats/farmer`, {
        headers: getAuthHeaders()
      });
      return handleResponse(res);
    }
  }
};

export default api;
