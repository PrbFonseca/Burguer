import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burguer-5e6a4.firebaseio.com/'
});


export default instance;
