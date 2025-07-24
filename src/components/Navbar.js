import { ErrorBoundaryHandler } from "next/dist/client/components/error-boundary";

export default function Navbar({ title = "QR Menü" }) {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        {title}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    backgroundColor: '#2E7D32', // Orman yeşili
    padding: '1rem 5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    borderRadius:"3rem"
    
  },
  logo: {
    color: '#f8f6f0', // Kirli beyaz
    fontSize: '1.5rem',
    fontWeight: 'bold',
    fontFamily: 'Arial, sans-serif',
    
  }
};
