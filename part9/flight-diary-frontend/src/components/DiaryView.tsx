import { DiaryViewProps } from "../types";

const DiaryView = ({ diaries }: DiaryViewProps) => {
  const diariesMapped = diaries.map((diary) => 
  <li key={diary.id}>
    <h3>
      {diary.date}
    </h3>
    Visibility: {diary.visibility}
    <br></br>
    Weather: {diary.weather}
  </li>
  );
  
  return (
    <div>
      <ul>
        {diariesMapped}
      </ul>
    </div>
  );
};

export default DiaryView;