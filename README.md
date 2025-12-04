## InterpretAI API

API de interpretación creativa de letras y textos usando IA (principalmente Gemini) y un sistema de feedback simple.

Esta API está pensada para proyectos como **InterpretAI**, donde el usuario elige un personaje (real o ficticio) y la IA interpreta una letra o texto desde la perspectiva de ese personaje.

### Características

- **Interpretación de letras por personaje**: envías un personaje y una letra, y la IA responde como si fuera ese personaje (`/interpreta`).
- **Moralejas y reflexiones**: junto a la interpretación, devuelve una moraleja o conclusión (`/interpreta`).
- **Feedback de usuarios**: guarda la reacción del usuario (like/dislike + comentario opcional) para análisis posterior (`/feedback`).

### Requisitos previos

- **Node.js** >= 18
- Cuenta y API Key de **OpenAI**
- API Key de **Google Gemini**

### Instalación

```bash
git clone https://github.com/Leandro1709-sys/interpretAI-API.git
cd interpretAI-API
npm install
```

### Variables de entorno

Crea un archivo `.env` en la raíz con:

```bash
OPENAI_API_KEY=tu_clave_de_openai
GEMINI_API_KEY=tu_clave_de_gemini
PORT=3001
```

### Uso

Iniciar el servidor en modo normal:

```bash
npm start
```

Modo desarrollo (con `nodemon`):

```bash
npm run dev
```

El servidor se levanta por defecto en `http://localhost:3001`.

### Rutas principales

Todas las rutas aceptan y responden en **JSON**.

- **POST `/interpreta`**  
  - **Body**:  
    ```json
    {
      "personaje": "Nombre del personaje",
      "letra": "Texto de la letra o canción"
    }
    ```  
  - **Respuesta** (ejemplo de estructura):  
    ```json
    {
      "interpretacion": "Texto con la interpretación desde el personaje",
      "moraleja": "Conclusión o moraleja generada por la IA"
    }
    ```

- **POST `/feedback`**  
  - **Body**:  
    ```json
    {
      "feedback": "like",
      "comment": "Muy buena interpretación"
    }
    ```  
    - `feedback`: `"like"` o `"dislike"` (obligatorio).  
    - `comment`: texto opcional con comentario del usuario.  
  - **Respuesta**:  
    ```json
    {
      "success": true,
      "message": "Feedback guardado correctamente.",
      "feedbackId": "1700000000000"
    }
    ```

- **GET `/feedback`**  
  - **Respuesta**:  
    ```json
    {
      "success": true,
      "count": 3,
      "feedbacks": [
        {
          "id": "1700000000000",
          "type": "like",
          "comment": "Muy buena interpretación",
          "timestamp": "2025-01-01T12:00:00.000Z",
          "ip": "127.0.0.1"
        }
      ]
    }
    ```  
  - Los feedbacks se almacenan en `data/feedback.json`.

### Autenticación

Actualmente el `middleware` de autenticación (`middleware/auth.js`) **no valida tokens** (el código está comentado), por lo que todas las rutas están abiertas.  
Si quieres activar la verificación de token, puedes descomentar la lógica dentro de `authMiddleware`.

### Tecnologías utilizadas

- **Express** para la API REST.
- **Google Gemini 2.0 Flash** para la interpretación creativa de letras a través de `services/openai.js` (función `interpretarLetra`).
- **Node-fetch** para llamar a la API externa de Gemini.
- **CORS** y manejo de JSON.
- **CORS** y manejo de JSON.

### Licencia

Proyecto personal/experimental para fines educativos y creativos. Ajusta la licencia según tus necesidades.
