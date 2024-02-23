import { useState } from "react";
import { NewDiaryFormProps, NewDiary, Diary } from "../types";
import { addDiary } from "../services/diaryService";
import toast, { Toaster } from "react-hot-toast";

const NewDiaryForm = ({ diaries, setDiaries }: NewDiaryFormProps) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");

  const notify = (message: string) => toast(message);

  const isDiary = (input: Diary | Error): input is Diary => {
    return (input as Diary).weather !== undefined;
  };

  const isString = (input: unknown): input is string => {
    return typeof input === "string" || input instanceof String;
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newDiary: NewDiary = {
      date: date,
      weather: weather,
      visibility: visibility,
      comment: comment,
    };

    addDiary(newDiary).then((result) => {
      if (isDiary(result)) {
        setDiaries(diaries.concat(result));
      } else {
        if (isString(result)) {
          notify(result);
        } else {
          throw new Error(`addDiary result is unknown: ${JSON.stringify(result)}`);
        }
      }

      for (const setAction of [
        setDate,
        setVisibility,
        setWeather,
        setComment,
      ]) {
        setAction("");
      }
    });
  };

  return (
    <div>
      <Toaster />
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Date:
            <input
              type="date"
              value={date}
              required
              onChange={(event) => setDate(event.target.value)}
            />
          </label>
        </div>
        <br></br>
        <div>
          <fieldset>
            <legend>Visibility:</legend>
            <label htmlFor="Great">Great</label>
            <input
              type="radio"
              name="Visibility"
              value="great"
              id="Great"
              onChange={(event) => setVisibility(event.target.value)}
            />
            <label htmlFor="Good">Good</label>
            <input
              type="radio"
              name="Visibility"
              value="good"
              onChange={(event) => setVisibility(event.target.value)}
            />
            <label htmlFor="Ok">Ok</label>
            <input
              type="radio"
              name="Visibility"
              value="ok"
              onChange={(event) => setVisibility(event.target.value)}
            />
            <label htmlFor="Poor">Poor</label>
            <input
              type="radio"
              name="Visibility"
              value="poor"
              onChange={(event) => setVisibility(event.target.value)}
            />
          </fieldset>
        </div>
        <div>
          <fieldset>
            <legend>Weather</legend>
            <label htmlFor="Sunny">Sunny</label>
            <input
              type="radio"
              name="Weather"
              value="sunny"
              id="Sunny"
              onChange={(event) => setWeather(event.target.value)}
            />
            <label htmlFor="Rainy">Rainy</label>
            <input
              type="radio"
              name="Weather"
              value="rainy"
              id="Rainy"
              onChange={(event) => setWeather(event.target.value)}
            />
            <label htmlFor="Cloudy">Cloudy</label>
            <input
              type="radio"
              name="Weather"
              value="cloudy"
              id="Cloudy"
              onChange={(event) => setWeather(event.target.value)}
            />
            <label htmlFor="Stormy">Stormy</label>
            <input
              type="radio"
              name="Weather"
              value="stormy"
              id="Stormy"
              onChange={(event) => setWeather(event.target.value)}
            />
            <label htmlFor="Windy">Windy</label>
            <input
              type="radio"
              name="Weather"
              value="windy"
              id="Windy"
              onChange={(event) => setWeather(event.target.value)}
            />
          </fieldset>
        </div>
        <div>
          <label>
            Comment:
            <input
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
          </label>
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default NewDiaryForm;
