import axios from '../axios/axios';

export const photoService = {
upload
};
function upload(image) {
  // const requestOptions = user;
  return axios.post('/photo/upload', image).then(handleRegisterResponse)
    .then(data => data);
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
