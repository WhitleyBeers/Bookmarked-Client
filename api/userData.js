import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getUsers = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users`, {
    headers: {
      Authorization: `${id}`,
    },
  })
    .then((response) => resolve(response.json()))
    .catch(reject);
});

const getSingleUser = (userId, followerId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users/${userId}`, {
    headers: {
      Authorization: `${followerId}`,
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const updateUser = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(resolve)
    .catch(reject);
});

const followUser = (id, followId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users/${followId}/follow`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${id}`,
    },
  })
    .then((response) => resolve(response.json()))
    .catch(reject);
});

const unfollowUser = (id, followId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users/${followId}/unfollow`, {
    method: 'DELETE',
    headers: {
      Authorization: `${id}`,
    },
  })
    .then((response) => resolve(response))
    .catch(reject);
});

export {
  getSingleUser, updateUser, getUsers, followUser, unfollowUser,
};
