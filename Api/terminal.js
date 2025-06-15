// api/terminal.js
export default function handler(req, res) {
  const { command } = req.query;

  if (!command) {
    return res.status(400).json({ output: '⚠️ Tiada arahan diberikan.' });
  }

  // Simulasi arahan
  let output = '';
  switch (command.toLowerCase()) {
    case 'help':
      output = 'Arahan tersedia: help, info, date, about';
      break;
    case 'info':
      output = 'Terminal Vercel v1. Dibina oleh anda.';
      break;
    case 'date':
      output = new Date().toString();
      break;
    case 'about':
      output = 'Ini ialah terminal simulasi interaktif.';
      break;
    default:
      output = `Arahan tidak dikenali: ${command}`;
  }

  res.status(200).json({ output });
}
