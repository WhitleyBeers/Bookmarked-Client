import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { getUsers } from '../../api/userData';
import UserCard from '../../components/cards/UserCard';
import { useAuth } from '../../utils/context/authContext';

export default function UserPage() {
  const [users, setUsers] = useState();
  const { user } = useAuth();

  const getAllUsers = () => {
    getUsers(user.id).then(setUsers);
  };

  useEffect(() => {
    getAllUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>Viewing Users</title>
      </Head>
      <h1 className="title">BookMarked Users</h1>
      <div className="my-2 d-flex justify-content-center flex-wrap">
        {users ? (
          users.map((singleUser) => (
            <UserCard key={singleUser.id} obj={singleUser} onUpdate={getAllUsers} />
          ))
        ) : (
          "There's nothing here!"
        )}
      </div>
    </>
  );
}
