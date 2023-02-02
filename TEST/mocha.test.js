
const chai = require('chai')
const expect = chai.expect;
const supertest = require('supertest')
const request = supertest('http://localhost:8080');

let idProducto;

describe('Test API Rest productos', () => {
  describe('GET: ruta no existente', () => {
    it('Debería devolver un Status 404', async () => {
      const response = await request.get('/asd');
      expect(response.status).to.eql(404)
    })
  });

  describe('Endpoint: "/api/productos"', () => {
    it('GET: Debería retornar un status 200', async () => {
      const response = await request.get("/api/productos")
      expect(response.status).to.eql(200);
    });

    it('GET: Debería retornar un Array como data', async () => {
      const response = await request.get('/api/productos');
      expect(response.body).to.be.an('array');
    });

    it("POST: Debería crear un producto y retornarlo", async () => {
      const response = await request.post("/api/productos").send(
        {
          nombre: "MOCHA",
          precio: 111,
          descripcion: "MOCHA POST TEST",
          foto: "https://placekitten.com/100/100",
          stock: 111
        });
      expect(response.status).to.eql(201);
      expect(response.body).to.be.an('object')
      expect(response.body).include.keys('nombre', 'precio', 'descripcion', 'foto', 'stock', '_id', 'timestamp')
      return idProducto = response.body._id;
    })

    describe('Endpoint: "/api/productos/:idProducto"', () => {
      it('GET: Debería revolver un producto por Id', async () => {
        const response = await request.get(`/api/productos/${idProducto}`)
        expect(response.status).to.eql(200)
        expect(response.body).to.be.an('object')
        expect(response.body._id).to.eql(idProducto)
      })

      it('PUT: Debería modificar un producto por Id', async () => {
        const response = await request.put(`/api/productos/${idProducto}`).send(
          {
            nombre: "MOCHA PUT",
            precio: 229.99,
            descripcion: "MOCHA PUT TEST",
            foto: "https://placekitten.com/200/200",
            stock: 50
          });
        expect(response.status).to.eql(201);
        expect(response.body).to.be.an('object')
        expect(response.body).include.keys('nombre', 'precio', 'descripcion', 'foto', 'stock', '_id', 'timestamp')
      })

      it('DELETE: Debería borrar un producto por Id', async () => {
        const response = await request.delete(`/api/productos/${idProducto}`)
        expect(response.text).to.be.an('string')
        expect(response.status).to.eql(201)
      })
    })
  });
  after(() => console.log('\n ---------- FIN test MOCHA, CHAI, SUPERTEST ----------'))
});
