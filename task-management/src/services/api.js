import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const loginUser = (credentials) => axios.post(`${BASE_URL}/auth/login`, credentials);

export const registerUser = (userDetails) => axios.post(`${BASE_URL}/auth/register`, userDetails);

export const getTasks = () => axios.get(`${BASE_URL}/tasks`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

export const createTask = async (taskData) => {
  try {
    const response = await axios.post(`${BASE_URL}/tasks`, taskData,{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
    return response; // Ensure this contains status or data as expected
  } catch (error) {
    throw error; // Propagate the error to handle it in the calling function
  }
};


export const updateTask = (id, task) => axios.put(`${BASE_URL}/tasks/${id}`, task, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });

export const deleteTask = (id) => axios.delete(`${BASE_URL}/tasks/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
