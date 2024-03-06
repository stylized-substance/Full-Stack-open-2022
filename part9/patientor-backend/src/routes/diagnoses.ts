import express from "express";
import diagnosesService from "../services/diagnosesService";

const router = express.Router();

router.get("/", (_req, res) => {
  const result = diagnosesService.getEntries();
  res.send(result);
});

router.get("/:code", (req, res) => {
  const result = diagnosesService.getOne(req.params.code);
  if (result) {
    res.send(result);
  } else {
    res.status(404).send("Diagnosis code not found");
  }
});

export default router;
