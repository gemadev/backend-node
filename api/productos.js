import fs from 'fs';

class Productos {
    constructor(fileName) {
        this.fileName = fileName;
    }

    async getAll() {
        if (fs.existsSync(this.fileName)) {
            const contenido = await fs.promises.readFile(this.fileName,"utf-8");
            try {
                return JSON.parse(contenido);
            } catch (error) {
                console.log("Error getAll :", error);
            }
        }else{
            return [];
        }
    }

    async addNewProduct(producto) {
        try {
            if (fs.existsSync(this.fileName)) {
                const contenido = await fs.promises.readFile(this.fileName, "utf-8");
                const _products = JSON.parse(contenido);
                _products.length > 0
                    ? (producto.id = _products[_products.length - 1].id + 1)
                    : (producto.id = 1);
                producto.timestamp = Date().toLocaleString();
                producto.codigo = `${producto.id}-${Date.now()}`;
                _products.push(producto);
                fs.writeFileSync(this.fileName, JSON.stringify(_products, null, 2));
            }
        } catch (error) {
            console.log("Error save :", error);
        }
    }

    async getById(id) {
        try {
            const productos = JSON.parse(fs.readFileSync(this.fileName, "utf-8"));
            const index = productos.findIndex((producto) => producto.id === Number(id));
            if (index === -1) return null;
            else return productos[index];
        } catch (error) {
            console.log("Error getById :", error);
        }
    }

    async updateById(id, productoNuevo) {
        try {
            const productos = JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
            const idProducto = productos.find(producto => producto.id === Number(id));
            const index = productos.indexOf(idProducto);
            if (index === -1) {
                return null;
            } else {
                productos[index].timestamp = Date().toLocaleString();
                if (productoNuevo.nombre) { productos[index].nombre = productoNuevo.nombre };
                if (productoNuevo.descripcion) { productos[index].descripcion = productoNuevo.descripcion };
                if (productoNuevo.foto) { productos[index].foto = productoNuevo.foto };
                if (productoNuevo.precio) { productos[index].precio = productoNuevo.precio };
                if (productoNuevo.stock) { productos[index].stock = productoNuevo.stock };
                fs.writeFileSync(this.fileName, JSON.stringify(productos, null, 2));
                return productos[index];
            }
        }
        catch (error) {
            console.log("Error updateById: ",error);
        }
    }

    async deleteById(id) {
        try {
            const productos = JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
            const index = productos.findIndex(producto => producto.id === Number(id));
            if (index === -1) {
                return null;
            }
            else {
            productos.splice(index, 1);
            fs.writeFileSync(this.fileName, JSON.stringify(productos, null, 2));
            }
        }
        catch (error) {
            console.log("Error deleteById: ",error);
        }
    }
}

export default Productos;