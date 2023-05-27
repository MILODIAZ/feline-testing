DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
/*************************************WARNING************************************************************/

/************************************CREACIÓN DE TABLAS***************************************************/

CREATE TABLE proveedor(
	nombre TEXT PRIMARY KEY
);

CREATE TABLE producto(
	codigo TEXT PRIMARY KEY,
	nombre_proveedor TEXT REFERENCES proveedor(nombre),
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



CREATE TABLE lote(
	codigo TEXT PRIMARY KEY,
	nombre_proveedor TEXT REFERENCES proveedor(nombre),
	fecha_pedido DATE NOT NULL,
	fecha_llegada DATE NOT NULL
);


CREATE TABLE corresponde(
	codigo_producto TEXT NOT NULL REFERENCES producto(codigo),
	nombre_categoria TEXT NOT NULL REFERENCES categoria(nombre),
	PRIMARY KEY (codigo_producto, nombre_categoria)
);


CREATE TABLE contiene(
	unidades int NOT NULL,
	codigo_lote TEXT NOT NULL REFERENCES lote(codigo),
	codigo_producto TEXT NOT NULL REFERENCES producto(codigo),
	PRIMARY KEY (codigo_lote, codigo_producto)
);

/************************************POBLADO DE TABLAS****************************************************/

INSERT INTO proveedor (nombre)
VALUES ('Proveedor A'), ('Proveedor B'), ('Proveedor C'), ('Proveedor D'), ('Proveedor E');

INSERT INTO categoria (nombre)
VALUES ('Accesorios'), ('Ropa'), ('Peluches'), ('Papelería'), ('Vasos'), ('Joyería'), ('Regalos'), ('Libros');

INSERT INTO usuario (rut, nombre, contraseña)
VALUES 
   ('12345678-9', 'Usuario1', 'contraseña1'),
   ('98765432-1', 'Usuario2', 'contraseña2'),
   ('56789012-3', 'Usuario3', 'contraseña3');

INSERT INTO producto (codigo, nombre_proveedor, nombre, descripción, precio, stock_actual, stock_recomendado, stock_bajo, favorito)
VALUES
   ('P001', 'Proveedor A', 'Aros de Gato de Plata', 'Descripción del producto 1, aros de gato muy bonitos que brillan y todo eso.', 2990, 50, 100, 20, true),
   ('P002', 'Proveedor B', 'Pijama de Gato Invierno', 'Descripción del producto 2, disponibles en S M L XL de algodon.', 11990, 30, 80, 10, false),
   ('P003', 'Proveedor C', 'Pulsera Metálica de Gato', 'Descripción del producto 3, te dice la hora, se conecta por bluetooth, es bkn.', 7990, 100, 200, 50, true),
   ('P004', 'Proveedor A', 'Peluche de Gatito', 'Descripción del producto 4, ideal para los niños.', 14990, 20, 50, 5, true),
   ('P005', 'Proveedor B', 'Azucarero de Gato', 'Descripción del producto 5, de loza', 6990, 80, 150, 30, false),
   ('P006', 'Proveedor C', 'Vaso para niño, Gatito', 'Descripción del producto 6, 300 ml, para microondas.', 6000, 60, 120, 15, false),
   ('P007', 'Proveedor A', 'Camisa de Gato Gordo', 'Descripción del producto 7, unisex S M L XL.', 12990, 10, 30, 3, true),
   ('P008', 'Proveedor B', 'Taza de perrito', 'Descripción del producto 8, de loza.', 7990, 40, 100, 20, false),
   ('P009', 'Proveedor C', 'Lentes Estilo Felino', 'Descripción del producto 9, de fantasía, sin aumento.', 8990, 70, 180, 40, true),
   ('P010', 'Proveedor A', 'Lapicera Patitas de Gato', 'Descripción del producto 10, disponible en blanco, rosado, negro y amarillo.', 1990, 90, 200, 60, true),
   ('P011', 'Proveedor B', 'Luna, Sailor Moon 🌙', 'Descripción del producto 11. Algodón, Tamaño: 30 CM.', 15990, 30, 80, 10, false),
   ('P012', 'Proveedor C', 'Camisa Niño de Perrito', 'Descripción del producto 12', 8990, 50, 120, 15, false),
   ('P013', 'Proveedor A', 'Agenda Gato Gordo', 'Descripción del producto 13, 400 páginas, anillado.', 10990, 10, 30, 3, true),
   ('P014', 'Proveedor B', 'Peluche Perrito', 'Descripción del producto 14', 14990, 60, 150, 30, false),
   ('P015', 'Proveedor C', 'Producto 15', 'Descripción del producto 15', 80, 40, 100, 20, false),
   ('P016', 'Proveedor A', 'Mate de gatito 😺', 'Descripción del producto 16, 500 ml, metálico.', 14990, 80, 180, 40, true),
   ('P017', 'Proveedor B', 'Aros de Gatito', 'Descripción del producto 17, acero inoxidable.', 3990, 70, 200, 60, true),
   ('P018', 'Proveedor C', 'Producto 18', 'Descripción del producto 18', 95, 30, 80, 10, false),
   ('P019', 'Proveedor A', 'Producto 19', 'Descripción del producto 19', 100, 50, 120, 15, false),
   ('P020', NULL, 'Producto 20', 'Descripción del producto 20', 80, 100, 50, 30, false),
   ('P021', 'Proveedor D', 'Producto 21', 'Descripción del producto 21', 80, 20, 50, 30, false);
   
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

SELECT * FROM categoria

SELECT * FROM producto
WHERE favorito=true

SELECT producto.codigo, nombre_proveedor, nombre, descripción, precio FROM producto
INNER JOIN corresponde ON producto.codigo = corresponde.codigo_producto
WHERE corresponde.nombre_categoria = 'Ropa'

SELECT id_producto, nombre_producto, stock_actual, stock_recomendado FROM producto

SELECT id_producto, nombre_producto, stock_actual, stock_recomendado FROM producto
WHERE stock_actual > stock_recomendado

SELECT id_producto, nombre_producto, stock_actual, stock_recomendado FROM producto
WHERE stock_actual < stock_recomendado AND stock_actual > stock_bajo

SELECT id_producto, nombre_producto, stock_actual, stock_recomendado FROM producto
WHERE stock_actual < stock_bajo

SELECT nombre_proveedor FROM proveedor

SELECT id_lote, nombre_proveedor, fecha_pedido, fecha_llegada, fecha_llegada - current_date from lote
ORDER BY fecha_llegada

SELECT id_lote, nombre_proveedor, fecha_pedido, fecha_llegada, fecha_llegada - current_date from lote
WHERE lote.nombre_proveedor IS NULL

SELECT producto.id_producto, nombre_producto, unidades FROM producto
INNER JOIN contiene ON producto.id_producto = contiene.id_producto
WHERE contiene.id_lote = 'L001'


 
