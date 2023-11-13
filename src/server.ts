import cors from 'cors';
import express, { Express } from 'express';
import { LoginController } from './login/login.controller';
import { RegisterController } from './register/register.controller.';
const app: Express = express()
app.use(express.json());
app.use(cors())
const registerController = new RegisterController;
const loginController = new LoginController;
app.use(registerController.router);
app.use(loginController.router);

app.listen(3000, () => {
  console.log('Application started on port 3000!');
});