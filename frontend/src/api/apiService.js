import axiosInstance from './axiosInstance';

function unwrapResponse(response) {
  const payload = response.data;
  if (payload && payload.status === 'success' && payload.data !== undefined) {
    return payload.data;
  }
  return payload;
}

export async function get(url, config) {
  const response = await axiosInstance.get(url, config);
  return unwrapResponse(response);
}

export async function post(url, payload, config) {
  const response = await axiosInstance.post(url, payload, config);
  return unwrapResponse(response);
}

export async function patch(url, payload, config) {
  const response = await axiosInstance.patch(url, payload, config);
  return unwrapResponse(response);
}
