DROP DATABASE IF EXISTS aviar;
CREATE DATABASE aviar CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE aviar;

CREATE TABLE pais (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL UNIQUE,
  iso2 CHAR(2) UNIQUE,
  iso3 CHAR(3) UNIQUE
);

CREATE TABLE region (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  pais_id BIGINT NOT NULL,
  nombre VARCHAR(150) NOT NULL,
  UNIQUE(pais_id, nombre),
  FOREIGN KEY (pais_id) REFERENCES pais(id) ON DELETE CASCADE
);

CREATE TABLE ciudad (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  region_id BIGINT NOT NULL,
  nombre VARCHAR(150) NOT NULL,
  lat DECIMAL(9,6),
  lon DECIMAL(9,6),
  UNIQUE(region_id, nombre),
  FOREIGN KEY (region_id) REFERENCES region(id) ON DELETE CASCADE
);

CREATE TABLE idioma (
  codigo VARCHAR(10) PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL
);

CREATE TABLE moneda (
  codigo VARCHAR(3) PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  simbolo VARCHAR(10)
);


CREATE TABLE usuario (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  correo VARCHAR(150) NOT NULL UNIQUE,
  clave_hash VARCHAR(255) NOT NULL,
  nombre_completo VARCHAR(200) NOT NULL,
  telefono VARCHAR(30),
  pais_id BIGINT,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  activo BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (pais_id) REFERENCES pais(id) ON DELETE SET NULL
);

CREATE TABLE rol (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE,
  descripcion VARCHAR(255)
);

CREATE TABLE usuario_rol (
  usuario_id BIGINT NOT NULL,
  rol_id BIGINT NOT NULL,
  PRIMARY KEY(usuario_id, rol_id),
  FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE,
  FOREIGN KEY (rol_id) REFERENCES rol(id) ON DELETE CASCADE
);


CREATE TABLE operador (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  usuario_id BIGINT UNIQUE,
  razon_social VARCHAR(200) NOT NULL,
  nombre_comercial VARCHAR(200),
  ruc VARCHAR(50) UNIQUE,
  telefono VARCHAR(30),
  correo VARCHAR(150),
  sitio_web VARCHAR(255),
  pais_id BIGINT,
  ciudad_id BIGINT,
  calificacion_prom DECIMAL(3,2) DEFAULT 0,
  total_resenas INT DEFAULT 0,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE SET NULL,
  FOREIGN KEY (pais_id) REFERENCES pais(id) ON DELETE SET NULL,
  FOREIGN KEY (ciudad_id) REFERENCES ciudad(id) ON DELETE SET NULL
);

CREATE TABLE guia (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  usuario_id BIGINT UNIQUE,
  operador_id BIGINT,
  biografia TEXT,
  anos_exp SMALLINT DEFAULT 0,
  calificacion_prom DECIMAL(3,2) DEFAULT 0,
  total_resenas INT DEFAULT 0,
  certificado BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE SET NULL,
  FOREIGN KEY (operador_id) REFERENCES operador(id) ON DELETE SET NULL
);


CREATE TABLE area_protegida (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(200) NOT NULL UNIQUE,
  categoria VARCHAR(100) NOT NULL,
  descripcion TEXT,
  pais_id BIGINT,
  region_id BIGINT,
  ciudad_id BIGINT,
  lat DECIMAL(9,6),
  lon DECIMAL(9,6),
  altitud_m INT,
  area_km2 DECIMAL(10,2),
  sitio_web VARCHAR(255),
  habilitada BOOLEAN DEFAULT TRUE,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (pais_id) REFERENCES pais(id) ON DELETE SET NULL,
  FOREIGN KEY (region_id) REFERENCES region(id) ON DELETE SET NULL,
  FOREIGN KEY (ciudad_id) REFERENCES ciudad(id) ON DELETE SET NULL
);


CREATE TABLE estado_conservacion (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  codigo VARCHAR(10) UNIQUE,
  nombre VARCHAR(100) NOT NULL
);

CREATE TABLE especie_ave (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  nombre_cientifico VARCHAR(200) UNIQUE NOT NULL,
  nombre_comun_es VARCHAR(200) NOT NULL,
  nombre_comun_en VARCHAR(200) NOT NULL,
  orden VARCHAR(100),
  familia VARCHAR(100),
  genero VARCHAR(100),
  endemica BOOLEAN DEFAULT FALSE,
  migratoria BOOLEAN DEFAULT FALSE,
  longitud_cm DECIMAL(5,2),
  peso_g DECIMAL(7,2),
  estado_conservacion_id BIGINT,
  descripcion_es TEXT,
  descripcion_en TEXT,
  FOREIGN KEY (estado_conservacion_id) REFERENCES estado_conservacion(id) ON DELETE SET NULL
);

CREATE TABLE foto (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  imagen LONGBLOB NOT NULL,   
  tipo VARCHAR(50), 
  ave_id BIGINT NOT NULL,
  FOREIGN KEY (ave_id) REFERENCES especie_ave(id) ON DELETE CASCADE
);

CREATE TABLE distribucion_ave (
  especie_id BIGINT NOT NULL,
  area_id BIGINT NOT NULL,
  residencia VARCHAR(100),
  abundancia VARCHAR(100),
  PRIMARY KEY (especie_id, area_id),
  FOREIGN KEY (especie_id) REFERENCES especie_ave(id) ON DELETE CASCADE,
  FOREIGN KEY (area_id) REFERENCES area_protegida(id) ON DELETE CASCADE
);

CREATE TABLE evento (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  area_id BIGINT,
  operador_id BIGINT,
  tipo VARCHAR(100) NOT NULL,
  titulo VARCHAR(200) NOT NULL,
  descripcion TEXT,
  fecha_inicio DATETIME NOT NULL,
  fecha_fin DATETIME NOT NULL,
  precio DECIMAL(12,2) DEFAULT 0,
  moneda_codigo VARCHAR(3),
  FOREIGN KEY (area_id) REFERENCES area_protegida(id) ON DELETE SET NULL,
  FOREIGN KEY (operador_id) REFERENCES operador(id) ON DELETE SET NULL,
  FOREIGN KEY (moneda_codigo) REFERENCES moneda(codigo) ON DELETE SET NULL
);

CREATE TABLE reserva (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  usuario_id BIGINT NOT NULL,
  guia_id BIGINT,
  area_id BIGINT,
  estado VARCHAR(20) DEFAULT 'pendiente',
  fecha_inicio DATETIME NOT NULL,
  fecha_fin DATETIME NOT NULL,
  adultos INT DEFAULT 1,
  ninos INT DEFAULT 0,
  notas TEXT,
  total DECIMAL(12,2) DEFAULT 0,
  moneda_codigo VARCHAR(3),
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE,
  FOREIGN KEY (guia_id) REFERENCES guia(id) ON DELETE SET NULL,
  FOREIGN KEY (area_id) REFERENCES area_protegida(id) ON DELETE SET NULL,
  FOREIGN KEY (moneda_codigo) REFERENCES moneda(codigo) ON DELETE SET NULL
);

CREATE TABLE detalle_reserva (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  reserva_id BIGINT NOT NULL,
  descripcion VARCHAR(255),
  cantidad INT DEFAULT 1,
  precio_unitario DECIMAL(12,2) DEFAULT 0,
  subtotal DECIMAL(12,2) GENERATED ALWAYS AS (cantidad * precio_unitario) STORED,
  FOREIGN KEY (reserva_id) REFERENCES reserva(id) ON DELETE CASCADE
);


CREATE INDEX idx_ciudad_nombre ON ciudad(nombre);
CREATE INDEX idx_area_protegida_nombre ON area_protegida(nombre);
CREATE INDEX idx_especie_ave_nombre ON especie_ave(nombre_comun_es, nombre_comun_en);

START TRANSACTION;

-- Datos base: país / región / ciudad
INSERT INTO pais (id, nombre, iso2, iso3) VALUES
  (1, 'Nicaragua', 'NI', 'NIC');

INSERT INTO region (id, pais_id, nombre) VALUES
  (1, 1, 'Managua');

INSERT INTO ciudad (id, region_id, nombre, lat, lon) VALUES
  (1, 1, 'Managua', 12.136389, -86.251389);

-- Idiomas y Monedas
INSERT INTO idioma (codigo, nombre) VALUES
  ('es', 'Español'),
  ('en', 'English');

INSERT INTO moneda (codigo, nombre, simbolo) VALUES
  ('NIO', 'Córdoba nicaragüense', 'C$'),
  ('USD', 'Dólar estadounidense', '$');

-- Usuarios y Roles
INSERT INTO usuario (id, correo, clave_hash, nombre_completo, telefono, pais_id, activo)
VALUES
  (1, 'usuario@example.com', '$2a$10$oNyuBzh0CwkLWhS6tyQ7KORi0HWtA6OVV0Oc6rSwRYpsrPQ7mqN8.', 'Ana Usuario', '+505 5555-0001', 1, TRUE),
  (2, 'guia@example.com',    '$2a$10$oNyuBzh0CwkLWhS6tyQ7KORi0HWtA6OVV0Oc6rSwRYpsrPQ7mqN8.', 'Bruno Guía',  '+505 5555-0002', 1, TRUE),
  (3, 'operador@example.com','$2a$10$oNyuBzh0CwkLWhS6tyQ7KORi0HWtA6OVV0Oc6rSwRYpsrPQ7mqN8.', 'Carla Operador', '+505 5555-0003', 1, TRUE);

-- Roles
INSERT INTO rol (id, nombre, descripcion) VALUES
  (1, 'ROLE_USUARIO', 'Usuario final de la plataforma'),
  (2, 'ROLE_GUIA', 'Guía de aviturismo'),
  (3, 'ROLE_OPERADOR', 'Operador turístico');

-- Asignación de roles
INSERT INTO usuario_rol (usuario_id, rol_id) VALUES
  (1, 1), -- Ana -> ROLE_USUARIO
  (2, 2), -- Bruno -> ROLE_GUIA
  (3, 3); -- Carla -> ROLE_OPERADOR

-- Operador y Guía
INSERT INTO operador (
  id, usuario_id, razon_social, nombre_comercial, ruc, telefono, correo, sitio_web,
  pais_id, ciudad_id, calificacion_prom, total_resenas
) VALUES
  (1, 3, 'Aves y Rutas S.A.', 'Aves&Rutas', 'J031234567', '+505 5555-1010', 'contacto@avesyrutas.com',
   'https://www.avesyrutas.com', 1, 1, 4.7, 23);

INSERT INTO guia (
  id, usuario_id, operador_id, biografia, anos_exp, calificacion_prom, total_resenas, certificado
) VALUES
  (1, 2, 1, 'Guía especializado en áreas protegidas del Pacífico de Nicaragua.', 5, 4.8, 15, TRUE);

-- Áreas protegidas
INSERT INTO area_protegida (
  id, nombre, categoria, descripcion, pais_id, region_id, ciudad_id, lat, lon, altitud_m, area_km2, sitio_web, habilitada
) VALUES
  (1, 'Reserva Natural Chocoyero-El Brujo', 'Reserva Natural',
   'Área protegida famosa por sus cascadas y aves como loras y tucanes.',
   1, 1, 1, 12.022500, -86.222500, 450, 1.88, 'https://www.marenicaragua.gob.ni', TRUE);

-- Estado de conservación
INSERT INTO estado_conservacion (id, codigo, nombre) VALUES
  (1, 'LC', 'Preocupación menor'),
  (2, 'NT', 'Casi amenazada');

-- Especies de aves (2)
INSERT INTO especie_ave (
  id, nombre_cientifico, nombre_comun_es, nombre_comun_en,
  orden, familia, genero, endemica, migratoria,
  longitud_cm, peso_g, estado_conservacion_id, descripcion_es, descripcion_en
) VALUES
  (1, 'Amazona auropalliata', 'Loro nuca amarilla', 'Yellow-naped Amazon',
   'Psittaciformes', 'Psittacidae', 'Amazona', FALSE, FALSE,
   38.00, 500.00, 2,
   'Loro de tamaño mediano con distintiva mancha amarilla en la nuca.',
   'Medium-sized parrot with a distinctive yellow nape patch.'),
  (2, 'Momotus momota', 'Guardabarranco', 'Amazonian motmot',
   'Coraciiformes', 'Momotidae', 'Momotus', FALSE, FALSE,
   34.00, 145.00, 1,
   'Ave icónica con raquetas en la cola y colores vivos; ave nacional de Nicaragua (variante local).',
   'Iconic motmot with racket-tipped tail and vivid colors; widely distributed in the Neotropics.');

-- Fotos (blob mínimo de ejemplo)
INSERT INTO foto (id, imagen, tipo, ave_id) VALUES
  (1, x'FFD8FFE000104A4649460001', 'image/jpeg', 1);

-- Distribución de aves por área
INSERT INTO distribucion_ave (especie_id, area_id, residencia, abundancia) VALUES
  (1, 1, 'residente', 'común'),
  (2, 1, 'residente', 'común');

-- Eventos (ejemplo futuro)
INSERT INTO evento (
  id, area_id, operador_id, tipo, titulo, descripcion,
  fecha_inicio, fecha_fin, precio, moneda_codigo
) VALUES
  (1, 1, 1, 'tour', 'Salidas de avistamiento al amanecer',
   'Recorrido guiado con enfoque en psitácidos y momótidos.',
   '2025-10-11 05:30:00', '2025-10-11 09:30:00', 850.00, 'NIO');

-- Reserva y detalle

INSERT INTO reserva (
  id, usuario_id, guia_id, area_id, estado, fecha_inicio, fecha_fin,
  adultos, ninos, notas, total, moneda_codigo
) VALUES
  (1, 1, 1, 1, 'confirmada', '2025-10-12 06:00:00', '2025-10-12 10:00:00',
   2, 0, 'Cliente prefiere sendero sombreado.', 1000.00, 'NIO');

INSERT INTO detalle_reserva (id, reserva_id, descripcion, cantidad, precio_unitario)
VALUES
  (1, 1, 'Entrada área protegida', 2, 150.00),
  (2, 1, 'Servicio de guía', 1, 700.00);

COMMIT;

