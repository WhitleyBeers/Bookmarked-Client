import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  Button, FloatingLabel, Form, Modal,
} from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { createReview, updateReview } from '../api/reviewData';

const initialState = {
  content: '',
  rating: 0,
};

export default function ReviewForm({ obj, onUpdate }) {
  const [currentReview, setCurrentReview] = useState(initialState);
  const router = useRouter();
  const book = parseInt(router.query.id, 10);
  const { user } = useAuth();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleOpen = () => {
    if (obj.id) {
      setCurrentReview({
        id: obj.id,
        userId: user.id,
        bookId: obj.book_id.id,
        content: obj.content,
        rating: obj.rating,
      });
    } else {
      setCurrentReview(initialState);
    }
    setShow(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentReview((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      const editReview = {
        id: obj.id,
        content: currentReview.content,
        rating: currentReview.rating,
      };
      updateReview(editReview)
        .then(handleClose)
        .then(onUpdate);
    } else {
      const review = {
        userId: user.id,
        bookId: book,
        content: currentReview.content,
        rating: Number(currentReview.rating),
      };
      createReview(review)
        .then(handleClose)
        .then(onUpdate);
    }
  };

  return (
    <>
      <Button className="m-1" variant="secondary" onClick={handleOpen}>
        {obj.id ? 'Edit' : 'Add'} Review
      </Button>
      <Modal show={show} onHide={handleClose} className="text-black">
        <Modal.Title className="text-center mt-1">
          Add Review
        </Modal.Title>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>

            {/* CONTENT FIELD */}
            <FloatingLabel label="Write your review" className="mb-2">
              <Form.Control
                type="textarea"
                name="content"
                value={currentReview.content}
                onChange={handleChange}
                required
              />
            </FloatingLabel>

            {/* RATING SELECT */}
            <Form.Group className="mb-2">
              <Form.Select
                name="rating"
                onChange={handleChange}
                value={currentReview.rating}
                required
              >
                <option value="">Select your rating:</option>
                <option value={1}>&#9733;</option>
                <option value={2}>&#9733;&#9733;</option>
                <option value={3}>&#9733;&#9733;&#9733;</option>
                <option value={4}>&#9733;&#9733;&#9733;&#9733;</option>
                <option value={5}>&#9733;&#9733;&#9733;&#9733;&#9733;</option>
              </Form.Select>
            </Form.Group>

            <Button type="submit" className="m-1">
              {obj.id ? 'Edit' : 'Add'} Review
            </Button>
            <Button onClick={handleClose} className="m1" variant="danger">
              Cancel
            </Button>

          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

ReviewForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    user_id: PropTypes.shape({
      id: PropTypes.number,
    }),
    book_id: PropTypes.shape({
      id: PropTypes.number,
    }),
    content: PropTypes.string,
    rating: PropTypes.number,
  }),
  onUpdate: PropTypes.func.isRequired,
};

ReviewForm.defaultProps = {
  obj: initialState,
};
