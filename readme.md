# DESAFIO CLASE 18 MONGOSH

Se crea la base de datos ecommerce con dos colecciones (mensajes y productos):

use ecommerce

db.createCollection("chats")

db.createCollection("products")

#### Puntos 1 y 2:

db.chats.insertMany([
  {
    user: "Gonzalo",
    message: "Hola",
    date: "25/10/2022",
    time: "12:00"
  },
  {
    user: "David",
    message: "Hola",
    date: "25/10/2022",
    time: "12:01"
  },
  {
    user: "Gonzalo",
    message: "Como estas?",
    date: "25/10/2022",
    time: "12:02"
  },
  {
    user: "David",
    message: "Bien y vos?",
    date: "25/10/2022",
    time: "12:03"
  },
  {
    user: "Gonzalo",
    message: "Todo bien, haciendo el desafio",
    date: "25/10/2022",
    time: "12:04"
  },
  {
    user: "David",
    message: "25/10/2022",
    date: "19/8/2022",
    time: "12:05",
  },
  {
    user: "Gonzalo",
    message: "Este desafio no está costando tanto, y a vos?",
    date: "25/10/2022",
    time: "12:06"
  },
  {
    user: "David",
    message: "Mas o menos",
    date: "25/10/2022",
    time: "12:07"
  },
  {
    user: "Gonzalo",
    message: "Listo, ya estoy para entregar el desafio",
    date: "25/10/2022",
    time: "12:08"
  },
  {
    user: "David",
    message: "Genial, lo hiciste rápido!",
    date: "25/10/2022",
    time: "12:09"
  }
])

db.products.insertMany([
  {
    title: "Producto 1",
    price: 120,
    thumbnail: "https://picsum.photos/200/300"
  },
  {
    title: "Producto 2",
    price: 580,
    thumbnail: "https://picsum.photos/200/300"
  },
  {
    title: "Producto 3",
    price: 900,
    thumbnail: "https://picsum.photos/200/300"
  },
  {
    title: "Producto 4",
    price: 1280,
    thumbnail: "https://picsum.photos/200/300"
  },
  {
    title: "Producto 5",
    price: 1700,
    thumbnail: "https://picsum.photos/200/300"
  },
  {
    title: "Producto 6",
    price: 2300,
    thumbnail: "https://picsum.photos/200/300"
  },
  {
    title: "Producto 7",
    price: 2860,
    thumbnail: "https://picsum.photos/200/300"
  },
  {
    title: "Producto 8",
    price: 3350,
    thumbnail: "https://picsum.photos/200/300"
  },
  {
    title: "Producto 9",
    price: 4320,
    thumbnail: "https://picsum.photos/200/300"
  },
  {
    title: "Producto 10",
    price: 4990,
    thumbnail: "https://picsum.photos/200/300"
  }
])

#### Punto 3:

db.chats.find()

db.products.find()

#### Punto 4:

db.chats.estimatedDocumentCount()
db.products.estimatedDocumentCount()

#### Punto 5:

##### A)

db.products.insertOne({
  title: "Producto 11",
  price: 4999,
  thumbnail: "https://picsum.photos/200/300"
})

##### B)

db.products.find({"price": {$lt: 1000}})

db.products.find({$and: [{price: {$gt: 1000}}, {price: {$lt: 3000}}]})

db.products.find({"price": {$gt: 3000}})

db.products.find({}, {"title": 1}).sort({price: 1}).skip(2).limit(1)

##### C)

db.products.updateMany({}, {$set: {"stock": 100}})

##### D)

db.products.updateMany({"price": {$gt: 4000}}, {$set: {"stock": 0}})

##### E)

db.products.deleteMany({"price": {$lt: 1000}})

#### Punto 6:

db.createUser({user: 'pepe', pwd: 'asd456', roles: [{role: 'read', db: 'ecommerce'}]})


