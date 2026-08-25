import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const predictStudent = async (studentData) => {
  const response = await API.post("/predict", studentData);
  return response.data;
};

export default API;