import * as express from 'express';
import todos from '../models/todos';
import {Request, Response} from "express";
import Todos from "../models/todos";

const route = express.Router();

route.get('/', async (req: Request, res: Response) => {
    await todos.findAll().then(todos =>  res.status(200).send(todos))
       .catch((error) => { res.status(400).send(error); });
});

route.post('/add' , async (req : Request, res: Response) => {
    console.log(req.body.name);
   await todos.create({name: req.body.name}).then((course) => res.status(201).send(todos))
       .catch((error) => res.status(400).send(error));
});

route.put('/update/:id', async (req : Request, res: Response) => {
    await todos.findByPk(req.params.id).then(todos => {

        if (!todos) {
            return res.status(404).send({
                message: 'Todo Not Found',
            });
        }

        todos.update({name:req.body.name}).then(() => res.send(todos))
            .catch((error) => res.status(400).send(error));

    }).catch((error) => res.status(400).send(error));
});

route.delete('/delete/:id', async (req : Request, res: Response) => {
    await Todos.findByPk(req.params.id)
        .then(todos => {
            if (!todos) {
                return res.status(400).send({
                    message: 'todos Not Found',
                });
            }
            return todos
                .destroy()
                .then(() => res.send({todos}))
                .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error));
});


export default route;