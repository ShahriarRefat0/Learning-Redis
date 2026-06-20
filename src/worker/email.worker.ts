import { Worker } from "bullmq";
import sendEmail from "../sendEmail.js";

const emailWorker = new Worker("email-queue", async (job)=>{
    // console.log("Processing job: ", job);
    await sendEmail(job.data);
}, {
    connection:{
        url: process.env.REDIS_URL as string    
    }
})

emailWorker.on("completed", (job)=>{
    console.log("Job completed: ", job.id);
})

emailWorker.on("failed", (job, err)=> console.log("Job failed: "));

export default emailWorker;