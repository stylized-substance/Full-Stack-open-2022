import { ContentProps } from "../types";

const Content = ({ props }: ContentProps) => {
  return (
    <>
      <p>
        {props[0].name} {props[0].exerciseCount}
      </p>
      <p>
        {props[1].name} {props[1].exerciseCount}
      </p>
      <p>
        {props[2].name} {props[2].exerciseCount}
      </p>
      
    </>
  )
}

export default Content