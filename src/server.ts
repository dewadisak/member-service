import cors from 'cors';
import express, { Express, Request, Response } from 'express';
const app: Express = express()
app.use(express.json());
app.use(cors())

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello Express + TypeScirpt!!',
  })
})

app.listen(3000, () => {
  console.log('Application started on port 3000!');
});