import { prisma } from '@/lib/prisma';

export default async function handler(req, res) {
  const { slug } = req.query;

  if (!slug) {
    return res.status(400).json({ error: 'Slug parametresi gerekli' });
  }

  try {
    const category = await prisma.category.findUnique({
      where: { slug },
      include: { menuItems: true },
    });

    if (!category) {
      return res.status(404).json({ error: 'Kategori bulunamadı' });
    }

    res.status(200).json({
      category: category.name,
      items: category.menuItems,
    });
  } catch (error) {
    console.error('Menü çekilirken hata:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
}
