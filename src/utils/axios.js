import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://era-ecommerce-react.firebaseio.com/'
});

export default instance;
