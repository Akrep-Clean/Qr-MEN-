import { prisma } from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Only GET allowed' });
  }

  try {
    const menuItems = await prisma.menuItem.findMany({
      include: { category: true },
    });
    res.status(200).json(menuItems);
  } catch (error) {
    console.error('Menü verisi alınırken hata:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
}
