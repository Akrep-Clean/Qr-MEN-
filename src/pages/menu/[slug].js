import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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

  if (loading) return <div style={{ padding: '2rem' }}>Yükleniyor...</div>;
  if (!items.length) return <div style={{ padding: '2rem' }}>Menü bulunamadı!</div>;

  return (
    <div style={{ padding: '1rem' }}>
      <h1 style={{ color: '#2E7D32', fontSize: '2rem', marginBottom: '1rem', textAlign: 'center' }}>
        {slug.toUpperCase()} Menüsü
      </h1>
      <div style={styles.grid}>
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

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1rem',
  },
};
