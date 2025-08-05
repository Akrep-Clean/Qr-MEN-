import { FiImage } from 'react-icons/fi';

export default function MenuCard({ name, description, price, image }) {
  return (
    <div className="group flex flex-col sm:flex-row bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-200">
      
      {/* Resim */}
      {image ? (
        <img 
          src={image} 
          alt={name} 
          className="w-full sm:w-40 h-40 object-cover border-b sm:border-b-0 sm:border-r border-gray-200"
        />
      ) : (
        <div className="w-full sm:w-40 h-40 bg-gray-100 flex items-center justify-center border-b sm:border-b-0 sm:border-r border-gray-200">
          <FiImage className="text-gray-400 text-4xl" />
        </div>
      )}

      {/* İçerik */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{name}</h3>
          <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
        </div>

        <div className="flex justify-between items-end mt-4">
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <span key={i} className="w-2 h-2 bg-gray-300 rounded-full" />
            ))}
          </div>
          <span className="text-base font-bold text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full">
            {price} ₺
          </span>
        </div>
      </div>
    </div>
  );
}
