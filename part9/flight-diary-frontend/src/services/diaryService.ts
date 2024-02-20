import axios from "axios";
import { Diary } from "../types";

export const getDiaries = () => {
  return axios
    .get<Diary[]>('http://localhost:3000/api/diaries').then(response => response.data);
};