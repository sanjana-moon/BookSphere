import { serverFetch } from "../server";

export const myBooks = async (email) => {
    //   console.log(email, 'email');

    const result = await serverFetch(`/api/books/${email}`);
    //   console.log(result, 'my books');

    return result;
};

export const fetchBooks = async (query) => {
    const result = await serverFetch(
        `/api/books?${query?.toString?.() || ""}`
    );
    return result;
};

export const fetchDeliveryHistory = async (email) => {
    return await serverFetch(`/api/books/deliveries/${email}`);
};

export const fetchPendingBooks = async (query) => {
    const result = await serverFetch(`/api/admin/pending-books`);
    return result;
};

export const fetchAllBooks = async (query) => {
    const result = await serverFetch(`/api/admin/books`);
    return result;
};

export const fetchFeaturedBooks = async () => {
    const result = await serverFetch(`/api/books`);
    return result;
};

export const fetchUsers = async () => {
    return await serverFetch("/api/admin/users");
};

export const fetchTransactions = async () => {
    return await serverFetch("/api/admin/transactions");
};

export const fetchAdminDashboard = async () => {
    return await serverFetch("/api/admin/dashboard");
};

export const fetchDeliveries = async (email) => {
    return await serverFetch(
        `/api/librarian/deliveries/${email}`
    );
};