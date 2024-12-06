import path from 'path';

export default function home(req, res) {
  try {
    res.sendFile(path.resolve('../src/index.html'));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
