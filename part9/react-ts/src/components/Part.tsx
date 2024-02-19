import { PartProps } from "../types";

const assertNever = (value: never) => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const Part = ({ props }: PartProps) => {

  switch (props.kind) {
    case "basic": {
      const { name, exerciseCount } = props;
      console.log(name);
      return (
        <div>
          <p>
            <b>
              {name} {exerciseCount}
            </b>
          </p>
        </div>
      );
    }
    case "group": {
      const { name, exerciseCount, groupProjectCount } = props;
      return (
        <div>
          <p>
            <b>
              {name} {exerciseCount}
            </b>
            <br></br>
            Group projects: {groupProjectCount}
          </p>
        </div>
      );
    }
    case "background": {
      const { name, exerciseCount, description, backgroundMaterial } = props;
      return (
        <div>
          <p>
            <b>
              {name} {exerciseCount}
            </b>
            <br></br>
            {description}
            <br></br>
            {backgroundMaterial}
          </p>
        </div>
      );
    }
    case "special": {
      const { name, exerciseCount, description, requirements } = props;
      return (
        <div>
          <p>
            <b>
              {name} {exerciseCount}
            </b>
            <br></br>
            {description}
            <br></br>
            Required skills: {requirements.map(item => <div>{item}</div>)}
          </p>
        </div>
      );
    }
    default: {
      return assertNever(props);
    }
  }
};

export default Part;