import bcrypt from "bcrypt";
import { response } from "express";
import { RegisterRepository } from "./register.repository";

export class RegisterService {
  public registerRepository: RegisterRepository;

  constructor() {
    this.registerRepository = new RegisterRepository();
  }

  public async createAccount(body) {
    try {
      const findByEmail = await this.registerRepository.findByEmail(body.email);
      if (findByEmail) {
        console.log("is Exist")
        response.status(401).send('Email Already Exist');
        return;
      }
      const decryptedPass = await bcrypt.hash(body.password, 10);
      const dataRegister = {
        email: body.email.toLocaleLowerCase(),
        password: decryptedPass
      }
      const result = await this.registerRepository.create(dataRegister);
      if(result){
        return { status: true, message: 'Register success'}
      }
    } catch (err) {
      console.error(err);

    }

  }

  public generateUserId() {
    const userId = 'SO1:M01:G01:C01'
  }

}