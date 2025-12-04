import express from "express";
import { sugerirEstudios } from "../services/openai.js";
const router = express.Router();

router.post("/", async (req, res) => {
  const contexto = Object.entries(req.body)
    .map(([key, value]) => `${key}: ${typeof value === "object" ? JSON.stringify(value) : value}`)
    .join(".\n") + ".";
console.log(contexto)
  const resultado = await sugerirEstudios(contexto);
  console.log(resultado)
  res.json(resultado);
});
export default router;
