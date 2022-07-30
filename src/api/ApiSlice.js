import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3030' }),
    tagTypes: ['Contacts'],
    endpoints: (builder) => ({
        getContacts: builder.query({
            query: () => '/contacts',
            transformResponse: res => res.sort((a, b) => b.id - a.id),
            providesTags: ['Contacts']
        }),
        addContact: builder.mutation({
            query: (contact) => ({
                url: '/contacts',
                method: 'POST',
                body: contact
            }),
            invalidatesTags: ['Contacts']
        }),
        updateContact: builder.mutation({
            query: (contact) => ({
                url: `/contacts/${contact.id}`,
                method: 'PATCH',
                body: contact
            }),
            invalidatesTags: ['Contacts']
        }),
        deleteContact: builder.mutation({
            query: ({ id }) => ({
                url: `/contacts/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ['Contacts']
        }),
    })
})

export const {
    useGetContactsQuery,
    useAddContactMutation,
    useUpdateContactMutation,
    useDeleteContactMutation
} = apiSlice