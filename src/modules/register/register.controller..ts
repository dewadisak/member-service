import express from "express";
import { RegisterService } from "./register.service";

export class RegisterController {
  private service: RegisterService;
  public router = express.Router();
  path: string;

  constructor() {
    this.initializeConfigs();
    this.initializeServices();
    this.intializeRoutes();
  }

  public initializeConfigs() {
    this.path = 'auth';
  }

  public initializeServices() {
    this.service = new RegisterService();
  }

  public intializeRoutes() {
    this.router.post("/register", (req, res, next) => this.register(req, res, next));
  }


  public async register(request: express.Request, response: express.Response, next: express.NextFunction) {
    try {
      const body = request.body;
      const headers = request.headers;
      const result = await this.service.createAccount(body);
      response.send(result);
    } catch (err) {
      console.error(err);
      response.status(500).send("Internal Server Error");
    }
  }
}