import { prisma } from '../../../lib/prisma';

export default async function handler(req, res) {
  const {
    query: { slug },
    method,
  } = req;

  if (method !== 'GET') {
    return res.status(405).json({ error: 'Sadece GET destekleniyor' });
  }

  try {
    const category = await prisma.category.findUnique({
      where: { slug },
      include: { menuItems: true },
    });

    if (!category) {
      return res.status(404).json({ error: 'Kategori bulunamadı' });
    }

    res.status(200).json(category.menuItems);
  } catch (error) {
    console.error('Kategori detay çekme hatası:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
}
