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
    <Card className="text-center py-3 px-1 m-2" style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Img
          src={obj.profile_image_url}
          alt={obj.first_name}
          style={{ height: '250px', width: '225px' }}
        />
        <Card.Text>
          {obj.first_name} {obj.last_name}
        </Card.Text>
        <Card.Text>
          <Button onClick={() => router.push(`/users/${obj.id}`)}>
            View Profile
          </Button>
          {obj.following && user.id !== obj.id ? (
            <Button variant="danger" onClick={unfollow}>Unfollow</Button>
          ) : (
            ''
          )}
          {!obj.following && user.id !== obj.id ? (
            <Button variant="secondary" onClick={follow}>Follow</Button>
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
