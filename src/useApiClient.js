// src/useApiClient.js
import axios from 'axios';

export const useApiClient = () => {
  const axiosRequest = axios.create({
    baseURL: 'https://4sightai.azurewebsites.net/', // replace with your API URL
  });

  return { axiosRequest };
};
