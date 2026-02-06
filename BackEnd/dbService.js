import { pool } from './db.js';
import { exec } from 'child_process';
import format from 'pg-format'; 

export const createNewDB = async (dbName) => {
  console.log(`[LOG] Creating Database: ${dbName}`);
  
  // 1. Validation: Name mein sirf letters, numbers aur underscore ho
  if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(dbName)) {
    throw new Error("Invalid DB Name: Only letters, numbers, and underscores allowed.");
  }

  // 2. Sanitization: SQL Injection rokne ke liye format() use kiya
  const sql = format('CREATE DATABASE %I', dbName);
  
  try {
    await pool.query(sql);
    console.log(`[SUCCESS] Database ${dbName} created.`);
    return true;
  } catch (err) {
    console.error(`[ERROR] Create Failed: ${err.message}`);
    throw err;
  }
};

export const checkDBExists = async (dbName) => {
  console.log(`[LOG] Checking if DB exists: ${dbName}`);
  const res = await pool.query(
    "SELECT 1 FROM pg_database WHERE datname = $1", 
    [dbName]
  );
  return res.rowCount > 0;
};

export const migrateDB = (source, target) => {
  return new Promise((resolve, reject) => {
    const port = 7777; // Aapne confirm kar diya hai
    const user = process.env.DB_USER || "postgres";
    const password = process.env.DB_PASSWORD || "Rajat@527";

    console.log(`[LOG] Migration Triggered on Port ${port}...`);

    // Sabse pakka Windows command format
    const cmd = `pg_dump -U ${user} -h localhost -p ${port} ${source} | psql -U ${user} -h localhost -p ${port} ${target}`;

    exec(cmd, {
      env: { ...process.env, PGPASSWORD: password },
      windowsHide: true // Isse piche koi extra window nahi khulegi
    }, (error, stdout, stderr) => {
      if (error) {
        console.error(`[ERROR] Migration Failed: ${stderr}`);
        return reject(new Error(stderr));
      }
      console.log(`[SUCCESS] Data Migrated from ${source} to ${target}`);
      resolve(true);
    });
  });
};