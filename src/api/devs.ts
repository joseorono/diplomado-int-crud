import Dev from "../interfaces/dev.interface";
import { config } from "../config";
import axios, { AxiosResponse } from "axios";

export const getDevs = async (): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axios.get(config.API_ROUTES.DEVS, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('AUTH_TOKEN'),
        Accept: 'application/json',
      },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Axios error (e.g., network error, response status not in 2xx)
      console.error('(Axios) GET /devs failed:', error.message);
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
    } else {
      // Non-Axios error
      console.error('An unexpected error occurred:', error);
    }

    throw error;
  }
}

export const postDevs = async (dev: Dev): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axios.post(config.API_ROUTES.DEVS, dev, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('AUTH_TOKEN'),
        Accept: 'application/json',
      },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Axios error (e.g., network error, response status not in 2xx)
      console.error('(Axios) POST /devs failed:', error.message);
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
    } else {
      // Non-Axios error
      console.error('An unexpected error occurred:', error);
    }

    throw error;
  }
}

export const putDevs = async (devId: string, dev: Dev): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axios.put(config.API_ROUTES.DEVS + devId + '/', dev, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('AUTH_TOKEN'),
        Accept: 'application/json',
      },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Axios error (e.g., network error, response status not in 2xx)
      console.error('(Axios) PUT /devs failed:', error.message);
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
    } else {
      // Non-Axios error
      console.error('An unexpected error occurred:', error);
    }

    throw error;
  }
}

export const deleteDev = async (devId: string): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await axios.delete(config.API_ROUTES.DEVS + devId + '/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('AUTH_TOKEN'),
        Accept: 'application/json',
      },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Axios error (e.g., network error, response status not in 2xx)
      console.error('(Axios) DELETE /devs failed:', error.message);
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
    } else {
      // Non-Axios error
      console.error('An unexpected error occurred:', error);
    }

    throw error;
  }
}