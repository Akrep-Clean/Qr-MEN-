export default function MenuCard({ name, description, price, image }) {
  return (
    <div style={styles.card}>
      {image && <img src={image} alt={name} style={styles.image} />}
      <div style={styles.content}>
        <h3 style={styles.title}>{name}</h3>
        <p style={styles.desc}>{description}</p>
        <div style={styles.price}>{price} ₺</div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#f8f6f0',
    borderRadius: 12,
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
    height: 150,
  },
  image: {
    width: 150,
    height: '100%',
    objectFit: 'cover',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  content: {
    flex: 1,
    padding: '1rem 1.5rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: '1.3rem',
    color: '#2E7D32',
    margin: 0,
    fontWeight: '700',
  },
  desc: {
    fontSize: '1rem',
    color: '#555',
    margin: '0.5rem 0 1rem 0',
    flexGrow: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  price: {
    fontWeight: 'bold',
    fontSize: '1.2rem',
    color: '#2E7D32',
    alignSelf: 'flex-end',
  },
};
