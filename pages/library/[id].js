import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleBook } from '../../api/bookData';
import ReviewForm from '../../components/ReviewForm';

export default function BookDetailsPage() {
  const router = useRouter();
  const id = parseInt(router.query.id, 10);
  const [bookDetails, setBookDetails] = useState({});

  const getBookDetails = () => {
    getSingleBook(id).then(setBookDetails);
  };

  useEffect(() => {
    getBookDetails();
  }, [id]);

  return (
    <>
      <div>{bookDetails.title}</div>
      <div><ReviewForm onUpdate={getBookDetails} /></div>
    </>
  );
}
