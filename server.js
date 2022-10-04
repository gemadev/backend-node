import express from 'express';
import { routerProductos } from './routers/routerProd.js';
import { routerCarritos } from './routers/routerCart.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarritos);


app.all("*", (req, res) => {
    res.status(404).send({
        error: -2,
        descripcion: `ruta ${req.originalUrl} y metodo ${req.method} no implementada`,
    });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, (err) => {
    if (err) console.log(err);
    else console.log(`Servidor corriendo en el puerto ${PORT}`);
});