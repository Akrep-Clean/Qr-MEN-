import { prisma } from '@/lib/prisma';
import slugify from 'slugify';

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: 'Geçerli bir kategori ID gerekli' });
  }

  if (req.method === 'DELETE') {
    try {
      // önce menüleri sil
      await prisma.menuItem.deleteMany({
        where: { categoryId: Number(id) },
      });

      // sonra kategoriyi sil
      await prisma.category.delete({
        where: { id: Number(id) },
      });

      return res.status(200).json({ message: 'Kategori ve ilişkili menüler silindi' });
    } catch (error) {
      console.error('Silme hatası:', error);
      return res.status(500).json({ error: 'Kategori silinemedi' });
    }
  }

  if (req.method === 'PUT') {
    const { name, image } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Kategori adı gerekli' });
    }

    try {
      const updatedCategory = await prisma.category.update({
        where: { id: Number(id) },
        data: {
          name: name.trim(),
          slug: slugify(name.trim(), { lower: true }),
          image: image?.trim() || null, // Eklenen kısım
        },
      });

      return res.status(200).json(updatedCategory);
    } catch (error) {
      console.error('Güncelleme hatası:', error);
      return res.status(500).json({ error: 'Kategori güncellenemedi' });
    }
  }

  return res.status(405).json({ error: 'Yalnızca DELETE ve PUT destekleniyor' });
}
