
import { Pool } from "pg"

export const db = new Pool({
  connectionString: process.env.DATABASE_URL, 
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 10000, 
  idleTimeoutMillis: 30000, 
})
