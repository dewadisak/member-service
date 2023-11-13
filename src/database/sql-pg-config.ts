import { Sequelize } from 'sequelize';
const sequelize = new Sequelize('members_develop_db', 'members_develop_db_user', '6QhusS4rjDQUzFcICTFKwJ5iQSmzuqCe', {
  host: 'dpg-cl70ikph9grs73e9ac10-a.singapore-postgres.render.com',
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: 'true'
    }
  }
});

export default sequelize