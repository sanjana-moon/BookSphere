import { serverFetch } from "../server";

export const myBooks = async (email) => {
    //   console.log(email, 'email');

    const result = await serverFetch(`/api/books/${email}`);
    //   console.log(result, 'my books');

    return result;
};
export const fetchBooks = async (query) => {
    const result = await serverFetch(`/api/books?${query.toString()}`);

    return result;
};
export const fetchFeaturedBooks = async () => {
    const result = await serverFetch(`/api/books/featured`);

    return result;
};