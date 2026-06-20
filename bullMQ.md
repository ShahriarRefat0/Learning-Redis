# BullMQ Project Setup

This repository demonstrates a basic BullMQ setup with Express and Bull Board.

## 1. Install dependencies

From the project root, install the required packages:

```bash
npm install express
npm install bullmq
npm install @bull-board/api @bull-board/express
```

If you are using pnpm, run:

```bash
pnpm install express bullmq @bull-board/api @bull-board/express
```

## 2. Create your queue in `sendEmail.ts`

In your source code, create and export the BullMQ queue. For example:

```ts
// sendEmailQueue.ts
import { Queue } from "bullmq";

export const emailQueue = new Queue("email");
```

## 3. Add a worker in `worker.ts`

Create a worker file to process jobs from the queue:

```ts
// worker.ts
import { Worker } from "bullmq";
import { emailQueue } from "./sendEmail";

const worker = new Worker("email", async (job) => {
  console.log("Processing job", job.id, job.data);
  // add actual email sending work here
});

worker.on("completed", (job) => {
  console.log(`Job completed: ${job.id}`);
});

worker.on("failed", (job, err) => {
  console.error(`Job failed: ${job?.id}`, err);
});
```

## 4. Configure Express

Set up an Express server and import your queue:

```ts
// server.ts
import express from "express";
import { emailQueue } from "./sendEmail";

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```

## 5. Add Bull Board for queue UI

Install Bull Board and add the following setup to your server file:

```ts
import { createBullBoard } from "@bull-board/api";

import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";

import { ExpressAdapter } from "@bull-board/express";

const serverAdapter = new ExpressAdapter();

serverAdapter.setBasePath("/admin/queues");

createBullBoard({
  queues: [new BullMQAdapter(emailQueue)],
  serverAdapter,
});

app.use("/admin/queues", serverAdapter.getRouter());
```

## 6. Run the app

Use the existing dev script to start the app:

```bash
npm run dev
```

Then open:

- http://localhost:3000/admin/queues

## Notes

- Process jobs in `worker.ts` using `new Worker(...)`.
- The Bull Board UI is mounted under `/admin/queues`.
