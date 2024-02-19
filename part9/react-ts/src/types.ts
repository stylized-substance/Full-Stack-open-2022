interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background";
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;

export type HeaderProps = {
  text: string,
};

export type ContentProps = {
  props: CoursePart[]
};

export type TotalProps = {
  totalExercises: number,
};

export type PartProps = {
  props: CoursePart
};