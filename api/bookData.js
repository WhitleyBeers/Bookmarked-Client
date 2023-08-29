import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getSingleBook = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/books/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createBook = (book) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/books`, {
    method: 'POST',
    body: JSON.stringify(book),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${book.userId}`,
    },
  })
    .then((response) => resolve(response.json()))
    .catch(reject);
});

const updateBook = (book) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/books/${book.id}`, {
    method: 'PUT',
    body: JSON.stringify(book),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(resolve)
    .catch(reject);
});

export { getSingleBook, createBook, updateBook };
