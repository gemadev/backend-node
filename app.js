import express from 'express';
import __dirname from './utils.js';
import indexRouter from './routes/index.js';
import { Server } from 'socket.io';

const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
const io = new Server(server);

app.set('socketio', io);

let log = [];

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.emit('fetchProducts')
  socket.emit('log', log);
  socket.broadcast.emit('newUser', socket.id);
  socket.on('message', (data) => {
    log.push(data);
    io.emit('log', log);
  });
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'));
app.use('/', indexRouter);
