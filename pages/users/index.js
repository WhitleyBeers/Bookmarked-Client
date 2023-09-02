import React, { useEffect, useState } from 'react';
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
  }, []);

  return (
    <>
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
