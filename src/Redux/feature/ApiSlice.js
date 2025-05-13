import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://192.168.10.124:1000/api/v1",
    prepareHeaders: (headers, { getState }) => {
        const accessToken = localStorage.getItem("access_token");
        console.log(accessToken);
        const token = getState().auth.token || accessToken;
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
    tagTypes: ["question", "addQuestion", "Admin", "Copun", "subscrption", "contract",'proposal','deatils'],
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
} = ApiSlice;

export default ApiSlice;