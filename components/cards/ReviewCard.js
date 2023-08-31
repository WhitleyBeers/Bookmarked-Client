import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

export default function ReviewCard({ obj }) {
  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Img
          src={obj.book_id.image_url}
          style={{ height: '150px', width: '106px', border: '1px solid black' }}
        />
        <Card.Text>
          {obj.book_id.title}
        </Card.Text>
        <Card.Text>
          {obj.rating} out of 5 stars
        </Card.Text>
        <Card.Text>
          {obj.content}
        </Card.Text>
        <Card.Text className="text-muted fst-italic">
          Review written by {obj.user_id.first_name} {obj.user_id.last_name}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

ReviewCard.propTypes = {
  obj: PropTypes.shape({
    rating: PropTypes.number,
    content: PropTypes.string,
    user_id: PropTypes.shape({
      id: PropTypes.number,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
    }),
    book_id: PropTypes.shape({
      id: PropTypes.number,
      image_url: PropTypes.string,
      title: PropTypes.string,
    }),
  }).isRequired,
};
