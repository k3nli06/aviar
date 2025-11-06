import React, { useState, useEffect } from 'react'; 
import { motion } from 'framer-motion'; 
import { MapPin, Shield, Calendar } from 'lucide-react'; 

// URL base para el backend
const API_BASE_URL = 'http://localhost:8080/api';

// Estructura de datos esperada de la API /area-protegida
/**
 * @typedef {object} ProtectedArea
 * @property {number} id
 * @property {string} nombre
 * @property {string} descripcion
 * @property {string} web
 */

const ReservesInfo = () => { 
    // 1. Estados para la data y el control de UI
    const [areas, setAreas] = useState([]); // Usaremos 'areas' en lugar de 'mockReserves'
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // 2. Función de Fetching con Autenticación
    const fetchAreas = async () => {
        setIsLoading(true);
        setError(null);

        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            setError("Error de autenticación: El token de sesión es requerido.");
            setIsLoading(false);
            return;
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
        };

        try {
            const response = await fetch(`${API_BASE_URL}/area-protegida`, { headers });

            if (!response.ok) {
                setError(`Error al cargar las reservas: ${response.statusText}. Código: ${response.status}`);
                setIsLoading(false);
                return;
            }

            const data = await response.json();
            // Mapeamos los campos de la API para que coincidan con el diseño original (aunque solo usamos nombre/descripcion)
            const mappedAreas = data.map(area => ({
                id: area.id,
                name: area.nombre,
                description: area.descripcion,
                web: area.web // Se mantiene por si se quiere usar
            }));
            
            setAreas(mappedAreas);

        } catch (err) {
            console.error("Error de red o procesamiento:", err);
            setError("Ocurrió un error de conexión con el servidor. Inténtalo de nuevo.");
        } finally {
            setIsLoading(false);
        }
    };

    // 3. Ejecutar el fetching al montar el componente
    useEffect(() => {
        fetchAreas();
    }, []);

    // --- Renderizado del Componente ---
    return ( 
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-white dark:from-gray-900 dark:to-gray-800"> 
            <div className="container mx-auto px-4 py-12 max-w-4xl"> 
                {/* Título */}
                <motion.h2 
                    initial={{ opacity: 0, y: -20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8 bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent" 
                > 
                    Reservas Naturales
                </motion.h2> 
                
                {/* 4. Indicadores de Carga y Error */}
                {isLoading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
                        <p className="text-lg text-gray-600 dark:text-gray-300">Cargando datos de las reservas...</p>
                    </motion.div>
                )}

                {error && (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12 p-6 bg-red-100 dark:bg-red-900/50 border border-red-400 rounded-xl">
                        <p className="text-xl font-semibold text-red-700 dark:text-red-300 mb-2">¡Error de Conexión!</p>
                        <p className="text-red-600 dark:text-red-400">{error}</p>
                    </motion.div>
                )}

                {!isLoading && !error && (
                    <div className="space-y-8"> 
                        {areas.map((reserve, index) => ( 
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
                                        <p className="text-sm text-blue-600 dark:text-blue-400 mt-2 hover:underline cursor-pointer">Web: {reserve.web}</p>
                                    </div> 
                                </div> 
                                <motion.button 
                                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700" 
                                    whileHover={{ scale: 1.02 }} 
                                    // Aquí se añadiría la lógica real de reserva (onClick={handleReservation(reserve.id)})
                                > 
                                    Reservar Visita 
                                </motion.button> 
                            </motion.div> 
                        ))} 
                    </div> 
                )}

                {/* Mensaje de Sin Datos */}
                {!isLoading && !error && areas.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12"
                    >
                        <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 dark:text-gray-400 text-lg">No se encontraron reservas naturales en la base de datos.</p>
                    </motion.div>
                )}
            </div> 
        </div> 
    ); 
}; 

export default ReservesInfo;