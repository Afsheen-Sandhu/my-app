import { apiSlice } from '../api/api';
import { User, LoginRequest, LoginResponse } from '@/types/user';

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<User, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'get',
      }),
      transformResponse: (response: User) => {
        console.log('Fetched user:', response);
        return response;
      },
      providesTags: ['User'],
    }),

    loginUser: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: '/auth/login',
        method: 'post',
        data: body,
      }),
      invalidatesTags: ['User'],
    }),
  }),

  overrideExisting: false,
});

export const { useGetUserQuery, useLoginUserMutation } = userApi;
