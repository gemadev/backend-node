import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import indexRouter from './routes/index.js';

const app = express();

const server = app.listen(8080, () => {
  console.log('Server is running on port 8080');
});

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use('/', indexRouter);