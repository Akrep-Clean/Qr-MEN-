import { prisma } from '../../../lib/prisma';
import slugify from 'slugify';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Sadece POST isteği destekleniyor' });
  }

  const { name, image } = req.body;

  if (!name || name.trim() === '') {
    return res.status(400).json({ error: 'Kategori adı gerekli' });
  }

  try {
    const newCategory = await prisma.category.create({
      data: {
        name: name.trim(),
        slug: slugify(name, { lower: true }),
        image: image?.trim() || null, // 👈 buraya dikkat
      },
    });

    res.status(200).json(newCategory);
  } catch (error) {
    console.error('Kategori eklenirken hata:', error);
    res.status(500).json({ error: 'Kategori eklenemedi' });
  }
}
