import fs from 'fs';
import path from 'path';

const logPath = path.resolve('./logs.json');

export default function handler(req, res) {
  try {
    const data = fs.readFileSync(logPath, 'utf8');
    const logs = JSON.parse(data);
    res.status(200).json({ logs });
  } catch {
    res.status(200).json({ logs: [] });
  }
}
