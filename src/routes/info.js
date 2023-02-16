const Router = require('koa-router');
const os = require('os');


const routerInfo = new Router({
    prefix: '/info' 
});


routerInfo.get('/', async (ctx) => {
    const PORT = ctx.response.socket.localPort;
    const infoProyecto = {
        argumentos: process.argv, // "Argumentos de entrada": process.argv,
        plataforma: process.platform, // "Nombre de la plataforma": process.platform,
        versionNode: process.version, // "Versión de Node.js": process.version,
        pathEjecucion: process.execPath, // "Path de ejecución": process.execPath,
        memoriaTotalReservada: Math.floor(process.memoryUsage().rss / (1024 * 1024)), // "Memoria total de reservada": process.memoryUsage().rss,
        processId: process.pid, // "Process ID": process.pid,
        directorioActualTrabajo: process.cwd(), // "Directorio actual del trabajo": process.cwd(),
        numProcesadores: os.cpus().length, // "Número de procesadores": os.cpus().length,
        PORT: PORT,
    };
    
    // res.render('info', { title: "Info" , infoProyecto});
    // ctx.response.body = infoProyecto;
    // await ctx.render('info', { title: "Info", infoProyecto: infoProyecto });
    // await ctx.render('info', { title: "Info", infoProyecto: infoProyecto });
    // ctx.state = { title: 'my title', infoProyecto: infoProyecto }
    return await ctx.render('info.hbs', { title: "Info", infoProyecto: infoProyecto })
});


module.exports = routerInfo;