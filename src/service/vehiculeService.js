import axios from '../axios/axios';

export const vehiculeService = {
  createVehicule,
  getAllVehicules,
  getVehiculeByImmmatricule,
  deleteVehiculeByImmmatricule
};
function createVehicule(vehicule) {
  // const requestOptions = user;
  return axios.post('/vehicule/create', vehicule).then(handleRegisterResponse)
    .then(vehicule => vehicule);
}
function getAllVehicules() {
    return axios.get('/vehicule/getAllVehicules').then(handleRegisterResponse)
      .then(vehicule => vehicule);
  }
 
  function getVehiculeByImmmatricule(immmatricule) {
    return axios.get('/vehicule/getVehiculeByImmmatricule/'+ immmatricule).then(handleRegisterResponse)
      .then(vehicule => vehicule);
  }
  function deleteVehiculeByImmmatricule(immmatricule) {
    return axios.delete('/vehicule/deleteVehiculeByImmmatricule/'+ immmatricule).then(handleRegisterResponse)
      .then(vehicule => vehicule);
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
