// /api/terminal.js
export default async function handler(req, res) {
  const { command, hash } = req.query;

  let output = '';

  switch ((command || '').toLowerCase()) {
    case 'submit':
      if (!hash) {
        output = '❌ Sila hantar hash. Contoh: ?command=submit&hash=0000abcd...';
        break;
      }

      const isValid = hash.startsWith('0000'); // Anda boleh ubah difficulty

      if (isValid) {
        // ✅ Hash sah – kita fetch balik ke endpoint kita sendiri (boleh log ke tempat lain jika mahu)
        const logResponse = await fetch('https://terminal-swart.vercel.app/api/logger', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ hash, timestamp: Date.now() })
        });

        const logText = await logResponse.text();
        output = `✅ Hash diterima: ${hash} | Logger respon: ${logText}`;
      } else {
        output = `❌ Hash ditolak: Tidak cukup difficulty (perlukan awalan 0000)`;
      }
      break;

    case 'info':
      output = 'Submit hash melalui endpoint ini dengan ?command=submit&hash=...';
      break;

    default:
      output = `❌ Arahan tidak dikenali: ${command}`;
  }

  res.status(200).json({ output });
}
