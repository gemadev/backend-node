/*  Import de dependencias */

// @deno-types="https://denopkg.com/soremwar/deno_types/react/v16.13.1/react.d.ts"
import React from "https://jspm.dev/react@17.0.2";
// @deno-types="https://denopkg.com/soremwar/deno_types/react-dom/v16.13.1/server.d.ts"
import ReactDOMServer from "https://jspm.dev/react-dom@17.0.2/server";

import { Application, Context, Router } from "https://deno.land/x/oak@v7.3.0/mod.ts";


/*  Configuro servidor ppt 47 / uso de OAK ppt 48 (sería el KOA para DENO)  
    sinó imposible hacer andar esto, tiene menos soporte que windows 3.1 
*/

const app = new Application();
const router = new Router();

/*  Defino variable global */

let colors: Color[] = [];


/*  Defino modulos/templates para REACT 
    Colores solo se aceptan en ingles para se usa css-inline para estilos
*/

const ListColors = ({ color }) => {
  return (
    <section key={color}>
      <li style={{ color: `${color}`, fontSize: '22px', textTransform: 'uppercase' }} className="p-1">
        {color}
      </li>
    </section>
  );
};

const Form = () => {
  const [color, setColor] = React.useState(colors);
  return (
    <div className="container alert alert-warning border border-primary mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 mt-3">
          <h2 className="text-center text-dark">"TODO" de colores</h2>
          <p className="text-mute text-center">Solo se aceptan palabras en Inglés</p>
          <form action="/" method="post" className="form-group mt-4">
            <input
              type="text"
              id="color"
              name="color"
              className="form-control text-center"
              placeholder="Ejemplo: red "
              style={{ fontSize: "20px" }}
            />
            <button className="btn btn-success mt-3" style={{ width: "100%" }}>
              Ingresar
            </button>
          </form>
          <h3 className="text-center mt-4 text-primary">Colores:</h3>
          <section style={{ backgroundColor: "#000" }} className='mt-4'>
            <ul style={{ marginLeft: "39%" }}>
              {color.map((c) => (
                <ListColors color={c} key={c} />
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};



/*  Defino rutas con OAK / version de KOA para DENO */

router.get("/", (ctx: Context) => {
  ctx.response.body = `
  <!DOCTYPE html>
  <html lang="es">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
      <title>Desafio 47 DENO</title>
  </head>
  <body >
      <h1 class="text-center mt-5">Desafio 47 DENO</h1>
      <div id="root">${ReactDOMServer.renderToString(<Form />)}
      </div>
  </body>
  </html>`;
});

router.post("/", async (ctx: Context) => {
  const data = await ctx.request.body().value;
  const params = new URLSearchParams(data);
  const newColor: Color = params.get("color");
  if (!newColor || newColor.trim() === "") {
    return ctx.response.redirect("/");
  }
  colors.push(newColor);
  ctx.response.redirect("/");
});

/*  Inicio app */

app.use(router.routes());

const PORT = 8080;

console.log(`Escuchando en el Puerto: ${PORT}`);
await app.listen({ port: PORT });