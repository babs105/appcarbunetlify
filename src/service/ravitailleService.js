import axios from '../axios/axios';

export const ravitailleService = {
  ravitaillerVehicule,
  getAllOperationsCuve,
  getRavitaillementById,
  createOperation,
  getCuveByCuveName,
  searchRavitaillementByImmatricule,
  deleteCuveByCuveName,
  getAllOperationsCuveInPreviousMonth,
  getAllOperationsCuveInCurrentMonth
};
function ravitaillerVehicule(ravitaille) {
  
  return axios.post('/operationsCuve/ravitaillerVehicule',ravitaille).then(handleRegisterResponse)
    .then(ravitaille => ravitaille);
}
function createOperation(ravitaille) {
  
  return axios.post('/operationsCuve/create',ravitaille).then(handleRegisterResponse)
    .then(ravitaille => ravitaille);
}
function getAllOperationsCuve() {
    return axios.get('/operationsCuve/getAllOperationsCuve').then(handleRegisterResponse)
      .then(operations => operations);
  }
function getAllOperationsCuveInPreviousMonth() {
    return axios.get('/operationsCuve/getAllOperationsCuveInInPreviousMonth').then(handleRegisterResponse)
      .then(operations => operations);
  }
  function getAllOperationsCuveInCurrentMonth() {
    return axios.get('/operationsCuve/getAllOperationsCuveInCurrentMonth').then(handleRegisterResponse)
      .then(operations => operations);
  }
  function getRavitaillementById(idRavitay){
    return axios.get('/operationsCuve/getRavitaillementById/' + idRavitay).then(handleRegisterResponse)
      .then(ravitaillement => ravitaillement);
  }
  function searchRavitaillementByImmatricule(critere){
    return axios.get('/operationsCuve/searchRavitaillementByImmatricule/' + critere).then(handleRegisterResponse)
      .then(ravitaillement => ravitaillement);
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
