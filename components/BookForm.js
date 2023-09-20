import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { createBook, updateBook } from '../api/bookData';

const initialState = {
  title: '',
  author: '',
  description: '',
  favorite: false,
  imageUrl: '',
  status: '',
  userId: null,
};

export default function BookForm({ obj }) {
  const [currentBook, setCurrentBook] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.id) {
      setCurrentBook({
        id: obj.id,
        title: obj.title,
        author: obj.author,
        description: obj.description,
        favorite: obj.favorite,
        imageUrl: obj.image_url,
        status: obj.status,
      });
    }
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentBook((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      const bookUpdate = {
        id: obj.id,
        title: currentBook.title,
        author: currentBook.author,
        description: currentBook.description,
        favorite: currentBook.favorite,
        imageUrl: currentBook.imageUrl,
        status: currentBook.status,
      };
      updateBook(bookUpdate).then(router.back());
    } else {
      const book = {
        title: currentBook.title,
        author: currentBook.author,
        description: currentBook.description,
        favorite: currentBook.favorite,
        imageUrl: currentBook.imageUrl,
        status: currentBook.status,
        userId: user.id,
      };
      createBook(book).then(() => router.push('/library'));
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-3">
      <h3 className="title">
        {obj.id ? 'Edit' : 'Add'} Book
      </h3>

      {/* TITLE FIELD */}
      <Form.Group className="mb-3 subtitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          name="title"
          value={currentBook.title}
          onChange={handleChange}
          required
        />
      </Form.Group>

      {/* author FIELD */}
      <Form.Group className="mb-3 subtitle">
        <Form.Label>Author</Form.Label>
        <Form.Control
          name="author"
          value={currentBook.author}
          onChange={handleChange}
          required
        />
      </Form.Group>

      {/* description FIELD */}
      <Form.Group className="mb-3 subtitle">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="textarea"
          name="description"
          value={currentBook.description}
          onChange={handleChange}
          required
        />
      </Form.Group>

      {/* imageUrl FIELD */}
      <Form.Group className="mb-3 subtitle">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          name="imageUrl"
          value={currentBook.imageUrl}
          onChange={handleChange}
          required
        />
      </Form.Group>

      {/* STATUS SELECT */}
      <Form.Group className="mb-3 subtitle">
        <Form.Label>Book Status</Form.Label>
        <Form.Select
          name="status"
          onChange={handleChange}
          value={currentBook.status}
          required
        >
          <option value="">Select one:</option>
          <option value="Want to read">Want to read</option>
          <option value="Currently reading">Currently reading</option>
          <option value="Read">Read</option>
          <option value="Did not finish">Did not finish</option>
        </Form.Select>
      </Form.Group>

      {/* FAVORITE CHECKBOX */}
      <Form.Check
        className="text-black subtitle"
        type="switch"
        id="favorite"
        name="favorite"
        label="Favorite?"
        checked={currentBook.favorite}
        onChange={(e) => {
          setCurrentBook((prevState) => ({
            ...prevState,
            favorite: e.target.checked,
          }));
        }}
      />

      <Button type="submit" className="m-2">Submit</Button>
      <Button variant="danger" className="m-2" onClick={() => router.back()}>Cancel</Button>

    </Form>
  );
}

BookForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    description: PropTypes.string,
    favorite: PropTypes.bool,
    image_url: PropTypes.string,
    status: PropTypes.string,
    userId: PropTypes.number,
  }),
};

BookForm.defaultProps = {
  obj: initialState,
};
