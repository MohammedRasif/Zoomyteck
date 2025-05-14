import { G } from "@react-pdf/renderer";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://192.168.10.124:1000/api/v1",
    prepareHeaders: (headers, { getState }) => {
        const accessToken = localStorage.getItem("access_token")
        console.log(accessToken);
        const token = getState().auth.token || accessToken
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        headers.set("Content-Type", "application/json");
        return headers;
    },
});

export const ApiSlice = createApi({
    reducerPath: "ApiSlice",
    baseQuery,
    tagTypes: ["question", "addQuestion", "Admin", "Copun", "subscrption", "draftProposal", "proposalList"],
    endpoints: (builder) => ({


         subscriptioncart: builder.query({
            query:()=> "/subscription/plan/list/",
        }),

        //checkout payment

        paymentCheckout: builder.mutation({
                query: (plan_id)=>({
                    url: "/subscription/checkout-session/",
                    method: "POST",
                   body: { plan_id: plan_id }
                })
        }),

        //getpayment info
        getPaymentInfo:builder.query({
            query: ()=>"/subscription/manage/",
            providesTags: ['subscription']
        }),

        //cancel subscription
        cancelSubscription: builder.mutation({
            query: ()=>({
                url: "/subscription/manage/",
                method: "POST",
            }),
            invalidatesTags: ['subscription']
        }),

        //get draft proposal
        getDraftProposal: builder.query({
            query: () => "/contract/draft-proposals/list/",
            providesTags: ['draftProposal']
        }),

        //get proposal list
        getProposalList: builder.query({
            query: ()=>"/contract/submitted-proposals/",
            providesTags: ['proposalList']
        }),

        //delete draft proposal
        deleteDraftProposal: builder.mutation({
            query: (id) => ({
                 url: `/contract/draft-proposals/delete/${id}/`,
                 method: "DELETE",
             }),
            invalidatesTags: ['draftProposal'],
            }),

            //password chaange
            changePassword: builder.mutation({
                query: (password) => ({
                    url: "/user/change-password/",
                    method: "POST",
                    body: password,
                }),
            }),



    }),
});


// Export hooks for usage in components
export const { 
    useSubscriptioncartQuery,
    usePaymentCheckoutMutation,
    useGetPaymentInfoQuery,
    useCancelSubscriptionMutation,
    useGetDraftProposalQuery,
    useGetProposalListQuery,

    useDeleteDraftProposalMutation,

    useChangePasswordMutation,
    
 } = ApiSlice;

export default ApiSlice;

