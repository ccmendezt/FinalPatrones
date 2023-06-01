const nodemailer = require('nodemailer');
const { contCorreo } = require('./contenidoCorreo.js');

exports.enviarEmail = (nombre, apellido, email, usuario, password, tipoCorreo) => {
	// Configuración del transporte de correo
	const transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'parkudcolombia@gmail.com',
			pass: 'dmqgugraaponotaz'
		}
	});

	// Definición del mensaje de correo con el contenido personalizado
	// const contenido = contCorreo.contenidoCorreo(nombre, apellido, email, usuario, password, tipoCorreo);
	const contenido = contCorreo(nombre, apellido, email, usuario, password, tipoCorreo);

	// Envío del correo electrónico
	transporter.sendMail(contenido, function (error, info) {
		if (error) {
			console.log('Error al enviar el correo electrónico:', error);
		} else {
			console.log('Correo electrónico enviado:', info.response);
		}
	});
}
