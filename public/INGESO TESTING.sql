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
VALUES ('Electrónica'), ('Ropa'), ('Alimentación'), ('Hogar'), ('Deportes'), ('Joyería'), ('Juguetes'), ('Libros');

INSERT INTO usuario (rut, nombre, contraseña)
VALUES 
   ('12345678-9', 'Usuario1', 'contraseña1'),
   ('98765432-1', 'Usuario2', 'contraseña2'),
   ('56789012-3', 'Usuario3', 'contraseña3');

INSERT INTO producto (codigo, nombre_proveedor, nombre, descripción, precio, stock_actual, stock_recomendado, stock_bajo, favorito)
VALUES
   ('P001', 'Proveedor A', 'Producto 1', 'Descripción del producto 1', 10, 50, 100, 20, true),
   ('P002', 'Proveedor B', 'Producto 2', 'Descripción del producto 2', 15, 30, 80, 10, false),
   ('P003', 'Proveedor C', 'Producto 3', 'Descripción del producto 3', 20, 100, 200, 50, true),
   ('P004', 'Proveedor A', 'Producto 4', 'Descripción del producto 4', 25, 20, 50, 5, true),
   ('P005', 'Proveedor B', 'Producto 5', 'Descripción del producto 5', 30, 80, 150, 30, false),
   ('P006', 'Proveedor C', 'Producto 6', 'Descripción del producto 6', 35, 60, 120, 15, false),
   ('P007', 'Proveedor A', 'Producto 7', 'Descripción del producto 7', 40, 10, 30, 3, true),
   ('P008', 'Proveedor B', 'Producto 8', 'Descripción del producto 8', 45, 40, 100, 20, false),
   ('P009', 'Proveedor C', 'Producto 9', 'Descripción del producto 9', 50, 70, 180, 40, true),
   ('P010', 'Proveedor A', 'Producto 10', 'Descripción del producto 10', 55, 90, 200, 60, true),
   ('P011', 'Proveedor B', 'Producto 11', 'Descripción del producto 11', 60, 30, 80, 10, false),
   ('P012', 'Proveedor C', 'Producto 12', 'Descripción del producto 12', 65, 50, 120, 15, false),
   ('P013', 'Proveedor A', 'Producto 13', 'Descripción del producto 13', 70, 10, 30, 3, true),
   ('P014', 'Proveedor B', 'Producto 14', 'Descripción del producto 14', 75, 60, 150, 30, false),
   ('P015', 'Proveedor C', 'Producto 15', 'Descripción del producto 15', 80, 40, 100, 20, false),
   ('P016', 'Proveedor A', 'Producto 16', 'Descripción del producto 16', 85, 80, 180, 40, true),
   ('P017', 'Proveedor B', 'Producto 17', 'Descripción del producto 17', 90, 70, 200, 60, true),
   ('P018', 'Proveedor C', 'Producto 18', 'Descripción del producto 18', 95, 30, 80, 10, false),
   ('P019', 'Proveedor A', 'Producto 19', 'Descripción del producto 19', 100, 50, 120, 15, false),
   ('P020', NULL, 'Producto 20', 'Descripción del producto 20', 80, 100, 50, 30, false),
   ('P021', 'Proveedor D', 'Producto 21', 'Descripción del producto 21', 80, 20, 50, 30, false);
   
INSERT INTO corresponde (codigo_producto, nombre_categoria)
VALUES
   ('P001', 'Electrónica'),
   ('P002', 'Ropa'),
   ('P002', 'Deportes'),
   ('P003', 'Alimentación'),
   ('P003', 'Hogar'),
   ('P004', 'Ropa'),
   ('P005', 'Electrónica'),
   ('P005', 'Deportes'),
   ('P006', 'Hogar'),
   ('P007', 'Alimentación'),
   ('P008', 'Electrónica'),
   ('P009', 'Deportes'),
   ('P010', 'Hogar'),
   ('P010', 'Joyería'),
   ('P011', 'Ropa'),
   ('P012', 'Juguetes'),
   ('P013', 'Electrónica'),
   ('P014', 'Alimentación');

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


 
