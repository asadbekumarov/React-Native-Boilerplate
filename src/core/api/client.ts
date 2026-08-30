import axios from 'axios';
import { StorageWrapper } from '@/core/storage';
import { useAuthStore } from '@/store/useAuthStore';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.yourdomain.com';

/**
 * Axios instance with automatic token management and refresh logic.
 * 
 * - Request interceptor: Attaches Bearer token from MMKV storage
 * - Response interceptor: On 401, attempts token refresh via /auth/refresh,
 *   then retries the original request. On refresh failure, triggers logout
 *   through useAuthStore to keep both MMKV and Zustand state in sync.
 */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Flag to prevent multiple simultaneous refresh attempts
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

// Request Interceptor — attach access token
apiClient.interceptors.request.use(
  (config) => {
    const token = StorageWrapper.getItemString('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor — handle 401 + token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only handle 401 errors that haven't already been retried
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // If already refreshing, queue this request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    const refreshToken = StorageWrapper.getItemString('refresh_token');

    if (!refreshToken) {
      isRefreshing = false;
      processQueue(new Error('No refresh token'), null);
      // Use useAuthStore.getState().logout() to sync both MMKV and Zustand state
      useAuthStore.getState().logout();
      return Promise.reject(error);
    }

    try {
      // Use a fresh axios instance to avoid interceptor loops
      const refreshResponse = await axios.post(`${API_BASE_URL}/auth/refresh`, {
        refreshToken,
      });

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = refreshResponse.data;

      StorageWrapper.setItem('access_token', newAccessToken);
      StorageWrapper.setItem('refresh_token', newRefreshToken);

      processQueue(null, newAccessToken);

      // Retry original request with new token
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return apiClient(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      // Logout via Zustand to ensure both MMKV and UI state are cleaned up
      useAuthStore.getState().logout();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);
