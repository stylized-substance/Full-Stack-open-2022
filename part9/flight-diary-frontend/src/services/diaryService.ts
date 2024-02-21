import axios from "axios";
import { Diary, NewDiary } from "../types";

export const getDiaries = () => {
  return axios
    .get<Diary[]>("http://localhost:3000/api/diaries")
    .then((response) => response.data);
};

export const addDiary = (newDiary: NewDiary) => {
  return axios
    .post<Diary>("http://localhost:3000/api/diaries", newDiary)
    .then((response) => response.data);
};
