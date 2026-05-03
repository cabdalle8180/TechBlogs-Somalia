import axios from 'axios';

const API = axios.create({
  // URL-kan waa kan rasmiga ah ee aad Railway ka heshay
  baseURL: "https://dazzling-spontaneity-production-04e3.up.railway.app/api", 
  withCredentials: true 
});

export default API;