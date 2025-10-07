// server/server.js
import express from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());

function authenticate(req, res, next) {
  // Add your authentication logic here
  next();
}

app.get('/api/tools', authenticate, (req, res) => {
  const filePath = path.join(__dirname, 'data', 'tools.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'File not found' });
    res.json(JSON.parse(data));
  });
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
