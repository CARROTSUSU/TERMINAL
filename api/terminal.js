export default async function handler(req, res) {
  let command, hash, wallet, taskId;

  if (req.method === 'POST') {
    try {
      const body = await req.json();
      command = 'submit';
      hash = body.hash;
      wallet = body.wallet;
      taskId = body.taskId;
    } catch (err) {
      return res.status(400).json({ output: '❌ Bad POST body' });
    }
  } else {
    command = req.query.command;
    hash = req.query.hash;
    wallet = req.query.wallet || "unknown";
    taskId = req.query.taskId || "none";
  }

  if (command !== 'submit' || !hash) {
    return res.status(400).json({ output: '❌ Sila hantar hash. Contoh: ?command=submit&hash=...' });
  }

  const isValid = hash.startsWith('0000'); // Basic difficulty

  if (isValid) {
    console.log(`✅ Hash diterima: ${hash} | Wallet: ${wallet} | TaskID: ${taskId}`);

    // Optional: Log ke fail sementara (dev local)
    // import fs from 'fs';
    // fs.appendFileSync('/tmp/miner-log.txt', `${Date.now()} - ${wallet} - ${hash}\n`);

    return res.status(200).json({
      output: `✅ Hash diterima! 🎉`,
      wallet,
      taskId,
      hash,
      reward: '88 GPRF'
    });
  } else {
    return res.status(200).json({
      output: `❌ Hash tidak valid (tidak mula dengan 0000)`,
      hash
    });
  }
}
