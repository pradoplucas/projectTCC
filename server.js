/* Módulos */
require('dotenv').config(); /* Configuração das variáveis de ambiente */
const app = require('./configs/app'); /* Configuração do app */
const database = require('./configs/database'); /* Configuração do BD */
const indexRouter = require('./app/routes/index.route'); /* Importa a rota / */
const aboutRouter = require('./app/routes/about.route'); /* Importa a rota /sobre */
const searchPersonRouter = require('./app/routes/searchPerson.route'); /* Importa a rota /searchPerson */
const searchEventRouter = require('./app/routes/searchEvent.route'); /* Importa a rota /searchEvent */
const signInRouter = require('./app/routes/signIn.route'); /* Importa a rota /signIn */
const signUpRouter = require('./app/routes/signUp.route'); /* Importa a rota /signUp */
const verifyEmailRouter = require('./app/routes/verifyEmail.route'); /* Importa a rota /verifyEmail */
const configsRouter = require('./app/routes/configs.route'); /* Importa a rota /configs */
const myCertsRouter = require('./app/routes/myCerts.route'); /* Importa a rota /myCerts */
const recomendRouter = require('./app/routes/recomend.route'); /* Importa a rota /recomend */
const docsRouter = require('./app/routes/docs.route'); /* Importa a rota /docs */
const signOutRouter = require('./app/routes/signOut.route'); /* Importa a rota /signOut */
const downloadRouter = require('./app/routes/download.route'); /* Importa a rota /download */
const resetPasswordRouter = require('./app/routes/resetPassword.route'); /* Importa a rota /resetPassword */

/* Constante */
const PORT =
	process.env.PORT ||
	3000; /* Define a porta na qual a aplicação vai rodar */

/* Rotas */
app.use(indexRouter); /* Adiciona ao middleware a rota / */
app.use(aboutRouter); /* Adiciona ao middleware a rota /sobre */
app.use(searchPersonRouter); /* Adiciona ao middleware a rota /searchperson */
app.use(searchEventRouter); /* Adiciona ao middleware a rota /searchEvent */
app.use(signInRouter); /* Adiciona ao middleware a rota /signIn */
app.use(signUpRouter); /* Adiciona ao middleware a rota /signUp */
app.use(verifyEmailRouter); /* Adiciona ao middleware a rota /verifyEmail */
app.use(configsRouter); /* Adiciona ao middleware a rota /configs */
app.use(myCertsRouter); /* Adiciona ao middleware a rota /myCerts */
app.use(recomendRouter); /* Adiciona ao middleware a rota /recomend */
app.use(docsRouter); /* Adiciona ao middleware a rota /docs */
app.use(signOutRouter); /* Adiciona ao middleware a rota /signOut */
app.use(downloadRouter); /* Adiciona ao middleware a rota /download */
app.use(resetPasswordRouter); /* Adiciona ao middleware a rota /resetPassword */

/* Abre o servidor na porta especificada */
app.listen(PORT, () => {
	console.log(
		'\n##### -- Server Running: Success\nLink: http://localhost:' +
			PORT +
			'\n'
	);
});
