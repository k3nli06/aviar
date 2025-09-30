import React from 'react';  
import { motion } from 'framer-motion';  
import { Sun, Moon } from 'lucide-react';  

const ThemeToggle = () => {  
  const handleToggle = () => {  
    if (document.documentElement.classList.contains('dark')) {  
      document.documentElement.classList.remove('dark');  
      localStorage.setItem('theme', 'light');  
    } else {  
      document.documentElement.classList.add('dark');  
      localStorage.setItem('theme', 'dark');  
    }  
  };  

  return (  
    <motion.button  
      onClick={handleToggle}  
      className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 border border-green-200/50 dark:border-gray-700/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all"  
      whileHover={{ scale: 1.1 }}  
      whileTap={{ scale: 0.95 }}  
    >  
      <Sun className="w-5 h-5 text-yellow-500 hidden dark:hidden" />  
      <Moon className="w-5 h-5 text-gray-800 dark:hidden" />  
      <Sun className="w-5 h-5 text-yellow-400 hidden dark:block" />  
    </motion.button>  
  );  
};  

export default ThemeToggle;