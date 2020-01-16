import axios from '../axios/axios';

export const stationService = {
  createStation,
  getAllStation,
  getStationByStationName,
  
};
function createStation(station) {
  // const requestOptions = user;
  return axios.post('/station/create', station).then(handleRegisterResponse)
    .then(station => station);
}
function getAllStation() {
    return axios.get('/station/getAllStation').then(handleRegisterResponse)
      .then(stations => stations);
  }

  function getStationByStationName(stationName) {
    return axios.get('/station/getStationByStationName/'+stationName).then(handleRegisterResponse)
      .then(station => station);
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
