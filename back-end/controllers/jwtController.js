const jwt = require('jsonwebtoken');

// Función para validar el token
exports.validarToken = (req, res, next) => {
	// Obtener el token del encabezado de la solicitud
	const token = req.headers.authorization;

	// Verificar si el token existe
	if (!token) {
		return res.status(401).json({ mensaje: 'Acceso no autorizado' });
	}

	try {
		// Verificar y decodificar el token
		const decoded = jwt.verify(token, process.env.JWT_SECRET); // Reemplaza 'secreto' por tu clave secreta

		// Agregar los datos del usuario decodificados al objeto de solicitud
		req.usuario = decoded;

		// Continuar con el siguiente middleware
		next();
	} catch (error) {
		// Error al verificar el token
		return res.status(401).json({ mensaje: 'Token inválido', statusToken: false });
	}
}