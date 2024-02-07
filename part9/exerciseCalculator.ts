interface ReturnObject {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (target: number, dayArray: number[]): ReturnObject => {
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