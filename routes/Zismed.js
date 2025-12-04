import express from "express";
import { obtenerCodigoCIE } from "../services/openai.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { texto, temperatura = 0.2 } = req.body;

  try {
    const codigo = await obtenerCodigoCIE(texto, temperatura);
    res.send(codigo);
  } catch (error) {
    console.error("Error en obtenerCodigoCIE:", error.message);
    res.status(500).send("Error al comunicarse con OpenAI");
  }
});

export default router;
