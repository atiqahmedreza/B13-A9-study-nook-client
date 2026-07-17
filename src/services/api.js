import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || error.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

export const authAPI = {
  login: (payload) => api.post('/auth/login', payload),
  register: (payload) => api.post('/auth/register', payload),
  me: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout'),
};

export const roomsAPI = {
  getAll: (params) => api.get('/rooms', { params }),
  getLatest: () => api.get('/rooms/latest'),
  getById: (id) => api.get(`/rooms/${id}`),
  getMyListings: () => api.get('/rooms/my-listings'),
  create: (data) => api.post('/rooms', data),
  update: (id, data) => api.put(`/rooms/${id}`, data),
  remove: (id) => api.delete(`/rooms/${id}`),
};

export const bookingsAPI = {
  create: (data) => api.post('/bookings', data),
  getMine: () => api.get('/bookings/my-bookings'),
  cancel: (id) => api.patch(`/bookings/${id}/cancel`),
};

export default api;
