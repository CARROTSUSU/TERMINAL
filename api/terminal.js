// api/terminal.js
export default function handler(req, res) {
  const { command } = req.query;

  let output = '';
  switch ((command || '').toLowerCase()) {
    case 'help':
      output = 'Arahan tersedia:\nhelp, info, date, about, wallet, status, random';
      break;
    case 'wallet':
      output = 'Wallet terhubung: 0xAbc...123';
      break;
    case 'status':
      output = '⛏️ Node aktif. Mining sedang berjalan.';
      break;
    case 'random':
      output = `Nombor rawak: ${Math.floor(Math.random() * 10000)}`;
      break;
    case 'date':
      output = new Date().toString();
      break;
    case 'about':
      output = 'Terminal Web3 interaktif dibina dengan Vercel.';
      break;
    default:
      output = `❌ Arahan tidak dikenali: "${command}"`;
  }

  res.status(200).json({ output });
}
