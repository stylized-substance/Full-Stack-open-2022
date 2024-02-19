import { PartProps } from "../types";

const assertNever = (value: never) => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const Part = ({ props }: PartProps) => {
  console.log(props);
  let jsxToRender;
  
  // switch (props.kind) {
  //   case "basic": 
  //     propertiesToRender = [props.name, props.exerciseCount];
  //     break;
  //   case "group":
  //     propertiesToRender = [props.name, props.exerciseCount, props.groupProjectCount];
  //     break;
  //   case "background":
  //     propertiesToRender = [props.name, props.exerciseCount, props.description, props.backgroundMaterial];
  //     break;
  //   default:
  //     return assertNever(props);
  // }

  switch (props.kind) {
    case "basic": {
      const { name, exerciseCount } = props;
      jsxToRender = <div>{name} {exerciseCount}</div>;
      break;
    }
    case "group": {
      const { name, exerciseCount, groupProjectCount } = props;
      jsxToRender = <div>{name} {exerciseCount} {groupProjectCount}</div>;
      break;
    }
    case "background": {
      const { name, exerciseCount, description, backgroundMaterial } = props;
      jsxToRender = <div>{name} {exerciseCount} {description} {backgroundMaterial}</div>;
      break;
    }
    default: {
      return assertNever(props);
    }
  }

  console.log(jsxToRender);
  // const propertiesToRenderMapped = propertiesToRender.map(property => <div>{property}</div>);
  
  return (
    <div>
      {/* {propertiesToRenderMapped} */}
      {jsxToRender}
    </div>
  );
};

export default Part;