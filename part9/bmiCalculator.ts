
export const bmiCalculator = (parameters: string[]) => {
  const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / ((height * 0.01) ** 2);
    switch(true) {
      case bmi < 18.5:
        return 'Underweight';
      case bmi < 25:
        return 'Normal (healthy weight)';
      case bmi < 30:
        return 'Overweight';
      case bmi >= 30:
        return 'Obese';
      default:
        return 'Invalid bmi'
    }
  }

  try {
  const { height, weight } = parseArguments(parameters);
  return calculateBmi(height, weight);
  } catch (error: unknown) {
    let errorMessage = 'Error: ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }
}