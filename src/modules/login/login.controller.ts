import express from "express";
import { AuthenticationMiddleware } from "../../middleware/authentication.service";
import { LoginService } from "./login.service";
export class LoginController {
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
    this.router.post("/login", (req, res, next) => this.login(req, res, next));
    this.router.get("/wellcome", [AuthenticationMiddleware], (req, res, next) => this.wellcome(req, res, next));
  }

  public async login(request: express.Request, response: express.Response, next: express.NextFunction) {
    try {
      const body = request.body;
      const result = await this.service.login(body);
      response.send(result);

    } catch (err) {
      console.error(err);
    }
  }

  public async wellcome(request: express.Request, response: express.Response, next: express.NextFunction) {
    try {
      
      response.send('wellcome');
    } catch (err) {
      console.error(err);
      response.status(500).send("Internal Server Error");
    }
  }




}