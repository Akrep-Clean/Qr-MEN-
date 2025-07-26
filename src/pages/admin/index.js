import { useState } from 'react';

export default function AdminPanel() {
  const [categoryName, setCategoryName] = useState('');
  const [menuItem, setMenuItem] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    categoryId: '',
  });

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/admin/category', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: categoryName }),
    });
    setCategoryName('');
  };

  const handleMenuSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/admin/menu-item', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(menuItem),
    });
    setMenuItem({
      name: '',
      description: '',
      price: '',
      image: '',
      categoryId: '',
    });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Admin Panel</h1>

      <form onSubmit={handleCategorySubmit} style={formStyle}>
        <h2>Kategori Ekle</h2>
        <input
          type="text"
          placeholder="Kategori Adı"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
        />
        <button type="submit">Ekle</button>
      </form>

      <form onSubmit={handleMenuSubmit} style={formStyle}>
        <h2>Yemek Ekle</h2>
        <input
          type="text"
          placeholder="Yemek Adı"
          value={menuItem.name}
          onChange={(e) => setMenuItem({ ...menuItem, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Açıklama"
          value={menuItem.description}
          onChange={(e) => setMenuItem({ ...menuItem, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Fiyat"
          value={menuItem.price}
          onChange={(e) => setMenuItem({ ...menuItem, price: Number(e.target.value) })}
          required
        />
        <input
          type="text"
          placeholder="Görsel URL"
          value={menuItem.image}
          onChange={(e) => setMenuItem({ ...menuItem, image: e.target.value })}
        />
        <input
          type="number"
          placeholder="Kategori ID"
          value={menuItem.categoryId}
          onChange={(e) => setMenuItem({ ...menuItem, categoryId: Number(e.target.value) })}
          required
        />
        <button type="submit">Yemeği Ekle</button>
      </form>
    </div>
  );
}

const formStyle = {
  marginTop: '2rem',
  marginBottom: '2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  maxWidth: '400px',
};
