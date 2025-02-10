import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Contact from '../../model/contact';

const contactAPIHeader = { "content-type": "application/json" }
const baseUrl = "https://randomuser.me/api/"
const createRequest = (url: string) => ({url, headers: contactAPIHeader})

export const contactAPI = createApi({
    reducerPath: "contactAPI",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        fetchContact: builder.query<Contact[], number>({
            query: (results) => createRequest(`?results=${results}`),
            transformResponse: (response: any, meta) => {
                if (meta && meta.response?.status !== 200) {
                    throw new Error('Failed to fetch contacts');
                }
                return response;
            }
        })
    })
});

export const { useFetchContactQuery } = contactAPI;
