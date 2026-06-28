import { serverFetch } from "../server";

export const myBooks = async (email) => {
  return await serverFetch(`/api/books/${email}`, true);
};

export const fetchBooks = async (query) => {
  return await serverFetch(
    `/api/books?${query?.toString() || ""}`
  );
};

export const fetchDeliveryHistory = async (email) => {
  return await serverFetch(
    `/api/books/deliveries/${email}`,
    true
  );
};

export const fetchReadingList = async (email) => {
  return await serverFetch(
    `/api/user/reading-list/${email}`,
    true
  );
};

export const fetchMyReviews = async (email) => {
  return await serverFetch(
    `/api/user/reviews/${email}`,
    true
  );
};

export const fetchBookReviews = async (bookId) => {
  return await serverFetch(
    `/api/books/${bookId}/reviews`
  );
};

export const canReviewBook = async (bookId, email) => {
  return await serverFetch(
    `/api/books/${bookId}/can-review/${email}`,
    true
  );
};

export const fetchPendingBooks = async () => {
  return await serverFetch(
    `/api/admin/pending-books`,
    true
  );
};

export const fetchAllBooks = async () => {
  return await serverFetch(
    `/api/admin/books`,
    true
  );
};

export const fetchFeaturedBooks = async () => {
  const query = new URLSearchParams({
    page: "1",
    limit: "6",
  });

  return await serverFetch(
    `/api/books?${query.toString()}`
  );
};

export const fetchUsers = async () => {
  return await serverFetch(
    "/api/admin/users",
    true
  );
};

export const fetchTransactions = async () => {
  return await serverFetch(
    "/api/admin/transactions",
    true
  );
};

export const fetchAdminDashboard = async () => {
  return await serverFetch(
    "/api/admin/dashboard",
    true
  );
};

export const fetchDeliveries = async (email) => {
  return await serverFetch(
    `/api/librarian/deliveries/${email}`,
    true
  );
};