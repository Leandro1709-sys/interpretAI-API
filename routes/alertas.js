import express from "express";
import { analizarAlertas } from "../services/openai.js";
const router = express.Router();

router.post("/", async (req, res) => {
  const historia = Object.entries(req.body)
    .map(([key, value]) => `${key}: ${value}`)
    .join(".\n") + ".";

  const alertas = await analizarAlertas(historia);
  res.json(alertas);
});

export default router;
