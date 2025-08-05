import CategoryCard from '../components/CategoryCard';

export async function getServerSideProps() {
  // Ortama göre base URL ayarı
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  const res = await fetch(`${baseUrl}/api/categories`);
  const categories = await res.json();

  return {
    props: { categories },
  };
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