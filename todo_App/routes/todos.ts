import * as express from 'express';
import todoController from "../controllers/todoController";
const route = express.Router();

let todoControl : any = new todoController();

route.get('/', todoControl.list);
route.post('/add', todoControl.store);
route.put('/update/:id', todoControl.update);
route.delete('/delete/:id', todoControl.destroy);


export default route;