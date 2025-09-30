import React from 'react';  
import { motion } from 'framer-motion';  
import { Image, MapPin, Calendar, Download, BookOpen, Users } from 'lucide-react';  
import NavigationMenu from './NavigationMenu';  

const Dashboard = () => {  
  return (  
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white dark:from-gray-900 dark:to-gray-800">  
      <NavigationMenu />  
      <motion.main  
        initial={{ opacity: 0, y: 20 }}  
        animate={{ opacity: 1, y: 0 }}  
        className="container mx-auto px-4 py-12 max-w-4xl"  
      >  
        <motion.div  
          initial={{ scale: 0.9, opacity: 0 }}  
          animate={{ scale: 1, opacity: 1 }}  
          transition={{ delay: 0.2 }}  
          className="text-center bg-white/90 dark:bg-gray-800/90 border border-green-200/50 dark:border-gray-700/50 rounded-3xl p-12 shadow-xl mb-12"  
        >  
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">  
            ¡Bienvenidos a Aviar!  
          </h2>  
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">  
            Explora áreas protegidas, descubre especies de aves, reserva tours guiados y aprende sobre conservación.  
          </p>  
          <div className="grid md:grid-cols-3 gap-6">  
            <motion.div  
              className="bg-green-50 dark:bg-green-900/20 border border-green-200/50 dark:border-green-800/50 rounded-2xl p-6 text-center"  
              whileHover={{ scale: 1.05 }}  
            >  
              <Image className="w-12 h-12 text-green-600 mx-auto mb-4" />  
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">Catálogo Digital</h3>  
              <p className="text-gray-600 dark:text-gray-400">Fotografías y mapas de aves endémicas y migratorias</p>  
            </motion.div>  
            <motion.div  
              className="bg-green-50 dark:bg-green-900/20 border border-green-200/50 dark:border-green-800/50 rounded-2xl p-6 text-center"  
              whileHover={{ scale: 1.05 }}  
            >  
              <MapPin className="w-12 h-12 text-green-600 mx-auto mb-4" />  
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">Áreas Protegidas</h3>  
              <p className="text-gray-600 dark:text-gray-400">Información actualizada de reservas naturales</p>  
            </motion.div>  
            <motion.div  
              className="bg-green-50 dark:bg-green-900/20 border border-green-200/50 dark:border-green-800/50 rounded-2xl p-6 text-center"  
              whileHover={{ scale: 1.05 }}  
            >  
              <Calendar className="w-12 h-12 text-green-600 mx-auto mb-4" />  
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">Eventos y Temporadas</h3>  
              <p className="text-gray-600 dark:text-gray-400">Calendario de avistamientos y festivales</p>  
            </motion.div>  
          </div>  
          <div className="grid md:grid-cols-3 gap-6 mt-8">  
            <motion.div  
              className="bg-green-50 dark:bg-green-900/20 border border-green-200/50 dark:border-green-800/50 rounded-2xl p-6 text-center"  
              whileHover={{ scale: 1.05 }}  
            >  
              <Download className="w-12 h-12 text-green-600 mx-auto mb-4" />  
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">Reservas Online</h3>  
              <p className="text-gray-600 dark:text-gray-400">Contrata guías y servicios complementarios</p>  
            </motion.div>  
            <motion.div  
              className="bg-green-50 dark:bg-green-900/20 border border-green-200/50 dark:border-green-800/50 rounded-2xl p-6 text-center"  
              whileHover={{ scale: 1.05 }}  
            >  
              <BookOpen className="w-12 h-12 text-green-600 mx-auto mb-4" />  
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">Módulo Educativo</h3>  
              <p className="text-gray-600 dark:text-gray-400">Buenas prácticas y conservación</p>  
            </motion.div>  
            <motion.div  
              className="bg-green-50 dark:bg-green-900/20 border border-green-200/50 dark:border-green-800/50 rounded-2xl p-6 text-center"  
              whileHover={{ scale: 1.05 }}  
            >  
              <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />  
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">Conexión Local</h3>  
              <p className="text-gray-600 dark:text-gray-400">Operadores y turistas conectados</p>  
            </motion.div>  
          </div>  
        </motion.div>  
      </motion.main>  
    </div>  
  );  
};  

export default Dashboard;