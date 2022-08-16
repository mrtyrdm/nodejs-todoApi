import express, {Express, Request, Response} from 'express';
import db from '../config/database';
import todosRoute from '../routes/todos';
import Cron from '../service/Cron';
import {Server} from 'socket.io';
import * as http from "http";
import cors from 'cors';
import multer from 'multer';



Cron.deadlineControl();

db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err))

const app: Express = express();
const port = 8080;
const upload = multer();


app.use(cors());

// for parsing application/json
app.use(express.json());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));

app.use('/todo', todosRoute);

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

io.on('connection', (socket) => {

    socket.on('join', (params,data) => {
        socket.join(params);
        socket.broadcast.to(params).emit('count', data);
        //socket.to(params).emit('count', data);
        socket.emit('count', data);

        socket.broadcast.to(params).emit('delete', data);
        socket.emit('delete', data);

        socket.broadcast.to(params).emit('update', data);
        socket.emit('update', data);

        console.log(params,data);
    });

    socket.on('disconnect', ()=> {
        console.log('User Disconnect', socket.id);
    });

});

server.listen(port, () => {
    console.log('server çalışıyor');
})
