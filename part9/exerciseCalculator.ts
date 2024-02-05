interface ReturnObject {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ReturnObject {
  periodLength: number;
}

const calculateExercises = (hourArray: number[], target: number): ReturnObject => {
  const trainingDays = hourArray.filter((element => element > 0));
  
  const averageHours = Number((hourArray.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }) / hourArray.length).toFixed(2));

  const percentOfGoal = averageHours / target * 100
  console.log(percentOfGoal)

  let rating
  switch (true) {
    case (percentOfGoal < 50):
      rating = 1;
    case (percentOfGoal < 80):
      rating = 2;
    case (percentOfGoal >= 80):
      rating = 3;
  }

  
  return {
    periodLength: hourArray.length,
    trainingDays: trainingDays.length,
    success: averageHours >= target,
    rating: rating,
    ratingDescription: '0',
    target: target,
    average: averageHours
  }
}


// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 10));