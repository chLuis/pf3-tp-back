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
nombre VARCHAR(24) UNIQUE
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
(0, 'Sin descuento'),
(40, 'Navidad'),
(70, 'Black Friday'),
(40, 'Cyber Monday'),
(10, 'Producto Nuevo'),
(30, 'Proximo a vencer'),
(20, 'Fin de semana XL'),
(15, 'Promo especial');

CREATE TABLE IF NOT EXISTS productos (
id_producto INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
nombre varchar(80),
descripcion text,
precio int,
imagen int not null,
categoria int not null,
descuento int not null default 1,
stock INT DEFAULT 0 CHECK (stock >= 0),
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
monto INT NOT NULL,
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

DELIMITER //
CREATE PROCEDURE block_unblock(in  id_user CHAR(36))
BEGIN
	UPDATE gym_usuarios
    SET isBlocked = 
		CASE 
			WHEN isBlocked IS NULL THEN current_timestamp()
            ELSE NULL
		END
	WHERE id_usuario = id_user;
END;
//

-- --------------------------INSERCION DE DATOS --------------------------------

INSERT INTO gym_planes (nombre_plan) VALUES
('desafiliado'),
('básico'),
('premium'),
('exclusivo');

INSERT INTO gym_socios (nombre, apellido, dni, socio_hasta, id_plan) VALUES
('Luis', 'Chrestia', '32775182', '2025-07-15', 2),
('Agustin', 'Chazarreta Cruz', '42372443', '2025-07-20', 3);

INSERT INTO gym_usuarios_roles (rol) VALUES
('vendedor'),
('administrador'),
('superadmin');

INSERT INTO gym_usuarios (id_usuario, usuario, usuario_password, rol) VALUES 
(UUID(), 'admin', 'admin',  3),
(UUID(), 'luis', '123456', 2),
(UUID(), 'agustin', '123456', 2);


INSERT INTO productos_categorias (nombre) VALUES 
('discos'),
('aparatos'),
('accesorios'),
('proteinas'),
('equipamiento'),
('mancuernas'),
('pesa rusa'),
('bandas de resistencia'),
('colchonetas'),
('pesas tobilleras'),
('barras olímpicas'),
('step'),
('balones medicinales'),
('suplementos'),
('shakers'),
('toallas deportivas'),
('rodillos de espuma'),
('soportes y racks'),
('ropas deportivas'),
('zapatillas');

INSERT INTO productos_imagenes (url, nombre) VALUES 
('https://http2.mlstatic.com/D_NQ_NP_677596-MLA82746464539_022025-O.webp','mancuernas'),
('https://http2.mlstatic.com/D_Q_NP_2X_716216-MLA85933552345_062025-E.webp','pesa rusa 14kg'),
('https://http2.mlstatic.com/D_Q_NP_2X_870157-MLA81334742099_122024-E.webp','disco plastico 1kg rosa'),
('https://http2.mlstatic.com/D_Q_NP_2X_972384-MLA84650679055_052025-E.webp','accesorios poleas');