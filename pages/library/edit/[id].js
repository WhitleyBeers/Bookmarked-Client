import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleBook } from '../../../api/bookData';
import BookForm from '../../../components/BookForm';

export default function EditBookPage() {
  const [book, setBook] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleBook(id).then(setBook);
  }, [id]);

  return (
    <BookForm obj={book} />
  );
}
