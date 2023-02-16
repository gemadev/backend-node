require('dotenv').config();

const koa = require('koa');

const koaBody = require('koa-body');

const { logger, loggerError, loggerWarn } = require('./src/logs/winston.js');
const apiRouter = require('./src/routes/index.js');


const yargArgs = require('./src/utils/yarg-cli.js');
const cluster = require('cluster');
const os = require('os');
const routerInfo = require('./src/routes/info.js');

const app = new koa();

app.use(koaBody());

const views = require('koa-views');
const path = require('path');

app.use(views(__dirname + '/public/views', {
    map: { hbs: 'handlebars' },
	options: {helpers: { uppercase: (str) => str.toUpperCase()},
	cache: true,
	// layout: {main: './layouts/main'},
	partials: {
		main: './partial/main',
        header: './partial/header',
		footer: './partial/footer'
    	},
	},
}));


app.use(apiRouter.routes());

app.use(routerInfo.routes());


// Rutas inexistentes, logger Warnings
app.use(async (ctx) => {
	loggerWarn.log("warn", `Ruta ${ctx.url} y metodo ${ctx.method} no implementada - fyh: ${new Date().toLocaleString()} `)
    ctx.status = 404;
	return ctx.body = {
		error: -2,
		descripcion: `ruta ${ctx.url} y metodo ${ctx.method} no implementada`,
	};
});

// Ataja errores, logger Errores
app.use(async ( ctx, next) => {
    try {
        await next();
    } catch (error) {
        err.status = err.statusCode || err.status || 500;
        loggerError.log("error", error);
        ctx.response.status = err.status || 500;
    throw err;
    }
});

const PORT = process.env.PORT || yargArgs.puerto;
const MODO = yargArgs.modo;
const nroCPUs = os.cpus().length;


if (MODO !== 'FORK' && MODO !== 'CLUSTER') {
	new Error(loggerError.log("error", `Modo ${MODO} no implementado, usando FORK`));
};

if(MODO === 'CLUSTER' && cluster.isPrimary) {
	for(let i = 0; i < nroCPUs; i++){
		cluster.fork();
	}
	cluster.on('online', (worker) => {
		logger.log('info', `Worker PID: ${worker.process.pid} is alive`);
	} );
	cluster.on('exit', (worker) => {
		logger.log("warn", `Worker PID: ${worker.process.pid} died`);
	} );
} else {
	const server = app.listen(PORT, () => {
		logger.log(
            "info",
            `Escuchando en el Puerto: ${server.address().port} - MODO: ${MODO} - PID: ${process.pid} - fyh: ${new Date().toLocaleString()}`
        );
	} );
	server.on("error", (error) => loggerError.log("error", error));
};