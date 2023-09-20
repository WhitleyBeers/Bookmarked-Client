/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Head from 'next/head';
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mt-1">
      <Head>
        <title>My Profile</title>
      </Head>
      <h1 className="title">My Profile</h1>
      <div className="profile-card">
        <div className="text-center">
          <img
            src={userDetails.profile_image_url}
            alt={userDetails.id}
            style={{ height: '215px', width: '215px' }}
            className="mt-1"
          />
          <h3 className="status">Hi, {userDetails.first_name}!</h3>
          <p>{userDetails.bio}</p>
          <Button onClick={() => router.push('/profile/edit')}>
            Edit profile
          </Button>
        </div>
        <div>
          <div className="favorites">
            <h3 className="favorites-header">My Favorites</h3>
            {favorites.length ? (
              favorites.map((favorite) => (
                <BookCard key={favorite.id} obj={favorite} onUpdate={getProfile} />
              ))
            ) : (
              <h5>You don&apos;t have any favorites!</h5>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
