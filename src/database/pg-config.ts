import { Pool } from 'pg';

const pool = new Pool({
  host: 'dpg-cl5762c72pts739tfp60-a.oregon-postgres.render.com',
  user: 'test_vv5q_user',
  port: 5432,
  password: '0e4aJJF7sAXJ4pHj3fyFUBbcSdRZ26CQ',
  database: 'test_vv5q',
  ssl: true,
});

export default pool

