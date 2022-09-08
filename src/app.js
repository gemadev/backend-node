import express from 'express';
import productsRouter from './routes/products.router.js';

const app = express();

const server = app.listen(8080, () => {
  console.log('Server is running on port 8080');
}).on('error', (err) => {
  console.log(err);
})

app.use(express.json());
app.use('/api/products', productsRouter);
app.use(express.static('src/public'));

