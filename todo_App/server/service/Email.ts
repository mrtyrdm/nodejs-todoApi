import * as dotenv from "dotenv";
import * as AWS from 'aws-sdk';


class Email {

    toAddress : string;
    Data :string;
    Subject: string;

    constructor(toAddress, Data, Subject) {
        dotenv.config();
        this.toAddress = toAddress;
        this.Data = Data;
        this.Subject = Subject;
        this.config();
    }

    private config():any {

        const SESConfig = {
            region: process.env.AWS_SES_REGION,
            httpOptions: { timeout: 30000, connectTimeout: 5000 },
            accessKeyId: process.env.AWS_KEY,
            secretAccessKey: process.env.AWS_SECRET_KEY,
        }

        AWS.config.update(SESConfig);
    }

    public from():any {
        const params : any = {
            Source: 'noreply@email.epsilam.com',
            Destination: {
                ToAddresses: [
                    this.toAddress
                ]
            },
            Message: {
                Body: {
                    Html: {
                        Charset: "UTF-8",
                        Data: this.Data
                    }
                },
                Subject: {
                    Charset: 'UTF-8',
                    Data: this.Subject
                }
            }
        };

        return params;
    }

    static sendMails(ToAddresses : String, Data: String ,Subject: String) : any{
        const myClass = new Email(ToAddresses, Data, Subject);

        const sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(myClass.from()).promise();
        sendPromise.then(
            function(data) {
                return console.log(data.MessageId);
            }).catch(
            function(err) {
                return console.error(err, err.stack);
        });
    }

}



export default Email;