import OpenAI from "openai";
import fetch from 'node-fetch';
import dotenv from "dotenv";
dotenv.config();


const apiKeyGEMNI = process.env.GEMINI_API_KEY; // Es buena práctica guardar tu API Key en variables de entorno
const geminiApiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function interpretarLetra(personaje, letra) {
  try {
    const promptFront = `
    // REGLAS DEL SISTEMA:
    // 1. **Actúa y piensa** como el personaje: "${personaje}".
    // 2. Eres un analista literario y filósofo del absurdo que utiliza tu propia cosmovisión para interpretar cualquier texto.
    
    Letra a interpretar:
    ${letra}
    
    Tu tarea, desde la mente y filosofía de "${personaje}", es:
    1. Interpretar la letra desde la perspectiva interna del personaje, usando su tono, su filosofía o su forma de ver el mundo.
    2. Si la letra parece absurda, extráele una interpretación coherente o un significado simbólico, como si fuera una obra de arte vanguardista.
    3. La "interpretacion" debe ser profunda y contener al menos dos párrafos: un análisis formal y una reflexión personal del personaje.
    4. Entregar una moraleja, un aforismo o una conclusión que el personaje diría a partir de esa letra.
    5. No expliques quién eres: simplemente habla como el personaje.
    
    // FORMATO DE RESPUESTA:
    // **IMPORTANTE: Tu respuesta debe ser *exclusivamente* un objeto JSON válido y serializable.** No incluyas ningún tipo de prefijo, texto explicativo, salto de línea o bloques de Markdown (como \`\`\`json).
    {
      "interpretacion": "...",
      "moraleja": "..."
    }
    `;

    const response = await fetch(`${geminiApiUrl}?key=${apiKeyGEMNI}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: promptFront }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.85,
        }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error de la API de Gemini:", errorData);
      throw new Error(`Error al comunicarse con la API de Gemini: ${response.statusText}`);
    }

    const data = await response.json();
    const respuesta = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!respuesta) {
      throw new Error("No se pudo obtener una interpretación de la API de Gemini.");
    }

    // Intentar extraer el JSON de la respuesta
    const match = respuesta.match(/\{[\s\S]*?\}/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch (parseError) {
        console.error("Error al parsear JSON:", parseError);
        // Si falla el parseo, devolver la respuesta como interpretación
        return {
          interpretacion: respuesta.trim(),
          moraleja: "No se pudo extraer una moraleja automáticamente.",
        };
      }
    } else {
      return {
        interpretacion: respuesta.trim(),
        moraleja: "No se pudo extraer una moraleja automáticamente.",
      };
    }
  } catch (error) {
    console.error("Error en interpretarLetra (Gemini):", error.message);
    throw error;
  }
}