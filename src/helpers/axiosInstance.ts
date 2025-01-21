import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken');
      
      if (refreshToken) {
        try {
          const { data } = await axios.post('/refresh-token', { refreshToken });
          localStorage.setItem('accessToken', data.accessToken);
          error.config.headers['Authorization'] = `Bearer ${data.accessToken}`;
          return axiosInstance(error.config);
        } catch (refreshError) {
          console.error('Refresh token failed:', refreshError);
          window.location.href = '/login';
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;