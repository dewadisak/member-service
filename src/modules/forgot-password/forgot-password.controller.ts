import express from "express";
import { AuthenticationMiddleware } from "../../middleware/authentication.service";
import { ForgotPasswordService } from "./forgot-password.service";
export class ForgotPasswordController {
  private service: ForgotPasswordService;
  public router = express.Router();
  constructor() {
    this.initializeServices();
    this.intializeRoutes();
  }

  public initializeServices() {
    this.service = new ForgotPasswordService();
  }

  public intializeRoutes() {
    this.router.post("/reset-password", [AuthenticationMiddleware], (req, res, next) => this.newPassword(req, res, next));
    this.router.post("/send-mail", (req, res, next) => this.sendMail(req, res, next));
  }

  public async newPassword(request: express.Request, response: express.Response, next: express.NextFunction) {
    try {
      const body = request.body;
      await this.service.setNewPassword(body);
      response.send({status: true, message: "update password success"});

    } catch (err) {
      console.error(err);
    }
  }

  public async sendMail(request: express.Request, response: express.Response, next: express.NextFunction) {
    try {
      const email = request.body.email;
      const result =  await this.service.sendMail(email);
      response.send(result);

    } catch (err) {
      console.error(err);
    }
  }


}