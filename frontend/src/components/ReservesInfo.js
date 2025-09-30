import React from 'react';  
import { motion } from 'framer-motion';  
import { MapPin, Shield, Calendar } from 'lucide-react';  
import { mockReserves } from '../mock/reserves';  

const ReservesInfo = () => {  
  return (  
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white dark:from-gray-900 dark:to-gray-800">  
      <div className="container mx-auto px-4 py-12 max-w-4xl">  
        <motion.h2  
          initial={{ opacity: 0, y: -20 }}  
          animate={{ opacity: 1, y: 0 }}  
          className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8 bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent"  
        >  
          Reservas Naturales  
        </motion.h2>  

        <div className="space-y-8">  
          {mockReserves.map((reserve, index) => (  
            <motion.div  
              key={reserve.id}  
              initial={{ opacity: 0, x: -20 }}  
              animate={{ opacity: 1, x: 0 }}  
              transition={{ delay: index * 0.1 }}  
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-green-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl"  
              whileHover={{ y: -5 }}  
            >  
              <div className="flex items-start gap-4 mb-4">  
                <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">  
                  <MapPin className="w-6 h-6 text-white" />  
                </div>  
                <div className="flex-1">  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{reserve.name}</h3>  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{reserve.description}</p>  
                  <div className="flex items-center gap-4 text-sm">  
                    <div className="flex items-center gap-1 text-green-600 dark:text-green-400">  
                      <Shield className="w-4 h-4" />  
                      Actividades: {reserve.activities}  
                    </div>  
                    <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400">  
                      <Calendar className="w-4 h-4" />  
                      {reserve.status}  
                    </div>  
                  </div>  
                </div>  
              </div>  
              <motion.button  
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700"  
                whileHover={{ scale: 1.02 }}  
              >  
                Reservar Visita  
              </motion.button>  
            </motion.div>  
          ))}  
        </div>  
      </div>  
    </div>  
  );  
};  

export default ReservesInfo;