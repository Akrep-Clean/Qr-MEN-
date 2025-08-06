// pages/index.js
import { prisma } from '../lib/prisma';
import CategoryCard from '../components/CategoryCard';
import Head from 'next/head';

export async function getServerSideProps() {
  try {
    const categories = await prisma.category.findMany();
    return { props: { categories } };
  } catch (error) {
    console.error('Veri çekme hatası:', error);
    return { props: { categories: [] } };
  }
}

export default function HomePage({ categories }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Head>
        <title>Türkoğlu Balık Restaurantı | Premium Deniz Lezzetleri</title>
        <meta name="description" content="Taze balık ve deniz ürünlerinin en seçkin adresi" />
      </Head>

      {/* Premium Arka Plan */}
      <div className="absolute inset-0 z-0">
        {/* Gradient Deniz Teması */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-white to-blue-50 opacity-95"></div>
        
        {/* Dalga Efektleri */}
        <div className="absolute bottom-0 left-0 right-0 h-40 overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-r from-transparent via-blue-100 to-transparent opacity-40 wave-animation-slow"></div>
          <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-r from-transparent via-blue-200 to-transparent opacity-30 wave-animation-medium"></div>
          <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-r from-transparent via-blue-300 to-transparent opacity-20 wave-animation-fast"></div>
        </div>
      </div>

      {/* Ana İçerik */}
      <main className="relative z-10 container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Şık Başlık */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-3">
            <span className="block text-blue-600">Türkoğlu</span>
            <span className="block text-slate-700">Balık Restaurantı</span>
          </h1>
          <div className="w-24 h-1 bg-blue-400 mx-auto my-4"></div>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Türkiye'nin en taze lezzetleri, premium sunumlarla sofralarınızda
          </p>
        </header>

        {/* Kategori Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categories.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-slate-500">Menü hazırlanıyor...</p>
            </div>
          ) : (
            categories.map((category, index) => (
              <CategoryCard 
                key={category.id}
                title={category.name}
                slug={category.slug}
                index={index}
                image={category.image || null}
              />
            ))
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-slate-500 text-sm">
        <p>Türkoğlu Balık Restaurantı © {new Date().getFullYear()}</p>
      </footer>

      {/* Animasyon Stilleri */}
      <style jsx global>{`
        .wave-animation-slow {
          mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' opacity='.25' fill='%23000'/%3E%3Cpath d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z' opacity='.5' fill='%23000'/%3E%3Cpath d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z' fill='%23000'/%3E%3C/svg%3E");
          mask-size: 200% 100%;
          animation: wave 15s linear infinite;
        }
        
        .wave-animation-medium {
          mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' opacity='.25' fill='%23000'/%3E%3Cpath d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z' opacity='.5' fill='%23000'/%3E%3C/svg%3E");
          mask-size: 200% 100%;
          animation: wave 10s linear infinite reverse;
        }
        
        .wave-animation-fast {
          mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z' fill='%23000'/%3E%3C/svg%3E");
          mask-size: 200% 100%;
          animation: wave 7s linear infinite;
        }
        
        @keyframes wave {
          0% { mask-position: 0% 50%; }
          100% { mask-position: 200% 50%; }
        }
      `}</style>
    </div>
  );
}