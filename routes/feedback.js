import express from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

// Obtener el directorio actual en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta al archivo donde se guardarán los feedbacks
const feedbackFilePath = path.join(__dirname, "../data/feedback.json");
//
// Función para leer feedbacks existentes
async function readFeedbacks() {
  try {
    const data = await fs.readFile(feedbackFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    // Si el archivo no existe, retornar array vacío
    return [];
  }
}

// Función para escribir feedbacks
async function writeFeedbacks(feedbacks) {
  // Asegurar que el directorio existe
  const dataDir = path.dirname(feedbackFilePath);
  await fs.mkdir(dataDir, { recursive: true });
  
  // Escribir el archivo
  await fs.writeFile(feedbackFilePath, JSON.stringify(feedbacks, null, 2), "utf-8");
}

router.post("/", async (req, res) => {
  const { feedback, comment } = req.body;

  // Validar que se recibieron los datos necesarios
  if (!feedback) {
    return res.status(400).json({ 
      success: false, 
      error: "El tipo de feedback es obligatorio." 
    });
  }

  try {
    // Leer feedbacks existentes
    const feedbacks = await readFeedbacks();

    // Crear nuevo feedback
    const newFeedback = {
      id: Date.now().toString(),
      type: feedback, // 'like' o 'dislike'
      comment: comment || null,
      timestamp: new Date().toISOString(),
      ip: req.ip || req.connection.remoteAddress,
    };

    // Agregar el nuevo feedback
    feedbacks.push(newFeedback);

    // Guardar en el archivo
    await writeFeedbacks(feedbacks);

    console.log(`Feedback recibido: ${feedback}${comment ? ` - Comentario: ${comment}` : ""}`);

    // Responder con éxito
    res.json({ 
      success: true, 
      message: "Feedback guardado correctamente.",
      feedbackId: newFeedback.id
    });
  } catch (error) {
    console.error("Error al guardar feedback:", error.message);
    res.status(500).json({ 
      success: false, 
      error: "Error al guardar el feedback." 
    });
  }
});

// Ruta opcional para obtener todos los feedbacks (útil para administración)
router.get("/", async (req, res) => {
  try {
    const feedbacks = await readFeedbacks();
    res.json({ 
      success: true, 
      count: feedbacks.length,
      feedbacks 
    });
  } catch (error) {
    console.error("Error al leer feedbacks:", error.message);
    res.status(500).json({ 
      success: false, 
      error: "Error al leer los feedbacks." 
    });
  }
});

export default router;

