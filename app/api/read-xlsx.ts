import type { NextApiRequest, NextApiResponse } from 'next';
import xlsx from 'node-xlsx';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const file = req.body;

      const sheets = xlsx.parse(file);

      const data = sheets[0].data;

      res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ error: 'Не удалось разобрать файл' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
