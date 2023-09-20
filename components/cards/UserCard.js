import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { followUser, unfollowUser } from '../../api/userData';

export default function UserCard({ obj, onUpdate }) {
  const router = useRouter();
  const { user } = useAuth();

  // FOLLOW A USER
  const follow = () => {
    followUser(user.id, obj.id).then(onUpdate);
  };

  // UNFOLLOW A USER
  const unfollow = () => {
    unfollowUser(user.id, obj.id).then(onUpdate);
  };
  return (
    <Card className="text-center m-2 user-card">
      <Card.Body>
        <Card.Text className="user-title mt-0">
          {obj.first_name} {obj.last_name}
        </Card.Text>
        <Card.Img
          className="mb-1"
          src={obj.profile_image_url}
          alt={obj.first_name}
          style={{ height: '194px', width: '175px' }}
        />
        <Card.Text>
          <Button onClick={() => router.push(`/users/${obj.id}`)}>
            View Profile
          </Button>
          {obj.following && user.id !== obj.id ? (
            <Button variant="danger" onClick={unfollow} className="m-1">Unfollow</Button>
          ) : (
            ''
          )}
          {!obj.following && user.id !== obj.id ? (
            <Button variant="success" onClick={follow} className="m-1">Follow</Button>
          ) : (
            ''
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

UserCard.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    bio: PropTypes.string,
    profile_image_url: PropTypes.string,
    following: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
