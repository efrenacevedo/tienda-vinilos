import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import db from '../../../../lib/db';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.post(async (req, res) => {
  const { name_artist, last_name_artist, description_artist, age, country } = req.body;

  try {
    const result = await db.query(
      'INSERT INTO artists (name_artist, last_name_artist, description_artist, age, country) VALUES (?, ?, ?, ?, ?)',
      [name_artist, last_name_artist, description_artist, age, country]
    );

    res.status(200).json({ success: true, message: 'Artista agregado con éxito' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default handler;
