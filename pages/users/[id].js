/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Head from 'next/head';
import { useAuth } from '../../utils/context/authContext';
import { getUser, followUser, unfollowUser } from '../../api/userData';
import { getUserReviews } from '../../api/reviewData';
import ReviewCard from '../../components/cards/ReviewCard';

export default function UserPage() {
  const router = useRouter();
  const id = parseInt(router.query.id, 10);
  const { user } = useAuth();
  const [userDetails, setUserDetails] = useState({});
  const [reviews, setReviews] = useState([]);

  // Gets user information and reviews associated with user
  const getUserDetails = () => {
    getUser(id, user.id).then(setUserDetails);
    getUserReviews(id).then(setReviews);
  };

  // FOLLOW A USER
  const follow = () => {
    followUser(user.id, id).then(getUserDetails);
  };

  // UNFOLLOW A USER
  const unfollow = () => {
    unfollowUser(user.id, id).then(getUserDetails);
  };

  useEffect(() => {
    getUserDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>Viewing User Profile</title>
      </Head>
      <div className="d-flex">
        <div className="mt-1 profile-card">
          <div>
            <img
              src={userDetails.profile_image_url}
              alt={userDetails.id}
              style={{ height: '315px', width: '315px' }}
              className="mt-3"
            />
            <h3 className="title">{userDetails.first_name} {userDetails.last_name}</h3>
            <p>{userDetails.bio}</p>
            {userDetails.following && user.id !== id ? (
              <Button variant="danger" onClick={unfollow}>Unfollow</Button>
            ) : (
              ''
            )}
            {!userDetails.following && user.id !== id ? (
              <Button variant="secondary" onClick={follow}>Follow</Button>
            ) : (
              ''
            )}
          </div>
          <div className="ms-5">
            <h4 className="title">{userDetails.first_name}&apos;s Reviews</h4>
            <hr />
            {reviews.length ? (
              reviews.map((review) => (
                <ReviewCard key={review.id} obj={review} onUpdate={getUserDetails} />
              ))
            ) : (
              'No reviews'
            )}
          </div>
        </div>
      </div>
    </>
  );
}
