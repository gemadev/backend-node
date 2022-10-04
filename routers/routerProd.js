import { Router } from "express";
import Productos from "../api/productos.js";
import {middlewareUserLogueado, middlewareIsAdmin} from "../middleware/permisos.js";

export const routerProductos = Router();

const productos = new Productos("./api/productos.json");


routerProductos.get("/:id?", middlewareUserLogueado, async (req, res) => {
    const id = req.params.id;
    const productoPorId = await productos.getById(id);
    productoPorId !== null
        ? res.status(200).send(productoPorId)
        : res.status(404).send(await productos.getAll());
});

routerProductos.post("/", middlewareUserLogueado, middlewareIsAdmin, async (req, res) => {
    const producto = req.body;
    res.status(201).send(await productos.addNewProduct(producto));
});

routerProductos.put("/:id", middlewareUserLogueado, middlewareIsAdmin, async (req, res) => {
    const id = req.params.id;
    const producto = req.body;
    (await productos.updateById(id, producto)) !== null
        ? res.status(201).send(`Producto con el ID:${id} actualizado`)
        : res.status(404).send(`ERROR ID:${id} no encontrado`);
});

routerProductos.delete("/:id", middlewareUserLogueado, middlewareIsAdmin, async (req, res) => {
    const id = req.params.id;
    (await productos.deleteById(id)) !== null
        ? res.status(201).send(`Producto con el ID: ${id} eliminado`)
        : res.status(404).send(`Error ID:${id} no encontrado`);
});