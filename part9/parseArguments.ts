interface BmiValues {
  height: number;
  weight: number;
}

export const parseArguments = (args: string[]): BmiValues => {
  if (args.length < 2) throw new Error('Not enough arguments');
  if (args.length > 2) throw new Error('Too many arguments')
  if (Number(args[0]) < 1 || Number(args[1]) < 1) {
    throw new Error(`Parameters can't be zero`);
  }
  if (!isNaN(Number(args[0])) && !isNaN(Number(args[1]))) {
    return {
      height: Number(args[0]),
      weight: Number(args[1])
    }
  } else {
    throw new Error('Only numbers are allowed as arguments');
  }
}