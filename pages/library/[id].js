/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Head from 'next/head';
import { getSingleBook } from '../../api/bookData';
import ReviewForm from '../../components/ReviewForm';
import ReviewCard from '../../components/cards/ReviewCard';
import { getBookReviews } from '../../api/reviewData';
import { useAuth } from '../../utils/context/authContext';

export default function BookDetailsPage() {
  const router = useRouter();
  const id = parseInt(router.query.id, 10);
  const [bookDetails, setBookDetails] = useState({});
  const [reviews, setReviews] = useState([]);
  const { user } = useAuth();

  const getBookDetails = () => {
    getSingleBook(id).then(setBookDetails);
    getBookReviews(id).then(setReviews);
  };

  useEffect(() => {
    getBookDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <Head>
        <title>Viewing {bookDetails.title}</title>
      </Head>
      <div className="d-flex">
        <div className="mt-1 mx-auto">
          <img
            src={bookDetails.image_url}
            alt={bookDetails.title}
            style={{ height: '315px', width: '224px', border: '1px solid black' }}
            className="mt-3"
          />
          <h2>
            {bookDetails.title} {bookDetails.favorite ? '❤' : ''}
          </h2>
          <div className="subtitle">
            <em>Written by</em> {bookDetails.author}
          </div>
          <div className="status">
            {bookDetails.status}
          </div>
          <p className="mb-1">
            {bookDetails.description}
          </p>
          <div>
            {bookDetails.user_id === user.id ? (
              <Button onClick={() => router.push(`/library/edit/${id}`)}>
                Edit book details
              </Button>
            ) : (
              ''
            )}
          </div>
          <div>
            <ReviewForm onUpdate={getBookDetails} />
          </div>
          <div>
            {reviews.map((review) => (
              <ReviewCard obj={review} key={review.id} onUpdate={getBookDetails} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
