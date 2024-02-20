import { useState } from "react";

const NewDiaryForm = () => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newDiary = {
      date: date,
      visibility: visibility,
      weather: weather,
      comment: comment,
    };
    
    for (const setAction of [ setDate, setVisibility, setWeather, setComment ]) {
      setAction('');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          Date: <input
            value={date} onChange={(event) => setDate(event.target.value)} />
        </div>
        <div>
          Visibility: <input
            value={visibility}
            onChange={(event) => setVisibility(event.target.value)}
          />
        </div>
        <div>
          Weather: <input
            value={weather}
            onChange={(event) => setWeather(event.target.value)}
          />
        </div>
        <div>
          Comment: <input
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
