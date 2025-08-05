import { useRouter } from 'next/router';
import { FiChevronRight } from 'react-icons/fi';

export default function CategoryCard({ title, slug, image }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/menu/${slug}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="cursor-pointer rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
    >
      {/* Resim Alanı */}
      <div className="relative h-48 bg-gradient-to-br from-blue-100 to-cyan-100">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-5xl text-blue-400 opacity-80">
              <FiChevronRight />
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-blue-900 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      </div>

      {/* Başlık Alanı */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 border-t border-blue-100">
        <h3 className="text-lg font-bold text-blue-800 text-center flex items-center justify-between">
          {title}
          <span className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <FiChevronRight />
          </span>
        </h3>
      </div>
    </div>
  );
}