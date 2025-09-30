import React, { useState } from 'react';  
import { motion } from 'framer-motion';  
import { Mail, User, Lock, LogIn } from 'lucide-react';  
import { useNavigate } from 'react-router-dom';  

const RegisterForm = () => {  
  const [formData, setFormData] = useState({ email: '', name: '', password: '' });  
  const [showPassword, setShowPassword] = useState(false);  
  const [error, setError] = useState('');  
  const [success, setSuccess] = useState('');  
  const [isLoading, setIsLoading] = useState(false);  
  const navigate = useNavigate();  

  const handleChange = (e) => {  
    setFormData({ ...formData, [e.target.name]: e.target.value });  
  };  

  const handleSubmit = (e) => {  
    e.preventDefault();  
    setIsLoading(true);  
    setError('');  
    setSuccess('');  

    setTimeout(() => {  
      // Simula registro exitoso  
      localStorage.setItem('user', JSON.stringify(formData));  
      setSuccess('¡Registrado! Ahora inicia sesión.');  
      setIsLoading(false);  
      setTimeout(() => navigate('/'), 1500);  
    }, 1000);  
  };  

  return (  
    <motion.div  
      initial={{ opacity: 0, scale: 0.9 }}  
      animate={{ opacity: 1, scale: 1 }}  
      className="min-h-screen bg-gradient-to-br from-green-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-8"  
    >  
      <motion.div  
        className="w-full max-w-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-green-200/50 dark:border-gray-700/50 rounded-3xl p-8 shadow-xl"  
        whileHover={{ y: -5 }}  
      >  
        <div className="text-center mb-8">  
          <motion.div  
            className="mx-auto w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4"  
            whileHover={{ scale: 1.05 }}  
          >  
            <User className="w-10 h-10 text-white" />  
          </motion.div>  
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Regístrate en Aviar</h2>  
          <p className="text-gray-600 dark:text-gray-300">Únete a la comunidad de observadores de aves</p>  
        </div>  

        <form onSubmit={handleSubmit} className="space-y-6">  
          <div>  
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nombre</label>  
            <div className="relative">  
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />  
              <input  
                type="text"  
                name="name"  
                value={formData.name}  
                onChange={handleChange}  
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 text-gray-900 dark:text-white placeholder-gray-500"  
                placeholder="Tu nombre completo"  
                required  
              />  
            </div>  
          </div>  
          <div>  
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Correo Electrónico</label>  
            <div className="relative">  
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />  
              <input  
                type="email"  
                name="email"  
                value={formData.email}  
                onChange={handleChange}  
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 text-gray-900 dark:text-white placeholder-gray-500"  
                placeholder="tu@email.com"  
                required  
              />  
            </div>  
          </div>  
          <div>  
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Contraseña</label>  
            <div className="relative">  
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />  
              <input  
                type={showPassword ? 'text' : 'password'}  
                name="password"  
                value={formData.password}  
                onChange={handleChange}  
                className="w-full pl-10 pr-10 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 text-gray-900 dark:text-white placeholder-gray-500"  
                placeholder="Crea una contraseña segura"  
                required  
              />  
              <button  
                type="button"  
                onClick={() => setShowPassword(!showPassword)}  
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"  
              >  
                {showPassword ? <Lock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}  
              </button>  
            </div>  
          </div>  

          {error && (  
            <motion.p className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/20 p-3 rounded-xl">  
              {error}  
            </motion.p>  
          )}  
          {success && (  
            <motion.p className="text-green-500 text-sm text-center bg-green-50 dark:bg-green-900/20 p-3 rounded-xl">  
              {success}  
            </motion.p>  
          )}  

          <motion.button  
            type="submit"  
            disabled={isLoading}  
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-2xl font-semibold hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"  
            whileHover={{ scale: 1.02 }}  
            whileTap={{ scale: 0.98 }}  
          >  
            {isLoading ? 'Registrando...' : 'Crear Cuenta'}  
          </motion.button>  
        </form>  

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">  
          ¿Ya tienes cuenta? <a href="/" className="text-green-600 hover:underline">Inicia sesión</a>  
        </p>  
      </motion.div>  
    </motion.div>  
  );  
};  

export default RegisterForm;