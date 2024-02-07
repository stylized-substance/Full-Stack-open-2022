import express from 'express';
import { bmiCalculator } from './bmiCalculator';
import { parseArguments } from './parseArguments';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.status(200).send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const params = Object.values(req.query) as string[];
  try {
    const { height, weight } = parseArguments(params);
    const bmiResult = bmiCalculator(height, weight);
    res.status(200).send({
      "weight": weight,
      "height": height,
      "bmi": bmiResult
    });
  } catch {
    res.status(400).send({ error: 'Malformatted parameters'});
  }
  // console.log(height, weight)
});

app.post('/exercises', (req, res) => {
  const daily_exercises = req.body.daily_exercises;
  const target = req.body.target;
  if (!daily_exercises || !target) {
    res.status(400).send({ error: "parameters missing" })
  }
  // if (daily_exercises.some((element: any) => typeof(element) !== 'Number')) {
  // if (daily_exercises.some((element: number) => isNaN(element))) {
  // if (!(daily_exercises instanceof number[])) {
  // }
  // if (!Array.isArray(daily_exercises) || daily_exercises.every((item) => !isNaN(Number(item)))) {
  //   console.log(daily_exercises.every((item) => !isNaN(Number(item))))
  //   res.status(400).send({ error: "malformatted parameters "});
  // }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  // console.log(daily_exercises.forEach((item: unknown) => typeof(item)))

  // if (Array.isArray(daily_exercises)) {
  //   if (daily_exercises.every((item) => !isNaN(Number(item)))) {
  //     res.status(400).send({ error: "malformatted parameters "});
  //   }
  // }

  for (const value of daily_exercises) {
    console.log(typeof(value), isNaN(value))
  }

  // TODO: check for quoted numbers in daily_exercises

  if (!Array.isArray(daily_exercises) || !daily_exercises.every((item: any) => typeof(item) === 'number')) {
    res.status(400).send({ error: "malformatted parameters "});
  }

  const calculateResult = calculateExercises(Number(target), daily_exercises as number[]);
  console.log(calculateResult)
  res.status(200).send(calculateResult);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});