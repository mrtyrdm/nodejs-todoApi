import * as redis from 'redis';
import * as dotenv from "dotenv";

dotenv.config();

const portRedis:any = process.env.PORT_REDIS || '6379';

const redisClient : any = redis.createClient(portRedis, 'localhost');


redisClient.on('connect', function() {
    console.log('Redis Connected!');
});

redisClient.on('error', function (err) {
    console.log('Redis Clientda bir hata var ' + err);
});

export default redisClient;