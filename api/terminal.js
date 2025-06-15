import fs from 'fs';
import path from 'path';

const logPath = path.resolve('./logs.json');

function loadLogs() {
  try {
    const data = fs.readFileSync(logPath, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveLogs(logs) {
  fs.writeFileSync(logPath, JSON.stringify(logs, null, 2));
}

export default async function handler(req, res) {
  let command, hash, wallet, taskId;

  if (req.method === 'POST') {
    try {
      const body = req.body;
      const parsed = typeof body === 'string' ? JSON.parse(body) : body;
      command = 'submit';
      hash = parsed.hash;
      wallet = parsed.wallet;
      taskId = parsed.taskId;
    } catch {
      return res.status(400).json({ output: '❌ Bad POST body' });
    }
  } else {
    command = req.query.command;
    hash = req.query.hash;
    wallet = req.query.wallet || 'unknown';
    taskId = req.query.taskId || 'none';
  }

  if (command !== 'submit' || !hash) {
    return res.status(400).json({ output: '❌ Sila hantar hash.' });
  }

  const isValid = hash.startsWith('0000');
  if (isValid) {
    const reward = `${Math.floor(Math.random() * 100) + 1} GPRF`;
    const entry = {
      wallet,
      taskId,
      hash,
      reward,
      timestamp: new Date().toISOString()
    };
    const logs = loadLogs();
    logs.push(entry);
    saveLogs(logs);

    return res.status(200).json({ output: '✅ Hash diterima! 🎉', ...entry });
  } else {
    return res.status(200).json({ output: '❌ Hash tidak valid', hash });
  }
}
