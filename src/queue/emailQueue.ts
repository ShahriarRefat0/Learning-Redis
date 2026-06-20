import { Queue } from "bullmq";

const emailQueue = new Queue("email-queue",{
    connection:{
        url: process.env.REDIS_URL as string
    }
})

export default emailQueue;