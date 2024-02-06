import express from 'express';
// import { bmiCalculator } from './bmiCalculator'
// import { parseArguments } from './parseArguments';

// console.log(bmiCalculator)

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, _res) => {
  const params = Object.values(req.query)
  console.log(typeof(params))
  // const parsedParams = parseArguments(params)
  // res.send(parsedParams)
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});