import { RegisterRepository } from "./register.repository";

export class LoginService {
  public registerRepository: RegisterRepository;

  constructor() {
    this.registerRepository = new RegisterRepository();
  }

  public createAccount() {

    const data = {
      userId:'',
      name:'',
      gender:'',
      phone:'',
      birthDate:'',
      email:'',
      password:'',
      twoFA:'',
      registerDate:'',
      ip:'',
      referral_ID:'',
      token:'',
      userStatus:''
    }
    const res  = this.registerRepository.create();
    return res;
  }

}