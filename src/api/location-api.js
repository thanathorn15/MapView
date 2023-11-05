import axios from "axios";

const locationApi = axios.create({
  baseURL: "http://localhost:8000",
});


export const addLocation = (input) => {
    return locationApi.post("/api/addlocation", input);
  };