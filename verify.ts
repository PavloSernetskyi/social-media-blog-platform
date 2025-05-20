// verify.ts
import { neon } from '@neondatabase/serverless';
import 'dotenv/config';

const sql = neon(process.env.DATABASE_URL!);

(async () => {
  const result = await sql`SELECT current_database(), current_user, current_schema;`;
  console.log(result);
})();
