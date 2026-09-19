import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Request interceptor - attach JWT token
API.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const { token } = JSON.parse(userInfo);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle 401 (auto-logout)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('userInfo');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// ============ AUTH API ============
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const getProfile = () => API.get('/auth/profile');
export const updateProfile = (data) => API.put('/auth/profile', data);
export const uploadPhoto = (formData) =>
  API.post('/auth/upload-photo', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

// ============ RESUME API ============
export const createResume = (data) => API.post('/resumes', data);
export const getResumes = (search = '') =>
  API.get(`/resumes${search ? `?search=${search}` : ''}`);
export const getResumeById = (id) => API.get(`/resumes/${id}`);
export const updateResume = (id, data) => API.put(`/resumes/${id}`, data);
export const deleteResume = (id) => API.delete(`/resumes/${id}`);
export const duplicateResume = (id) => API.post(`/resumes/${id}/duplicate`);
export const getSharedResume = (slug) => API.get(`/resumes/shared/${slug}`);
export const incrementDownload = (id) => API.put(`/resumes/${id}/download`);

// ============ ADMIN API ============
export const getAllUsers = () => API.get('/admin/users');
export const deleteUser = (id) => API.delete(`/admin/users/${id}`);
export const getAdminStats = () => API.get('/admin/stats');
export const getAdminTemplates = () => API.get('/admin/templates');
export const toggleTemplate = (id) => API.put(`/admin/templates/${id}`);

export default API;
