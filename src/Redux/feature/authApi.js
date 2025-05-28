

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseApiUrl } from "./ApiSlice";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseApiUrl, // ✅ Update this with your backend URL
    }),
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: "/user/signup/", // ✅ Your API endpoint
                method: "POST",
                body: data, // ✅ Sending email & password
            }),
        }),

        registerVerification: builder.mutation({
            query: (data) => ({
                url: "/user/activate/",
                method: "POST",
                body: data,
            })
        }),

        login: builder.mutation({
            query: (data) => ({
                url: "/user/login/",
                method: "POST",
                body: data,
            })
        }),

        forgetPassword: builder.mutation({
            query: (data) => ({
                url: "/user/password-reset-request/",
                method: "POST",
                body: data,
            })
        }),

        forgetpasswordVerification: builder.mutation({
            query: (data) => ({
                url: "/user/reset-request-activate/",
                method: "POST",
                body: data,
            })
        }),
        forgetRecentVerification: builder.mutation({
            query: (data) => ({
                url: "/user/resend-otp/",
                method: "POST",
                body: data,
            })
        }),
        confrimPassword: builder.mutation({
            query: (data) => ({
                url: "/user/reset-password/",
                method: "POST",
                body: data,
            })
        }),
       
    }),
});

// ✅ Destructure the auto-generated hook
export const { useRegisterMutation, useRegisterVerificationMutation, useLoginMutation, useForgetPasswordMutation, useForgetpasswordVerificationMutation, useConfrimPasswordMutation, useForgetRecentVerificationMutation } = authApi;
export default authApi;
