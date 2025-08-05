import { prisma } from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Yalnızca POST desteklenir.' });

  const { email, password } = req.body;

  const user = await prisma.admin.findUnique({ where: { email } });
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Geçersiz kimlik bilgileri' });
  }

  res.status(200).json({ message: 'Giriş başarılı', user });
}
