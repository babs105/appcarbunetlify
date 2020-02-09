import axios from '../axios/axios';

export const cuveService = {
  createCuve,
  getAllCuves,
  getCuveByIdCuve,
  getCuveById,
  getCuveByCuveName,
  deleteCuveByCuveName
};
function createCuve(cuve) {
  // const requestOptions = user;
  return axios.post('/cuve/create', cuve).then(handleRegisterResponse)
    .then(cuve => cuve);
}
function getAllCuves() {
    return axios.get('/cuve/getAllCuves').then(handleRegisterResponse)
      .then(cuve => cuve);
  }
  function getCuveByIdCuve(idCuve){
    return axios.get('/cuve/getCuveByIdCuve/' + idCuve).then(handleRegisterResponse)
      .then(cuve => cuve);
  }
  function getCuveById(cuveId){
    return axios.get('/cuve/getCuveById/' + cuveId).then(handleRegisterResponse)
      .then(cuve => cuve);
  }
  function getCuveByCuveName(cuveName) {
    return axios.get('/cuve/getCuveByCuveName/'+ cuveName).then(handleRegisterResponse)
      .then(cuve => cuve);
  }
  function deleteCuveByCuveName(cuveName) {
    return axios.delete('/cuve/deleteCuveByCuveName/'+ cuveName).then(handleRegisterResponse)
      .then(cuve => cuve);
  }
// function handleResponse(response) {
//   const { data } = response;
//   if (response.status === 401) {
//     if (response.status === 401) {
//       // auto logout if 401 response returned from api
//       logout();
//       // eslint-disable-next-line no-restricted-globals
//       location.reload(true);
//     }

//     const error = (data && data.message) || response.statusText;
//     return Promise.reject(error);
//   }

//   return data;
// }

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
