import express from "express";
import { completarEvolucion } from "../services/openai.js";
const router = express.Router();

router.post("/", async (req, res) => {
  const texto = Object.entries(req.body)
    .map(([key, value]) => `${key}: ${value}`)
    .join(".\n") + ".";

  const respuesta = await completarEvolucion(texto);
  res.json(respuesta);
});

export default router;
