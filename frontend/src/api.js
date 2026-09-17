import axios from 'axios';

const API_BASE = 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

export const getStudents = (search = '') =>
  api.get(`/students/${search ? `?search=${encodeURIComponent(search)}` : ''}`);

export const getStudent = (id) => api.get(`/students/${id}/`);

export const createStudent = (data) => api.post('/students/', data);

export const updateStudent = (id, data) => api.put(`/students/${id}/`, data);

export const deleteStudent = (id) => api.delete(`/students/${id}/`);

export default api;
