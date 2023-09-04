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

const getSingleUser = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users/${id}`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

const getUser = (userId, followerId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users/${userId}/checkfollowing`, {
    headers: {
      Authorization: `${followerId}`,
    },
  })
    .then((response) => resolve(response.json()))
    .catch(reject);
});

const updateAUser = (payload) => new Promise((resolve, reject) => {
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
  getUser, updateAUser, getUsers, followUser, unfollowUser, getSingleUser,
};
