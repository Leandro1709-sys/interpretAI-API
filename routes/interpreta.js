import express from "express";
import { interpretarLetra } from "../services/openai.js";


const router = express.Router();

router.post("/", async (req, res) => {
  const { personaje, letra } = req.body;

  if (!personaje || !letra) {
    return res.status(400).json({ error: "Faltan datos: personaje y letra son obligatorios." });
  }

  try {
    const resultado = await interpretarLetra(personaje, letra);
    res.send(resultado);
  } catch (error) {
    console.error("Error en interpretarLetra:", error.message);
    res.status(500).json({ error: "Error al comunicarse con la API de IA" });
  }
});

export default router;