import express from "express";
import { resumirHistoria } from "../services/openai.js";
const router = express.Router();

router.post("/", async (req, res) => {
  const historia = Object.entries(req.body)
    .map(([key, value]) => `${key}: ${value}`)
    .join(".\n") + ".";

  const resumen = await resumirHistoria(historia);
  res.json(resumen);
});

export default router;
