/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getSingleUser, followUser, unfollowUser } from '../../api/userData';
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
    getSingleUser(id, user.id).then(setUserDetails);
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
  }, []);

  return (
    <>
      <div className="d-flex">
        <div className="mt-1 mx-auto">
          <img
            src={userDetails.profile_image_url}
            alt={userDetails.id}
            style={{ height: '315px', width: '315px' }}
            className="mt-3"
          />
          <h3>{userDetails.first_name} {userDetails.last_name}</h3>
          <hr />
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
          <br />
          <h4>{userDetails.first_name}&apos;s Reviews</h4>
          <hr />
          {reviews.length ? (
            reviews.map((review) => (
              <ReviewCard key={review.id} obj={review} />
            ))
          ) : (
            'No reviews'
          )}
        </div>
      </div>
    </>
  );
}
