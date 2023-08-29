/* eslint-disable @next/next/no-img-element */
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <div className="d-flex">
        <div className="mt-1 mx-auto">
          <img src={bookDetails.image_url} alt={bookDetails.title} style={{ height: '224px', width: '159px' }} />
          <h2>
            {bookDetails.title} {bookDetails.favorite ? '❤' : ''}
          </h2>
          <div>
            <em>{bookDetails.author}</em>
          </div>
          <div>
            <em><b>{bookDetails.status}</b></em>
          </div>
          <p className="mb-1">
            {bookDetails.description}
          </p>
        </div>
      </div>
      <div><ReviewForm onUpdate={getBookDetails} /></div>
    </>
  );
}
