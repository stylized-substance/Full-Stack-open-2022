export interface Diary {
  id: number,
  date: string,
  weather: string,
  visibility: string,
  comment: string
}

// export type NewDiary = Omit<Diary, "id">

export interface DiaryViewProps {
  diaries: Diary[]
}

export interface NewDiaryFormProps {
  diaries: Diary[]
  // setDiaries: React.Dispatch<React.SetStateAction<Diary[]>>
  // setDiaries: () => void
  setDiaries: React.Dispatch<React.SetStateAction<Diary[]>>
}