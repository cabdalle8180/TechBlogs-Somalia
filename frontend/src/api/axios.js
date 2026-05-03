import axios from 'axios';

const API = axios.create({
  // Kani waa URL-kaaga Railway ee aad hadda heshay
  baseURL: "https://dazzling-spontaneity-production-04e3.up.railway.app/api", 
  withCredentials: true 
});

export default API;