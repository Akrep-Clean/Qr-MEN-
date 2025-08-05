import { useEffect, useState } from 'react';
import { FiPlus, FiUpload, FiEdit2, FiTrash2, FiSettings } from 'react-icons/fi';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('menu');

  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  const [categoryName, setCategoryName] = useState('');
  const [menuItem, setMenuItem] = useState({ name: '', description: '', price: '', image: '', categoryId: '' });

  const [editingCategory, setEditingCategory] = useState(null);
  const [editingMenu, setEditingMenu] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const catRes = await fetch('/api/categories');
      const menuRes = await fetch('/api/menu1');
      const catData = await safeJson(catRes);
      const menuData = await safeJson(menuRes);

      if (catData) setCategories(catData);
      
      // Menü verisi nesne olabilir -> .items varsa onu kullan
      if (menuData?.items) {
        setMenuItems(menuData.items);
      } else if (Array.isArray(menuData)) {
        setMenuItems(menuData);
      } else {
        console.error('Beklenmeyen menü verisi:', menuData);
      }
    };
    fetchData();
  }, []);

  const safeJson = async (res) => {
    try {
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await res.json();
      }
      const text = await res.text();
      console.error('JSON olmayan cevap:', text);
      return null;
    } catch (err) {
      console.error('JSON parse hatası:', err);
      return null;
    }
  };

  const resetForm = () => {
    setCategoryName('');
    setMenuItem({ name: '', description: '', price: '', image: '', categoryId: '' });
    setEditingCategory(null);
    setEditingMenu(null);
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    if (editingCategory) {
      const res = await fetch(`/api/admin/category/${editingCategory.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: categoryName }),
      });
      if (res.ok) {
        setCategories(categories.map(c => c.id === editingCategory.id ? { ...c, name: categoryName } : c));
        resetForm();
      }
    } else {
      const res = await fetch('/api/admin/category', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: categoryName }),
      });
      const newCategory = await safeJson(res);
      if (newCategory) {
        setCategories([...categories, newCategory]);
        resetForm();
      }
    }
  };

  const handleMenuSubmit = async (e) => {
    e.preventDefault();
    if (editingMenu) {
      const res = await fetch(`/api/admin/menu-item/${editingMenu.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(menuItem),
      });
      if (res.ok) {
        setMenuItems(menuItems.map(m => m.id === editingMenu.id ? { ...menuItem, id: editingMenu.id } : m));
        resetForm();
      }
    } else {
      const res = await fetch('/api/admin/menu-item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(menuItem),
      });
      const newItem = await safeJson(res);
      if (newItem) {
        setMenuItems([...menuItems, newItem]);
        resetForm();
      }
    }
  };

  const handleDelete = async (type, id) => {
    const url = type === 'category' ? `/api/admin/category/${id}` : `/api/admin/menu-item/${id}`;
    const res = await fetch(url, { method: 'DELETE' });
    if (res.ok) {
      type === 'category'
        ? setCategories(categories.filter(c => c.id !== id))
        : setMenuItems(menuItems.filter(m => m.id !== id));
    }
  };

  const tabs = [
    { key: 'menu', label: 'Menü Ekle', icon: <FiPlus className="inline mr-2" /> },
    { key: 'category', label: 'Kategori Ekle', icon: <FiUpload className="inline mr-2" /> },
    { key: 'edit', label: 'Düzenle', icon: <FiSettings className="inline mr-2" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-indigo-600 text-white shadow">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold">Admin Paneli</h1>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="flex border-b mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => { setActiveTab(tab.key); resetForm(); }}
              className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-all ${
                activeTab === tab.key ? 'bg-indigo-600 text-white shadow' : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          {activeTab === 'menu' && (
            <form onSubmit={handleMenuSubmit} className="space-y-4">
              <h2 className="text-lg font-semibold">{editingMenu ? 'Menü Güncelle' : 'Yeni Menü Öğesi'}</h2>
              <input placeholder="Yemek Adı" value={menuItem.name} onChange={e => setMenuItem({ ...menuItem, name: e.target.value })} className="w-full border rounded px-3 py-2" required />
              <textarea placeholder="Açıklama" value={menuItem.description} onChange={e => setMenuItem({ ...menuItem, description: e.target.value })} className="w-full border rounded px-3 py-2" />
              <input type="number" placeholder="Fiyat" value={menuItem.price} onChange={e => setMenuItem({ ...menuItem, price: Number(e.target.value) })} className="w-full border rounded px-3 py-2" required />
              <input placeholder="Görsel URL" value={menuItem.image} onChange={e => setMenuItem({ ...menuItem, image: e.target.value })} className="w-full border rounded px-3 py-2" />
              <select value={menuItem.categoryId} onChange={e => setMenuItem({ ...menuItem, categoryId: Number(e.target.value) })} className="w-full border rounded px-3 py-2" required>
                <option value="">Kategori Seç</option>
                {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
              </select>
              <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">{editingMenu ? 'Güncelle' : 'Ekle'}</button>
            </form>
          )}

          {activeTab === 'category' && (
            <form onSubmit={handleCategorySubmit} className="space-y-4">
              <h2 className="text-lg font-semibold">{editingCategory ? 'Kategori Güncelle' : 'Yeni Kategori'}</h2>
              <input placeholder="Kategori Adı" value={categoryName} onChange={e => setCategoryName(e.target.value)} className="w-full border rounded px-3 py-2" required />
              <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">{editingCategory ? 'Güncelle' : 'Ekle'}</button>
            </form>
          )}

          {activeTab === 'edit' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Kategoriler</h3>
                <ul className="space-y-1">
                  {categories.map((cat) => (
                    <li key={cat.id} className="flex justify-between items-center border-b py-1">
                      <span>{cat.name}</span>
                      <div className="flex gap-2">
                        <button onClick={() => { setEditingCategory(cat); setCategoryName(cat.name); setActiveTab('category'); }} className="text-blue-600 text-sm"><FiEdit2 /></button>
                        <button onClick={() => handleDelete('category', cat.id)} className="text-red-600 text-sm"><FiTrash2 /></button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Menü Öğeleri</h3>
                <ul className="space-y-1">
                  {menuItems.map((item) => (
                    <li key={item.id} className="flex justify-between items-center border-b py-1">
                      <span>{item.name}</span>
                      <div className="flex gap-2">
                        <button onClick={() => { setEditingMenu(item); setMenuItem(item); setActiveTab('menu'); }} className="text-blue-600 text-sm"><FiEdit2 /></button>
                        <button onClick={() => handleDelete('menu', item.id)} className="text-red-600 text-sm"><FiTrash2 /></button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
