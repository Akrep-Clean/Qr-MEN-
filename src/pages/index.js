import CategoryCard from '../components/CategoryCard';

export async function getServerSideProps() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  try {
    const res = await fetch(`${baseUrl}/api/categories`);
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const data = await res.text(); // Önce metin olarak al
    console.log('Raw response:', data); // Hata ayıklama için
    
    const categories = JSON.parse(data);
    
    return {
      props: { categories },
    };
  } catch (error) {
    console.error('Error fetching categories:', error);
    return {
      props: { categories: [] }, // Hata durumunda boş array dön
    };
  }
}
export default function HomePage({ categories }) {
  return (
    <div style={styles.container}>
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          title={category.name}
          slug={category.slug}
        />
      ))}
    </div>
  );
}

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    padding: '2rem',
  },
};