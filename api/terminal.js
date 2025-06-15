import fs from 'fs';
import path from 'path';

const logPath = path.resolve('./logs.json');

function loadLogs() {
  try {
    if (!fs.existsSync(logPath)) fs.writeFileSync(logPath, '[]');
    const data = fs.readFileSync(logPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error("❌ Error reading logs:", err);
    return [];
  }
}

function saveLogs(logs) {
  try {
    fs.writeFileSync(logPath, JSON.stringify(logs, null, 2));
  } catch (err) {
    console.error("❌ Error saving logs:", err);
  }
}

export default async function handler(req, res) {
  try {
    let command, hash, wallet, taskId;

    if (req.method === 'POST') {
      const body = req.body;
      const parsed = typeof body === 'string' ? JSON.parse(body) : body;
      command = 'submit';
      hash = parsed.hash;
      wallet = parsed.wallet;
      taskId = parsed.taskId;
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
  } catch (err) {
    console.error("🔥 SERVER ERROR:", err.message);
    return res.status(500).json({ error: { code: "500", message: "A server error has occurred" } });
  }
}
