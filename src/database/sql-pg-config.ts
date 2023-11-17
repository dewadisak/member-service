import 'dotenv/config';
import { Sequelize } from 'sequelize';
const sequelize = new Sequelize(process.env.PG_DATABASE, process.env.PG_USERNAME, process.env.PG_PASSWORD, {
  host: process.env.PG_HOST,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: 'true'
    }
  }
});

export default sequelize;