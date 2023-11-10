import pool from "../database/pg-config";
export class RegisterRepository {
  constructor() {
  }

  public async getAll() {
    try{
      const response = await pool.query('select * from memberss');
      const result = response.rows;
      return result;
    } catch (err) {
      console.error(err)
    }
  }

  public async create(body) {
    try{
      const data  = await pool.query('INSERT INTO memberss(email, password, token)' +
      'VALUES ($1, $2, $3)',
      [body.email, body.password, body.token]);
      const result = data.rows;
      return result;
    } catch(err){
      console.log(err)
    } 
  }
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
  public async findEmail(email: string) {
    try{
      const query = {
        text: 'SELECT email FROM memberss WHERE email = $1',
        values: [email],
      };
      const response = await pool.query(query);
      const result = response.rows;
      return result;

    } catch (err) {
      console.error(err)
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

}