import express from 'express';
import { bmiCalculator } from './bmiCalculator'
import { parseArguments } from './parseArguments';

// console.log(bmiCalculator)

const app = express();

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
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});