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
        <Card.Text className="book-author text-muted fst-italic">
          by {obj.author}
        </Card.Text>
        <Card.Text className="book-content">
          {obj.description}
        </Card.Text>
        <Card.Text className="text-muted fst-italic">
          {obj.status}
        </Card.Text>
        <Dropdown>
          <Dropdown.Toggle className="card-dropdown">
            Options
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href={`/library/${obj.id}`}>
              View Details
            </Dropdown.Item>
            <Dropdown.Item href={`/library/edit/${obj.id}`}>
              Edit Book Info
            </Dropdown.Item>
            <Dropdown.Item onClick={deleteThisBook}>
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
