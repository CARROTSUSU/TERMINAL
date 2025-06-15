// /api/logs.js
import fs from 'fs';
import path from 'path';

const logPath = path.resolve('./logs.json');

export default function handler(req, res) {
  try {
    // Kalau file tak wujud, buatkan default kosong
    if (!fs.existsSync(logPath)) {
      fs.writeFileSync(logPath, '[]');
    }

    const data = fs.readFileSync(logPath, 'utf8');
    const logs = JSON.parse(data);
    res.status(200).json(logs);
  } catch (err) {
    console.error('❌ Error reading logs:', err.message);
    res.status(500).json({ error: 'Gagal baca log.' });
  }
}
