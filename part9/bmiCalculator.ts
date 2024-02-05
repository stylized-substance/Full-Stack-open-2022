const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / ((height * 0.01) ** 2)
  switch(true) {
    case bmi < 18.5:
      return 'Underweight'
    case bmi < 25:
      return 'Normal (healthy weight)'
    case bmi < 30:
      return 'Overweight'
    case bmi >= 30:
      return 'Obese'
  }
}

console.log(calculateBmi(180, 74))