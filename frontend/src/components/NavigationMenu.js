import React from 'react';  
import { motion } from 'framer-motion';  
import { Home, Image, MapPin, Calendar, Download, BookOpen, LogOut } from 'lucide-react';  
import { Link, useNavigate } from 'react-router-dom';  

const NavigationMenu = () => {  
  const navigate = useNavigate();  

  const menuItems = [  
    { to: '/app', label: 'Inicio', icon: Home },  
    { to: '/catalog', label: 'Catálogo de Aves', icon: Image },  
    { to: '/reserves', label: 'Reservas Naturales', icon: MapPin },  
    { to: '/calendar', label: 'Calendario', icon: Calendar },  
    { to: '/booking', label: 'Reservas Online', icon: Download },  
    { to: '/education', label: 'Educación', icon: BookOpen }  
  ];  

  const handleLogout = () => {  
    localStorage.removeItem('isLoggedIn');  
    navigate('/');  
  };  

  return (  
    <nav className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-b border-green-200/50 dark:border-gray-700/50 shadow-lg">  
      <div className="container mx-auto px-4">  
        <div className="flex items-center justify-between py-4">  
          <Link to="/app" className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">  
            Aviar  
          </Link>  
          <div className="hidden md:flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-xl">  
            {menuItems.map((item, index) => (  
              <motion.div key={item.to} whileHover={{ scale: 1.1 }}>  
                <Link  
                  to={item.to}  
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"  
                >  
                  <item.icon className="w-5 h-5" /> {item.label}  
                </Link>  
              </motion.div>  
            ))}  
          </div>  
          <motion.button  
            onClick={handleLogout}  
            className="p-2 rounded-full bg-red-50 dark:bg-red-900/20 border border-red-200/50 dark:border-red-800/50 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 md:ml-4"  
            whileHover={{ scale: 1.1 }}  
          >  
            <LogOut className="w-5 h-5" />  
          </motion.button>  
        </div>  

        <div className="md:hidden pb-4">  
          {/* Mobile menu placeholder - expand if needed */}  
          <p className="text-sm text-gray-500 dark:text-gray-400">Menú móvil: usa enlaces arriba en desktop.</p>  
        </div>  
      </div>  
    </nav>  
  );  
};  

export default NavigationMenu;