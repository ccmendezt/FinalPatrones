function contCorreo(nombre, apellido, email, usuario, password, tipoCorreo) {
	if (tipoCorreo == 'admin') {
		return mensajeCorreoAdmin = {
			from: 'parkudcolombia@gmail.com',
			to: email,
			subject: '¡Registro de Administrador Exitoso! - PAR-KUD Colombia',
			html: `
				<h2>¡Hola ${nombre} ${apellido}!</h2>
				<p>Desde PAR-KUD Colombia estamos felices de que te unas a esta familia, por eso estamos orgullosos de que seas un nuevo administrador, así que aquí están todos tus datos para utilizar la plataforma:</p>
				<p><b>Nombres y apellidos:</b> ${nombre} ${apellido}</p>
				<p><b>E-mail:</b> ${email}</p>
				<p><b>Usuario:</b> ${usuario}</p>
				<p><b>Contraseña:</b> ${password}</p>
				<p>¡Saludos y bienvenido a la familia de PAR-KUD Colombia!</p>
				<p><b>Nota:</b> Recuerda cambiar la contraseña en tu primer inicio de sesión</p>
				<p>Este es un correo electrónico personalizado para <i>${nombre} ${apellido}</i>.</p>
			`
		}
	} else if (tipoCorreo == 'cliente') {
		return mensajeCorreoCliente = {
			from: 'parkudcolombia@gmail.com',
			to: email,
			subject: '¡Registro Exitoso! - PAR-KUD Colombia',
			html: `
			<h2>¡Hola ${nombre} ${apellido}!</h2>
			<p>Desde PAR-KUD Colombia estamos felices de tenerte así que a continuación te proporcionaremos tus credenciales de inicio de sesión:</p>
			<p><b>Usuario:</b> ${usuario}</p>
			<p><b>Contraseña:</b> ${password}</p>
			<p>¡Saludos!</p>
			<p><b>Nota:</b> Recuerda cambiar la contraseña en tu primer inicio de sesión</p>
			<p>Este es un correo electrónico personalizado para <i>${nombre} ${apellido}</i>.</p>
		`
		};
	} else if (tipoCorreo == 'cambioPass') {
		return mensajeCorreoCambioPass = {
			from: 'parkudcolombia@gmail.com',
			to: email,
			subject: '¡Cambio de contraseña! - PAR-KUD Colombia',
			html: `
			<h2>¡Hola ${nombre} ${apellido}!</h2>
			<p>Hemos detectado 3 intentos de ingreso erróneos a tu cuenta, así que decidimos generar una nueva contraseña para que puedas iniciar sesión, a continuación te proporcionaremos tus credenciales:</p>
			<p><b>Usuario:</b> ${usuario}</p>
			<p><b>Contraseña:</b> ${password}</p>
			<p>¡Saludos!</p>
			<p><b>Nota:</b> Recuerda cambiar la contraseña en tu primer inicio de sesión</p>
			<p>Este es un correo electrónico personalizado para <i>${nombre} ${apellido}</i>.</p>
		`
		};
	} else if (tipoCorreo == 'updateDatosCuenta') {
		return mensajeCorreoCambioPass = {
			from: 'parkudcolombia@gmail.com',
			to: email,
			subject: '¡Actualización de datos! - PAR-KUD Colombia',
			html: `
			<h2>¡Hola ${nombre} ${apellido}!</h2>
			<p>De acuerdo con lo que acabas de hacer en el sistema enviamos todos tus datos actualizados a tu correo registrado:</p>
			<p><b>Usuario:</b> ${usuario}</p>
			<p><b>Contraseña:</b> ${password}</p>
			<p>¡Saludos!</p>
			<p>Este es un correo electrónico personalizado para <i>${nombre} ${apellido}</i>.</p>
		`
		};
	} else if (tipoCorreo == 'factura') {
		return mensajeCorreoFactura = {
			from: 'parkudcolombia@gmail.com',
			to: email,
			subject: '¡Nueva factura! - PAR-KUD Colombia',
			html: `
			<h2>¡Hola!</h2>
			<p>Realizaste un pago de Parkudcol</p>
			<p><b>Monto:</b> ${nombre}</p>
			<p><b>Si tienes algun reclamo dale este id a alguno de nuestros empleados:</b> ${apellido}</p>
			<p>¡Saludos!</p>
			<p>Este es un correo electrónico personalizado de <i>PARKUDCOL</i>.</p>
		`
		};
	} else if (tipoCorreo == 'cancelacion') {
		return mensajeCorreoCancelacion = {
			from: 'parkudcolombia@gmail.com',
			to: email,
			subject: '¡Cancelación de reserva! - PAR-KUD Colombia',
			html: `
			<h2>¡Hola ${nombre}!</h2>
			<p>Tu reserva, <b>con Id:</b> ${apellido}, ha sido cancelada por no acceder dentro del tiempo límite.</p>
			<p>¡Saludos!</p>
		`
		};
	}
};

module.exports = { contCorreo };