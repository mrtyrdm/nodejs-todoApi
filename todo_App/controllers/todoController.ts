import todos from '../models/todos';
import {Request, Response} from "express";
import auth from "../service/Auth";
import user from "../models/user";

;

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

            todos.findAll({where : {user_id:users.id}}).then(todos =>  res.status(200).send(todos))
                .catch((error) => { res.status(400).send(error); });
        }
    }


    public store() : any {

        return (req: Request, res: Response) => {
            const users = new auth(req.headers.authorization).auth();

            todos.create({name: req.body.name, user_id:users.id}).then((course) => res.send({'message': 'Success'}))
            .catch((error) => res.status(400).send(error));
        }
    }

    public update() : any {
        return (req: Request, res: Response) => {
            todos.findByPk(req.params.id).then(todos => {

                if (!todos) {
                    return res.status(404).send({
                        message: 'Todo Not Found',
                    });
                }

                todos.update({name: req.body.name}).then(() => res.send(todos))
                    .catch((error) => res.status(400).send(error));

            }).catch((error) => res.status(400).send(error));
        }
    }


    public destroy() : any {
        return (req : Request, res: Response) => {
            todos.findByPk(req.params.id)
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
        }
    }



}

export default TodoController;