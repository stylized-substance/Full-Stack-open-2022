import { ContentProps } from "../types";
import Part from "./Part";

const Content = ({ props }: ContentProps) => {
  return (
    <div>
      {props.map(part => <Part props={part} />)}
    </div>
  );
};

export default Content;