# 🦅 Aviar
**Plataforma de Aventurismo y Reservas Naturales de Nicaragua**

## 🌟 La Visión Conectando Biodiversidad y Ecoturismo

**Aviar** es la plataforma digital líder en Nicaragua, diseñada para transformar la forma en que el mundo interactúa con la rica biodiversidad del país.
  Nuestro objetivo es ser la herramienta única que conecta la vasta riqueza natural de Nicaragua (760+ especies de aves, reservas, rutas) con turistas nacionales e internacionales, resolviendo la actual falta de información precisa y centralizada.

Facilitamos la exploración de la naturaleza, promovemos el turismo responsable y generamos un impacto económico directo en las comunidades locales a través de alianzas con guías certificados.

## 🎯 Funcionalidades Clave

La plataforma se organiza en torno a seis módulos de valor, todos accesibles a través de nuestra API segura:

   1. *Catálogo de Biodiversidad, Aves endémicas y migratorias con descripciones, mapas de distribución y fotografías de alta resolución.*
   2. *Info Rutas y Reservas Información actualizada sobre reservas naturales habilitadas para aviturismo y otras actividades.*
   3. *Calendario & Eventos Gestión de temporadas de avistamiento, festivales de aves y conteos ciudadanos.*
   4. *Sistema de Reserva Reserva en línea de guías locales certificados y servicios complementarios.*
   5. *Seguridad y Perfil Registro de usuarios (CLIENTE, GUIA) y gestión de autenticación.*
   6. *Módulo Educativo Contenido sobre conservación y buenas prácticas para un turismo sostenible.*

## 🛠️ Stack Tecnológico (Backend)
*La API de Aviar está construida sobre una arquitectura robusta de Spring Boot, priorizando la seguridad y la eficiencia en el manejo de datos voluminosos.*

- **Framework:** Spring Boot 3 (Java 17+)

- **Persistencia:** Spring Data JPA / Hibernate

- **Base de Datos:** MySQL / PostgreSQL

- **Seguridad:** Spring Security para JWT/Token y autenticación basada en roles.

- **Formato de Datos:** RESTful API con JSON.

 ## 🛠️ Stack Tecnológico (Frontend)

El frontend es una aplicación React (CRA + Tailwind).

- Corre en http://localhost:80

- 📦 build optimizado con Nginx

Compila la app y la sirve con Nginx en http://localhost:80

### ⚠️ Notas

- El archivo nginx.conf ya incluye fallback para SPA (react-router).

- El Backend y el Frontend no estar intercomunicados.

## Ejecucion

En la carpeta raiz del proyecto escribe el comando a continuacion
```
docker compose up
```
esto levantara la base de datos junto con el backend (el frontend estara comentado dado que no es funcional con el backend)
## 🤝 Contribución
El equipo TEAM SEVENDFOLD te invita a explorar nuestra visión: hacer de Nicaragua el referente número uno en aviturismo de Centroamérica. ¡Juntos podemos transformar la forma en que las personas descubren y protegen nuestra naturaleza!
