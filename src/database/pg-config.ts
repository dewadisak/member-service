import { Pool } from 'pg';

const pool = new Pool({
  host: 'dpg-cl70ikph9grs73e9ac10-a.singapore-postgres.render.com',
  user: 'members_develop_db_user',
  port: 5432,
  password: '6QhusS4rjDQUzFcICTFKwJ5iQSmzuqCe',
  database: 'members_develop_db',
  ssl: true,
});

export default pool

