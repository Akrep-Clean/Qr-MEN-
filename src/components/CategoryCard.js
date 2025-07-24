import { useRouter } from 'next/router';

export default function CategoryCard({ title, slug }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/menu/${slug}`);
  };

  return (
    <div onClick={handleClick} style={styles.card}>
      <img
        src={`https://source.unsplash.com/400x300/?${slug}`}
        alt={title}
        style={styles.image}
      />
      <h3 style={styles.title}>{title}</h3>
    </div>
  );
}

const styles = {
  card: {
    cursor: 'pointer',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s',
  },
  image: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
  },
  title: {
    padding: '1rem',
    backgroundColor: '#f8f6f0', // Kirli beyaz
    color: '#2E7D32', // Orman yeşili
    textAlign: 'center',
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
};