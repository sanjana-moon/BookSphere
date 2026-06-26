import { fetchAllBooks } from '@/lib/api/books/data';
import React from 'react';

const ManageBooks = async() => {
    const books = await fetchAllBooks()
    
    return (
        <div>
            <h3>Total books: {books.length}</h3>
        </div>
    );
};

export default ManageBooks;