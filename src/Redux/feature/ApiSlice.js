import { G } from "@react-pdf/renderer";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseUrl = "https://zoomytech.duckdns.org";
export const baseApiUrl = `${baseUrl}/api/v1`

const baseQuery = fetchBaseQuery({
    baseUrl: baseApiUrl,
    prepareHeaders: (headers, { getState, endpoint }) => {
        const accessToken = localStorage.getItem("access_token");
        console.log(accessToken);
        const token = getState().auth.token || accessToken;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        if(endpoint !== "submitDeatils") {
            headers.set("Content-Type", "application/json");
        }
        return headers;
    },
});

export const ApiSlice = createApi({
    reducerPath: "ApiSlice",
    baseQuery,
    tagTypes: ["question", "addQuestion", "Admin", "Copun", "subscrption", "contract", 'proposal', 'deatils'],
    endpoints: (builder) => ({
        // Existing Endpoints
        getContactList: builder.query({
            query: () => "/contract/recent/list/",
        }),

        getGeneralInformation: builder.query({
            query: (id) => `/contract/details/${id}/`,
        }),
        getCompantDeatils: builder.query({
            query: () => "/user/get_company_details/",
        }),

        getContractProposalDeatils: builder.query({
            query: (id) => `/contract/proposal/${id}/`,
        }),

        submitProposal: builder.mutation({
            query: (data) => ({
                url: "/contract/proposal_pdf/",
                method: "POST",
                body: data,
            })
        }),
        // New POST Endpoint for Requirements Analysis
        submitRequirementsAnalysis: builder.mutation({
            query: (data) => ({
                url: "/contract/requirements-analysis/",
                method: "POST",
                body: data, // Expects { notice_id: string }
            }),
            invalidatesTags: ["contract"], // Invalidate contract-related cache
        }),
        submitgenarateProposal: builder.mutation({
            query: (data) => ({
                url: "/contract/generate-proposal/",
                method: "POST",
                body: data, // Expects { notice_id: string }
            }),
            invalidatesTags: ["proposal"], // Invalidate contract-related cache
        }),

        saveDrafte: builder.mutation({
            query: (data) => ({
                url: "/contract/draft-proposals/save/",
                method: "POST",
                body: data, // Expects { notice_id: string }
            }),
            invalidatesTags: ["proposal"], // Invalidate contract-related cache
        }),
        submitDeatils: builder.mutation({
            query: (data) => ({
                url: "/user/update-company-details/",
                method: "PUT",
                body: data, // Expects { notice_id: string }
            }),
            invalidatesTags: ["deatils"], // Invalidate contract-related cache
        }),
        // Edit Proposal (PUT)
        editGenerateProposal: builder.mutation({
            query: (data) => ({
                url: "/contract/proposal/", // Include proposal_id in URL
                method: "PUT",
                body: data, // Expects { proposal_id: string, notice_id: string, description: string, amount: string }
            }),
            invalidatesTags: ["proposal", "contract"],
        }),

        subscriptioncart: builder.query({
            query: () => "/subscription/plan/list/",
        }),

        //checkout payment

        paymentCheckout: builder.mutation({
            query: (plan_id) => ({
                url: "/subscription/checkout-session/",
                method: "POST",
                body: { plan_id: plan_id }
            })
        }),

        //getpayment info
        getPaymentInfo: builder.query({
            query: () => "/subscription/manage/",
            providesTags: ['subscription']
        }),

        //cancel subscription
        cancelSubscription: builder.mutation({
            query: () => ({
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
            query: () => "/contract/submitted-proposals/",
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
        getProfile: builder.query({
            query: () => "/user/profile/"
        }),



        updateUserProfile: builder.mutation({
            query: (formData) => ({
                url: 'user/update-profile/',
                method: 'PUT',
                body: formData,
            }),
            invalidatesTags: ['UserProfile'], // Refetch profile after update
        }),
        // Change password (already exists)
        changePassword: builder.mutation({
            query: (data) => ({
                url: 'user/change-password/',
                method: 'POST',
                body: data,
            }),
        }),





    }),
});

// Export hooks for usage in components
export const {
    useGetContactListQuery,
    useGetGeneralInformationQuery,
    useSubmitRequirementsAnalysisMutation, // Export the new mutation hook
    useSubmitgenarateProposalMutation,
    useEditGenerateProposalMutation,
    useSubmitDeatilsMutation,
    useGetCompantDeatilsQuery,
    useSaveDrafteMutation,
    useSubscriptioncartQuery,
    usePaymentCheckoutMutation,
    useGetPaymentInfoQuery,
    useCancelSubscriptionMutation,
    useGetDraftProposalQuery,
    useGetProposalListQuery,
    useGetProfileQuery,
    useDeleteDraftProposalMutation,
    useUpdateUserProfileMutation,
    useChangePasswordMutation,

    useGetContractProposalDeatilsQuery,
    useSubmitProposalMutation,
} = ApiSlice;





