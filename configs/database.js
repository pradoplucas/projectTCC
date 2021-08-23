/*  Módulos */
const mongoose = require('mongoose'); /* Importa o módulo mongoose */

/* Definição */
mongoose.set(
	'useFindAndModify',
	false
); /* Define a opção para falso, pois ela está precária e pode causar problemas */

/* Conectar no banco */
module.exports = mongoose
	.connect(process.env.MONGODB_SERVER_KEY, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('##### -- MongoDB Connect: Success\n');
	})
	.catch((err) => {
		console.log('##### -- MongoDB Connect: Error\n' + err + '\n');
	});
