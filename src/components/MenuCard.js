import { FiImage } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function MenuCard({ name, description, price, image }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ 
        y: -3,
        boxShadow: '0 10px 25px -5px rgba(8, 61, 119, 0.1)'
      }}
      className="group flex flex-col sm:flex-row bg-white rounded-xl overflow-hidden transition-all duration-300 border border-blue-50 hover:border-blue-100"
      style={{
        boxShadow: '0 3px 15px rgba(8, 61, 119, 0.03)'
      }}
    >
      {/* Resim Alanı - Premium Çerçeve */}
      <div className="relative w-full sm:w-48 h-48 overflow-hidden">
        {image ? (
          <motion.img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4 }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
            <FiImage className="text-blue-300 text-4xl" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>

      {/* İçerik Alanı - Lüks Detaylar */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-semibold text-slate-800 mb-2 pr-2">{name}</h3>
            <div className="flex space-x-1">
              {[...Array(3)].map((_, i) => (
                <span key={i} className="w-1.5 h-1.5 bg-blue-200 rounded-full" />
              ))}
            </div>
          </div>
          <p className="text-slate-600 text-sm line-clamp-3 mb-4">{description}</p>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-xs text-blue-400 font-medium tracking-wider">
            TÜRKOĞLU SPECIAL
          </div>
          <span className="text-lg font-bold text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">
            {price} ₺
          </span>
        </div>
      </div>
    </motion.div>
  );
}