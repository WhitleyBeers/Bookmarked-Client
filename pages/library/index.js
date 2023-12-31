import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useAuth } from '../../utils/context/authContext';
import { getBooks } from '../../api/bookData';
import BookCard from '../../components/cards/BookCard';

export default function LibraryPage() {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);

  const getAllBooks = () => {
    getBooks(user.id).then(setBooks);
  };

  useEffect(() => {
    getAllBooks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <Head>
        <title>My Library</title>
      </Head>
      <h1 className="title">My Library</h1>
      <div className="my-2 d-flex justify-content-center flex-wrap">
        {books.length ? (
          books.map((book) => (
            <BookCard key={book.id} obj={book} onUpdate={getAllBooks} />
          ))
        ) : (
          <h4>Your library is empty!</h4>
        )}
      </div>
    </>
  );
}
