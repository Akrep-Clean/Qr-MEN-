import { prisma } from '@/lib/prisma';

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'ID parametresi gerekli' });
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.menuItem.delete({
        where: { id: Number(id) },
      });
      return res.status(200).json({ message: 'Menü öğesi silindi' });
    } catch (error) {
      console.error('Menü silme hatası:', error);
      return res.status(500).json({ error: 'Menü öğesi silinemedi' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const data = req.body;
      const updated = await prisma.menuItem.update({
        where: { id: Number(id) },
        data,
      });
      return res.status(200).json(updated);
    } catch (error) {
      console.error('Menü güncelleme hatası:', error);
      return res.status(500).json({ error: 'Menü öğesi güncellenemedi' });
    }
  }

  return res.status(405).json({ error: 'Sadece PUT ve DELETE destekleniyor' });
}
