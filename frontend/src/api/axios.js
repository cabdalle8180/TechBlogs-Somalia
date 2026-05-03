// import axios from 'axios';

// const API = axios.create({
//   // Vite wuxuu si automatic ah u soo qaadanayaa variable-ka aad sare ku qortay
//   baseURL: import.meta.env.VITE_API_URL, 
//   withCredentials: true 
// });

// export default API;


import axios from 'axios';

const API = axios.create({
  // Tani waxay soo qaadanaysaa URL-ka aad Vercel gelisay
  baseURL: import.meta.env.VITE_API_URL + "/api", 
  withCredentials: true 
});

export default API;