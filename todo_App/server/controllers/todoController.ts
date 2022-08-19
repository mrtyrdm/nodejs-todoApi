import todos from '../models/todos';
import {Request, Response} from "express";
import auth from "../service/Auth";
import redisClient from "../config/redis";

class TodoController {

    constructor() {
        this.list = this.list();
        this.store = this.store();
        this.update = this.update();
        this.destroy = this.destroy();
    }

    public list() : any {
        return (req: Request, res: Response) => {
            const users = new auth(req.headers.authorization).auth();

            return  redisClient.get(users.id+':todo', (err,response) => {
                if(!response){
                    console.log('db');
                    todos.findAll({where : {user_id:users.id}}).then(async todos => {
                        redisClient.set(users.id+':todo', JSON.stringify(todos));
                        await res.status(200).send(todos);
                    }).catch((error) => { res.status(400).send(error); });
                }else {
                    console.log('redis');
                    res.status(200).send(JSON.parse(response));
                }
            });
        }
    }


    public store() : any {

        return (req: Request, res: Response) => {
            const users = new auth(req.headers.authorization).auth();

            todos.create({name: req.body.name, user_id:users.id, deadline:req.body.deadline}).then((data) => {
                redisClient.del(users.id+':todo');
                res.send({'message': 'Success', 'data': data});
            }).catch((error) => res.status(400).send(error));
        }
    }

    public update() : any {
        return (req: Request, res: Response) => {

            todos.findByPk(req.params.id).then(todos => {
                const users = new auth(req.headers.authorization).auth();

                if (!todos) {
                    return res.status(404).send({
                        message: 'Todo Not Found',
                    });
                }

                redisClient.del(users.id+':todo');

                todos.update({name: req.body.name}).then(() => res.send({message:'success', data:todos}))
                    .catch((error) => res.status(400).send(error));

            }).catch((error) => res.status(400).send(error));
        }
    }


    public destroy() : any {

        return (req : Request, res: Response) => {
            const users = new auth(req.headers.authorization).auth();

            todos.findByPk(req.params.id)
                .then(todos => {
                    if (!todos) {
                        return res.status(400).send({
                            message: 'todos Not Found',
                        });
                    }

                    redisClient.del(users.id+':todo');

                    return todos
                        .destroy()
                        .then(() => res.send({todos}))
                        .catch((error) => res.status(400).send(error));
                })
                .catch((error) => res.status(400).send(error));
        }
    }



}

export default TodoController;