import express from "express";
import { AuthenticationMiddleware } from "../../middleware/authentication.service";
import { LoginService } from "./login.service";
export class LoginController {
  private service: LoginService;
  public router = express.Router();
  path: string;
  constructor() {
    this.initializeConfigs();
    this.initializeServices();
    this.intializeRoutes();
  }

  public initializeServices() {
    this.service = new LoginService();
  }
  public initializeConfigs() {
    this.path = 'auth';
  }


  public intializeRoutes() {
    this.router.post("/login", (req, res, next) => this.login(req, res, next));
    this.router.get("/verify/:id", (req, res, next) => this.verifyEmail(req, res, next));
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

  public async verifyEmail(request: express.Request, response: express.Response, next: express.NextFunction) {
    try {
      const userId = request.params.id;
      const result = await this.service.updateUserStatus(userId);
      console.log('😈', userId)
      response.send('verifyEmail');
    } catch (err) {
      console.error(err);
      response.status(500).send("Internal Server Error");
    }
  }




}