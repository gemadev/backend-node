# Desafio clase 46: KOA

## Pasos
1) Instalar dependencias:
````
npm i
````

2) Iniciar servidor
````
npm start
````

3) Rutas:

    ### `"/api/productos"`

    * GET `"/"` : Obtener productos
    * POST `"/"` : Agregar nuevo producto
    * GET `"/:id"` : Obtener productos por ID
    * DELETE `"/:id"` : Eliminar productos por ID
    * PUT `"/:id"` : Modificar productos por ID

    <br>
    <br>

    ### `"/api/carrito"`

    * GET `"/"` : Obtener carritos
    * POST `"/"` : Crear nuevo carrito
    * GET `"/:id/productos"` : Obtener productos en carrito por ID
    * POST `"/:id/productos"` : Agregar productos en carrito por ID
    * DELETE `"/:id/productos"` : Eliminar todos los productos en carrito por ID
    * DELETE `"/:id/productos/:id_prod"` : Eliminar productos por ID, en carrito por ID


    <br>
    <br>

    ### `"/api/mensajes"`

    * GET `"/"` : Obtener mensajes, con normalización
    * POST `"/"` : Crear nuevo mensaje
    * GET `"/:userId"` : Obtener mensaje por ID de usuarios
    * DELETE `"/:id"` : Eliminar mensaje por ID

    <br>
    <br>

    ### `"/user/"`

    * GET `"/"` : Obtener usuarios
    * POST `"/"` : Crear nuevo usuario
    * GET `"/:userId"` : Obtener usuario por ID
    * GET `"/:userId/carrito` : Obtener productos en carrito por ID de usuarios
    * GET `"/:userId/order` : Generar orden de compra de productos en carrito por ID de usuarios, send-mail con nodmailer
    * DELETE `"/:userId"` : Eliminar usuario por ID

    <br>
    <br>

    ### `"/info/"`

    * GET `"/"` : Obtener información del servidor, view por Handlebars
