import { ContentProps } from "../types";
import Part from "./Part";

const Content = ({ props }: ContentProps) => {
  // const propsMapped = props.map(part => <Part props={part} />);
  console.log(props);
  return (
    <>
      {props.map(part => <Part props={part} />)}
    {/* asd */}
    </>
  );
};

export default Content;