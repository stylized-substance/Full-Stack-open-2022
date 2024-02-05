interface ReturnObject {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (hourArray: number[], target: number): ReturnObject => {
  const trainingDays = hourArray.filter((element => element > 0));
  
  const averageHours = Number((hourArray.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }) / hourArray.length));

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
    periodLength: hourArray.length,
    trainingDays: trainingDays.length,
    success: averageHours >= target,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: averageHours
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));