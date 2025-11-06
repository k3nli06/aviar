import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Image, MapPin, Search } from 'lucide-react';

// URL base para el backend
const API_BASE_URL = 'http://localhost:8080';

const BirdCatalog = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [birds, setBirds] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Función auxiliar para simular un pequeño retraso entre reintentos
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Función de Fetching: Obtiene aves y sus fotos, ahora con reintentos para las fotos
    const fetchBirds = async () => {
        setIsLoading(true);
        setError(null);

        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            console.error("Error de Autenticación: No se encontró el 'authToken'.");
            setError("Error de autenticación: Por favor, inicia sesión.");
            setIsLoading(false);
            return;
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
        };

        try {
            // A. Obtener la lista de aves
            const avesResponse = await fetch(`${API_BASE_URL}/api/aves`, { headers });

            if (!avesResponse.ok) {
                setError(`Error al cargar las aves: ${avesResponse.statusText}. Código: ${avesResponse.status}`);
                setIsLoading(false);
                return;
            }

            const avesData = await avesResponse.json();

            // B. Para cada ave, intentar obtener la URL de su primera foto con reintentos
            const birdsWithImages = await Promise.all(
                avesData.map(async (bird) => {
                    const fotoId = bird.fotos[0]?.id;
                    let imageUrl = '';
                    const MAX_RETRIES = 2; // Máximo de intentos permitidos (1 intento inicial + 1 reintento)

                    if (fotoId) {
                        for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
                            try {
                                const fotoResponse = await fetch(`${API_BASE_URL}/api/fotos/${fotoId}`, { headers });

                                if (fotoResponse.ok) {
                                    // Éxito: Usamos la URL del endpoint como fuente
                                    imageUrl = `${API_BASE_URL}/api/fotos/${fotoId}`;
                                    break; // Salir del bucle for
                                } else if (attempt < MAX_RETRIES - 1) {
                                    // El intento falló, y aún no hemos alcanzado el límite.
                                    console.warn(`Intento ${attempt + 1} fallido para la foto ${fotoId}. Reintentando en 500ms...`);
                                    await delay(500); // Esperar un poco antes de reintentar
                                } else {
                                    // Último intento fallido
                                    console.error(`Fallo total al cargar la foto ${fotoId} después de ${MAX_RETRIES} intentos.`);
                                }
                            } catch (e) {
                                // Error de red (ej: CORS, servidor caído)
                                if (attempt < MAX_RETRIES - 1) {
                                    console.warn(`Error de red en el intento ${attempt + 1} para la foto ${fotoId}. Reintentando...`);
                                    await delay(500);
                                } else {
                                    console.error(`Error de red total para la foto ${fotoId}.`, e);
                                }
                            }
                        }
                    }

                    // Mapeo de datos para el frontend
                    return {
                        id: bird.nombreCientifico,
                        name: bird.nombreComunEs,
                        description: bird.descripcionEs,
                        distribution: "Distribución no disponible",
                        type: bird.nombreCientifico.split(' ')[0] || 'Ave',
                        // Si después de 2 intentos, imageUrl sigue vacío, usamos el placeholder
                        imageUrl: imageUrl || 'placeholder.jpg', 
                    };
                })
            );

            setBirds(birdsWithImages);
        } catch (err) {
            console.error("Error de red o procesamiento en el catálogo principal:", err);
            setError("Ocurrió un error de conexión con el catálogo principal. Inténtalo de nuevo.");
            setBirds([]);
        } finally {
            setIsLoading(false);
        }
    };

    // useEffect y Filtrado (sin cambios)
    useEffect(() => {
        fetchBirds();
    }, []);

    const filteredBirds = useMemo(() => {
        if (!searchTerm) return birds;
        return birds.filter(bird =>
            bird.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [birds, searchTerm]);

    // --- Renderizado del Componente (sin cambios funcionales, solo visuales de error/carga) ---
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-white dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 py-12 max-w-6xl">
                {/* Título y Búsqueda... */}
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8 bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent"
                >
                    Catálogo de Aves
                </motion.h2>

                <div className="mb-8">{/* Search bar code... */}
                    <div className="relative max-w-md mx-auto">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Buscar ave por nombre..."
                            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-green-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 text-gray-900 dark:text-white"
                        />
                    </div>
                </div>

                {/* Indicador de carga o Mensaje de Error */}
                {isLoading ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
                        <p className="text-lg text-gray-600 dark:text-gray-300">Cargando aves desde la API...</p>
                    </motion.div>
                ) : error ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12 p-6 bg-red-100 dark:bg-red-900/50 border border-red-400 rounded-xl"
                    >
                        <p className="text-xl font-semibold text-red-700 dark:text-red-300 mb-2">¡Error de Conexión!</p>
                        <p className="text-red-600 dark:text-red-400">{error}</p>
                        <p className="text-sm mt-4 text-red-500 dark:text-red-400/70">Asegúrate de que el servidor está corriendo y tienes un token de sesión válido.</p>
                    </motion.div>
                ) : (
                    <>
                        {/* Lista de Aves Filtradas */}
                        <motion.div
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ staggerChildren: 0.1 }}
                        >
                            {filteredBirds.map((bird, index) => (
                                <motion.div
                                    key={bird.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-green-200/50 dark:border-gray-700/50 hover:shadow-xl transition-shadow"
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="relative h-48 bg-gradient-to-br from-green-100 dark:from-green-900/20 to-emerald-100 dark:to-emerald-900/20">
                                        <img
                                            src={bird.imageUrl}
                                            alt={bird.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => { e.target.onerror = null; e.target.src = 'placeholder.jpg' }}
                                        />
                                        <div className="absolute top-3 right-3 bg-white dark:bg-gray-900 px-2 py-1 rounded-full text-xs font-semibold">
                                            {bird.type}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{bird.name}</h3>
                                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{bird.description}</p>
                                        <div className="flex items-center text-green-600 dark:text-green-400 mb-4">
                                            <MapPin className="w-4 h-4 mr-1" />
                                            <span>{bird.distribution}</span>
                                        </div>
                                        <div className="flex justify-center">
                                            <motion.button
                                                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-xl font-medium hover:from-green-600 hover:to-emerald-700"
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                Ver Detalles
                                            </motion.button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Mensaje de No Encontrado */}
                        {filteredBirds.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-12"
                            >
                                <Image className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-500 dark:text-gray-400 text-lg">No se encontraron aves. ¡Prueba otra búsqueda!</p>
                            </motion.div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default BirdCatalog;