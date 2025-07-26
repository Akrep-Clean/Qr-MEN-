import { prisma } from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Sadece POST isteği destekleniyor' });
  }

  const { name, description, price, image, categoryId } = req.body;

  try {
    const newItem = await prisma.menuItem.create({
      data: {
        name,
        description,
        price,
        image,
        categoryId,
      },
    });
    res.status(200).json(newItem);
  } catch (error) {
    console.error('Yemek eklenirken hata:', error);
    res.status(500).json({ error: 'Yemek eklenemedi' });
  }
}
