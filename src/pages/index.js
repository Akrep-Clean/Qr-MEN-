// pages/index.js
import { prisma } from '../lib/prisma';
import CategoryCard from '../components/CategoryCard';

export async function getServerSideProps() {
  try {
    const categories = await prisma.category.findMany();

    return {
      props: { categories },
    };
  } catch (error) {
    console.error('Veri çekme hatası:', error);
    return {
      props: { categories: [] },
    };
  }
}

export default function HomePage({ categories }) {
  return (
    <div style={styles.container}>
      {categories.length === 0 ? (
        <p>Kategori bulunamadı.</p>
      ) : (
        categories.map((category) => (
          <CategoryCard
            key={category.id}
            title={category.name}
            slug={category.slug}
          />
        ))
      )}
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
