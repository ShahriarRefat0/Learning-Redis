import express, { type Request, type Response } from 'express';
import { createClient } from 'redis';
import "dotenv/config";


const app = express();


//redis connection
const redis = await createClient({
    url: process.env.REDIS_URL as string
})


const connectRedis = async ()=>{
    await redis.connect();
    console.log("Connected to Redis");
}

connectRedis();


//server
app.post("/redis", async (req: Request, res: Response)=>{
    await redis.set("name", "shahriar", {
        EX: 10
    })
    res.send("data set in redis")
})


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});