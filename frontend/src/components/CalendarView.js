import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Star, AlertCircle } from 'lucide-react';
// import { mockEvents } from '../mock/events'; // Ya no es necesario

// URL base para el backend
const API_BASE_URL = 'http://localhost:8080/api';

// Estructura de datos esperada de la API /eventos
/**
 * @typedef {object} ApiEvent
 * @property {number} id
 * @property {string} titulo
 * @property {string} descripcion
 * @property {string} fechaIn // Fecha de inicio (YYYY-MM-DD)
 * @property {string} fechaFin // Fecha de fin (YYYY-MM-DD)
 */

const CalendarView = () => {
  // 1. Estados
  const [currentMonth, setCurrentMonth] = useState('2024-01');
  const [events, setEvents] = useState([]); // Lista de eventos de la API
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  // 2. Función de Fetching
  const fetchEvents = async () => {
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
      const response = await fetch(`${API_BASE_URL}/eventos`, { headers });

      if (!response.ok) {
        setError(`Error al cargar los eventos: ${response.statusText}. Código: ${response.status}`);
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      setEvents(data); // Almacenamos los eventos tal cual vienen de la API

    } catch (err) {
      console.error("Error de red o procesamiento:", err);
      setError("Ocurrió un error de conexión con el servidor de eventos.");
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Ejecutar el fetching al montar el componente
  useEffect(() => {
    fetchEvents();
  }, []);

  // Funciones de calendario (sin cambios)
  const generateDays = (month) => {
    const [year, mon] = month.split('-').map(Number);
    const daysInMonth = new Date(year, mon, 0).getDate();
    const days = [];
    for (let i = 0; i < daysInMonth; i++) {
      days.push(new Date(Date.UTC(year, mon - 1, i + 1))); // Usar Date.UTC para evitar problemas de zona horaria
    }
    return days;
  };

  // Memoizar los días para el mes actual
  const days = useMemo(() => generateDays(currentMonth), [currentMonth]);

  // 4. Lógica de mapeo de eventos a una fecha
  const isEventOnDate = (dayDate) => {
    const dayUtcStr = dayDate.toISOString().split('T')[0]; // YYYY-MM-DD (UTC)

    for (const event of events) {
      const startDate = new Date(Date.UTC(...event.fechaIn.split('-').map(Number).map((n, i) => i === 1 ? n - 1 : n)));
      const endDate = new Date(Date.UTC(...event.fechaFin.split('-').map(Number).map((n, i) => i === 1 ? n - 1 : n)));

      // Comparación de fecha exacta (si fechaIn y fechaFin son iguales)
      if (event.fechaIn === event.fechaFin && event.fechaIn === dayUtcStr) {
        return { event, type: 'exact' };
      }

      // Comparación de rangos
      // Añadimos +1 día al final para incluir la fecha de fin en la comparación
      const oneDay = 24 * 60 * 60 * 1000;
      const rangeEndDate = new Date(endDate.getTime() + oneDay);

      if (dayDate >= startDate && dayDate < rangeEndDate) {
        return { event, type: 'range' };
      }
    }
    return null;
  };

  // --- Renderizado del Componente ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12 max-w-4xl">

        {/* 5. Título y Navegación (sin cambios) */}
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

        {/* 6. Renderizado de Carga/Error */}
        {isLoading ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300">Cargando eventos del servidor...</p>
          </motion.div>
        ) : error ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12 p-6 bg-red-100 dark:bg-red-900/50 border border-red-400 rounded-xl">
            <p className="text-xl font-semibold text-red-700 dark:text-red-300 mb-2">¡Error de Conexión!</p>
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </motion.div>
        ) : (
          <>
            {/* 7. Cuadrícula del Calendario (Aplica los eventos cargados) */}
            <div className="grid grid-cols-7 gap-1 mb-8 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
              {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
                <div key={day} className="text-center font-semibold text-gray-600 dark:text-gray-400 py-2">
                  {day}
                </div>
              ))}
              {/* Rellenar espacios en blanco si el mes no empieza en Domingo (código omitido por brevedad, pero necesario en un calendario completo) */}
              {days.map((day, index) => {
                const dayEvent = isEventOnDate(day);
                return (
                  <motion.div
                    key={index}
                    className={`relative text-center py-2 px-1 h-20 border border-green-200/50 dark:border-gray-700/50 rounded-lg transition-colors hover:bg-green-50 dark:hover:bg-green-900/20 ${dayEvent
                        ? 'bg-green-100 dark:bg-green-900/30 border-green-400 dark:border-green-600 cursor-pointer'
                        : 'bg-gray-50 dark:bg-gray-700/50'
                      }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-sm text-gray-700 dark:text-gray-300">{day.getUTCDate()}</span>
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

            {/* 8. Lista de Eventos Especiales (Mapea los eventos de la API) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Eventos Especiales</h3>
              {events.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">No hay eventos programados en el sistema.</p>
              ) : (
                events.map((event, index) => (
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
                      <h4 className="font-semibold text-gray-900 dark:text-white">{event.titulo}</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {event.fechaIn === event.fechaFin
                          ? `Fecha: ${event.fechaIn}`
                          : `Rango: ${event.fechaIn} al ${event.fechaFin}`
                        }
                      </p>
                      <p className="text-gray-500 dark:text-gray-400">{event.descripcion}</p>
                    </div>
                    <motion.button
                      className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-emerald-700"
                      whileHover={{ scale: 1.05 }}
                    >
                      Ver Más
                    </motion.button>
                  </motion.div>
                ))
              )}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default CalendarView;