# Desafio clase 44: Graphql

## Pasos
1) Instalar dependencias:
````
npm i
````

2) Iniciar servidor
````
npm start
````

3) Graphql: ``Iniciar session por web``
    ### Usuario de ejemplo:`` email:"test@test.com", password:"test"``
    
    <br>

    *    Log usuario existente
        http://localhost:8080/login


    *    Crear usuario
        http://localhost:8080/signup

4) Graphql: ``Query y Mutaciones``

    http://localhost:8080/graphql

    <br>

 ### Ejemplos:

<br>

*   ``getAllProducts``
```
{
  getAllProducts {
    _id
    nombre
    descripcion
    codigo
    foto
    precio
    stock
    timestamp
  }
}
````

*   ``getProductById``
````
{
 getProductById(id:"63c5ef443c1ddc6ca0742495") {
   _id
   nombre
   descripcion
   codigo
   foto
   precio
   stock
   timestamp
 }
}
````
*   ``addProduct``
````
mutation{
    addProduct(input:{
        nombre: "Prod desde Graphql!"
        descripcion: "Test GRAPHQL"
        foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/800px-GraphQL_Logo.svg.png"
        precio: 555.55
        stock: 555
  }) {
    _id
    nombre
    descripcion
    codigo
    foto
    precio
    stock
    timestamp
  }
}

````
*   ``updateProductById``
````
mutation {
  updateProductById(
    id: "63c5f0173c1ddc6ca07424a4",
    input: {nombre: "asdasd",
      descripcion: "asdasd!",
      foto: "asdasd!",
      precio: 123,
      stock: 123})
  {
    _id
    nombre
    descripcion
    codigo
    foto
    precio
    stock
    timestamp
  }
}
````
*   ``getUserByEmail``
````
{getUserByEmail(email:"test@test.com") {
  _id
  nombre
  email
  age
  phone
  adress
  thumbnail
  cart
}}
`````
*   ``getUserCartById``
````
{getUserCartById(id:"63dc08869cdcf24cd4c3f8ac") {
  _id
  nombre
  descripcion
  timestamp
  codigo
  precio
  stock
  foto
  cantidad
}}

````