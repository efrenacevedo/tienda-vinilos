import { NextApiRequest, NextApiResponse } from 'next';
import { nextConnect } from 'next-connect';
import db from '../../../../lib/db';

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM songs');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
