import React from 'react';  
import { motion } from 'framer-motion';  
import { Image, MapPin, Search } from 'lucide-react';  
import { mockBirds } from '../mock/birds';  

const BirdCatalog = () => {  
  const [searchTerm, setSearchTerm] = React.useState('');  

  const filteredBirds = mockBirds.filter(bird =>  
    bird.name.toLowerCase().includes(searchTerm.toLowerCase())  
  );  

  return (  
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white dark:from-gray-900 dark:to-gray-800">  
      <div className="container mx-auto px-4 py-12 max-w-6xl">  
        <motion.h2  
          initial={{ opacity: 0, y: -20 }}  
          animate={{ opacity: 1, y: 0 }}  
          className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8 bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent"  
        >  
          Catálogo de Aves  
        </motion.h2>  

        <div className="mb-8">  
          <div className="relative max-w-md mx-auto">  
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />  
            <input  
              type="text"  
              value={searchTerm}  
              onChange={(e) => setSearchTerm(e.target.value)}  
              placeholder="Buscar ave por nombre..."  
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-green-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 text-gray-900 dark:text-white"  
            />  
          </div>  
        </div>  

        <motion.div  
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"  
          initial={{ opacity: 0 }}  
          animate={{ opacity: 1 }}  
          transition={{ staggerChildren: 0.1 }}  
        >  
          {filteredBirds.map((bird, index) => (  
            <motion.div  
              key={bird.id}  
              initial={{ opacity: 0, y: 20 }}  
              animate={{ opacity: 1, y: 0 }}  
              transition={{ delay: index * 0.1 }}  
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-green-200/50 dark:border-gray-700/50 hover:shadow-xl transition-shadow"  
              whileHover={{ y: -5 }}  
            >  
              <div className="relative h-48 bg-gradient-to-br from-green-100 dark:from-green-900/20 to-emerald-100 dark:to-emerald-900/20">  
                <img src={bird.image} alt={bird.name} className="w-full h-full object-cover" />  
                <div className="absolute top-3 right-3 bg-white dark:bg-gray-900 px-2 py-1 rounded-full text-xs font-semibold">  
                  {bird.type}  
                </div>  
              </div>  
              <div className="p-6">  
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{bird.name}</h3>  
                <p className="text-gray-600 dark:text-gray-300 mb-4">{bird.description}</p>  
                <div className="flex items-center text-green-600 dark:text-green-400 mb-4">  
                  <MapPin className="w-4 h-4 mr-1" />  
                  <span>{bird.distribution}</span>  
                </div>  
                <div className="flex justify-center">  
                  <motion.button  
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-xl font-medium hover:from-green-600 hover:to-emerald-700"  
                    whileHover={{ scale: 1.05 }}  
                  >  
                    Ver Detalles  
                  </motion.button>  
                </div>  
              </div>  
            </motion.div>  
          ))}  
        </motion.div>  

        {filteredBirds.length === 0 && (  
          <motion.div  
            initial={{ opacity: 0, scale: 0.9 }}  
            animate={{ opacity: 1, scale: 1 }}  
            className="text-center py-12"  
          >  
            <Image className="w-16 h-16 text-gray-400 mx-auto mb-4" />  
            <p className="text-gray-500 dark:text-gray-400 text-lg">No se encontraron aves. ¡Prueba otra búsqueda!</p>  
          </motion.div>  
        )}  
      </div>  
    </div>  
  );  
};  

export default BirdCatalog;