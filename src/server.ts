import cors from 'cors';
import express, { Express } from 'express';
import sequelize from './database/sql-pg-config';
import { ForgotPasswordController } from './modules/forgot-password/forgot-password.controller';
import { LoginController } from './modules/login/login.controller';
import { RegisterController } from './modules/register/register.controller';
const app: Express = express()
app.use(express.json());
app.use(cors())
const registerController = new RegisterController;
const loginController = new LoginController;
const forgotPasswordController = new ForgotPasswordController;
app.use(registerController.router);
app.use(loginController.router);
app.use(forgotPasswordController.router);

app.listen(3000, async () => {
  try {
    await sequelize.sync();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  console.log('Application started on port 3000!');
});