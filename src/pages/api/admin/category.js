import { prisma } from '../../../lib/prisma';
import slugify from 'slugify';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Sadece POST isteği destekleniyor' });
  }

  const { name } = req.body;

  try {
    const newCategory = await prisma.category.create({
      data: {
        name,
        slug: slugify(name, { lower: true }),
      },
    });
    res.status(200).json(newCategory);
  } catch (error) {
    console.error('Kategori eklenirken hata:', error);
    res.status(500).json({ error: 'Kategori eklenemedi' });
  }
}


