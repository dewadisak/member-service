import cors from 'cors';
import express, { Express } from 'express';
import { RegisterController } from './register/register.controller.';
const app: Express = express()
app.use(express.json());
app.use(cors())
const registerController = new RegisterController;
app.use(registerController.router);

app.listen(3000, () => {
  console.log('Application started on port 3000!');
});