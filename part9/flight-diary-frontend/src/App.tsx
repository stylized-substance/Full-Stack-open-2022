import { useEffect, useState } from "react";
import { getDiaries } from "./services/diaryService";
import { Diary } from "./types";

import DiaryView from "./components/DiaryView";
import NewDiaryForm from "./components/NewDiaryForm";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    getDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  return (
    <div>
      <div>
        <h1>Add new entry</h1>
        <NewDiaryForm diaries={diaries} setDiaries={setDiaries} />
      </div>
      <div>
        <h1>Diary entries</h1>
        <DiaryView diaries={diaries} />
      </div>
    </div>
  );
};

export default App;
