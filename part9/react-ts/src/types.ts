interface coursePart {
  name: string,
  exerciseCount: number,
}

export type HeaderProps = {
  text: string,
};

export type ContentProps = {
  props: coursePart[]
};

export type TotalProps = {
  totalExercises: number,
};