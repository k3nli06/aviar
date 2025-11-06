import React, { useState } from 'react';  
import { motion } from 'framer-motion';  
import { Calendar, Users, Download, Plus } from 'lucide-react';  
import { mockGuides } from '../mock/guides';  

const BookingSystem = () => {  
  const [selectedDate, setSelectedDate] = useState('');  
  const [selectedGuide, setSelectedGuide] = useState('');  

  const handleBooking = () => {  
    if (selectedDate && selectedGuide) {  
      alert('¡Reserva simulada! Elige guía y fecha para confirmar. Tú manejas el resto.');  
    } else {  
      alert('Selecciona guía y fecha primero.');  
    }  
  };  

  return (  
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white dark:from-gray-900 dark:to-gray-800">  
      <div className="container mx-auto px-4 py-12 max-w-4xl">  
        <motion.h2  
          initial={{ opacity: 0, y: -20 }}  
          animate={{ opacity: 1, y: 0 }}  
          className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8 bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent"  
        >  
          Sistema de Reservas  
        </motion.h2>  

        <div className="grid md:grid-cols-2 gap-8 mb-8">  
          <motion.div  
            initial={{ opacity: 0, x: -20 }}  
            animate={{ opacity: 1, x: 0 }}  
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-green-200/50 dark:border-gray-700/50"  
          >  
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">  
              <Calendar className="w-5 h-5" /> Selecciona Fecha  
            </h3>  
            <input  
              type="date"  
              value={selectedDate}  
              onChange={(e) => setSelectedDate(e.target.value)}  
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-green-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400"  
            />  
          </motion.div>  

          <motion.div  
            initial={{ opacity: 0, x: 20 }}  
            animate={{ opacity: 1, x: 0 }}  
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-green-200/50 dark:border-gray-700/50"  
          >  
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">  
              <Users className="w-5 h-5" /> Elige Guía  
            </h3>  
            <select  
              value={selectedGuide}  
              onChange={(e) => setSelectedGuide(e.target.value)}  
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-green-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400"  
            >  
              <option value="">Selecciona un guía</option>  
              {mockGuides.map(guide => (  
                <option key={guide.id} value={guide.id}>{guide.name} - {guide.certification}</option>  
              ))}  
            </select>  
          </motion.div>  
        </div>          

        <div className="space-y-4">  
          {mockGuides.map(guide => (  
            <motion.div  
              key={guide.id}  
              initial={{ opacity: 0, y: 20 }}  
              animate={{ opacity: 1, y: 0 }}  
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-green-200/50 dark:border-gray-700/50 flex items-center justify-between"  
              whileHover={{ y: -2 }}  
            >  
              <div>  
                <h4 className="font-semibold text-gray-900 dark:text-white">{guide.name}</h4>  
                <p className="text-gray-600 dark:text-gray-300 text-sm">{guide.certification}</p>  
                <p className="text-green-600 dark:text-green-400">{guide.services}</p>  
              </div>  
              <div className="text-right">  
                <p className="text-gray-500 dark:text-gray-400 text-sm">{guide.availability}</p>  
                <motion.button  
                  className="mt-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-xl hover:from-green-600 hover:to-emerald-700"  
                  whileHover={{ scale: 1.05 }}  
                >  
                  Reservar  
                </motion.button>  
              </div>  
            </motion.div>  
          ))}  
        </div>  

        <motion.div  
          className="text-center mt-12"  
          initial={{ opacity: 0 }}  
          animate={{ opacity: 1 }}  
        >  
          <motion.button  
            onClick={handleBooking}  
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-green-600 hover:to-emerald-700 text-lg"  
            whileHover={{ scale: 1.05 }}  
            whileTap={{ scale: 0.95 }}  
          >  
            <Download className="w-5 h-5 inline mr-2" /> Confirmar Reserva  
          </motion.button>  
        </motion.div>  
      </div>  
    </div>  
  );  
};  

export default BookingSystem;