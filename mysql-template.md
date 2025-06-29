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
('Agustin', 'Chazarreta Cruz', '42372443', '2025-07-20', 3),
('Samuel', 'Lapetina', '45443121', '2025-08-12', 1),
('María', 'González', '38411234', '2025-09-01', 2),
('Juan', 'Pérez', '40567890', '2025-07-30', 1),
('Laura', 'Martínez', '39765432', '2025-08-15', 3),
('Pedro', 'Ramírez', '37654321', '2025-09-20', 2),
('Ana', 'López', '38678901', '2025-07-25', 1),
('Carlos', 'Fernández', '35671234', '2025-08-10', 3),
('Lucía', 'Díaz', '42789123', '2025-09-05', 2),
('Martín', 'Sánchez', '39671245', '2025-07-18', 1),
('Julieta', 'Herrera', '41765438', '2025-08-22', 2),
('Santiago', 'Gómez', '40789101', '2025-09-12', 3),
('Camila', 'Navarro', '38765422', '2025-07-29', 2),
('Franco', 'Molina', '42678910', '2025-08-18', 1),
('Valentina', 'Silva', '39567892', '2025-09-08', 2),
('Joaquín', 'Torres', '36543218', '2025-08-03', 3),
('Florencia', 'Acosta', '41567823', '2025-07-26', 1),
('Matías', 'Luna', '37789100', '2025-08-27', 2),
('Brenda', 'Vega', '38765430', '2025-09-03', 3),
('Ignacio', 'Moreno', '42671239', '2025-08-07', 1),
('Paula', 'Paz', '39671222', '2025-09-01', 2),
('Diego', 'Cruz', '38678945', '2025-07-31', 3),
('Natalia', 'Ibarra', '40761234', '2025-08-21', 2),
('Tomás', 'Ruiz', '41789456', '2025-09-10', 1),
('Emilia', 'Benítez', '39781234', '2025-08-30', 3);


INSERT INTO gym_usuarios_roles (rol) VALUES
('vendedor'),
('administrador'),
('superadmin');

INSERT INTO gym_usuarios (id_usuario, usuario, usuario_password, rol) VALUES 
(UUID(), 'admin', 'admin',  3),
(UUID(), 'luis', '123456', 2),
(UUID(), 'agustin', '123456', 2),
(UUID(), 'sofia', 'pass123', 1),
(UUID(), 'marcos', 'clave456', 2),
(UUID(), 'valen', 'gym2024', 1),
(UUID(), 'pablo', 'testpass', 2),
(UUID(), 'camila', 'abc123', 1),
(UUID(), 'federico', 'mypassword', 2),
(UUID(), 'luciana', 'pass789', 1),
(UUID(), 'nicolas', 'mi1234', 2),
(UUID(), 'florencia', 'clave321', 1),
(UUID(), 'mati', 'securepwd', 2),
(UUID(), 'emilia', 'hola123', 1),
(UUID(), 'tomas', 'asd456', 2),
(UUID(), 'julieta', 'pepe789', 1),
(UUID(), 'juanma', 'gymuser', 2),
(UUID(), 'rocio', 'easy123', 1);

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

INSERT INTO productos_imagenes (nombre, url) VALUES 
('mancuernas', 'https://http2.mlstatic.com/D_NQ_NP_677596-MLA82746464539_022025-O.webp'),
('pesa rusa 12kg', 'https://http2.mlstatic.com/D_Q_NP_2X_716216-MLA85933552345_062025-E.webp'), 
('disco plastico 1kg rosa', 'https://http2.mlstatic.com/D_Q_NP_2X_870157-MLA81334742099_122024-E.webp'), 
('accesorios poleas', 'https://http2.mlstatic.com/D_Q_NP_2X_972384-MLA84650679055_052025-E.webp'), 
('Zapatillas Topper Rosa', 'https://http2.mlstatic.com/D_NQ_NP_2X_921580-MLA76650874377_052024-F.webp'), 
('Zapatillas Adidas Azules', 'https://http2.mlstatic.com/D_NQ_NP_945044-MLA86397736675_062025-O.webp'), 
('Zapatillas adidas negras', 'https://http2.mlstatic.com/D_NQ_NP_962775-MLA84754773659_052025-O.webp'), 
('Toallas deportivas', 'https://http2.mlstatic.com/D_NQ_NP_992607-MLA79631977092_102024-O.webp'), 
('Secado rapido', 'https://http2.mlstatic.com/D_NQ_NP_754996-MLA82713703067_022025-O.webp'), 
('Toalla y toallon', 'https://http2.mlstatic.com/D_NQ_NP_832890-MLA72493125570_102023-O.webp'), 
('Carnitina', 'https://http2.mlstatic.com/D_NQ_NP_604669-MLA84499546615_052025-O.webp'), 
('Proteina ENA', 'https://http2.mlstatic.com/D_NQ_NP_950650-MLA79948222221_102024-O.webp'), 
('Acido Ascorbico', 'https://http2.mlstatic.com/D_NQ_NP_684909-MLA49055841992_022022-O.webp'), 
('Step fitness', 'https://http2.mlstatic.com/D_NQ_NP_740818-MLA43815097213_102020-O.webp'), 
('Step funcional', 'https://http2.mlstatic.com/D_NQ_NP_611501-MLA78015612768_082024-O.webp'), 
('Step aerobico', 'https://http2.mlstatic.com/D_NQ_NP_652033-MLA84781332068_052025-O.webp'), 
('Soporte barra olimpica', 'https://http2.mlstatic.com/D_NQ_NP_636755-MLA75920331337_042024-O.webp'), 
('Porta barras', 'https://http2.mlstatic.com/D_NQ_NP_884293-MLA52069840806_102022-O.webp'), 
('Mancuernero', 'https://http2.mlstatic.com/D_NQ_NP_691740-MLA69239615700_052023-O.webp'), 
('Vaso Voltrx', 'https://http2.mlstatic.com/D_NQ_NP_616950-MLA83335730396_042025-O.webp'), 
('Vaso Everlast', 'https://http2.mlstatic.com/D_NQ_NP_716607-MLA75581615583_042024-O.webp'), 
('Vaso Reebok', 'https://http2.mlstatic.com/D_NQ_NP_2X_610608-MLA82737031188_032025-F.webp'), 
('Conjunto negro', 'https://http2.mlstatic.com/D_NQ_NP_704071-MLA84519252715_052025-O.webp'), 
('Musculosa', 'https://http2.mlstatic.com/D_NQ_NP_765737-MLA84698381953_052025-O.webp'), 
('Short', 'https://http2.mlstatic.com/D_NQ_NP_693879-MLA86044112886_062025-O.webp'), 
('Rodillo morado', 'https://http2.mlstatic.com/D_NQ_NP_941780-MLA54248311480_032023-O.webp'), 
('Rodillo goma', 'https://http2.mlstatic.com/D_NQ_NP_793393-MLA49315425158_032022-O.webp'), 
('Rodillo negro', 'https://http2.mlstatic.com/D_NQ_NP_894061-MLA82962392848_032025-O.webp'), 
('Prote nutrilab', 'https://http2.mlstatic.com/D_NQ_NP_988690-MLA83862660186_042025-O.webp'), 
('Fortisip', 'https://http2.mlstatic.com/D_NQ_NP_619911-MLA79831485429_102024-O.webp'), 
('Proteina HardCore', 'https://http2.mlstatic.com/D_NQ_NP_979957-MLA74677371551_022024-O.webp'), 
('Combo 4 pesas', 'https://http2.mlstatic.com/D_NQ_NP_756899-MLA84553423492_052025-O.webp'), 
('Tobillera con peso', 'https://http2.mlstatic.com/D_NQ_NP_847970-MLA84546959364_052025-O.webp'), 
('Pesa T Roja', 'https://http2.mlstatic.com/D_NQ_NP_728991-MLA53271987035_012023-O.webp'), 
('3 Pesas rusas', 'https://http2.mlstatic.com/D_NQ_NP_765923-MLA69532002818_052023-O.webp'), 
('2 Pesas rusas', 'https://http2.mlstatic.com/D_NQ_NP_931890-MLA80807908676_112024-O.webp'), 
('Par mancuernas', 'https://http2.mlstatic.com/D_NQ_NP_611183-MLA48463144023_122021-O.webp'), 
('Mancuerna engomada', 'https://http2.mlstatic.com/D_NQ_NP_778634-MLA44317833045_122020-O.webp'), 
('Banco inclinado', 'https://http2.mlstatic.com/D_NQ_NP_646754-MLA73551453496_122023-O.webp'), 
('Maquina biceps', 'https://http2.mlstatic.com/D_NQ_NP_955965-MLA73824850902_012024-O.webp'), 
('Banco abdominales', 'https://http2.mlstatic.com/D_NQ_NP_659003-MLA82735887483_022025-O.webp'), 
('Combo discos', 'https://http2.mlstatic.com/D_NQ_NP_797602-MLU75530311414_042024-O.webp'), 
('Disco pesa', 'https://http2.mlstatic.com/D_NQ_NP_662010-MLA84836549131_052025-O.webp'), 
('Colchoneta negra', 'https://http2.mlstatic.com/D_NQ_NP_896370-MLA84836068213_052025-O.webp'), 
('Colchoneta goma', 'https://http2.mlstatic.com/D_NQ_NP_818501-MLA49500089383_032022-O.webp'), 
('Set colchonetas', 'https://http2.mlstatic.com/D_NQ_NP_713771-MLA49024686943_022022-O.webp'), 
('Barra EZ', 'https://http2.mlstatic.com/D_NQ_NP_984657-MLA81686093420_012025-O.webp'), 
('Barra curva', 'https://http2.mlstatic.com/D_NQ_NP_961642-MLA81957947536_022025-O.webp'), 
('Set 4 barras', 'https://http2.mlstatic.com/D_NQ_NP_886648-MLA84849924677_052025-O.webp'), 
('Bandas', 'https://http2.mlstatic.com/D_NQ_NP_808158-MLA84246816360_052025-O.webp'), 
('Banda de alta resistencia', 'https://http2.mlstatic.com/D_NQ_NP_2X_958780-MLA76049359430_052024-F.webp'), 
('Banda verde', 'https://http2.mlstatic.com/D_NQ_NP_797078-MLA84552513524_052025-O.webp'), 
('Set 3 pelotas', 'https://http2.mlstatic.com/D_NQ_NP_840113-MLA84738105106_052025-O.webp'), 
('Pelota 5kg', 'https://http2.mlstatic.com/D_NQ_NP_634774-MLA77707735254_072024-O.webp'), 
('Pelota 3kg', 'https://http2.mlstatic.com/D_NQ_NP_928629-MLA44164938372_112020-O.webp'), 
('Sillon cuadriceps', 'https://http2.mlstatic.com/D_NQ_NP_850073-MLA69591692013_052023-O.webp'), 
('Maquina gluteos', 'https://http2.mlstatic.com/D_NQ_NP_775311-MLU71573357822_092023-O.webp'), 
('Asiento', 'https://http2.mlstatic.com/D_NQ_NP_996712-MLA52333814338_112022-O.webp'), 
('Soga jalon', 'https://http2.mlstatic.com/D_NQ_NP_686069-MLU75526021345_042024-O.webp'), 
('Estribo', 'https://http2.mlstatic.com/D_NQ_NP_938812-MLA84551630210_052025-O.webp');

INSERT INTO productos (nombre, descripcion, precio, imagen, categoria, descuento, stock) VALUES
('Zapatilla Topper Wind 5 Rosa Blush/rosa Misty','combina look tradicional con líneas de diseño; permite lucirte y tener un mayor confort a la hora de correr. CAPELLADA: Entera de mesh, con refuerzos en puntera, caña y talonera para mayor estabilidad y durabilidad. Serigrafía y frecuencia a lo largo del calzado para mayor visibilidad. SUELA: Entresuela de EVA para reducir la presión y mejorar la absorción del impacto. Insertos de goma resistentes a la abrasión y adherente a todas las superficies.',64899,5,20,1,10),
('Zapatillas Adidas Running Response Runner Unisex Azul Jq2541','Ya sea para completar una serie de vueltas suave o para lograr tu mejor marca personal, estas zapatillas de running adidas te ofrecen la sujeción que necesitás para cumplir tus objetivos. La mediasuela de EVA ofrece comodidad y amortiguación, mientras que la suela de gran agarre mantiene tu ritmo estable. Su diseño versátil se adapta a la perfección a tus actividades del día a día.\n\nEste producto contiene al menos un 20 % de material reciclado. Utilizando materiales reciclados disminuimos los residuos, nuestra dependencia de los recursos finitos y la huella que generan los productos que fabricamos.\n',69999,6,20,1,2),
('Zapatillas De Senderismo Terrex Anylander Rain.rdy Id0901 Ad','Viajá Recorré. Explorá. Ponete estas zapatillas de senderismo adidas Terrex y explorá los senderos de montaña en condiciones secas o mojadas. El corte medio ofrece soporte en el tobillo y la mediasuela acolchada te brinda confort duradero. La tecnología RAIN.RDY trabaja con una lengüeta reforzada para mantener el mal tiempo en el exterior y tus pies secos y cómodos en condiciones húmedas. Diseñadas para durar todo el recorrido, incorporan una suela Traxion para un agarre insuperable.\n\nAl elegir materiales reciclados, podemos dar nueva vida a materiales que ya se han utilizado, lo cual nos ayuda a reducir los residuos. La utilización de materiales renovables nos ayudará a eliminar nuestra dependencia de los recursos finitos. Nuestros productos hechos con una mezcla de materiales reciclados y renovables contienen al menos un 20 % de este material.',129999,7,20,1,20),
('Toalla Arco Iris Fitness Deportes 30 X 90cm Turquesa','TOALLA FITNESS 30 cm x 90 cm\n\n100 % ALGODÓN\nCOMPACTA-LIVIANA-SUPER ABSORBENTE Y DE FIBRA NATURAL\nMáximo confort y comodidad a la hora del gym.',5864,8,16,1,12),
('Toalla Toallon Secado Rapido Deportivo De Microfibra 130x80','Toallón secado rápido** Medida: 130x80cm\n\nLOS COLORES DEBEN SER ELEGIDOS EN EL MOMENTO EN QUE SE REALIZA LA COMPRA, UTILIZANDO LA OPCION DE CARRITO. LUEGO NO SE PODRAN MODIFICAR.\n\nTENEMOS EL MEJOR PRECIO, SOMOS\nIMPORTADORES DIRECTO.\n\nCOLORES DISPONIBLES:\nAQUA - AZUL - ROJO SUAVE - GRIS - ROSA - VERDE MANZANA',10000,9,16,8,15),
('Toalla Y Toallón Arco Iris Deporte Gimnasia Natación Fitness','Una línea especialmente diseñada para el gimnasio, con excelentes medidas y que ocupa poquísimo lugar en el bolso. Un toallón extra large y una toalla con un formato ideal para el cuello se vuelven un dúo infaltable en el entrenamiento diario. Pura practicidad y tecnología en materia textil.\n\nEl set se compone de una toalla de cara de 30 x 90 cm y otra de baño de 80 x 150cm.\n\n- Medidas del producto:\nToalla: 30 x 90\nToallón: 80 x 150\nMaterial: 100% Algodón',16999,10,16,1,1),
('Suplemento En Cápsulas Xtrenght Nutrition L-carnitina Sabor Neutro En Pote 90 ca','Una nutrición balanceada juega un papel fundamental en la calidad de vida. Con el ritmo acelerado que llevan muchas personas, a veces resulta complejo prestar atención a todos los requerimientos que el cuerpo necesita para estar sano y fuerte. En ese sentido, los suplementos cumplen la función de complementar la alimentación y ayudan a obtener las vitaminas, minerales, proteínas y otros componentes indispensables para el correcto funcionamiento del organismo.\n\nSuplemento deportivo\nEste tipo de suplemento ayuda a complementar la alimentación de personas con objetivos o requerimientos nutricionales específicos. Su consumo puede ser indicado por diversos factores, como la duración y la intensidad de la actividad física, el tipo de deporte, el ambiente en el que se practica, la edad, la composición corporal, el peso, entre otros. Es importante resaltar que su uso debe estar acompañado por una alimentación equilibrada y hábitos de vida saludable.\n\nAyuda al metabolismo del cuerpo\nLa carnitina es un componente que colabora en el metabolismo de los lípidos y promueve el uso de los ácidos grasos para obtener más energía. Sus principales beneficios son: ayudar a generar masa muscular, prevenir la pérdida de masa ósea y reducir el colesterol.',13400,11,14,1,24),
('Suplemento en polvo ENA Sport True Made proteínas sabor double rich chocolate en','La misión de ENA Sport es ayudar a los atletas a alcanzar sus objetivos, en todas las etapas de su vida deportiva. Desde hace más de 30 años ENA Sport fue creciendo hasta convertirse en una de las marcas líderes en el mercado argentino de suplementos e incluso exporta a otros países de Latinoamérica.\n\n\nTRUEMADE contiene un blend de máxima pureza con una rápida absorción y una excelente calidad, garantizando una efectiva y rápida recuperación del tejido muscular:\n\n- Whey protein concentrate (WPC): perfil completo de aminoácidos esenciales, brindando la mejor calidad de proteínas para aumentar la energía durante el entrenamiento.\n\n- Whey Protein Isolate (WPI): máxima pureza. Bajo en carbohidratos, grasas y fácil de digerir logrando una mayor absorción de la proteína.\n\nFuente rápida de energía\nLa principal función de las proteínas es contribuir con la regeneración muscular. Es por esto que los suplementos proteicos suelen ser utilizados en ciertas circunstancias, por ejemplo ante el aumento de la intensidad del ejercicio, la recuperación luego de una lesión o para complementar la alimentación de personas veganas y vegetarianas. Algunos de los beneficios son: su consumo fácil, su bajo contenido en azúcares y grasas y la posible reducción del apetito.',44999,12,14,1,40),
('Suplemento en polvo Natural Whey Premium Vitamina C x 500g','Descubre la Vitamina C Ácido Ascórbico en polvo, un suplemento de alta calidad presentado en un práctico envase Doy Pack de alta densidad. Este producto, de la reconocida marca Natural Whey Suplementos, es ideal para la industria de jugos y la elaboración de suplementos multivitamínicos. Su formulación pura, sin lactosa y libre de gluten, lo convierte en una opción perfecta para quienes buscan un estilo de vida saludable y vegano. Además, es especialmente recomendado para potenciar los efectos de los suplementos de colágeno. Con un peso neto de 500 g y un volumen de 500 mL, este polvo blanco de sabor levemente ácido es fácil de incorporar en tu dieta diaria. A partir de los 18 años, puedes disfrutar de sus beneficios nutricionales, asegurando una ingesta adecuada de vitamina C para fortalecer tu sistema inmunológico y mejorar tu bienestar general.\n\nAviso legal\n• Edad mínima recomendada: 18 años.\n• Este producto es un suplemento dietario, no es un medicamento. Suplementa dietas insuficientes. Consulte a su médico y/o farmacéutico.',14000,13,14,1,6),
('Step Fitness Plataforma Escalon Aerobic 4 Módulos Gratis Gmp','Este step es la herramienta ideal para mantenerte en forma\nMejora el entrenamiento cardiovascular\nTe ayuda a perder peso y al desarrollo de la musculatura, ya que podes hacer ejercicios para trabajar caderas, glúteos y muslos.\nAl ser compacto, es muy sencillo de trasladar y guardar\n\nConstrucción estable\nAhorra espacio y se guarda rápidamente\nRevestimiento de goma antideslizante en la superficie de step\nEn superficies lisas, se recomienda utilizar una esterilla antideslizante debajo\nPuede regular, según lo desee, la superficie de apoyo en dos posiciones de altura distintas, para adaptarla a la posición más adecuada para cada tipo de ejercicio y grado de dificultad .\n\nDatos técnicos:\nLongitud: 78 cm\nAncho: 29 cm\nAltura regulable de 10 a 20cm',65993,14,12,5,50),
('Step Para Entrenamiento Funcional','El step o escalón principalmente se asocia con beneficios cardiovasculares y musculares, aunque gracias a las subidas y bajadas que se realizan sobre él, también se le atribuye la mejora de la resistencia aeróbica, la fuerza física y la flexibilidad corporal.\n\nSu material es PVC de primera calidad, sus medidas son de 37cm de largo por 27cm de ancho y 13 cm de alto. Es de una sola pieza, no se le puede agregar módulos. En su superficie cuenta con textura que evita resbaladas o caídas. Soporta hasta 150kg, no ralla el piso, no se resbala y no se rompe.\nEs un artículo muy cómodo y práctico ya que es liviano y apilable lo cual permite poder guardarlo en tu sala y que ocupen el menor espacio posible.\nViene unicamente en color negro.\n\nVERA DEPORTES es tu mejor opción para comprar productos deportivos de calidad y al mejor precio. Contamos con dos locales a la calle en el centro de Ramos Mejía y en Palermo con más de 400 artículos diferentes, para que elijas el que más se adapte a tus necesidades y gustos.\n\nComprar en VERA DEPORTES es fácil y seguro. Aceptamos todos los medios de pago y hacemos envíos gratis a CABA y GBA en el día si compras antes de las 15 hs.\n\nTambién vendemos al por mayor con descuentos especiales.\nTodos nuestros productos tienen garantía y salen con factura A o B, con los datos que son cargados en su cuenta y se adjunta minutos posteriores a su compra.',13950,15,12,1,20),
('Step Aerobico Junior Gimnasia Fitness Con 2 Modulos','HIGH PERFORMANCE - LOMAS DE ZAMORA.\nIMPORTADOR DIRECTO.\n\nStep Aerobico Junior Gimnasia Fitness Con 2 Modulos\n\nDescripcion: Step Aerobico Junior Gimnasia Fitness Con 2 Modulos\n\nMATERIAL: PVC\n\nMEDIDAS:\n\nLARGO: 73CM\nANCHO: 37CM\nALTO SIN MODULOS: 11CM\nALTO CON MODULOS: 16CM',35250,16,12,1,13),
('Soporte Rack Porta Barra Olímpica Pared Gimnasio Gym X1','SOPORTE RACK PORTA BARRA GIMNASIO GYM CROSSFIT FUNCIONAL\nSOPORTE PARA BARRAS OLIMPICAS DE PARED DE ACERO SUPER RESISTENTE\n\n- El estante para barras está rociado con una capa mate antioxidante y viene con una almohadilla de goma para proteger tu revestimiento de barras.\n\n- El espacio entre las puntas es de 32 mm. Compatible con barras estándar u olímpicas con diámetro de 25 a 28 mm o muchas otras barras con un diámetro de 32 mm.\n\n- Un soporte de barra montado en la pared puede ahorrar eficazmente más espacio y almacenar tu equipo de fitness ordenado.\n\n- Multiusos para colgar barras olímpicas, barras de rizo, cadenas, banda de resistencia, cuerdas de saltar y otros equipos de entrenamiento.\n\nENVIO GRATIS A TODO EL PAIS\n\nSOMOS FABRICANTES - VENTAS MAYORISTAS',23180,17,18,1,16),
('Soporte Rack Porta Barra Olímpica Pared Gimnasio Gym X5','SOPORTE RACK PORTA BARRA GIMNASIO GYM CROSSFIT FUNCIONAL\nSOPORTE PARA BARRAS OLIMPICAS DE PARED DE ACERO SUPER RESISTENTE\n\nCARACTERISTICAS\nCapacidad: 5 Barras Olímpicas\nAltura: 60 cm\nTerminación: Pintura Epoxi al horno máxima calidad\nEspesor acero: 3,2 mm\n\nEL PRECIO INCLUYE 2 FIJACIONES A LA PARED PARA 5 BARRAS OLIMPICAS\n\n*ENVIO GRATIS A TODO EL PAIS*\n\nSOMOS FABRICANTES - VENTAS MAYORISTAS',56700,18,18,1,5),
('Mancuernero Gimnasios Porta Mancuernas Hexagonales Genetic','Bienvenido y Gracias por Visitar Nuestra Tienda.\nSomos Mercado Líder con Mayor Trayectoria en Mercado Libre N° 1 en venta de Suplementos Naturales y Artículos de Fitness desde 1999.\nNos enfocamos en que recibas la mejor calidad en suplementos al mejor precio del mercado y hacerlo llegar hasta vos, no importa el lugar del país en que te encuentres.\n\nMANCUERNERO 2 NIVELES GENETIC PRO.\n\nDiseñado en 2 pisos ideal gimnasios.\nPintado en negro y amarilllo.\nHecha en caño estructural 50x50x2,5 mm.\nSoldado semiautomático.\nPintura electrostática epoxi.\nColores a elección y combinada a 2 tonos.\n\nLARGO: 170 centímetros\nALTO: 70 centímetros\nPROFUNDIDAD: 65 centímetros\nCAPACIDAD: 12 - 14 pares de mancuernas\nSEPARACION ENTRE RIELES: 15 centímetros\nPESO: 35 kilogramos\n\nBiomecánicamente testeado por Mauricio Mac Donald, 30 años en experiencia en gimnasios y Múltiple Campeón Internacional de Físico Culturismo.',895500,19,18,8,4),
('Botella Mezcladora Shaker Voltrx Gallium','Somos VOLTRX.AR los distribuidores oficiales de VOLTRX en Argentina, la marca internacional líder en botellas mezcladoras eléctricas.\n\nAhora podés disfrutar de la experiencia VOLTRX Gallium, el modelo más buscado del mundo, sin esperar envíos del exterior.\n\nMezcla en solo 15 segundos\n\nMotor de 6000 rpm que disuelve la proteína a la perfección. Sin grumos, sin cucharita.\n\nTecnología silenciosa\nPotente, pero sin hacer ruido molesto como las batidoras comunes.\n\nMaterial premium Tritan (sin BPA)\nResistente, transparente y seguro para tu salud.\n\nBatería de larga duración\nHasta 2 meses de uso con una sola carga (vía USB-C).\n\nFácil de limpiar\nBase impermeable + anillos desmontables. Listo en segundos.\n\nCierre hermético a rosca\nSin derrames. Llevá tu shaker a donde quieras.\n\nDiseño portátil y cómodo\nCon mango lateral, ideal para el gym o donde entrenes.\n\nEstilo y sustentabilidad\nDiseño cuidado, materiales responsables, empaques reciclables.\n\nIncluye:\n1x Botella VOLTRX Gallium (600 ml)\n\n1x Cable USB-C',76500,20,15,1,10),
('Vaso Shaker Everlast Mezclador Hermetico Batido Proteinas','VASO SHAKER x 450 ml PARA BATIDOS DE SUPLEMENTOS CON MEZCLADOR DE ACERO INOXIDABLE ANTI GRUMOS EVERLAST ORIGINAL. IDEAL PARA USO DIARIO, GYM, DEPORTES EN GENERAL.\n\nTienda Oficial SINGULAR STORE\nNos destacamos por RAPIDEZ Y EFICIENCIA en las ENTREGAS.\nProductos 100% ORIGINALES de CALIDAD COMPROBADA.\nMiembro de la Cámara Argentina de Comercio Electrónico (CACE)\n\nIMPORTANTE: utiliza la opción del carrito de compras, suma más de nuestros productos a la misma, llega a $33000 y así ¡ AHORRA EN EL ENVÍO !\nCARACTERÍSTICAS:\n\n- Vaso Shaker Everlast con mezclador\n- Capacidad 450 ml\n- Espacio para proteinas\n- Pastillero\n- Espacio extra\n- Resorte de Acero Inoxidable AISI304 para disolver grumos\n- Medidas: 26 cm x 10 cm\n\n- Contenido de la compra:\n1 (un) vaso shaker Everlast del color elegido al realizar la compra\n',13999,21,15,1,25),
('Botella Shaker Reebok 650ml Con Pulsador Y Asa De Silicona Color Celeste','Botella Shaker Reebok 650ml con Pulsador y Asa de Silicona\n\nLa Botella Shaker Reebok de 650ml es la opción ideal para quienes buscan combinar funcionalidad y estilo en su día a día, tanto para entrenamientos como para el uso diario.\n\nCaracterísticas destacadas:\n\n- Capacidad de 650ml para mantenerte hidratado durante el entrenamiento o la jornada.\n- Sistema con pulsador, que facilita la apertura rápida y segura de la tapa.\n- Asa de silicona, cómoda para transportar y colgar en mochilas o bolsos.\n- Shaker incluido, ideal para mezclar proteínas, batidos o bebidas energéticas de forma homogénea.\n- Indicador de mililitros, práctico para medir líquidos y controlar tu consumo de agua.\n- Material resistente y libre de BPA, que garantiza durabilidad y seguridad.\n- Diseño ergonómico con formato moderno y deportivo.\n- Incluye packaging original, lo que lo hace una excelente opción para obsequios.\n\nLa Botella Shaker Reebok es perfecta para deportistas, estudiantes y profesionales que necesitan una hidratación eficiente y fácil de transportar, acompañando un estilo de vida activo y saludable.',22799,22,15,1,9),
('Conjunto Wv Men Trng Negro','Conjunto con campera combinada en tela lisa y melange. Campera con capucha, recorte desde el cuello hasta el codo y bolsillos laterales. Pantalón slim con recorte en el lateral, bolsillos, cordón de ajuste en la cintura y elástico en el ruedo. Prenda sin forrería. Logos en ambas prendas.',99999,23,19,1,4),
('Musculosa Deportiva Hombre Basica Lisa Verano Algodón','Mood Factory es tu socio ideal en la creación de ropa de alta calidad. Nos especializamos en la fabricación y venta de prendas diseñadas para ofrecer comodidad, estilo y durabilidad. En Mood Factory, nuestro compromiso es proporcionar ropa que se adapta a cada ocasión, combinando innovación y excelencia en cada detalle. Descubre la diferencia de vestir con una marca que pone la calidad y tu satisfacción en el centro de todo lo que hacemos.\n\nSOLO TALLE L',12340,24,19,1,10),
('Shorts Cargo Terrex Xploric Je9420 Adidas','Estos shorts de senderismo adidas Terrex están diseñados para acompañarte en tus recorridos diarios o en tus aventuras por los senderos de montaña. El corte holgado combinado con el tejido ligero y elástico ofrece un rango completo de movimiento, y los bolsillos cargo añaden utilidad dentro y fuera de los senderos.\n\nEste producto está hecho con al menos un 70 % de materiales reciclados. Utilizando materiales reciclados disminuimos los residuos, nuestra dependencia de los recursos finitos y la huella que generan los productos que fabricamos.\n\nDetalles\n\n. Ajuste holgado\n\n. Cintura elástica con cordón ajustable\n\n. 93 % poliamida (reciclada), 7 % elastano\n\n. Bolsillos laterales\n\n. Bolsillos cargo\n\n. Factor de Protección Ultravioleta (UPF)',69999,25,19,1,7),
('Rodillo Rolo Yoga Pilates Rollo Roller Foam Masajes - 45 Cm','Aunque hacer ejercicio sea algo bueno para la salud en general, los dolores musculares a veces son inevitables.\n\nExisten muchas opciones para calmarlos y una es con este rodillo masajeador de espuma, cuyo formato ayuda a promover la circulación de la sangre y, de esta manera, aliviar dolor de piernas, espalda, cintura, cadera, pies y brazos.\n\n\nSe recomienda para:\n\nAliviar la tensión muscular.\nDisminuir la fatiga muscular.\nMejorar el rendimiento muscular y su flexibilidad.\n\nEspecificaciones:\n\nMaterial: ABS, EVA.\nTamaño: 45 x 14 cm.\n\n\nModo de uso:\n\nColocar el rodillo en la zona deseada, acostarse sobre él y desplazarse en sentido arriba-abajo sobre el producto.',18990,26,17,1,6),
('Rodillo Goma Multigym Alta Densidad 18 Cm Forrado Servicegym','EL RODILLO MAS PROLIJO Y DURADERO DE MERCADO LIBRE !!!!\nNUMERO UNO EN VENTAS POR SU CALIDAD\n\n1 (uno) RODILLO FORRADO EN CUERO PU ALTA RESISTENCIA\nCOLOR NEGRO O ROJO\nATENCION : USAMOS TELA PU AUTOMOTOR QUE ES MUCHO MAS RESISTENTE Y DURADERA\n\nEl valor es por UNIDAD\n\nAlto 18 cm - Diámetro Externo 13 cm - Diámetro interno, 2,50 cm va para 30 mm también\n\nCalidad Original para Aparatos de Multigimnasio del hogar y profesional\n\n',21920,27,17,1,10),
('Rodillo Rolo Yoga Pilates Gym 33 Cm Rollo Eva Masajes Color Negro','El Rodillo Rolo Yoga Pilates Gym de Kogu es la herramienta ideal para quienes buscan mejorar su bienestar físico y mental. Con un diseño de 34 cm de largo y 14 cm de diámetro, este producto está fabricado en EVA de alta densidad, un material compacto y firme que garantiza una durabilidad excepcional y un soporte adecuado para ejercicios de diversas intensidades.\n\nEste rodillo es perfecto para practicar yoga, pilates y realizar masajes, así como para ejercicios pre y post gimnasio. Su textura especial permite una mejor adherencia y un masaje más efectivo, ayudando a liberar la tensión muscular y mejorar la circulación sanguínea.\n\nCon un peso de solo 1 kg, es fácil de transportar y almacenar, lo que lo convierte en un compañero ideal para tus rutinas en casa o en el gimnasio. Además, soporta un peso máximo de 150 kg, lo que lo hace accesible para una amplia variedad de usuarios.\n\nIncorpora el Rodillo Rolo en tu rutina diaria y experimenta los beneficios de una mejor flexibilidad, equilibrio y recuperación muscular. Es una inversión en tu salud y bienestar que no querrás dejar pasar.',23799,28,17,1,17),
('Proteina Nutrilab Whey Pro sabor vainilla de 1kg','Aviso legal\n• Edad mínima recomendada: 18 años.\n• Este producto es un suplemento dietario, no es un medicamento. Suplementa dietas insuficientes. Consulte a su médico y/o farmacéutico.',20160,29,4,1,3),
('Fortisip Max Maxima Energia Neutro Lata X 700 Gr Sabor Sin sabor','Fortisip MAX es un alimento para propósitos médicos específicos, nutricionalmente completo, hipercalórico, hiperproteico, en polvo, disponible en sabores neutro y vainilla. Está diseñado para el tratamiento de la fragilidad y puede ser administrado por vía oral o por sonda, ya sea como única fuente de alimentación o como complemento nutricional. Su sabor neutro permite enriquecer preparaciones dulces y saladas sin alterar su sabor.\n\nDatos clave:\n\n- ENERGÍA: Hipercalórico, aporta 300Kcal/ porción de 200 ml. DC1.5kcal/ml.\n- PROTEÍNAS: Hiperproteico, aporta 15,2 g/ porción de 200 ml (35% Caseína y el 65% Soja).\n- Carbohidratos: Aporta 37g/ porción de 200 ml (84% Maltodextrina y 16% CHO Simples en sabor neutro; 65% Maltodextrina y 35% CHO Simples en sabor Vainilla).\n- GRASAS: Aporta 10g / porción de 200 ml (mezcla de aceites vegetales).\n- FIBRAS PREBIÓTICAS: Contiene 2,4 g fibra/200 ml, 100% soluble (FOS+GOS), que mejora la salud intestinal y la función inmune, y favorece la absorción de calcio y magnesio.\n- MICRONUTRIENTES: Cubre el 100% de las VDR de vitaminas, minerales y oligoelementos en 1.500 kcal.\n\nIndicaciones:\n\nFortisip MAX es adecuado como apoyo nutricional en pacientes que requieren un incremento en el aporte de energía, proteínas y micronutrientes, y para aquellos que no pueden cubrir sus requerimientos nutricionales con alimentos convencionales, desnutridos o en riesgo de desnutrición.',34499,30,4,1,19),
('1 Kg Whey Protein Hardcore Proteína 100% Wpc Concentrada','HardCore Nutrition 100% wpc Concentrate\n\nPura proteína\n\nMUY IMPORTANTE SOBRE COMO SELECCIONAR SABORES:\nSi desea surtido o modificar un sabor debe escribirnos USTED POR MENSAJE INTERNO APENAS REALIZA LA COMPRA. ya que mercado libre modificó el sistema de mensajes y NO NOS PERMITE a nosotros escribirles si USTED no nos escribe primero. Le recordamos que los pedidos se envían APENAS usted hace la compra, así que no deje pasar ni siquiera minutos, debe escribirnos diciéndonos los sabores APENAS hace la compra, o de lo contrario el sistema automático le enviará todos los paquetes del sabor que USTED dejo SELECCIONADO al momento de confirmar la compra.\n\n\nANTE CUALQUIER DUDA, CONSULTANOS, ESTAMOS PARA INFORMARTE.\n\nHAY STOCK DISPONIBLE DE LOS 4 SABORES !!!\n',16000,31,4,1,22),
('Combo 4 Pares Tobilleras 2 Kg C/u Con Abrojo Pesas Gym Fit','COMBO 4 PARES DE TOBILLERAS DE 2 KG\nTOBILLERAS FITNESS RELLENAS CON ABROJO\n\nESPECIFICACIONES\n\n- Rellena de Arena\n- Velcro de Alta Adherencia\n- Color: Rojo\n- Precio por 4 Pares\n\nEstas tobilleras de la marca DeporAr son ideales para tus entrenamientos de gimnasio y fitness. Cada tobillera tiene un peso de 2 kg, lo que las hace perfectas para incrementar la intensidad de tus ejercicios. Están rellenas de arena y cuentan con un cierre de velcro de alta adherencia, asegurando un ajuste firme y seguro durante tus rutinas. Su color rojo vibrante añade un toque de estilo a tu equipo de entrenamiento. Este combo incluye 4 pares de tobilleras, permitiéndote compartir con amigos o tener repuestos. No cuentan con peso ajustable, lo que garantiza una distribución uniforme del peso.',38299,32,10,1,6),
('Tobilleras Con Peso Pesas Regulables 3 Kg Precio X Par','PAR DE TOBILLERAS DE 3 KG SUPER REFORZADAS\n\nCon ajuste regulable y cierre de velcro, estas tobilleras Fitnesas modelo TOB125 son ideales para intensificar tus entrenamientos. Fabricadas con hilo de nylon y doble costura, garantizan durabilidad y resistencia. Su color negro y diseño ergonómico aseguran comodidad y estilo. Rellenas de arena, ofrecen un peso ajustable para adaptarse a tus necesidades. Perfectas para ejercicios de fuerza y resistencia, estas tobilleras son nuevas y vienen en un par. Mejora tu rendimiento físico con estas tobilleras de alta calidad, diseñadas para soportar los entrenamientos más exigentes. PRECIO POR PAR.',14500,33,10,1,37),
('Pesas Tobilleras 2kg C/u Reforzadas El Par Con Peso Gym Rojo','Somos FILO SPORTS.\n\nDos Tobilleras/ Muñequeras de 2 kg (Cada una).\n\nFabricadas con:\n- Costuras Reforzadas.\n- Abrojo de alta adherencia de 5 cm de ancho.\n- Rótulos bordados con indicadores del peso.\n- Rellenas con granalla de metal (90%) y Arena (10%)\n- 4 divisiones de 500 gr (podes regular el peso de la tobillera).\n\nEstán diseñadas para agregar peso a tu cuerpo, creando una resistencia adicional. Esto contribuye a mejorar y hacer más rápido el desarrollo de la musculatura.\nSon muy versátiles, dado que se pueden utilizar para entrenar tanto piernas como brazos, recomendadas para cualquier plan de entrenamiento.',6840,34,10,1,18),
('Pesa Rusa 12kg - Kettlebell De Fundicion Nacional Maciza Color Negro','Pesa Rusa 12kg - Kettlebell De Fundición Nacional Maciza',86320,2,7,1,4),
('Set 3 Pesas Rusas De 5 Kg + 10 Kg + 12kg Fitnesas Kettlebell','SET DE 3 PESAS RUSAS\n\n• Está fabricada en PVC suave de alta\ncalidad y su interior está compuesto por\nfina granalla de acero.\n\n\n• Cuenta con un mango ancho\nergonómico para un uso cómodo con\nuna y dos manos\n\n\n• Es fácil de usar y está diseñada para\nmantenerse de pie sobre cualquier\nsuperficie sin que ésta sea dañada.\n\n\n• Es ideal para principiantes y expertos en\ndeporte ya que permite ejercitar tus\nmúsculos y fortalecer abdominales.\nbíceps, tríceps, cuádriceps y glúteos a\ntravés de una variedad de ejercicios\nmusculares y fitness.',50500,35,7,1,8),
('2 Pesas Rusas Bsfit Kettlebell Plastica 4kg Bsfit Mancuerna Color Naranja','SE INCLUYEN 2 PESAS\n\nPesas rusas confeccionadas en plástico, rellenas de cal, cemento y arena. Número y marca BsFit. CON LOGO Y NÚMERO EN RESINA IMPORTADA.\n\nALTO: 23 CM\nANCHO: 17 CM (MANIJA)\nBASE: 13 CM\n\nUtilización: Kettlebells (también llamadas pesas rusas) son una gran herramienta de entrenamiento funcional. El entrenamiento con Kettlebells tiende a la integración del músculo y no al aislamiento muscular.\n\nMaterial: Plástico, No Ralla el Piso, no tiene Oxido, Fácil de Limpiar.\n\nOrigen: Argentina\n\nVersiones: Única\n\nEtiquetas: kettlebells, kettlebells, plásticos, plásticas, 2004NSE',16500,36,7,1,36),
('Par Mancuernas Macizas C/ Tope A Rosca + 30 Kg Discos Hierro Color CROMADO - DIS','COMBO MANCUERNA MACIZA A ROSCA + SET DE DISCOS FUNDICIÓN A ELECCIÓN\n\nEL COMBO INCLUYE:\n- 2 Mancuerna maciza con tope a rosca\n- Discos 30 kg en total 4 de 5kg + 4 de 2,5kg\n\n¿Que tener en cuenta de la mancuerna?\n- Mancuerna de hierro maciza cromada con agarre moleteado\n- Topes de hierro macizos con topes de goma en el lado interno, para mayor fijación.\n- Peso único: 2,5 KG.',196999,1,6,1,3),
('Par Mancuerna Hexagonal Engomada 3 Kg Gmp Pesas Gmp','"\nPAR Mancuerna hexagonal engomada\n\nAgarre Cromado\n\nPeso: 3kg cada una (en total se envía un par de 6kg)\n\nMedidas de cada mancuerna:\n\n- Largo total: 25cm\n- Largo agarre cromado: 13cm\n- Diámetro engomado: 9,5cm\n\nContamos siempre con stock de todo lo publicado. Esperamos tu compra!\n',49999,37,6,1,4),
('Mancuerna Hexagonal Engomada 10 Kg Gmp Pesas','Mancuerna hexagonal engomada de 10kg\n\nAgarre Cromado\n\nCalidad Premium\n\nPrecio por unidad\n\nContamos siempre con stock de todo lo publicado. Esperamos tu compra!',71423,38,6,1,6),
('Banco Inclinado Olímpico Gimnasio Profesional - Fabricantes','MEDIDAS\nLargo: 110cm\nAncho: 130cm\nAlto: 130cm\n\nFICHA TÉCNICA\n\nTodas nuestras maquinas están fabricadas con materia prima e insumos de primera calidad:\n- Caño estructural 80x40 2mm de espesor\n- Porta discos: Estándares u Olímpicos\n- Estructura reforzada\n- Peso soportado: mayor a 400kg\n- Pintura de alta resistencia\n- Asiento regulable en altura\n- Tapizados de alta densidad\n\n\n¿POR QUÉ ELEGIRNOS?\n\nConsideramos que deberías elegir SINERGIA EQUIPAMIENTOS porque somos una fábrica dedicada exclusivamente a la fabricación de Equipamientos Profesionales para gimnasio. Combinamos dos pasiones: el Fitness y el Diseño, para crear máquinas que no solo funcionan excepcionalmente bien, sino que también son visualmente atractivas.\n\nContamos con 10 años de experiencia en el rubro, ofrecemos máquinas de gimnasio que van más allá de lo convencional.',850999,39,5,1,1),
('Banco Scott De Biceps Gimnasios Clubes Hoteles Genetic Pro','"A los 16 comencé a entrenar, fui propietario de 4 gimnasios por 30 años, competí en fisicoculturismo durante 15 años viajando por todo el mundo probando máquinas de musculación de diferentes estilos, esto me llevó a crear el tipo de máquinas que me hacen sentir cómodo en mis rutinas. Hoy, a los 59 sigo entrenándome a diario, tengo mi gimnasio privado y show room para que vos también puedas venir y sentir la experiencia.\n\nSINCERAMENTE: A quién le comprarías una máquina? A alguien que jamás las usa ni las prueba?\n\nMauricio Mac Donald\nCampeón Argentino\nIberosudamericano\nMister Internacional\nCEO y fundador de GENETIC\n\n- NUEVO -\nBANCO SCOTT PARA BICEPS GENETIC PRO.\n\nIdeal para gimnasios, clubes, hoteles y hogares.\nEstructura armada en su mayoría en caño estructural 100x50x2 mm.\nSoldada con Mig semiautomática.\nExclusivo sistema GENETIC® de traba para barra de dos posiciones con perno zincado y superficie de goma.\nAsiento regulable en altura.\nRespaldo y apoyo confeccionados en espuma poliuretánica de alta densidad montada sobre madera multilaminada.\nTapizados en cuerina.\nMontado sobre regatones de goma antideslizantes.\nPintura electroestática epoxi.\nColores a elección y combinada a 2 tonos.\n\nALTO: 97 centímetros\nANCHO: 61 centímetros\nPROFUNDIDAD: 87 centímetros\nPESO: 25 kilogramos.\n\nAPOYO\nALTO: 36 centímetros\nANCHO: 61 centímetros',899999,40,5,1,4),
('Banco Abdominales Inclinado Maquina Pesas Fitness Gimnasio','Banco abdominales inclinado estructura resistente para ejercicios fitness\nIdeal para trabajar abdominales y ejercicios de inclinación en casa o gimnasio\nDiseño robusto con estructura triangular y topes antideslizantes para mayor estabilidad\n\nEste banco inclinado es una herramienta ideal para fortalecer la zona media del cuerpo y mejorar el rendimiento físico general. Su estructura triangular soldada proporciona una base firme y segura, incluso durante entrenamientos intensos.\n\nEl diseño ergonómico y acolchonado permite realizar ejercicios con mayor comodidad, y su versatilidad lo convierte en una excelente opción tanto para principiantes como para personas con experiencia en fitness.\n\nGracias a los topes de goma en la base, se evitan movimientos indeseados durante el uso, brindando estabilidad y seguridad. Perfecto para rutinas de abdominales, ejercicios con inclinación y fortalecimiento general del core.\n\nCaracterísticas:\n\nMaterial: acero / cuero sintético\n\nColor: negro con rojo\n\nPeso: 7 kg\n\nDimensiones del banco según su posición:\n\nEn posición inclinada de uso:\n\nLargo: 133 cm\n\nAncho: 50 cm (incluyendo los mangos laterales)\n\nAltura: 62 cm\n\nEn posición extendida (banco completamente estirado):\n\nLargo: 170 cm\n\nAncho: 50 cm (incluyendo los mangos laterales)\n\nAltura: 35 cm\n\nEstructura triangular soldada: resistente y duradera\n\nSoporta hasta 180 kg\n\nTopes de goma: evitan deslizamientos y mejoran la estabilidad\n\nVersátil: ideal para ejercicios abdominales e inclinados\n\nApto para principiantes y avanzados',135350,41,5,1,9),
('Disco Plástico De 1 Kg Pesas Gimnasio Manija Acanalado Gym Color Rosa','DISCO 1 KG DE PVC ACANALADO CON AGARRE\n\n• Peso: 1 kg.\n• Orificio interno de barra: 30 mm.\n• Diámetro Externo: 150 mm.\n• Medidas 20 x 20 x 4 cm.\n• Color: Negro o Rosa\n• Material externo: PVC inyectado\n• Material interno: Cemento y granalla metálica.\n• Ideal para entrenar en interiores o al aire libre\n• Para fortalecer brazos, espalda, pierna, glúteos y abdominales.\n• Sirven tanto para barras de Body como para barras de 30 mm.\n• Agradables al Tacto.\n• No lastiman las manos.\n\nPeso preciso, sólidos y compactos. Herméticamente sellados, no hacen ruido, no pierden contenido ni peso con el tiempo.\n\n*El precio publicado es por una unidad de 1 kg.*\n• Perfecto para clases de Body Pump\n\nTAMBIEN TENEMOS DISCO DE 5 Y 2.5 KILOS',5720,3,1,1,26),
('Disco Pvc Sport Maniac 10 Kg Para Pesas Gimnasio','DETALLE:\n- Discos\n- Material: PVC\n- Color gris\n- Rellenos con cemento\n- El valor es por 10Kg de discos de PVC\n- Puedes elegir la distribución según las siguientes opciones:\n* 8 Discos de 1,25KG\n* 4 Discos de 2,5Kg\n* 2 Discos de 5KG\n\nRECOMENDACIONES:\n- Discos para ser utilizados solos o para combinarlos con otros elementos como barras o una colchoneta y realizar diferentes ejercicios.\n- Permite la manipulación para ejercitarse de forma aislada con el elemento en las manos.\n- Combina diferentes rutinas de ejercicios con el objetivo de tonificar la musculatura del cuerpo, perder peso y ponerte en forma.\n\nALGUNOS EJEMPLOS DE USO PARA LAS PESAS:\n- Sentadilla convencional\n- Curl de bíceps\n- Levantamiento de disco frontal\n- Press de tríceps con disco\n- Giro de cadera con disco\n- Estocada con disco',37500,42,1,1,5),
('Disco Pesa Fundicion Fitness 5 Kg Mancuerna Barra Pesas 30mm Color Negro','DISCO DE FUNDICION DE 5 KG\n\nEspecificaciones\n\n- Disco de fundición de 30mm\n- Hierro macizo y pintado\n- 3 CM DE DIÁMETRO INTERNO\n- 19 CM DE DIÁMETRO TOTAL\n\nFabricado con hierro fundido de alta calidad, asegura una distribución uniforme del peso y una resistencia confiable. Su diseño compacto y fácil manejo lo hacen ideal para usuarios de todos los niveles de habilidad, ya sea para tonificar, fortalecer o mejorar la resistencia, este disco de 5 kg es un complemento esencial para tu equipo de entrenamiento.',23899,43,1,1,10),
('Colchoneta Gimnasia Con Cierre Entrenamiento Fitness Gym Color Negro','Colchoneta 1 x 40 x 3 cm FITNESAS\n\nLa colchoneta es de alta densidad y está rellena de Polex, proporcionando comodidad para ejercicios de yoga o pilates. Cuenta con una funda reforzada y de fácil mantenimiento. Su diseño la hace liviana y fácil de transportar, ideal para llevar a cualquier lugar. Sus dimensiones son 100 x 40 x 3 cm, lo que la convierte en una opción adecuada para diversas rutinas de ejercicio.\n\n• Dimensiones: 100 x 40 x 3 cm.\n• Densidad: 90kg/m3\n• Relleno: Polex, densidad alta.\n• Funda: Reforzada, de fácil mantenimiento.\n• Colores: Varias opciones disponibles.\n• Práctica y fácil de llevar.',19799,44,9,1,58),
('Colchoneta Goma Eva 160x57cm X6mm Ideal Yoga, Pilates, Gim','POR FAVOR NO CONSULTE SI HAY STOCK PORQUE SI HAY PUBLICADAS ES PORQUE HAY STOCK, COMPRE CON CONFIANZA, ESA ES LA NUEVA POLITICA DE MERCADO LIBRE\"\n\nColores Disponibles: Ver al inicio de la publicación, arriba del botón \"Comprar\"\n\nCOLCHONETA DE GOMA EVA IDEAL PARA YOGA, PILATES, ABDOMINALES Y EJERCICIOS VARIOS\n\nMEDIDA 160x57 cm x 6 mm de espesor\n\nCOLORES VARIOS\n\nSTOCK PERMANENTE \"SOMOS FABRICANTES\"\n\nLOS ENVÍOS SON SOLO A TRAVÉS DE \"\" MERCADO ENVÍOS \"\", NO HACEMOS ENVÍOS PARTICULARES\n\n\nOFERTA UNICAMENTE COMPRANDO A TRAVÉS DE ESTA PLATAFORMA',11150,45,9,7,36),
('Set * 5 Unidades Colchoneta Gimnasia 1m*40cm*3cm','Colchoneta para Gimnasia, ideal también para Yoga, Fitness, Ejercitación, Pilates. Gracias al relleno de espuma de POLIETILENO DE ALTA DENSIDAD, resulta muy confortable a la hora de realizar ejercicios. Confeccionado con Lona Bagun o Tela Cordura en la parte superior (según disponibilidad) y tela no textil gruesa en la base hacen la combinación perfecta de estética y durabilidad.\nManejamos stock en varios colores y en cantidades para cumplir con las necesidades de gimnasios, clubes, profesores independientes y escuelas.\n\n*SI COMPRAS HOY, RETIRAS HOY.*',50000,46,9,1,2),
('Barra EZ W Olímpica Profesional Gimnasio Cromada Maciza','Barra Olímpica Ez W Cromada Maciza Profesional 1.5m 11kg Plateada\n\nDiseñada para levantamiento olímpico y entrenamientos de CrossFit, esta barra combina resistencia, funcionalidad y diseño profesional. Ideal para ejercicios como snatch y clean & jerk, gracias a sus rodamientos de bronce que aseguran un movimiento fluido y rápido, además de su durabilidad y auto lubricación.\n\nCon capacidad para soportar hasta 200 kg y compatible con discos de 50 mm, ofrece extremos giratorios con diseño de rosca para mantener los topes firmemente en su lugar. El moleteado tipo diamante proporciona un agarre seguro durante los levantamientos intensivos.\n\nCaracterísticas principales:\n\n• Material: Acero de aleación con tratamiento de cromo duro.\n• Dimensiones: Largo 1.5 m, diámetro del mango 2.5 cm, compatible con discos de 5 cm.\n• Capacidad: Soporta hasta 200 kg con una resistencia PSI de 190K.\n• Rodamientos: 4 rodamientos de bronce con 2 anillos de latón.\n• Diseño: Extremos giratorios con rosca para mayor seguridad; textura diamante para un mejor agarre.\n• Peso: 11 kg.\n• Incluye: 2 topes mariposa.\n\nEsta barra es la herramienta perfecta para entrenamientos exigentes, combinando rendimiento, durabilidad y facilidad de uso.',88190,47,11,1,4),
('Barra Olimpica W Curva Maciza 1.5mt Rulemanes 50mm Cromado','Barra Olimpica W 1.5 Mts + Topes\n\n-Medidas Largo 1.5 Metros, diámetro discos 50 MM\n-Largo topes espacio discos 26 CM\n-Peso 10 Kgs\n-Incluye dos topes de acero tipo tijera\n-Rulemanes interiores en bronce\n-Soporta hasta 250 Kgs deformación elástica',114600,48,11,1,17),
('Set X4 Barras Ez Peso Fijo Engomado 30mm Cromada Maciza Color Cromado','El set incluye 4 barras con los siguientes pesos (10kg / 15kg / 20kg / 25kg)\n\nEl Set X4 Barras EZ Peso Fijo Engomado 30mm Cromada Maciza es la elección ideal para quienes buscan mejorar su rutina de entrenamiento. Con un largo de 120 cm y un diámetro de 30 mm, estas barras están diseñadas para ofrecer un agarre ergonómico que maximiza la comodidad y el control durante el ejercicio.\n\nFabricadas en hierro de alta calidad, estas barras son resistentes y duraderas, lo que las convierte en una inversión segura para tu gimnasio en casa. Su diseño cromado no solo aporta un aspecto elegante, sino que también proporciona una mayor resistencia a la corrosión, asegurando que mantengan su brillo y funcionalidad a lo largo del tiempo.\n\nEl modelo Peso fijo Set x4 es perfecto para realizar una variedad de ejercicios, desde levantamientos hasta entrenamientos de fuerza. Su peso fijo permite un enfoque en la técnica y el desarrollo muscular, ideal tanto para principiantes como para atletas experimentados que buscan optimizar su rendimiento.\n\nIncorpora estas barras en tu rutina de ejercicios y experimenta la diferencia en tu entrenamiento. Con el Set X4 Barras EZ, cada sesión se convierte en una oportunidad para alcanzar tus metas de fitness de manera efectiva y segura.',557200,49,11,1,5),
('Super Banda Dominadas - Resistencia Media Y Alta Kit Gmp','Unidades por pack: 2.\nIntensidades de resistencia: alta.\nLargo: 2m.',41100,50,8,1,3),
('Banda De Resistencia Alta Tpe Manijas Ergonómicas Gymgenius','Optimizá tu entrenamiento con nuestra Banda de Resistencia TPE GymGenius.\n\nAcompañada de dos manoplas ergonómicas de 12 cm que añaden comodidad y un agarre firme a tu rutina y con una longitud de 120 cm, este accesorio redefine tu rutina de ejercicios.\n\nDisponible en tres niveles de resistencia distintos, con 10.5 mm de espesor, te permite adaptar tu entrenamiento según tus metas y capacidades actuales. La versatilidad de la banda te brinda la posibilidad de trabajar diversos grupos musculares de manera efectiva.\n\nDescubrí el poder en tu entrenamiento con nuestra Banda de Resistencia TPE.',8999,51,8,1,8),
('Banda Elástica Gmp Para Pilates Resistencia Media','Presentamos la Banda Elástica GMP, una herramienta esencial para tus rutinas de Pilates y ejercicios de resistencia. Este producto, de la reconocida marca GMP, es conocido por su calidad y durabilidad. La banda es de color verde, un tono vibrante que añade un toque de energía a tus sesiones de entrenamiento.\n\nEl modelo de esta banda elástica ha sido diseñado pensando en la resistencia media, lo que la hace ideal tanto para principiantes como para aquellos que ya tienen experiencia en Pilates o ejercicios de resistencia. Con un largo de 120 cm y un ancho de 12 cm, esta banda es lo suficientemente grande para permitir una variedad de ejercicios, pero también lo suficientemente compacta para llevarla contigo a donde quieras.\n\nA diferencia de otras bandas elásticas, este modelo no viene con manijas, lo que permite un mayor rango de movimiento y flexibilidad en tus ejercicios. Cada pack contiene una unidad de la Banda Elástica GMP, siempre disponible en stock para satisfacer tus necesidades de entrenamiento.',6500,52,8,1,26),
('Pelota Medicinal Mlg 9 Kg - Modelo Lona Para Entrenamiento Negro','La pelota medicinal MLG de 9 kg es la herramienta ideal para quienes buscan incorporar un desafío adicional en su entrenamiento físico. Su diseño de lona resistente garantiza durabilidad y puede soportar el uso intensivo en entrenamientos exigentes. Con un diámetro de 35 cm, es fácil de manejar y perfecta para una variedad de ejercicios funcionales.\n\nEste modelo es especialmente apreciado por entrenadores y aficionados al fitness, quienes valoran la versatilidad que ofrece para el desarrollo de fuerza, potencia y resistencia. Su peso de 9 kg es apropiado tanto para principiantes como para atletas más avanzados, permitiendo progresiones efectivas en su rutina de ejercicios.\n\nIncorpora la pelota medicinal MLG en tus sesiones de entrenamiento diario para realizar lanzamientos, giros o ejercicios en pareja. Diseñada para fomentar una correcta técnica y mejorar el rendimiento físico, se convertirá en una excelente adición a tu equipo de entrenamiento en casa o en el gimnasio.\n\nGarantía de fábrica: 6 meses',18000,53,13,1,6),
('Medicine Ball 5 Kg Jlm Fitness Con Pique Pelota Medicinal','MEDICINE BALL CON PIQUE DE 5 KG JLM FITNESS\n\nESPECIFICACIONES\n- Con pique\n- Composición: 100% Caucho.\n- Diametro 22 cm.\n- Circunferencia: 74 cm.\n- Grip Antideslizante.\n- Resistente al pique y lanzamiento contra pared.\n\n¿QUÉ TENER EN CUENTA PARA ESTE PRODUCTO?\n- Peso: 5 kg\n- Marca JLM FITNESS. Producto Importado.\n',55700,54,13,1,19),
('Medicine Ball De 3kg. Pelota Medicinal De Excelente Balance','Pelota medicinal eterna. la mejor balanceada del mercado. si alguna vez hiciste abs con medicines sabes lo importante del balance del producto y eso se logra con trabajo a conciencia en el llenado.',19500,55,13,2,1),
('Sillon Cuadriceps Regulable Maquinas Disco Gimnasios Genetic','"A los 16 comencé a entrenar, fui propietario de 4 gimnasios por 30 años, competí en fisicoculturismo durante 15 años viajando por todo el mundo probando máquinas de musculación de diferentes estilos, esto me llevó a crear el tipo de máquinas que me hacen sentir cómodo en mis rutinas. Hoy, a los 59 sigo entrenándome a diario, tengo mi gimnasio privado y show room para que vos también puedas venir y sentir la experiencia.\n\nSINCERAMENTE: A quién le comprarías una máquina? A alguien que jamás las usa ni las prueba?\n\nMauricio Mac Donald\nCampeón Argentino\nIberosudamericano\nMister Internacional\nCEO y fundador de GENETIC\n\n- NUEVO -\nSILLÓN DE CUADRICEPS A DISCOS GENETIC PRO\n\nIdeal para gimnasios, clubes, hoteles y hogares.\nEstructura armada en su mayoría en caño estructural 100x50x2 mm.\nSoldada con Mig semiautomática.\nPalanca con rodamiento de alta resistencia.\nRespaldo y asiento confeccionados en espuma poliuretánica de alta densidad montada sobre madera multilaminada.\nTapizados en cuerina.\nMontado sobre regatones de goma antideslizantes.\nPreparada para discos de diámetro 30 mm o 50 mm según pedidos.\nPintura electroestática epoxi.\nColores a elección y combinada a 2 tonos.\n\nALTO: 104 centímetros\nANCHO: 90 centímetros\nPROFUNDIDAD: 97 centímetros\nPESO: 50 kilogramos\n\nRESPALDO\nALTO: 44 centímetros\nANCHO\nMIN.: 24 cm - MAX.: 36 cm\n\nASIENTO\nALTO: 45 centímetros\nANCHO\nMIN.: 35 cm - MAX.: 47 cm',750000,56,2,1,2),
('Aparato Para Gluteo Gimnasio Maquina Ejercicios Multifuncion Color De La Estruct','El Aparato Para Gluteo Gimnasio Maquina Ejercicios Multifuncion es la herramienta perfecta para fortalecer y tonificar tus glúteos y piernas. Con una capacidad máxima de peso de 185 kg y un peso máximo del usuario de 150 kg, este aparato te brinda la seguridad y resistencia necesarias para realizar tus ejercicios de manera efectiva.\n\nSu estructura de acero en color gris le da un aspecto moderno y resistente, mientras que el tapizado en gris oscuro le agrega un toque de elegancia. Además, incluye un banco para ejercicios, lo que te permite realizar una variedad de movimientos y trabajar diferentes grupos musculares.\n\nCon su sistema de poleas y cables reforzados, podrás realizar una amplia gama de ejercicios para glúteos, sin importar tu nivel de experiencia. Además, los accesorios incluidos te brindan ejercicios específicos para glúteos, asegurando resultados óptimos.\n\nEste aparato para glúteo es ideal tanto para uso doméstico como para gimnasios, gracias a su diseño multifuncional y su capacidad de carga de hasta 90 kg. No incluye pesas ni barra, lo que te permite personalizar tu entrenamiento según tus necesidades y preferencias.',568000,57,2,1,2),
('Plano Máquina De Gimnasio Banco Multiangular','Plano para fabricación de banco multiangular.\nArchivo en PDF.\nArmado General.\nSub Ensambles.\nDetalle de medidas y ángulos.\nDetalle de perfiles, tubos y planchas metálicas.\n\nGarantía del vendedor: 12 meses',10000,58,2,1,31),
('Combo Accesorios Para Polea Soga-estribos-barra Corta Gmp','Incluye:\n*Barra recta para polea\n\nMaterial: Acero cromado macizo\n\nAgarre antideslizante.\n\nLongitud: 50 cm\n\nDiámetro: 25mm\n\nCon centro giratorio\n\n*Agarre tipo estribo para polea.\n\nMaterial: Acero cromado.\n\nAgarre antideslizante.\n\n*Soga reforzada Triceps\n\nTopes de goma.\n\nEnganche giratorio.\n\nLa soga tiene casi 3cm de diámetro\n\nEl largo total es de 58cm.',96900,4,3,1,2),
('Soga Jalon Para Triceps Topes Reforzados Accesorio Polea Gym','SOGA JALÓN PARA TRICEPS - ACCESORIO PARA POLEA - MULTIGYG\n\nSOGA DE NYLON DE 55 CM. DE ALTA CALIDAD: construida con una soga de nylon negro trenzada extra resistente con topes de goma duraderos.\n\nDISEÑO UNIVERSAL: la soga para triceps viene con un accesorio cromado de alta resistencia para enganchar a cualquier máquina de gimnasio y realizar múltiples entrenamientos.\n\nTOPES DE CAUCHO PARA EVITAR EL DESLIZAMIENTO: diseñado con grandes bloques de goma en los extremos de la soga para aumentar la efectividad en el uso y evitar el deslizamiento mientras ejercita.\n\nMULTIUSO: ideal para cualquier máquina con sistema de polea y maximizar el acondicionamiento físico.\n\nEXCELENTE PARA EJERCITAR LOS TRICEPS: Incorpora esta soga a tu rutina de entrenamiento de fuerza para aumentar la masa de la parte superior del cuerpo. Diseñados para desarrollar tríceps, bíceps, espalda, hombros, abdominales y mejorar la fuerza de agarre.\n\nESPECIFICACIONES - Las dimensiones son 55cm de largo (entre topes) x 2.54cm de diámetro y un peso de 770grs.',24999,59,3,1,20),('Estribo Agarre Manija Polea Acero Macizo Maquinas Accesorio','ESTRIBO RECTANGULAR GET FIT!\n\nTe ayuda a ampliar tu gama de ejercicios y maximizar la efectividad de los entrenamientos. Ejercita todo el tren superior con este gran accesorio para polea. Añade otra forma de entrenamiento al peso libre para tus tríceps, bíceps, hombros, pecho, espalda y abdominales.\n\nHecho de barra de acero sólido y acabado cromado pulido. Soldadura reforzada para una durabilidad excepcional. Super resistente diseñado para hacer frente a las cargas más pesadas.\n\nDimensiones aprox: 14.5 x 15.0 cm (largo x ancho).\n\nAsas moleteadas y ergonómicas para un agarre firme y seguro durante los entrenamientos.\n\nAgarre giratorio: la rotación de 360 grados hace que el producto sea agradable para hacer ejercicios que impliquen movimientos amplios con giro además de ejercicios de empuje, ayudando a los músculos y tendones alrededor de codos, muñecas, espalda y hombros.\n\nFácil de instalar: el agujero de diámetro estándar en la parte superior permite enganchar fácilmente la mayoría de clips para una fácil y rápida extracción e instalación.\n\nAptos para utilizar en el gym u hogar.',27499,60,3,1,45);



INSERT INTO productos_ventas (id_producto, id_usuario, cantidad, monto, createdAt) VALUES
(1, (SELECT id_usuario FROM gym_usuarios WHERE usuario = 'luis'), 3, 15000, '2025-01-03'),
(2, (SELECT id_usuario FROM gym_usuarios WHERE usuario = 'agustin'), 2, 10000, '2025-01-07'),
(3, (SELECT id_usuario FROM gym_usuarios WHERE usuario = 'sofia'), 1, 4000, '2025-01-11'),
(4, (SELECT id_usuario FROM gym_usuarios WHERE usuario = 'marcos'), 5, 25000, '2025-01-15'),
(5, (SELECT id_usuario FROM gym_usuarios WHERE usuario = 'valen'), 2, 8000, '2025-01-20'),
(6, (SELECT id_usuario FROM gym_usuarios WHERE usuario = 'pablo'), 1, 5000, '2025-01-24'),
(7, (SELECT id_usuario FROM gym_usuarios WHERE usuario = 'camila'), 3, 15000, '2025-01-28'),
(8, (SELECT id_usuario FROM gym_usuarios WHERE usuario = 'federico'), 2, 10000, '2025-02-02'),
(9, (SELECT id_usuario FROM gym_usuarios WHERE usuario = 'luciana'), 4, 16000, '2025-02-05'),
(10, (SELECT id_usuario FROM gym_usuarios WHERE usuario = 'nicolas'), 2, 12000, '2025-02-08'),
(11, (SELECT id_usuario FROM gym_usuarios WHERE usuario = 'luis'), 1, 6000, '2025-02-11'),
(1, (SELECT id_usuario FROM gym_usuarios WHERE usuario = 'agustin'), 3, 15000, '2025-02-14'),
(2, (SELECT id_usuario FROM gym_usuarios WHERE usuario = 'sofia'), 2, 10000, '2025-02-17'),
(3, (SELECT id_usuario FROM gym_usuarios WHERE usuario = 'marcos'), 5, 25000, '2025-02-20'),
(4, (SELECT id_usuario FROM gym_usuarios WHERE usuario = 'valen'), 2, 8000, '2025-02-23'),
(5, (SELECT id_usuario FROM gym_usuarios WHERE usuario = 'pablo'), 4, 16000, '2025-02-26'),
(6, (SELECT id_usuario FROM gym_usuarios WHERE usuario = 'camila'), 1, 5000, '2025-03-01'),
(7, (SELECT id_usuario FROM gym_usuarios WHERE usuario = 'federico'), 3, 15000, '2025-03-04'),
(8, (SELECT id_usuario FROM gym_usuarios WHERE usuario = 'luciana'), 2, 10000, '2025-03-07'),
(9, (SELECT id_usuario FROM gym_usuarios WHERE usuario = 'nicolas'), 1, 6000, '2025-03-10'),
(10, (SELECT id_usuario FROM gym_usuarios WHERE usuario = 'luis'), 4, 24000, '2025-03-13'),
(11, (SELECT id_usuario FROM gym_usuarios WHERE usuario = 'agustin'), 2, 10000, '2025-03-16'),
(1, (SELECT id_usuario FROM gym_usuarios WHERE usuario = 'sofia'), 3, 15000, '2025-03-19'),
(2, (SELECT id_usuario FROM gym_usuarios WHERE usuario = 'marcos'), 1, 5000, '2025-03-22'),
(3, (SELECT id_usuario FROM gym_usuarios WHERE usuario = 'valen'), 4, 16000, '2025-03-25'),
(4, (SELECT id_usuario FROM gym_usuarios WHERE usuario = 'pablo'), 2, 8000, '2025-03-28'),
(5, (SELECT id_usuario FROM gym_usuarios WHERE usuario = 'camila'), 3, 12000, '2025-04-01'),
(6, (SELECT id_usuario FROM gym_usuarios WHERE usuario = 'federico'), 2, 10000, '2025-04-04'),
(7, (SELECT id_usuario FROM gym_usuarios WHERE usuario = 'luciana'), 1, 6000, '2025-04-07'),
(8, (SELECT id_usuario FROM gym_usuarios WHERE usuario = 'nicolas'), 5, 25000, '2025-04-10'),
(9, (SELECT id_usuario FROM gym_usuarios WHERE usuario = 'luis'), 2, 10000, '2025-04-13'),
(10, (SELECT id_usuario FROM gym_usuarios WHERE usuario = 'agustin'), 3, 15000, '2025-04-16'),
(11, (SELECT id_usuario FROM gym_usuarios WHERE usuario = 'sofia'), 2, 8000, '2025-04-19'),
(1, (SELECT id_usuario FROM gym_usuarios WHERE usuario = 'marcos'), 4, 16000, '2025-04-22'),
(2, (SELECT id_usuario FROM gym_usuarios WHERE usuario = 'valen'), 1, 5000, '2025-04-25'),
(3, (SELECT id_usuario FROM gym_usuarios WHERE usuario = 'pablo'), 3, 12000, '2025-04-28'),
(4, (SELECT id_usuario FROM gym_usuarios WHERE usuario = 'camila'), 2, 10000, '2025-05-01'),
(5, (SELECT id_usuario FROM gym_usuarios WHERE usuario = 'federico'), 1, 6000, '2025-05-04'),
(6, (SELECT id_usuario FROM gym_usuarios WHERE usuario = 'luciana'), 4, 24000, '2025-05-07'),
(7, (SELECT id_usuario FROM gym_usuarios WHERE usuario = 'nicolas'), 2, 10000, '2025-05-10'),
(8, (SELECT id_usuario FROM gym_usuarios WHERE usuario = 'luis'), 3, 15000, '2025-05-13'),
(9, (SELECT id_usuario FROM gym_usuarios WHERE usuario = 'agustin'), 1, 5000, '2025-05-16'),
(10, (SELECT id_usuario FROM gym_usuarios WHERE usuario = 'sofia'), 4, 16000, '2025-05-19'),
(11, (SELECT id_usuario FROM gym_usuarios WHERE usuario = 'marcos'), 2, 8000, '2025-05-22'),
(1, (SELECT id_usuario FROM gym_usuarios WHERE usuario = 'valen'), 3, 12000, '2025-05-25'),
(2, (SELECT id_usuario FROM gym_usuarios WHERE usuario = 'pablo'), 1, 4000, '2025-05-28'),
(3, (SELECT id_usuario FROM gym_usuarios WHERE usuario = 'camila'), 5, 20000, '2025-06-01'),
(4, (SELECT id_usuario FROM gym_usuarios WHERE usuario = 'federico'), 3, 15000, '2025-06-04'),
(5, (SELECT id_usuario FROM gym_usuarios WHERE usuario = 'luciana'), 2, 10000, '2025-06-07'),
(6, (SELECT id_usuario FROM gym_usuarios WHERE usuario = 'nicolas'), 1, 5000, '2025-06-10');

