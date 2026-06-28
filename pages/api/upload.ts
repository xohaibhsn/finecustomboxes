import type { NextApiRequest, NextApiResponse } from 'next';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = { api: { bodyParser: { sizeLimit: '10mb' } } };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const token = req.headers.authorization;
  if (token !== 'fcb-admin-token-2026') return res.status(401).json({ error: 'Unauthorized' });

  try {
    const { data } = req.body;
    if (!data) return res.status(400).json({ error: 'No image data' });

    const result = await cloudinary.uploader.upload(data, {
      folder: 'finecustomboxes',
      resource_type: 'image',
    });

    return res.status(200).json({ url: result.secure_url, public_id: result.public_id });
  } catch (err) {
    return res.status(500).json({ error: 'Upload failed' });
  }
}
