import express from "express";
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
    this.router.post("/new-password", (req, res, next) => this.newPassword(req, res, next));
  }

  public async newPassword(request: express.Request, response: express.Response, next: express.NextFunction) {
    try {
      const body = request.body;
      const result = '';
      response.send(result);

    } catch (err) {
      console.error(err);
    }
  }


}