
export default function authMiddleware(req, res, next) {
  // Puedes comentar esta línea si no quieres verificar el token
  // const authHeader = req.headers["authorization"];
  // if (!authHeader || !authHeader.startsWith("Bearer ")) {
  //   return res.status(401).json({ error: "Token no proporcionado" });
  // }

  // Si prefieres no verificar el token, simplemente omítelo:
  next();
}