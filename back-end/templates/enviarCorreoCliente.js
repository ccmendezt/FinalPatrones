const nodemailer = require('nodemailer');

exports.enviarEmail = (nombre, apellido, email, usuario, password) => {
	// Configuración del transporte de correo
	const transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'parkudcolombia@gmail.com',
			pass: 'dmqgugraaponotaz'
		}
	});

	// Definición del mensaje de correo con el contenido personalizado
	const mensajeCorreo = {
		from: 'parkudcolombia@gmail.com',
		to: email,
		subject: '¡Registro Exitoso! - PAR-KUD Colombia',
		html: `
    <h2>¡Hola ${nombre} ${apellido}!</h2>
		<p>Desde PAR-KUD Colombia estamos felices de tenerte así que a continuación te proporcionaremos tus credenciales de inicio de sesión.</p>
		<p><b>Usuario:</b> ${usuario}</p>
		<p><b>Contraseña:</b> ${password}</p>
		<p>¡Saludos!</p>
		<p>Este es un correo electrónico personalizado para ${nombre} ${apellido}.</p>
  `
	};

	// Envío del correo electrónico
	transporter.sendMail(mensajeCorreo, function (error, info) {
		if (error) {
			console.log('Error al enviar el correo electrónico:', error);
		} else {
			console.log('Correo electrónico enviado:', info.response);
		}
	});
}
