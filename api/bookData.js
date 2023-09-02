import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getBooks = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/books`, {
    headers: {
      Authorization: `${id}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        const bookArray = data.sort((a, b) => b.date_added.localeCompare(a.date_added));
        resolve(bookArray);
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

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

const deleteBook = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/books/${id}`, {
    method: 'DELETE',
  })
    .then((response) => resolve(response))
    .catch(reject);
});

export {
  getBooks, getSingleBook, createBook, updateBook, deleteBook,
};
