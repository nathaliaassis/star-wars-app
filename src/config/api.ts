import axios, { AxiosInstance } from "axios";

const api = axios.create({
  baseURL: "https://swapi.dev/api",
}) as AxiosInstance;

export { api };
