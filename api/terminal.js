export default async function handler(req, res) {
  let command, hash, wallet, taskId;

  if (req.method === 'POST') {
    try {
      const body = req.body;

      // Jika body masih string (kadang dari PHP), parse manual
      const parsed = typeof body === 'string' ? JSON.parse(body) : body;

      command = 'submit';
      hash = parsed.hash;
      wallet = parsed.wallet;
      taskId = parsed.taskId;
    } catch (err) {
      return res.status(400).json({ output: '❌ Bad POST body' });
    }
  } else {
    // Untuk ujian GET jika perlu
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
    console.log(`✅ Diterima: ${hash} | Wallet: ${wallet} | Task: ${taskId}`);
    return res.status(200).json({
      output: '✅ Hash diterima! 🎉',
      wallet,
      taskId,
      hash,
      reward: '88 GPRF'
    });
  } else {
    return res.status(200).json({
      output: '❌ Hash tidak valid (tidak mula dengan 0000)',
      hash
    });
  }
}
