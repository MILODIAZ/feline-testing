DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
/*************************************WARNING************************************************************/

/************************************CREACIÓN DE TABLAS***************************************************/

CREATE TABLE proveedor(
	nombre TEXT PRIMARY KEY
);

CREATE TABLE producto(
	codigo TEXT PRIMARY KEY,
	nombre_proveedor TEXT REFERENCES proveedor(nombre) ON DELETE SET NULL ON UPDATE CASCADE,
	nombre TEXT NOT NULL,	
	descripción TEXT NOT NULL,
	precio INT NOT NULL,
	stock_actual INT NOT NULL,
	stock_recomendado INT NOT NULL,
	stock_bajo INT NOT NULL,
	favorito BOOLEAN NOT NULL
);

CREATE TABLE usuario(
	rut TEXT PRIMARY KEY,
	nombre TEXT NOT NULL,
	contraseña TEXT NOT NULL
);

CREATE TABLE categoria(
	nombre TEXT PRIMARY KEY
);



CREATE TABLE lote (
    codigo TEXT PRIMARY KEY,
    nombre_proveedor TEXT REFERENCES proveedor(nombre) ON DELETE SET NULL ON UPDATE CASCADE,
    fecha_pedido DATE NOT NULL,
    fecha_llegada DATE NOT NULL
);


CREATE TABLE corresponde(
	codigo_producto TEXT NOT NULL REFERENCES producto(codigo) ON DELETE CASCADE ON UPDATE CASCADE,
	nombre_categoria TEXT NOT NULL REFERENCES categoria(nombre) ON DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY (codigo_producto, nombre_categoria)
);


CREATE TABLE contiene (
    unidades INT NOT NULL,
    codigo_lote TEXT NOT NULL REFERENCES lote(codigo) ON UPDATE CASCADE,
    codigo_producto TEXT NOT NULL REFERENCES producto(codigo),
    PRIMARY KEY (codigo_lote, codigo_producto)
);

CREATE TABLE nosotros (
    codigo int not NULL,
	texto TEXT NOT NULL	
);

/************************************POBLADO DE TABLAS****************************************************/

INSERT INTO proveedor (nombre)
VALUES ('Proveedor A'), ('Proveedor B'), ('Proveedor C'), ('Proveedor D'), ('Proveedor E');

INSERT INTO nosotros (codigo,texto)
VALUES (0,'Feline es una tienda en línea que ofrece una amplia variedad de accesorios y ropa con diseños de animales. Nos apasiona la moda y los animales, y queremos compartir esa pasión contigo. Nuestra misión es ofrecer productos de alta calidad a precios asequibles para que puedas lucir bien y sentirte bien al mismo tiempo.

En Feline, creemos en la importancia de la sostenibilidad y la responsabilidad social. Por eso, trabajamos con proveedores que comparten nuestros valores y nos aseguramos de que todos nuestros productos sean éticos y respetuosos con el medio ambiente.

Nos encanta lo que hacemos y esperamos que tú también disfrutes de nuestros productos tanto como nosotros disfrutamos creándolos. ¡Gracias por visitar nuestra tienda en línea!"');

INSERT INTO categoria (nombre)
VALUES ('Accesorios'), ('Ropa'), ('Peluches'), ('Papelería'), ('Vasos'), ('Joyería'), ('Regalos'), ('Libros');

INSERT INTO usuario (rut, nombre, contraseña)
VALUES 
	('15912517-3', 'Mirle Jaque', 'feline0'),
   ('18924575-0', 'Emilio Díaz', 'feline1'),
   ('20538523-1', 'Ignacio Herrera', 'feline2'),
   ('20468276-3', 'Juan Nilo', 'feline3');

INSERT INTO producto (codigo, nombre_proveedor, nombre, descripción, precio, stock_actual, stock_recomendado, stock_bajo, favorito)
VALUES
   ('P001', 'Proveedor A', 'Aros de Gato de Plata', 'Descripción del producto 1, aros de gato muy bonitos que brillan y todo eso.', 2990, 50, 100, 20, true),
   ('P002', 'Proveedor B', 'Pijama de Gato Invierno', 'Descripción del producto 2, disponibles en S M L XL de algodon.', 11990, 90, 80, 10, false),
   ('P003', 'Proveedor C', 'Pulsera Metálica de Gato', 'Descripción del producto 3, te dice la hora, se conecta por bluetooth, es bkn.', 7990, 250, 200, 50, true),
   ('P004', 'Proveedor A', 'Peluche de Gatito', 'Descripción del producto 4, ideal para los niños.', 14990, 20, 50, 5, true),
   ('P005', 'Proveedor B', 'Azucarero de Gato', 'Descripción del producto 5, de loza', 6990, 20, 150, 30, false),
   ('P006', 'Proveedor C', 'Vaso para niño, Gatito', 'Descripción del producto 6, 300 ml, para microondas.', 6000, 60, 120, 15, false),
   ('P007', 'Proveedor A', 'Camisa de Gato Gordo', 'Descripción del producto 7, unisex S M L XL.', 12990, 40, 30, 3, true),
   ('P008', 'Proveedor B', 'Taza de perrito', 'Descripción del producto 8, de loza.', 7990, 40, 100, 20, false),
   ('P009', 'Proveedor C', 'Lentes Estilo Felino', 'Descripción del producto 9, de fantasía, sin aumento.', 8990, 190, 180, 40, true),
   ('P010', 'Proveedor A', 'Lapicera Patitas de Gato', 'Descripción del producto 10, disponible en blanco, rosado, negro y amarillo.', 1990, 90, 200, 60, true),
   ('P011', 'Proveedor B', 'Luna, Sailor Moon 🌙', 'Descripción del producto 11. Algodón, Tamaño: 30 CM.', 15990, 30, 80, 10, false),
   ('P012', 'Proveedor C', 'Camisa Niño de Perrito', 'Descripción del producto 12', 8990, 10, 120, 15, false),
   ('P013', 'Proveedor A', 'Agenda Gato Gordo', 'Descripción del producto 13, 400 páginas, anillado.', 10990, 10, 30, 3, true),
   ('P014', 'Proveedor B', 'Peluche Perrito', 'Descripción del producto 14', 14990, 60, 150, 30, false),
   ('P015', 'Proveedor C', 'Lentes para Mascota', 'Descripción del producto 15', 80, 40, 100, 20, false),
   ('P016', 'Proveedor A', 'Mate de gatito 😺', 'Descripción del producto 16, 500 ml, metálico.', 14990, 80, 180, 40, true),
   ('P017', 'Proveedor B', 'Aros de Gatito', 'Descripción del producto 17, acero inoxidable.', 3990, 70, 200, 60, true),
   ('P018', 'Proveedor C', 'Lapiz de Perrito', 'Descripción del producto 18', 95, 30, 80, 10, false),
   ('P019', 'Proveedor A', 'Lapiz Pasta Huella de Perrito', 'Descripción del producto 19', 100, 50, 120, 15, false),
   ('P020', NULL, 'Agenda Canina', 'Descripción del producto 20', 80, 100, 50, 30, false),
   ('P021', 'Proveedor D', 'Estuche de Perrito', 'Descripción del producto 21', 80, 20, 50, 30, false),
   ('P022', 'Proveedor D', 'Collar de Gatito', 'Descripción del producto 22, ajustable y con cascabel.', 4990, 80, 150, 20, false),
   ('P023', 'Proveedor A', 'Calcetines de Gato', 'Descripción del producto 23, pack de 3 pares, talla única.', 2990, 120, 200, 40, true),
   ('P024', 'Proveedor B', 'Plato para Mascota', 'Descripción del producto 24, de acero inoxidable, tamaño mediano.', 5990, 50, 100, 10, false),
   ('P025', 'Proveedor C', 'Rompecabezas de Gato', 'Descripción del producto 25, 1000 piezas, ilustración de gatos.', 9990, 30, 80, 5, true),
   ('P026', 'Proveedor D', 'Camiseta Estampada de Gato', 'Descripción del producto 26, disponible en varios diseños y tallas.', 8990, 60, 120, 15, true),
   ('P027', 'Proveedor A', 'Collar Antipulgas para Gato', 'Descripción del producto 27, protección duradera contra pulgas y garrapatas.', 7990, 90, 150, 30, false),
   ('P028', 'Proveedor B', 'Bolso de Transporte para Mascota', 'Descripción del producto 28, tamaño grande, seguro y cómodo.', 14990, 20, 50, 5, true),
   ('P029', 'Proveedor C', 'Alimento Húmedo para Gato', 'Descripción del producto 29, sabor pollo, pack de 12 latas.', 3990, 100, 200, 40, false),
   ('P030', 'Proveedor D', 'Cepillo para Gato', 'Descripción del producto 30, cerdas suaves, ayuda a eliminar el pelo suelto.', 2990, 80, 150, 20, false),
   ('P031', 'Proveedor A', 'Casita para Gato', 'Descripción del producto 31, diseño acogedor, ideal para descansar.', 6990, 50, 100, 10, true),
   ('P032', 'Proveedor B', 'Juguete Interactivo para Gato', 'Descripción del producto 32, bola giratoria con luces y sonidos.', 1990, 120, 200, 40, true),
   ('P033', 'Proveedor C', 'Rascador para Gato', 'Descripción del producto 33, poste de rascado cubierto de sisal.', 4990, 60, 120, 15, false),
   ('P034', 'Proveedor D', 'Transportadora para Perro', 'Descripción del producto 34, tamaño mediano, resistente y segura.', 10990, 30, 80, 5, false),
   ('P035', 'Proveedor A', 'Arnés para Perro', 'Descripción del producto 35, ajustable y cómodo, talla mediana.', 7990, 90, 150, 30, true),
   ('P036', 'Proveedor B', 'Juguete Mordedor para Perro', 'Descripción del producto 36, resistente y duradero.', 3990, 50, 100, 10, true),
   ('P037', 'Proveedor C', 'Correa Retráctil para Perro', 'Descripción del producto 37, longitud ajustable hasta 5 metros.', 5990, 100, 200, 40, false),
   ('P038', 'Proveedor D', 'Comedero Automático para Mascota', 'Descripción del producto 38, programable y con grabación de voz.', 14990, 80, 150, 20, false),
   ('P039', 'Proveedor A', 'Champú para Mascotas', 'Descripción del producto 39, formulación suave, sin sulfatos.', 4990, 120, 200, 40, true),
   ('P040', 'Proveedor B', 'Cama para Perro', 'Descripción del producto 40, acolchada y lavable, tamaño grande.', 8990, 60, 120, 15, true);

INSERT INTO corresponde (codigo_producto, nombre_categoria)
VALUES
   ('P001', 'Joyería'),
   ('P002', 'Ropa'),
   ('P002', 'Regalos'),
   ('P003', 'Accesorios'),
   ('P003', 'Regalos'),
   ('P004', 'Peluches'),
   ('P005', 'Vasos'),
   ('P005', 'Regalos'),
   ('P006', 'Vasos'),
   ('P007', 'Ropa'),
   ('P008', 'Vasos'),
   ('P009', 'Accesorios'),
   ('P010', 'Papelería'),
   ('P010', 'Regalos'),
   ('P011', 'Peluches'),
   ('P012', 'Ropa'),
   ('P013', 'Papelería'),
   ('P014', 'Peluches');

INSERT INTO lote (codigo,nombre_proveedor,fecha_pedido,fecha_llegada)
VALUES
   ('L1', 'Proveedor A','31-05-2023', '05-06-2023'),
   ('L2', null,'27-05-2023', '07-06-2023'),
   ('L3', 'Proveedor C','28-05-2023', '10-06-2023'),
   ('L4', 'Proveedor A','29-05-2023', '01-06-2023'),
   ('L5', 'Proveedor B','31-05-2023', '07-06-2023'),
   ('L6', 'Proveedor C','01-05-2023', '05-06-2023');

INSERT INTO contiene (unidades,codigo_lote,codigo_producto)
VALUES
   (5,'L1','P001'),
   (10,'L2','P002'),
   (6,'L3','P003'),
   (7,'L4','P004'),
   (9,'L5','P005'),
   (4,'L6','P006'),
   (5,'L1','P007'),
   (7,'L2','P008'),
   (5,'L3','P009'),
   (5,'L4','P010'),
   (8,'L5','P011'),
   (1,'L6','P012');




/************************************FUNCIONES Y TRIGGERS****************************************************/


/****Trigger para verificar proveedores****/
CREATE OR REPLACE FUNCTION VerificarProveedores() RETURNS TRIGGER AS $$
DECLARE
    nombreProveedorProducto TEXT;
    nombreProveedorLote TEXT;
BEGIN
    -- Obtener los nombres de las tablas relacionadas
    SELECT nombre_proveedor INTO nombreProveedorProducto FROM producto WHERE codigo = NEW.codigo_producto;
    SELECT nombre_proveedor INTO nombreProveedorLote FROM lote WHERE codigo = NEW.codigo_lote;
    
    -- Verificar si los nombres son iguales
    IF  nombreProveedorProducto <> nombreProveedorLote THEN
        RAISE EXCEPTION 'Los proveedores no coinciden en las tablas relacionadas.';
    END IF;
	RETURN NEW;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER trigger_verificar_proveedores
BEFORE INSERT ON contiene
FOR EACH ROW
EXECUTE FUNCTION VerificarProveedores();
 
INSERT INTO producto (codigo, nombre_proveedor, nombre, descripción, precio, stock_actual, stock_recomendado, stock_bajo, favorito)
VALUES
    ('TZ201', 'EFRATA', 'TAZON DE GATO', 'MATERIAL: VIDRIO, TAPA PLASTICA, CAPACIDAD 300 CC APROX', 100, 10, 20, 5, false),
    ('TZ202', 'INK STAMP', 'TAZON NO TE RINDAS', 'MATERIAL: CERAMICA, CAPACIDAD 300 CC APROX', 100, 10, 20, 5, false),
    ('TZ203', 'EFRATA', 'TAZON PERRO SHIBA', 'MATERIAL: CERAMICA INCLUYE CUCHARA, CAPACIDAD 350 CC APROX', 100, 10, 20, 5, false),
    ('TZ204', 'EFRATA', 'TAZON ANIMAL CAT', 'MATERIAL: CERAMICA INCLUYE CUCHARA, CAPACIDAD 300 CC APROX', 100, 10, 20, 5, false),
    ('TZ205', 'EFRATA', 'TAZON CAT IS HERE', 'MATERIAL: VIDRIO, TAPA PLASTICA, CAPACIDAD 300 CC APROX', 100, 10, 20, 5, false),
    ('TZ206', 'INK STAMP', 'TAZON EL AMOR ES INFINITO', 'MATERIAL: CERAMICA, CAPACIDAD 300 CC APROX', 100, 10, 20, 5, false),
    ('TZ207', 'INK STAMP', 'TAZON PERRO SALCHICHA', 'MATERIAL: CERAMICA, CAPACIDAD 300 CC APROX', 100, 10, 20, 5, false),
    ('TZ208', 'INK STAMP', 'TAZON PERRO SALCHICHA', 'MATERIAL: CERAMICA, CAPACIDAD 300 CC APROX', 100, 10, 20, 5, false),
    ('SKU301', 'EFRATA', 'PELUCHE DE LEON TEXTURA SUAVE', '', 100, 10, 20, 5, false),
    ('SKU302', 'EFRATA', 'DINOSAURIO', 'Dinosaurio con escamas y cuerno multicolor, rechonchito y de textura suave', 100, 10, 20, 5, false),
    ('SKU303', 'EFRATA', 'PELUCHE GATO NEGRO TEXTURA SUAVE', '', 100, 10, 20, 5, false),
    ('SKU304', 'EFRATA', 'PELUCHE GATO BICOLOR', 'PELUCHE BICOLOR BLANCO Y PLOMO TEXTURA SUAVE', 100, 10, 20, 5, false),
    ('SKU305', 'EFRATA', 'PELUCHE TRICOLOR TEXTURA SUAVE', '', 100, 10, 20, 5, false),
    ('CAL401', 'DDDALGO', 'CALCETIN GATO RAYADO', 'TALLA ESTANDAR (35-41) 80% DE ALGODÓN', 100, 10, 20, 5, false),
    ('CAL402', 'DDDALGO', 'CALCETIN GATO NEGRO', 'TALLA ESTANDAR (35-41) 80% DE ALGODÓN', 100, 10, 20, 5, false),
    ('CAL403', 'SANPRO', 'CALCETIN SOQUETE KIRI KAWAII', 'TALLA ESTANDAR (36-41) 70% DE ALGODÓN', 100, 10, 20, 5, false),
    ('CAL404', 'DDDALGO', 'CALCETIN PERRO BULLDOG', 'TALLA ESTANDAR (36-42) 80% DE ALGODÓN', 100, 10, 20, 5, false),
    ('CAL405', 'DDDALGO', 'CALCETIN PERRO CAFE', 'TALLA ESTANDAR (35-41) 80% DE ALGODÓN', 100, 10, 20, 5, false),
    ('CAL406', 'DDDALGO', 'CALCETIN GATO TRICOLOR', 'TALLA ESTANDAR (35-41) 80% DE ALGODÓN', 100, 10, 20, 5, false),
    ('CAL407', 'DDDALGO', 'CALCETIN GATO-PEZ', 'TALLA ESTANDAR (35-41) 80% DE ALGODÓN', 100, 10, 20, 5, false),
    ('CAL408', 'SANPRO', 'CALCETIN AMIGOS', 'TALLA ESTANDAR (36-41) 70% DE ALGODÓN', 100, 10, 20, 5, false),
    ('CAL409', 'DDDALGO', 'CALCETIN PERRO SALCHICHA', 'TALLA ESTANDAR (35-41) 80% DE ALGODÓN', 100, 10, 20, 5, false);
	
	
	
	INSERT INTO proveedor (nombre)
VALUES ('EFRATA'), ('INK STAMP'), ('DDDALGO'), ('SANPRO');


INSERT INTO categoria (nombre)
VALUES ('TAZONES'), ('CALCETIN')
 

INSERT INTO corresponde (codigo_producto, nombre_categoria)
VALUES
  ('TZ201', 'TAZONES'),
  ('TZ202', 'TAZONES'),
  ('TZ203', 'TAZONES'),
  ('TZ204', 'TAZONES'),
  ('TZ205', 'TAZONES'),
  ('TZ206', 'TAZONES'),
  ('TZ207', 'TAZONES'),
  ('TZ208', 'TAZONES'),
  ('SKU301', 'PELUCHE'),
  ('SKU302', 'PELUCHE'),
  ('SKU303', 'PELUCHE'),
  ('SKU304', 'PELUCHE'),
  ('CAL401', 'CALCETIN'),
  ('CAL402', 'CALCETIN'),
  ('CAL403', 'CALCETIN'),
  ('CAL404', 'CALCETIN'),
  ('CAL405', 'CALCETIN'),
  ('CAL406', 'CALCETIN'),
  ('CAL407', 'CALCETIN'),
  ('CAL408', 'CALCETIN'),
  ('CAL409', 'CALCETIN');