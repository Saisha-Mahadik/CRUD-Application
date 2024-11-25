import axios from 'axios';

const API = axios.create({
    baseURL: 'https://crud-application-backend-dvd1.onrender.com/api/posts' 
});

export const fetchPosts = () => API.get('/');
export const createPost = (data) => API.post('/', data, { headers: { 'Content-Type': 'multipart/form-data' } });
export const updatePost = (id, data) => API.put(`/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
export const deletePost = (id) => API.delete(`/${id}`);

