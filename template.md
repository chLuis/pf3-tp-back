-- ------- CREACION DE LA BASE DE DATOS Y SU ESTRUCTURA --------------------

CREATE DATABASE powerhouse_gym;
USE powerhouse_gym;

CREATE TABLE IF NOT EXISTS gym_planes (
id_plan int not null primary key auto_increment,
nombre_plan varchar(16)
);

CREATE TABLE IF NOT EXISTS gym_socios (
id_socio int not null primary key auto_increment,
nombre varchar(32),
apellido varchar(32),
dni char(8) not null unique,
socio_desde datetime default current_timestamp,
socio_hasta date,
id_plan int not null,
foreign key (id_plan) references gym_planes(id_plan)
);
 
CREATE TABLE IF NOT EXISTS productos_categorias (
id_categoria INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
nombre VARCHAR(24)
);

CREATE TABLE IF NOT EXISTS productos_imagenes (
id_imagen INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
url VARCHAR(255),
nombre VARCHAR(36)
);

CREATE TABLE IF NOT EXISTS productos_descuentos (
id_descuento INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
porcentaje INT NOT NULL,
motivo varchar(50)
);

INSERT INTO productos_descuentos (porcentaje, motivo) VALUES
(0, 'Sin descuento');

CREATE TABLE IF NOT EXISTS productos (
id_producto INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
nombre varchar(80),
descripcion text,
precio int,
imagen int not null,
categoria int not null,
descuento int not null default 1,
stock int default 0,
FOREIGN KEY (imagen) REFERENCES productos_imagenes(id_imagen),
FOREIGN KEY (categoria) REFERENCES productos_categorias(id_categoria),
FOREIGN KEY (descuento) REFERENCES productos_descuentos(id_descuento)
);

CREATE TABLE IF NOT EXISTS gym_usuarios_roles (
id_rol INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
rol VARCHAR(16)
);

CREATE TABLE IF NOT EXISTS gym_usuarios (
id_usuario CHAR(36) PRIMARY KEY NOT NULL UNIQUE,
usuario VARCHAR(100) NOT NULL UNIQUE,
usuario_password VARCHAR(16) NOT NULL,
rol INT NOT NULL,
isBlocked DATETIME DEFAULT NULL,
FOREIGN KEY (rol) REFERENCES gym_usuarios_roles(id_rol)
);

CREATE TABLE IF NOT EXISTS productos_ventas (
id_venta INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
id_producto INT NOT NULL,
id_usuario CHAR(36) NOT NULL,
cantidad INT NOT NULL,
createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (id_producto) REFERENCES productos(id_producto),
FOREIGN KEY (id_usuario) REFERENCES gym_usuarios(id_usuario)
);


-- ---------------------- CREACION DE PROCEDIMIENTOS -------------------------

DELIMITER //
CREATE PROCEDURE renovar_socio(IN socio INT, IN meses INT)
BEGIN
    UPDATE gym_socios
    SET 
		socio_hasta = DATE_ADD(socio_hasta, INTERVAL meses MONTH)
    WHERE id_socio = socio;
END;
//

-- --------------------------INSERCION DE DATOS --------------------------------

INSERT INTO gym_planes (nombre_plan) VALUES
('desafiliado'),
('básico'),
('premium'),
('exclusivo');

INSERT INTO gym_socios (nombre, apellido, dni, socio_hasta, id_plan) VALUES
('Luis', 'Chrestia', '32775182', '2025-06-15', 2);

INSERT INTO gym_usuarios_roles (rol) VALUES
('vendedor'),
('administrador'),
('superadmin');

INSERT INTO gym_usuarios (id_usuario, usuario, usuario_password, rol) VALUES 
(UUID(), 'admin', '123456',  3),
(UUID(), 'luis', '123456',  2);

INSERT INTO productos_imagenes (url, nombre) VALUES 
('https://http2.mlstatic.com/D_NQ_NP_677596-MLA82746464539_022025-O.webp','mancuernas'),
('https://http2.mlstatic.com/D_Q_NP_2X_716216-MLA85933552345_062025-E.webp','pesa rusa 14kg'),
('https://http2.mlstatic.com/D_Q_NP_2X_870157-MLA81334742099_122024-E.webp','disco plastico 1kg rosa'),
('https://http2.mlstatic.com/D_NQ_NP_804134-MLA86057134523_062025-O.webp','multigimnasio barra dominadas'),
('https://http2.mlstatic.com/D_Q_NP_2X_972384-MLA84650679055_052025-E.webp','accesorios poleas');

INSERT INTO productos_categorias (nombre) VALUES 
('discos'),
('aparatos'),
('accesorios'),
('proteinas'),
('equipamiento'),
('mancuernas'),
('pesa rusa');

INSERT INTO productos (nombre, descripcion, precio, imagen, categoria, stock) VALUES
('Kit Mancuernas Macizas A Rosca + 20 Kg En 8 Discos De 2.5 Kgs', 'KIT INCLUYE: -2 UNIDADES de Mancuerna A Rosca 35 CM Acero Cromado con Mango ABS 30 MM -20 KGs de PESO EN Discos 8 de 2.5 Kgs', 54320, 1, 6, 10),
('Pesa Rusa O Kettlebell 14 Kg Pvc Funcional Gym Gimnasio Color Negro', 'Pesa Rusa O Kettlebell 14 Kg Pvc Funcional Crossfit. Está fabricada en PVC suave de alta calidad y su interior está compuesto por fina granalla de acero.' , 36695, 2, 7, 20),
('Combo Accesorios Para Polea Soga- Estribos - barra Corta Gmp','Marca GMP', 96965, 5, 3 , 30),
('Disco Plástico De 1 Kg Pesas Gimnasio Manija Acanalado Gym Color Rosa', 'DISCO 1 KG DE PVC ACANALADO CON AGARRE', 6499, 3 , 1, 40),
('Maquina multigimnasio barra dominadas', 'Jaula de hierro para realizar multiples ejercicios, dominadas, fondos, etc', 617960, 4, 2, 50);

-- EJEMPLOS DE CONSULTAS

select * from gym_usuarios;

SELECT usuarios.id_usuario, usuarios.usuario, usuarios.usuario_password, roles.rol FROM gym_usuarios usuarios
JOIN gym_usuarios_roles roles ON usuarios.rol = roles.id_rol;




SELECT p.id_producto,p.nombre,p.descripcion,p.precio,p.stock,p.imagen as id_imagen,i.url,p.categoria as id_categoria,c.nombre as categoria, p.descuento as id_descuento, d.porcentaje as descuento, d.motivo as descuento_motivo
FROM productos p
JOIN productos_categorias c ON p.categoria = c.id_categoria
JOIN productos_imagenes i ON p.imagen = i.id_imagen
JOIN productos_descuentos d ON p.descuento = d.id_descuento;


SELECT  s.id_socio,
              s.nombre,
              s.apellido,
              s.dni,
              s.socio_desde,
              SUBSTRING(s.socio_hasta, 1, 2),
              p.id_plan,
              p.nombre_plan
      FROM gym_socios s
      JOIN gym_planes p ON s.id_plan = p.id_plan;
