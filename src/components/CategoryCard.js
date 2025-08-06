// components/CategoryCard.js
import { useRouter } from 'next/router';
import { FiChevronRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function CategoryCard({ title, slug, image }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/menu/${slug}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        scale: 1.03,
        boxShadow: '0 10px 30px rgba(8, 61, 119, 0.1)'
      }}
      onClick={handleClick}
      className="cursor-pointer rounded-xl overflow-hidden transition-all duration-300 group"
      style={{
        boxShadow: '0 4px 15px rgba(8, 61, 119, 0.05)',
        border: '1px solid rgba(214, 228, 242, 0.6)'
      }}
    >
      {/* Resim Alanı - Daha Premium Gradient */}
      <div className="relative h-48 bg-gradient-to-br from-blue-25 to-blue-75">
        {image ? (
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="text-5xl text-blue-400 opacity-90">
              <FiChevronRight />
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-blue-300 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
      </div>

      {/* Başlık Alanı - Daha Şık */}
      <div className="bg-white p-5 border-t border-blue-50">
        <h3 className="text-lg font-semibold text-slate-700 text-center flex items-center justify-between">
          {title}
          <span className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-x-1">
            <FiChevronRight />
          </span>
        </h3>
      </div>
    </motion.div>
  );
}