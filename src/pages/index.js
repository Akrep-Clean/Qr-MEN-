import CategoryCard from '../components/CategoryCard';

export async function getServerSideProps(context) {
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const host = context.req.headers.host;
  const baseUrl = `${protocol}://${host}`;

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