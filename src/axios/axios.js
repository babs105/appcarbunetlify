import axios from "axios";

export default axios.create({
  //baseURL: "http://localhost:8080",
  //baseURL: 'https://appcarburant.herokuapp.com'
  baseURL: "AppCarburant-env.eba-dft9jnbm.us-west-2.elasticbeanstalk.com", //EBS(Elastic Beanstalk) aws
});
