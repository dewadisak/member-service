import pool from "../../database/pg-config";
import { User } from "../../database/shema/user.shema";
export class LoginRepository{
  public async getDocumentByEmail(email){
    try{
      const query = {
        text: 'SELECT * FROM memberss WHERE email = $1',
        values: [email],
      };
      const response = await pool.query(query);
      const result = response.rows;
      return result;
    } catch(err){
      console.log(err)
    } 
  }


  public async saveToken(token: string) {
    try{
      const query = {
        text: 'UPDATE memberss SET token = $1',
        values: [token],
      };
      const response = await pool.query(query);
      const result = response.rows;
      return result;

    } catch (err) {
      console.error(err)
    }
  }

  public async testsql(body){
    await User.create(body);
  }


}