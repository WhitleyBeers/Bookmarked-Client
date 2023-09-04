/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { getSingleUser } from '../../api/userData';

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [userDetails, setUserDetails] = useState({});
  useEffect(() => {
    getSingleUser(user.id).then(setUserDetails);
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
    </div>
  );
}
