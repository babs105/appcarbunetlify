import axios from '../axios/axios';
import {deleteAllCookies} from '../utils/Cookie';
import history from '../routage/ExtBrowserRouter';

export const userService = {
  login,
  logout,
  loginExistingUser,
  register,
  getAllUsers,
  getUserById
};


function login(user) {
  // const requestOptions = user;
  return axios.post('/users/authenticate', user).then(handleResponse)
    .then(user => user);
}

function register(data) {
  console.log(data);
  return axios.post('/users/create', data).then(handleRegisterResponse)
    .then(user => user);
}


function getAllUsers() {
    return axios.get('/users/getAllUsers').then(handleRegisterResponse)
      .then(user => user);
  }
  function getUserById(userId) {
    return axios.get('/users/getUserById/'+userId).then(handleRegisterResponse)
      .then(user => user);
  }

function loginExistingUser(cookie) {
  const headers = { 'x-authenticate-user': cookie };
  const requestOptions = { headers };
  return axios.get('/users/loggedUser', requestOptions).then(handleResponse)
    .then(user => user);
}

function logout() {
  deleteAllCookies();
  
}

function handleResponse(response) {
  const { data } = response;
  if (response.status === 401) {
    if (response.status === 401) {
      // auto logout if 401 response returned from api
      logout();
      // eslint-disable-next-line no-restricted-globals
      location.reload(true);
    }

    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }

  return data;
}

function handleRegisterResponse(response) {
  const { data } = response;
  if (response.status === 401) {
    const error = (data && data.message) || response.statusText;
    console.log('handleRegisterResponse => error');
    console.log(error);
    return Promise.reject(error);
  }

  return data;
}
