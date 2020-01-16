import axios from '../axios/axios';

export const rajoutService = {
  rajouterCuve,
  getAllRajout,
  getCuveByIdCuve,
  getCuveByCuveName,
  deleteCuveByCuveName
};
function rajouterCuve(rajout) {
  
  return axios.post('/rajout/rajouterCuve',rajout).then(handleRegisterResponse)
    .then(rajout => rajout);
}
function getAllRajout() {
    return axios.get('/rajout/getAllRajout').then(handleRegisterResponse)
      .then(rajouts => rajouts);
  }
  function getCuveByIdCuve(idCuve){
    return axios.get('/cuve/getCuveByIdCuve/' + idCuve).then(handleRegisterResponse)
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
