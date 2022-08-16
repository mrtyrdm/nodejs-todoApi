import cron from 'node-cron';
import user from "../models/user";
import todos from "../models/todos";
import email from "../service/Email";
import { Op } from "sequelize";

class Cron {
    static deadlineControl(){
        cron.schedule("*/60 * * * * *", function() {
            todos.findAll({where:{status:false,deadline: {[Op.lte] : Date.now()}}}).then((data:any) => {
                console.log(data.length);
                data.forEach(async e => {
                    await user.findByPk(e.user_id).then((data : any) => {
                        // Sending mail and update
                        //email.sendMails('murat@epsilam.com', e.name+' task time over.', 'Task Mail');
                    });

                    await todos.findByPk(e.id).then((todo:any) => {
                        todo.update({status:true}).then(status => {
                            console.log('send to mail')
                        }).catch(error => {
                            console.log(error)
                        });
                    });

                })
            });
        });
    }
}

export default Cron;