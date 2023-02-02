const axios = require('axios').default;

axios.defaults.baseURL = 'http://localhost:8080';

let productoId;

const getListaProductos = async () => {
  try {
    console.log(" ---------- getListaProductos() ----------")
    const response = await axios.get("/api/productos");
    // console.log(response.data);// array de productos de Mongo Atlas
    console.log("¿Es un typeof Objetct?: ", typeof response.data === "object");
    Array.isArray(response.data)
        ? console.log(`\nLa lista de productos se leyó existosamente\n`)
        : console.log(`No se pudieron leer los productos`);
  } catch (error) {
    console.error(error);
  }
};

const postProducto = async () => {
  try {
    console.log(" ---------- postProducto() ----------")
    const response = await axios.post("/api/productos", {
      nombre: 'AXIOS',
      precio: 299.99,
      descripcion: 'POST desde axios',
      foto: 'https://placekitten.com/100/100',
      stock: 200,
    })
    console.log("\nPOST producto agregado", response.data)
    productoId = response.data._id;
    return productoId;
  } catch (error) {
    console.log(error);
  }
};

const putProducto = async (productoId) => {
  try {
    console.log(" ---------- putProducto(productoId) ----------")
    const response = await axios.put(`/api/productos/${productoId}`, {
      nombre: 'PUT AXIOS PUT',
      precio: 111.11,
      descripcion: 'PUT desde axios PUT',
      foto: 'https://placekitten.com/300/300',
      stock: 1111,
    })
    console.log("PUT producto modificado", response.data)
  } catch (error) {
    console.log(error);
  }
};

const deleteProducto = async (productoId) => {
  try {
    console.log(" ---------- deleteProducto(productoId) ----------");
    const response = await axios.delete(`/api/productos/${productoId}`);
    console.log(response.data)
  } catch (error) {
    console.log(error);
  }
};

const testRutaNoPermitida = async () => {
  try {
    console.log(" ---------- testRutaNoPermitida() ----------");
    const response = await axios.get("/noExiste");
    //sale por catch
  } catch (error) {
    console.log(error.response.data); //message de server.js linea 92
    console.log({error: error.response.status}); //status Axios
    console.log({error: error.message}); //message AXIOS
  }
};

const testAxios = async () => {
  console.log("---------- Inicio test con Axios ----------")
  await getListaProductos()
  await postProducto()
  await putProducto(productoId)
  await deleteProducto(productoId)
  await getListaProductos()
  await testRutaNoPermitida()
  console.log("\n---------- Fin test con Axios ----------")
};


testAxios()
