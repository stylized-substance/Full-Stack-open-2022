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
  if (!req.body.daily_exercises || !req.body.target) {
    res.status(400).send({ error: "parameters missing" });
    return;
  }

  const daily_exercises: number[] = req.body.daily_exercises;
  const target: number = Number(req.body.target);
  
  if (!Array.isArray(daily_exercises)) {
    res.status(400).send({ error: "malformatted parameters "});
    return;
  }
  
  const exercisesAsNumbers = daily_exercises.map((element: any) => Number(element));

  if (exercisesAsNumbers.some((item: number) => isNaN(item))) {
    res.status(400).send({ error: "malformatted parameters "});
    return;
  }

  const calculateResult = calculateExercises(target, exercisesAsNumbers);
  res.status(200).send(calculateResult);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});