import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import ReviewForm from '../ReviewForm';
import { useAuth } from '../../utils/context/authContext';
import { deleteReview } from '../../api/reviewData';

export default function ReviewCard({ obj, onUpdate }) {
  const { user } = useAuth();
  const deleteThisReview = () => {
    if (window.confirm('Are you sure you want to delete your review?')) {
      deleteReview(obj.id).then(() => onUpdate());
    }
  };

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
        {obj.user_id.id === user.id ? (
          <>
            <ReviewForm obj={obj} onUpdate={onUpdate} />
            <Button variant="danger" onClick={deleteThisReview}>
              Delete Review
            </Button>
          </>
        ) : (
          ''
        )}
      </Card.Body>
    </Card>
  );
}

ReviewCard.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
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
  onUpdate: PropTypes.func.isRequired,
};
