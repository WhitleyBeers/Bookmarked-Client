/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { getSingleUser } from '../../api/userData';
import { getFavoriteBooks } from '../../api/bookData';
import BookCard from '../../components/cards/BookCard';

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [userDetails, setUserDetails] = useState({});
  const [favorites, setFavorites] = useState([]);

  const getProfile = () => {
    getSingleUser(user.id).then(setUserDetails);
    getFavoriteBooks(user.id).then(setFavorites);
  };
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="mt-1 mx-auto text-center">
      <img
        src={userDetails.profile_image_url}
        alt={userDetails.id}
        style={{ height: '315px', width: '315px' }}
        className="mt-3"
      />
      <h3>Hi, {userDetails.first_name}!</h3>
      <p>{userDetails.bio}</p>
      <Button onClick={() => router.push('/profile/edit')}>
        Edit profile
      </Button>
      <hr />
      <h4>My Favorites</h4>
      <div className="my-2 d-flex justify-content-center flex-wrap">
        {favorites.length ? (
          favorites.map((favorite) => (
            <BookCard key={favorite.id} obj={favorite} onUpdate={getProfile} />
          ))
        ) : (
          <h5>You don&apos;t have any favorites!</h5>
        )}
      </div>
    </div>
  );
}
