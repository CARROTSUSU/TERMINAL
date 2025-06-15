global.logs = global.logs || [];

export default function handler(req, res) {
  let command, hash, wallet, taskId;

  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      command = 'submit';
      hash = body.hash;
      wallet = body.wallet || 'unknown';
      taskId = body.taskId || 'none';
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

    global.logs.push(entry);

    return res.status(200).json({ output: '✅ Hash diterima! 🎉', ...entry });
  } else {
    return res.status(200).json({ output: '❌ Hash tidak valid', hash });
  }
}
