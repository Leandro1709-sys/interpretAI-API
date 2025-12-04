import express from "express";
import dotenv from "dotenv";

import interpretaRoutes from "./routes/interpreta.js"; // Aquí importas tu archivo de rutas de interprete
import feedbackRoutes from "./routes/feedback.js"; // Ruta para feedback
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); // Habilita CORS para permitir peticiones desde diferentes orígenes

// Middleware de autenticación
app.use(authMiddleware);

// Rutas
app.use("/interpreta", interpretaRoutes); // Ruta para interpretar letras
app.use("/feedback", feedbackRoutes); // Ruta para feedback

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API corriendo en puerto ${PORT}`));
