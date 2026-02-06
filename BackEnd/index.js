import express from 'express';
import cors from 'cors';
import * as dbService from './dbService.js';

const app = express();
app.use(cors());
app.use(express.json());

// API: New Database Create Karo
app.post('/api/db/create', async (req, res) => {
  try {
    await dbService.createNewDB(req.body.name);
    res.json({ success: true, message: `Database '${req.body.name}' created.` });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// API: Database Check Karo
app.post('/api/db/check', async (req, res) => {
  try {
    const exists = await dbService.checkDBExists(req.body.name);
    res.json({ success: true, exists, message: exists ? "Database exists" : "Not found" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// API: Migration (Source to Target)
app.post('/api/db/migrate', async (req, res) => {
  try {
    const { from, to } = req.body;
    await dbService.migrateDB(from, to);
    res.json({ success: true, message: "Migration successful" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/', (req, res) => {
  res.json({ message: "Welcome to Database Management API" });
});


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`\n================================`);
  console.log(`🚀 Server Running: Port ${PORT}`);
  console.log(`================================\n`);
});