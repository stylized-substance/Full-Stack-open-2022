import express from 'express';
import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
  const result = patientsService.getEntries();
  res.send(result);
});

export default router;