import axios from 'axios';
import Cookie from 'js-cookie';

const baseUrl="http://localhost:8000/api/user"

const getToken=()=>{
  const accessToken = Cookie.get('access_token');
  return accessToken
}

export const loginfunc = async (username, password) => {
  return await axios.post(`${baseUrl}/login`, { username, password });
};

export const signupfunc = async (username, password) => {
  return await axios.post(`${baseUrl}/register`, { username, password });
};

export const getFiles = async () => {
  const tokenStr=getToken();
  return await axios.get(`${baseUrl}/files`,  { headers: {"Authorization" : `Bearer ${tokenStr}`} });
};

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const tokenStr=getToken();
  return await axios.post(`${baseUrl}/upload-file`, formData, { headers: {"Authorization" : `Bearer ${tokenStr}`,"Content-Type": "multipart/form-data"} });
};

// Add more API functions as needed
export const getAnswer = async (fileId,query) => {
  const tokenStr=getToken();
  return await axios.post(`${baseUrl}/get-answer`, JSON.stringify({fileId,query}), { headers: {"Authorization" : `Bearer ${tokenStr}`, 'Content-Type': 'application/json'} });
};