import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface User {
  id: number;
  fullName: string;
  email: string;
  username: string;
  password: string;
}

export interface NewUser {
  fullName: string;
  email: string;
  username: string;
  password: string;
}

// model User {
//   id        String   @id @unique
//   fullName  String
//   username  String   @unique
//   password  String
//   email     String
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt
// }

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: "api",
  tagTypes: ["Users"],
  endpoints: (build) => ({
    getUsers: build.query<User[], void>({
      query: () => "/authors",
      providesTags: ["Users"],
    }),
    createUser: build.mutation<User[], NewUser>({
      query: (newUser) => ({
        url: "/auth/login",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
} = api;
