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
    <Card className="py-3 px-1 text-center m-2" style={{ width: '14rem' }}>
      <Card.Img src={obj.image_url} alt={obj.title} style={{ height: '250px', width: '175px' }} className="mx-auto mb-2" />
      <Card.Title>
        {obj.title}
        {obj.favorite ? '❤' : ''}
      </Card.Title>
      <Card.Text>
        by {obj.author}
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
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
