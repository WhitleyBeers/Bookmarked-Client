import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { useRouter } from 'next/router';

export default function UserCard({ obj }) {
  const router = useRouter();
  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Img
          src={obj.profile_image_url}
          style={{ height: '150px', width: '106px', border: '1px solid black' }}
        />
        <Card.Text>
          {obj.first_name} {obj.last_name}
        </Card.Text>
        <Card.Footer>
          <Button onClick={() => router.push(`/users/${obj.id}`)}>
            View Profile
          </Button>
          {obj.following ? (
            <Button variant="secondary">Follow</Button>
          ) : (
            <Button variant="danger">Unfollow</Button>
          )}
        </Card.Footer>
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
};
