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
  operador_id BIGINT,
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
  FOREIGN KEY (operador_id) REFERENCES operador(id) ON DELETE SET NULL,
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
