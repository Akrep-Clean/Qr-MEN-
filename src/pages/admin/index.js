import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FiPlus, FiUpload, FiEdit2, FiTrash2, FiSettings, FiLogOut } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('menu');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState('');
  const [menuItem, setMenuItem] = useState({ name: '', description: '', price: '', image: '', categoryId: '' });
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingMenu, setEditingMenu] = useState(null);

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      router.push('/admin/login');
    } else {
      setIsAuthorized(true);
    }
  }, []);

  useEffect(() => {
    if (!isAuthorized) return;
    const fetchData = async () => {
      const catRes = await fetch('/api/categories');
      const menuRes = await fetch('/api/menu1');
      const catData = await safeJson(catRes);
      const menuData = await safeJson(menuRes);
      if (catData) setCategories(catData);
      if (menuData?.items) {
        setMenuItems(menuData.items);
      } else if (Array.isArray(menuData)) {
        setMenuItems(menuData);
      } else {
        console.error('Beklenmeyen menü verisi:', menuData);
      }
    };
    fetchData();
  }, [isAuthorized]);

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
    setCategoryImage('');
    setMenuItem({ name: '', description: '', price: '', image: '', categoryId: '' });
    setEditingCategory(null);
    setEditingMenu(null);
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    const payload = { name: categoryName, image: categoryImage };
    if (editingCategory) {
      const res = await fetch(`/api/admin/category/${editingCategory.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setCategories(categories.map(c => c.id === editingCategory.id ? { ...c, ...payload } : c));
        resetForm();
      }
    } else {
      const res = await fetch('/api/admin/category', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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
    { key: 'menu', label: 'Menü Yönetimi', icon: <FiPlus className="inline mr-2" /> },
    { key: 'category', label: 'Kategori Yönetimi', icon: <FiUpload className="inline mr-2" /> },
    { key: 'edit', label: 'İçerik Düzenle', icon: <FiSettings className="inline mr-2" /> },
  ];

  if (!isAuthorized) return null;

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Premium Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Türkoğlu Admin Paneli</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              localStorage.removeItem('isAdmin');
              router.push('/');
            }}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FiLogOut /> Çıkış Yap
          </motion.button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Şık Tab Bar */}
        <div className="flex border-b border-blue-200 mb-8">
          {tabs.map((tab) => (
            <motion.button
              key={tab.key}
              whileHover={{ backgroundColor: '#f0f9ff' }}
              onClick={() => { setActiveTab(tab.key); resetForm(); }}
              className={`px-6 py-3 font-medium text-sm rounded-t-lg transition-all ${
                activeTab === tab.key 
                  ? 'bg-white text-blue-600 border-t-2 border-blue-600 shadow-sm' 
                  : 'text-blue-800 hover:text-blue-600'
              }`}
            >
              {tab.icon} {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Ana İçerik Kutusu */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md overflow-hidden border border-blue-100"
        >
          {activeTab === 'menu' && (
            <form onSubmit={handleMenuSubmit} className="p-6 space-y-5">
              <h2 className="text-xl font-semibold text-blue-800 border-b pb-2 mb-4">
                {editingMenu ? 'Menü Öğesini Düzenle' : 'Yeni Menü Öğesi Ekle'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-blue-700 mb-1">Yemek Adı</label>
                    <input 
                      placeholder="Örnek: Levrek Izgara" 
                      value={menuItem.name} 
                      onChange={e => setMenuItem({ ...menuItem, name: e.target.value })} 
                      className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                      required 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-blue-700 mb-1">Açıklama</label>
                    <textarea 
                      placeholder="Örnek: Taze levrek, zeytinyağlı sos ile..." 
                      value={menuItem.description} 
                      onChange={e => setMenuItem({ ...menuItem, description: e.target.value })} 
                      className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all h-24" 
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-blue-700 mb-1">Fiyat (₺)</label>
                    <input 
                      type="number" 
                      placeholder="Örnek: 120" 
                      value={menuItem.price} 
                      onChange={e => setMenuItem({ ...menuItem, price: Number(e.target.value) })} 
                      className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                      required 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-blue-700 mb-1">Görsel URL</label>
                    <input 
                      placeholder="https://example.com/image.jpg" 
                      value={menuItem.image} 
                      onChange={e => setMenuItem({ ...menuItem, image: e.target.value })} 
                      className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-blue-700 mb-1">Kategori</label>
                    <select 
                      value={menuItem.categoryId} 
                      onChange={e => setMenuItem({ ...menuItem, categoryId: Number(e.target.value) })} 
                      className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                      required
                    >
                      <option value="">Kategori Seçiniz</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all shadow-md"
                >
                  {editingMenu ? 'Güncelle' : 'Kaydet'}
                </motion.button>
              </div>
            </form>
          )}

          {activeTab === 'category' && (
            <form onSubmit={handleCategorySubmit} className="p-6 space-y-5">
              <h2 className="text-xl font-semibold text-blue-800 border-b pb-2 mb-4">
                {editingCategory ? 'Kategori Düzenle' : 'Yeni Kategori Ekle'}
              </h2>
              
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-1">Kategori Adı</label>
                  <input 
                    placeholder="Örnek: Ana Yemekler" 
                    value={categoryName} 
                    onChange={e => setCategoryName(e.target.value)} 
                    className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                    required 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-1">Görsel URL (Opsiyonel)</label>
                  <input 
                    placeholder="https://example.com/image.jpg" 
                    value={categoryImage} 
                    onChange={e => setCategoryImage(e.target.value)} 
                    className="w-full border border-blue-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                  />
                </div>
              </div>
              
              <div className="pt-4">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all shadow-md"
                >
                  {editingCategory ? 'Güncelle' : 'Kaydet'}
                </motion.button>
              </div>
            </form>
          )}

          {activeTab === 'edit' && (
            <div className="p-6 space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-blue-800 mb-4 border-b pb-2">Kategori Listesi</h3>
                <ul className="space-y-2">
                  {categories.map((cat) => (
                    <motion.li 
                      key={cat.id}
                      whileHover={{ x: 5 }}
                      className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      <span className="text-blue-800">{cat.name}</span>
                      <div className="flex gap-3">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => { 
                            setEditingCategory(cat); 
                            setCategoryName(cat.name); 
                            setCategoryImage(cat.image || ''); 
                            setActiveTab('category'); 
                          }}
                          className="text-blue-500 hover:text-blue-700 p-1"
                        >
                          <FiEdit2 size={18} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete('category', cat.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <FiTrash2 size={18} />
                        </motion.button>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-blue-800 mb-4 border-b pb-2">Menü Öğeleri</h3>
                <ul className="space-y-2">
                  {menuItems.map((item) => (
                    <motion.li 
                      key={item.id}
                      whileHover={{ x: 5 }}
                      className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      <span className="text-blue-800">{item.name}</span>
                      <div className="flex gap-3">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => { 
                            setEditingMenu(item); 
                            setMenuItem(item); 
                            setActiveTab('menu'); 
                          }}
                          className="text-blue-500 hover:text-blue-700 p-1"
                        >
                          <FiEdit2 size={18} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete('menu', item.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <FiTrash2 size={18} />
                        </motion.button>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}