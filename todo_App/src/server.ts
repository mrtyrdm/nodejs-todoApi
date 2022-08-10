import express, {Express, Request, Response} from 'express';
import db from '../config/database';
import todosRoute from '../routes/todos';
import Cron from '../service/Cron';

Cron.deadlineControl();


db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err))

const app: Express = express();
const port = 8000;

app.use(express.json());
app.use('/todo', todosRoute);

app.listen(port, () => {
    console.log('çalışıyor');
})

