import React from 'react';
import Head from 'next/head';
import BookForm from '../../components/BookForm';

export default function AddBook() {
  return (
    <>
      <Head>
        <title>Add A Book</title>
      </Head>
      <BookForm />
    </>
  );
}
