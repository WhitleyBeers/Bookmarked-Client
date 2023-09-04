import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getSingleReview = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/reviews/${id}`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

const getBookReviews = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/books/${id}/reviews`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

const getFollowingReviews = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users/${id}/following`)
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(data);
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getUserReviews = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users/${id}/reviews`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

const createReview = (review) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/books/${review.bookId}/post_review`, {
    method: 'POST',
    body: JSON.stringify(review),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${review.userId}`,
    },
  })
    .then((response) => resolve(response.json()))
    .catch(reject);
});

const updateReview = (review) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/reviews/${review.id}`, {
    method: 'PUT',
    body: JSON.stringify(review),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(resolve)
    .catch(reject);
});

export {
  getSingleReview, createReview, updateReview, getBookReviews, getUserReviews, getFollowingReviews,
};
