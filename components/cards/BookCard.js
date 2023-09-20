import React from 'react';
import { Card, Dropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { deleteBook } from '../../api/bookData';

export default function BookCard({ obj, onUpdate }) {
  const deleteThisBook = () => {
    if (window.confirm(`Delete ${obj.title}?`)) {
      deleteBook(obj.id).then(() => onUpdate());
    }
  };

  return (
    <Card className="book-card">
      <Card.Img src={obj.image_url} alt={obj.title} style={{ height: '250px', width: '175px' }} className="m-2 book-photo" />
      <div className="book-details">
        <Card.Title className="book-title">
          {obj.title}
          {obj.favorite ? '❤' : ''}
        </Card.Title>
        <Card.Text className="book-author fst-italic subtitle mb-0">
          by {obj.author}
        </Card.Text>
        <Card.Text className="book-content m-0">
          {obj.description}
        </Card.Text>
        <Card.Text className="status my-1">
          {obj.status}
        </Card.Text>
        <Dropdown>
          <Dropdown.Toggle className="card-dropdown mt-3">
            Options
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href={`/library/${obj.id}`} className="subtitle">
              View Details
            </Dropdown.Item>
            <Dropdown.Item href={`/library/edit/${obj.id}`} className="subtitle">
              Edit Book Info
            </Dropdown.Item>
            <Dropdown.Item onClick={deleteThisBook} className="subtitle">
              Delete Book
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </Card>
  );
}

BookCard.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    favorite: PropTypes.bool,
    image_url: PropTypes.string,
    status: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
