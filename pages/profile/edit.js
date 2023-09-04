import React from 'react';
import { getSingleUser } from '../../api/userData';
import RegisterForm from '../../components/RegisterForm';
import { useAuth } from '../../utils/context/authContext';

export default function EditUser() {
  const { user } = useAuth();

  const getUser = () => {
    getSingleUser(user.id);
  };

  return (
    <RegisterForm user={user} updateUser={getUser} />
  );
}
