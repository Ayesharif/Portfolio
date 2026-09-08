const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const TOKEN_STORAGE_KEY = 'ayesh_jwt_token';

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Use sessionStorage for session credentials
  const token = typeof window !== 'undefined' ? sessionStorage.getItem(TOKEN_STORAGE_KEY) : null;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  // Attach Bearer token if available
  if (token && !headers['Authorization']) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
    credentials: 'include' // sends httpOnly cookies automatically
  };

  if (options.body && typeof options.body === 'object') {
    config.body = JSON.stringify(options.body);
  }

  const response = await fetch(url, config);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }
  return data;
}

export const authAPI = {
  register: async (userData) => {
    const res = await request('/auth/register', { method: 'POST', body: userData });
    if (res?.token && typeof window !== 'undefined') {
      sessionStorage.setItem(TOKEN_STORAGE_KEY, res.token);
    }
    return res;
  },
  login: async (credentials) => {
    const res = await request('/auth/login', { method: 'POST', body: credentials });
    if (res?.token && typeof window !== 'undefined') {
      sessionStorage.setItem(TOKEN_STORAGE_KEY, res.token);
    }
    return res;
  },
  logout: async () => {
    try {
      await request('/auth/logout', { method: 'POST' });
    } finally {
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem(TOKEN_STORAGE_KEY);
      }
    }
  },
  getMe: () => request('/auth/me', { method: 'GET' })
};

export const profileAPI = {
  get: () => request('/profile', { method: 'GET' }),
  update: (data) => request('/profile', { method: 'PUT', body: data })
};

export const experienceAPI = {
  getAll: () => request('/experience', { method: 'GET' }),
  create: (data) => request('/experience', { method: 'POST', body: data }),
  update: (id, data) => request(`/experience/${id}`, { method: 'PUT', body: data }),
  delete: (id) => request(`/experience/${id}`, { method: 'DELETE' })
};

export const projectAPI = {
  getAll: (params = '') => request(`/projects${params ? `?${params}` : ''}`, { method: 'GET' }),
  create: (data) => request('/projects', { method: 'POST', body: data }),
  update: (id, data) => request(`/projects/${id}`, { method: 'PUT', body: data }),
  delete: (id) => request(`/projects/${id}`, { method: 'DELETE' })
};

export const skillAPI = {
  getAll: () => request('/skills', { method: 'GET' }),
  create: (data) => request('/skills', { method: 'POST', body: data }),
  update: (id, data) => request(`/skills/${id}`, { method: 'PUT', body: data }),
  delete: (id) => request(`/skills/${id}`, { method: 'DELETE' })
};

export const certificationAPI = {
  getAll: () => request('/certifications', { method: 'GET' }),
  create: (data) => request('/certifications', { method: 'POST', body: data }),
  update: (id, data) => request(`/certifications/${id}`, { method: 'PUT', body: data }),
  delete: (id) => request(`/certifications/${id}`, { method: 'DELETE' })
};

export const educationAPI = {
  getAll: () => request('/education', { method: 'GET' }),
  create: (data) => request('/education', { method: 'POST', body: data }),
  update: (id, data) => request(`/education/${id}`, { method: 'PUT', body: data }),
  delete: (id) => request(`/education/${id}`, { method: 'DELETE' })
};

export const messageAPI = {
  send: (data) => request('/messages', { method: 'POST', body: data }),
  getAll: () => request('/messages', { method: 'GET' }),
  markAsRead: (id, isRead = true) => request(`/messages/${id}/read`, { method: 'PUT', body: { isRead } }),
  delete: (id) => request(`/messages/${id}`, { method: 'DELETE' })
};

export const healthAPI = {
  check: () => request('/health', { method: 'GET' })
};

export const seedAPI = {
  seedDatabase: () => request('/seed', { method: 'POST' })
};

export const uploadAPI = {
  uploadSingle: async (file, folder = 'portfolio') => {
    const formData = new FormData();
    formData.append('image', file);
    if (folder) formData.append('folder', folder);

    const token = typeof window !== 'undefined' ? sessionStorage.getItem(TOKEN_STORAGE_KEY) : null;
    const headers = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/upload/single`, {
      method: 'POST',
      headers,
      body: formData,
      credentials: 'include'
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || `Upload failed with status ${response.status}`);
    }
    return data;
  },

  uploadMultiple: async (files, folder = 'portfolio') => {
    const formData = new FormData();
    const fileList = Array.from(files);
    fileList.forEach((file) => {
      formData.append('images', file);
    });
    if (folder) formData.append('folder', folder);

    const token = typeof window !== 'undefined' ? sessionStorage.getItem(TOKEN_STORAGE_KEY) : null;
    const headers = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/upload/multiple`, {
      method: 'POST',
      headers,
      body: formData,
      credentials: 'include'
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || `Upload failed with status ${response.status}`);
    }
    return data;
  }
};

