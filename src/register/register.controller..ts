import express from "express";
import { LoginService } from "./register.service";

export class RegisterController {
  private service: LoginService;
  public router = express.Router();

  constructor() {
    this.initializeServices(); 
    this.intializeRoutes();
  }

  public initializeServices() {
    this.service = new LoginService();
  }

  public intializeRoutes() {
    this.router.get("/register", (req, res, next) => this.login(req, res, next));
  }


  public async login(request: express.Request, response: express.Response, next: express.NextFunction) {
    try {
        const result = this.service.createAccount();
        response.send(result);
    } catch (err) {
      console.error(err);
      response.status(500).send("Internal Server Error");
    }
  }
}