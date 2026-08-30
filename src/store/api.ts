import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { StorageWrapper } from '../core/storage';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.yourdomain.com';

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers) => {
    const token = StorageWrapper.getItemString('access_token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = StorageWrapper.getItemString('refresh_token');
    
    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: '/auth/refresh',
          method: 'POST',
          body: { refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        const data = refreshResult.data as { accessToken: string; refreshToken: string };
        StorageWrapper.setItem('access_token', data.accessToken);
        StorageWrapper.setItem('refresh_token', data.refreshToken);
        
        // Retry the initial query with the new token
        result = await baseQuery(args, api, extraOptions);
      } else {
        // Refresh token failed
        console.error('Refresh token failed. Logging out...');
        StorageWrapper.removeItem('access_token');
        StorageWrapper.removeItem('refresh_token');
      }
    } else {
      // No refresh token available
      StorageWrapper.removeItem('access_token');
    }
  }

  return result;
};

export const coreApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({
    // Add your endpoints here
  }),
});
