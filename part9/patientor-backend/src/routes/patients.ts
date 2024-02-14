import express from 'express';
import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
  const result = patientsService.getEntries();
  res.send(result);
});

router.get('/:id', (req, res) => {
  const result = patientsService.findById(req.params.id);
  if (result) {
    res.send(result);
  } else {
    res.sendStatus(404);
  }
});

export default router;