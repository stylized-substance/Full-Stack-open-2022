interface ReturnObject {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (target: number, dayArray: number[]): ReturnObject => {
  const trainingDays = dayArray.filter((element => element > 0));
  
  const averageHours = Number((dayArray.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }) / dayArray.length));

  const percentOfGoal = Math.floor(averageHours / target * 100);

  let rating;
  let ratingDescription;
  switch (true) {
    case (percentOfGoal < 50):
      rating = 1;
      ratingDescription = 'Could do better';
      break;
    case (percentOfGoal >= 50 && percentOfGoal < 97):
      rating = 2;
      ratingDescription = 'Doing OK';
      break;
    case (percentOfGoal >= 97):
      rating = 3;
      ratingDescription = 'Doing great!';
      break;
  }

  
  return {
    periodLength: dayArray.length,
    trainingDays: trainingDays.length,
    success: averageHours >= target,
    rating: Number(rating),
    ratingDescription: String(ratingDescription),
    target: target,
    average: averageHours
  };
};

interface calculateExercisesInput {
  target: number;
  dayArray: number[];
}

const parseInput = (args: string[]): calculateExercisesInput => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const dayArray: number[] = [];   // changed let to const per eslint suggestion
  const argsToProcess = args.slice(3);

  for (const arg of argsToProcess) {
    if (isNaN(Number(arg))) {
      throw new Error('Only numbers are allowed as arguments');
    }
    dayArray.push(Number(arg));
  }

  return {
    target: Number(argsToProcess[0]),
    dayArray: dayArray
  };
};

try {
  const { target, dayArray } = parseInput(process.argv);
  console.log(parseInput(process.argv));
  console.log(calculateExercises(target, dayArray));
} catch (error: unknown) {
  let errorMessage = 'Error: ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}