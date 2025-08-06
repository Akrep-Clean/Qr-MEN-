import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import MenuCard from '../../components/MenuCard';

export default function CategoryPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/category/${slug}`);
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error('Veri alınırken hata:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div style={{ 
        padding: '2rem',
        backgroundColor: '#f8fafc' // Açık mavi-gri arkaplan
      }}>
        Yükleniyor...
      </div>
    );
  }

  if (!items.length) {
    return (
      <div style={{ 
        padding: '2rem',
        backgroundColor: '#f8fafc',
        minHeight: '100vh'
      }}>
        <button 
          onClick={() => router.back()}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            marginBottom: '1rem'
          }}
        >
          ← Geri Dön
        </button>
        <p>Menü bulunamadı!</p>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '1rem',
      backgroundColor: '#f8fafc',
      minHeight: '100vh'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem'
      }}>
        <button 
          onClick={() => router.back()}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer'
          }}
        >
          ← Geri Dön
        </button>
        <h1 style={{ 
          color: '#2E7D32', 
          fontSize: '2rem', 
          textAlign: 'center',
          flex: 1
        }}>
          {slug.toUpperCase()} 
        </h1>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1rem',
      }}>
        {items.map((item) => (
          <MenuCard
            key={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
}