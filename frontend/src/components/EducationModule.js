import React, { useState } from 'react';  
import { motion } from 'framer-motion';  
import { BookOpen, Shield, Heart, Users } from 'lucide-react';  

const EducationModule = () => {  
  const [activeTab, setActiveTab] = useState('conservacion');  

  const tabs = [  
    { id: 'conservacion', label: 'Conservación', icon: Shield },  
    { id: 'practicas', label: 'Buenas Prácticas', icon: Heart },  
    { id: 'comunidad', label: 'Comunidad', icon: Users }  
  ];  

  const content = {  
    conservacion: [  
      'Apoya la protección de hábitats naturales para evitar la extinción de especies.',  
      'No alimentes a las aves silvestres; altera su dieta natural y depende de turistas.',  
      'Usa binoculares y cámaras con zoom para observación no invasiva.'  
    ],  
    practicas: [  
      'Camina solo en senderos marcados para no dañar la vegetación.',  
      'Mantén distancia mínima de 10 metros de nidos y aves en reproducción.',  
      'Lleva tus residuos; deja el lugar más limpio de lo que lo encontraste.'  
    ],  
    comunidad: [  
      'Únete a grupos locales de aviturismo para compartir conocimientos.',  
      'Participa en conteos ciudadanos para ayudar en la ciencia ciudadana.',  
      'Contrata guías locales para apoyar economías comunitarias sostenibles.'  
    ]  
  };  

  const Icon = tabs.find(tab => tab.id === activeTab)?.icon;  

  return (  
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white dark:from-gray-900 dark:to-gray-800">  
      <div className="container mx-auto px-4 py-12 max-w-4xl">  
        <motion.h2  
          initial={{ opacity: 0, y: -20 }}  
          animate={{ opacity: 1, y: 0 }}  
          className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8 bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent"  
        >  
          Módulo Educativo  
        </motion.h2>  

        <motion.div  
          initial={{ opacity: 0, scale: 0.9 }}  
          animate={{ opacity: 1, scale: 1 }}  
          className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl border border-green-200/50 dark:border-gray-700/50 mb-8"  
        >  
          <div className="p-6 border-b border-green-200/50 dark:border-gray-700/50">  
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-2">  
              <BookOpen className="w-6 h-6" /> Aprende sobre Conservación  
            </h3>  
            <div className="flex justify-center space-x-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-xl max-w-md mx-auto">  
              {tabs.map(tab => (  
                <motion.button  
                  key={tab.id}  
                  onClick={() => setActiveTab(tab.id)}  
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${  
                    activeTab === tab.id  
                      ? 'bg-green-500 text-white shadow-md'  
                      : 'text-gray-600 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20'  
                  }`}  
                  whileHover={{ scale: 1.05 }}  
                >  
                  <tab.icon className="w-4 h-4 mr-2" /> {tab.label}  
                </motion.button>  
              ))}  
            </div>  
          </div>  

          <div className="p-8">  
            <motion.div  
              initial={{ opacity: 0, y: 20 }}  
              animate={{ opacity: 1, y: 0 }}  
              className="text-center mb-6"  
            >  
              <motion.div  
                className="mx-auto w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4"  
                whileHover={{ scale: 1.1 }}  
              >  
                <Icon className="w-8 h-8 text-white" />  
              </motion.div>  
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{tabs.find(tab => tab.id === activeTab)?.label}</h4>  
            </motion.div>  

            <ul className="space-y-4">  
              {content[activeTab].map((tip, index) => (  
                <motion.li  
                  key={index}  
                  initial={{ opacity: 0, x: -20 }}  
                  animate={{ opacity: 1, x: 0 }}  
                  transition={{ delay: index * 0.1 }}  
                  className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border-l-4 border-green-500"  
                >  
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-0.5 text-white text-sm font-bold">  
                    {index + 1}  
                  </div>  
                  <p className="text-gray-700 dark:text-gray-300">{tip}</p>  
                </motion.li>  
              ))}  
            </ul>  
          </div>  
        </motion.div>  

        <motion.div  
          className="text-center"  
          initial={{ opacity: 0 }}  
          animate={{ opacity: 1 }}  
        >  
          <p className="text-gray-600 dark:text-gray-400 mb-6">¡Comparte lo aprendido y protege las aves!</p>  
          <motion.button  
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-2xl font-semibold hover:from-green-600 hover:to-emerald-700"  
            whileHover={{ scale: 1.05 }}  
          >  
            Descargar Guía PDF  
          </motion.button>  
        </motion.div>  
      </div>  
    </div>  
  );  
};  

export default EducationModule;