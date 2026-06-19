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
    //string
    await redis.set("name", "shahriar", {
        EX: 10
    })

    //hash

await redis.hSet("user:1", {
    "name": "shahriar",
    "age": "22",
    "email": "shahriar@gmail.com"
})


// get hash data
const userData = await redis.hGetAll("user:1")
// console.log(userData);

//list
await redis.lPush("fruits", "apple" )
await redis.rPush("fruits", "banana")
const fruits = await redis.lRange("fruits", 0, -1)
// // console.log(fruits);

//set
await redis.sAdd("colors", ["red", "green", "blue"])

const colors = await redis.sMembers("colors")
// console.log(colors);

    res.send("data set in redis")
})


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});