// Global log simpanan sementara (akan hilang jika restart server Vercel)
let logs = global.logs || [];
global.logs = logs;

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
    } catch (err) {
      return res.status(400).json({ output: '❌ Bad POST body' });
    }
  } else {
    command = req.query.command;
    hash = req.query.hash;
    wallet = req.query.wallet || 'unknown';
    taskId = req.query.taskId || 'none';
  }

  if (command !== 'submit' || !hash) {
    return res.status(400).json({ output: '❌ Sila hantar hash. Contoh: ?command=submit&hash=...' });
  }

  const isValid = hash.startsWith('0000');

  if (isValid) {
    const reward = `${Math.floor(Math.random() * 100) + 1} GPRF`;
    const logEntry = {
      wallet,
      taskId,
      hash,
      reward,
      timestamp: new Date().toISOString()
    };

    logs.push(logEntry); // Simpan dalam log

    console.log(`✅ Diterima: ${hash} | Wallet: ${wallet} | Task: ${taskId}`);
    return res.status(200).json({
      output: '✅ Hash diterima! 🎉',
      ...logEntry
    });
  } else {
    return res.status(200).json({
      output: '❌ Hash tidak valid (tidak mula dengan 0000)',
      hash
    });
  }
}
