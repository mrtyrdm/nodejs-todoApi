import cron from 'node-cron';
import db from "../config/database";
import user from "../models/user";
import todos from "../models/todos";
import email from "../service/Email";

class Cron {
    static deadlineControl(){
        cron.schedule("*/60 * * * * *", function() {
            db.query('select * from "todos" where "updatedAt"="createdAt" and "createdAt"<=now()').then((data: any) => {
                const deadline = data[0];
                console.log(data[1].rowCount);
                deadline.forEach(async element => {
                    await user.findByPk(element.user_id).then((data : any) => {
                        // Sending mail and update
                        email.sendMails('mail@example.com', element.name+' task time over.', 'Task Mail');
                    });

                    // element update status change true
                    await todos.findByPk(element.id).then((todo:any) => {
                        todo.update({status:true}).then(status => {
                            console.log('başarılı oldu')
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