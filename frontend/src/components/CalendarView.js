import React, { useState } from 'react';  
import { motion } from 'framer-motion';  
import { Calendar, Star, AlertCircle } from 'lucide-react';  
import { mockEvents } from '../mock/events';  

const CalendarView = () => {  
  const [currentMonth, setCurrentMonth] = useState('2024-01');  

  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];  

  const generateDays = (month) => {  
    const [year, mon] = month.split('-').map(Number);  
    const date = new Date(year, mon - 1, 1);  
    const daysInMonth = new Date(year, mon, 0).getDate();  
    const days = [];  
    for (let i = 0; i < daysInMonth; i++) {  
      days.push(new Date(year, mon - 1, i + 1));  
    }  
    return days;  
  };  

  const days = generateDays(currentMonth);  

  const isEventOnDate = (dayDate) => {  
    const dayStr = dayDate.toISOString().split('T')[0];  
    const monthYear = currentMonth;  

    for (const event of mockEvents) {  
      // Manejar fecha exacta  
      if (event.date === dayStr) {  
        return { event, type: 'exact' };  
      }  

      // Manejar rangos como "2024-05-01 al 2024-07-31"  
      if (event.date.includes('al')) {  
        const [startStr, endStr] = event.date.split(' al ');  
        const startDate = new Date(startStr);  
        const endDate = new Date(endStr);  

        if (dayDate >= startDate && dayDate <= endDate) {  
          return { event, type: 'range' };  
        }  
      }  

      // Para fechas de mes (si hay más, pero por ahora solo exactas y rangos)  
      if (event.date.includes('-') && event.date.split('-')[1] === dayStr.slice(5,7)) {  
        return { event, type: 'month' };  
      }  
    }  
    return null;  
  };  

  return (  
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white dark:from-gray-900 dark:to-gray-800">  
      <div className="container mx-auto px-4 py-12 max-w-4xl">  
        <motion.div  
          initial={{ opacity: 0, y: -20 }}  
          animate={{ opacity: 1, y: 0 }}  
          className="text-center mb-8"  
        >  
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">  
            Calendario de Avistamientos  
          </h2>  
          <div className="flex justify-center items-center gap-4 mb-6">  
            <button  
              onClick={() => {  
                const [year, mon] = currentMonth.split('-').map(Number);  
                const newMon = mon > 1 ? mon - 1 : 12;  
                const newYear = mon > 1 ? year : year - 1;  
                setCurrentMonth(`${newYear}-${String(newMon).padStart(2, '0')}`);  
              }}  
              className="p-2 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-full"  
            >  
              ←  
            </button>  
            <span className="text-xl font-semibold text-gray-900 dark:text-white">{months[parseInt(currentMonth.split('-')[1]) - 1]} {currentMonth.split('-')[0]}</span>  
            <button  
              onClick={() => {  
                const [year, mon] = currentMonth.split('-').map(Number);  
                const newMon = mon < 12 ? mon + 1 : 1;  
                const newYear = mon < 12 ? year : year + 1;  
                setCurrentMonth(`${newYear}-${String(newMon).padStart(2, '0')}`);  
              }}  
              className="p-2 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-full"  
            >  
              →  
            </button>  
          </div>  
        </motion.div>  

        <div className="grid grid-cols-7 gap-1 mb-8 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">  
          {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (  
            <div key={day} className="text-center font-semibold text-gray-600 dark:text-gray-400 py-2">  
              {day}  
            </div>  
          ))}  
          {days.map((day, index) => {  
            const dayEvent = isEventOnDate(day);  
            return (  
              <motion.div  
                key={index}  
                className={`relative text-center py-2 px-1 h-20 border border-green-200/50 dark:border-gray-700/50 rounded-lg transition-colors hover:bg-green-50 dark:hover:bg-green-900/20 ${  
                  dayEvent  
                    ? 'bg-green-100 dark:bg-green-900/30 border-green-400 dark:border-green-600'  
                    : 'bg-gray-50 dark:bg-gray-700/50'  
                }`}  
                whileHover={{ scale: 1.05 }}  
              >  
                <span className="text-sm text-gray-700 dark:text-gray-300">{day.getDate()}</span>  
                {dayEvent && (  
                  <div className="flex flex-col items-center absolute bottom-1 left-1/2 transform -translate-x-1/2 space-y-0.5">  
                    <Star className={`w-3 h-3 ${dayEvent.type === 'range' ? 'text-yellow-500' : 'text-green-500'}`} />  
                    {dayEvent.type === 'range' && (  
                      <AlertCircle className="w-2 h-2 text-yellow-600" title="Evento en rango" />  
                    )}  
                  </div>  
                )}  
              </motion.div>  
            );  
          })}  
        </div>  

        <motion.div  
          initial={{ opacity: 0, y: 20 }}  
          animate={{ opacity: 1, y: 0 }}  
          className="space-y-4"  
        >  
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Eventos Especiales</h3>  
          {mockEvents.map((event, index) => (  
            <motion.div  
              key={event.id}  
              initial={{ opacity: 0, x: 20 }}  
              animate={{ opacity: 1, x: 0 }}  
              transition={{ delay: index * 0.1 }}  
              className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-green-200/50 dark:border-gray-700/50"  
              whileHover={{ y: -2 }}  
            >  
              <Calendar className="w-8 h-8 text-green-500 flex-shrink-0" />  
              <div className="flex-1">  
                <h4 className="font-semibold text-gray-900 dark:text-white">{event.name}</h4>  
                <p className="text-gray-600 dark:text-gray-300 text-sm">{event.date}</p>  
                <p className="text-gray-500 dark:text-gray-400">{event.description}</p>  
              </div>  
              <motion.button  
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-emerald-700"  
                whileHover={{ scale: 1.05 }}  
              >  
                Ver Más  
              </motion.button>  
            </motion.div>  
          ))}  
        </motion.div>  
      </div>  
    </div>  
  );  
};  

export default CalendarView;