import express from "express";
import { clasificarDiagnostico } from "../services/openai.js";
const router = express.Router();

router.post("/", async (req, res) => {
  const texto = Object.entries(req.body)
    .map(([key, value]) => `${key}: ${value}`)
    .join(".\n") + ".";

  const resultado = await clasificarDiagnostico(texto);
  res.json(resultado);
});

export default router;
