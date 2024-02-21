import { useState } from "react";
import { NewDiaryFormProps, NewDiary } from "../types";
import { addDiary } from "../services/diaryService";

const NewDiaryForm = ({ diaries, setDiaries }: NewDiaryFormProps) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newDiary: NewDiary = {
      date: date,
      weather: weather,
      visibility: visibility,
      comment: comment,
    };

    // const newDiary: NewDiary = {
    //   date: "12-12-2020",
    //   weather: "sunny",
    //   visibility: "ok",
    //   comment: comment,
    // };

    addDiary(newDiary).then((res) => {
      console.log(res);
      setDiaries(diaries.concat(res));
    });

    // addDiary(newDiary)
    // .then((res) => setDiaries(diaries.concat(res)));

    for (const setAction of [setDate, setVisibility, setWeather, setComment]) {
      setAction("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          Date:{" "}
          <input
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          Visibility:{" "}
          <input
            value={visibility}
            onChange={(event) => setVisibility(event.target.value)}
          />
        </div>
        <div>
          Weather:{" "}
          <input
            value={weather}
            onChange={(event) => setWeather(event.target.value)}
          />
        </div>
        <div>
          Comment:{" "}
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default NewDiaryForm;
