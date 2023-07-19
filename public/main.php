<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

header('Content-Type: application/json');

$query = $_GET['query'];

/*TODAS LAS CATEGORÍAS*/
if ($query == 1) {

    include("connectDB.php");

    $sql = "SELECT *
    FROM categoria
    ORDER BY nombre ASC";
    $sentencia = $conn->prepare($sql);
    $sentencia->execute();
    $resultado = $sentencia->fetchAll();

    include("disconnectDB.php");

    header("Content-Type: application/json");
    echo json_encode($resultado);
}

/*PRODUCTOS FAVORITOS*/
if ($query == 2) {

    include("connectDB.php");

    $sql = "SELECT * FROM producto
        WHERE favorito=true";
    $sentencia = $conn->prepare($sql);
    $sentencia->execute();
    $resultado = $sentencia->fetchAll();

    include("disconnectDB.php");

    header("Content-Type: application/json");
    echo json_encode($resultado);
}

/*PRODUCTOS DE CATEGORÍA DADA*/
if ($query == 3) {

    if (isset($_GET['categoria'])) {

        $categoria = $_GET['categoria'];

        include("connectDB.php");

        if ($categoria == 'Otros') {
            $sql = "SELECT *
            FROM producto
            WHERE codigo NOT IN (
                SELECT codigo_producto
                FROM corresponde)";
            $sentencia = $conn->prepare($sql);
        } else if ($categoria == 'Favoritos') {
            $sql = "SELECT * FROM producto
            WHERE favorito=true";
            $sentencia = $conn->prepare($sql);
        } else {
            $sql = "SELECT * FROM producto
            INNER JOIN corresponde ON producto.codigo = corresponde.codigo_producto
            WHERE corresponde.nombre_categoria = :categoria
            ORDER BY producto.nombre ASC";
            $sentencia = $conn->prepare($sql);
            $sentencia->bindParam(':categoria', $categoria);
        }


        $sentencia->execute();
        $resultado = $sentencia->fetchAll();

        include("disconnectDB.php");

        header("Content-Type: application/json");
        echo json_encode($resultado);

    }

}

/*TODOS LOS PRODUCTOS*/
if ($query == 4) {

    include("connectDB.php");

    $sql = "SELECT * FROM producto
        ORDER BY nombre ASC";
    $sentencia = $conn->prepare($sql);
    $sentencia->execute();
    $resultado = $sentencia->fetchAll();

    include("disconnectDB.php");

    header("Content-Type: application/json");
    echo json_encode($resultado);
}

/*TODOS LOS PROVEEDORES*/
if ($query == 5) {

    include("connectDB.php");

    $sql = "SELECT *
    FROM proveedor
    ORDER BY nombre ASC";
    $sentencia = $conn->prepare($sql);
    $sentencia->execute();
    $resultado = $sentencia->fetchAll();

    include("disconnectDB.php");

    header("Content-Type: application/json");
    echo json_encode($resultado);
}

/*ACTUALIZAR <STOCK>*/
if ($query == 6) {

    $nuevoStock = $_GET['nuevoStock'];
    $codigo = $_GET['codigo'];

    include("connectDB.php");

    $sql = "UPDATE producto
            SET stock_actual = :newStock
            WHERE codigo = :codigo";

    $sentencia = $conn->prepare($sql);
    $sentencia->bindValue(':codigo', $codigo);
    $sentencia->bindValue(':newStock', $nuevoStock);
    $sentencia->execute();

    $rowCount = $sentencia->rowCount();

    include("disconnectDB.php");

    $response = ($rowCount > 0) ? true : false;

    echo json_encode($response);

}

//ELIMINAR PRODUCTO

if ($query == 7) {

    $codigo = $_GET['codigo'];

    include("connectDB.php");

    $sql = "DELETE FROM producto             
            WHERE codigo = :codigo";

    $sentencia = $conn->prepare($sql);
    $sentencia->bindValue(':codigo', $codigo);
    $sentencia->execute();

    $rowCount = $sentencia->rowCount();

    include("disconnectDB.php");

    $response = ($rowCount > 0) ? true : false;

    if ($response) {
        $ruta = '../src/productsImages/' . $codigo . '.jpg';
        if (file_exists($ruta)) {
            unlink($ruta);
        }
    }

    echo json_encode($response);

}
/*AGREGAR CATEGORIA*/
if ($query == 8) {

    $categoria = $_GET['categoria'];

    include("connectDB.php");

    $sql = "INSERT INTO categoria (nombre)
        VALUES (:categoria)";
    $sentencia = $conn->prepare($sql);
    $sentencia->bindValue(':categoria', $categoria);
    $sentencia->execute();

    $rowCount = $sentencia->rowCount();

    include("disconnectDB.php");

    $response = ($rowCount > 0) ? true : false;

    echo json_encode($response);

}
/*ELIMINAR CATEGORIA*/
if ($query == 9) {
    $categoria = $_GET['categoria'];
    include("connectDB.php");

    $sql = "DELETE FROM categoria
            WHERE nombre = :categoria";
    $sentencia = $conn->prepare($sql);
    $sentencia->bindValue(':categoria', $categoria);
    $sentencia->execute();

    $rowCount = $sentencia->rowCount();

    include("disconnectDB.php");

    $response = ($rowCount > 0) ? true : false;

    echo json_encode($response);
}

/*ACTUALIZAR FAVORITOS*/
if ($query == 10) {

    $favoriteStatus = $_GET['favoriteStatus'];
    $codigo = $_GET['codigo'];

    include("connectDB.php");

    $sql = "UPDATE producto
            SET favorito = :favoriteStatus
            WHERE codigo = :codigo";

    $sentencia = $conn->prepare($sql);
    $sentencia->bindValue(':favoriteStatus', $favoriteStatus);
    $sentencia->bindValue(':codigo', $codigo);
    $sentencia->execute();

    $rowCount = $sentencia->rowCount();

    include("disconnectDB.php");

    $response = ($rowCount > 0) ? true : false;

    echo json_encode($response);

}

/*MODIFICAR CATEGORÍA*/
if ($query == 11) {

    $categorieModName = $_GET['categorieModName'];
    $modCatSelected = $_GET['modCatSelected'];

    include("connectDB.php");

    $sql = "UPDATE categoria
            SET nombre = :categorieModName
            WHERE nombre = :modCatSelected";

    $sentencia = $conn->prepare($sql);
    $sentencia->bindValue(':categorieModName', $categorieModName);
    $sentencia->bindValue(':modCatSelected', $modCatSelected);
    $sentencia->execute();

    $rowCount = $sentencia->rowCount();

    include("disconnectDB.php");

    $response = ($rowCount > 0) ? true : false;

    echo json_encode($response);

}

/*CATEGORÍAS DE UN PRODUCTO ESPECÍFICO*/
if ($query == 12) {

    $code = $_GET['code'];

    include("connectDB.php");

    $sql = "SELECT nombre_categoria
    FROM corresponde
    WHERE codigo_producto = :code
    ORDER BY nombre_categoria ASC";
    $sentencia = $conn->prepare($sql);
    $sentencia->bindValue(':code', $code);
    $sentencia->execute();
    $resultado = $sentencia->fetchAll();

    include("disconnectDB.php");

    header("Content-Type: application/json");
    echo json_encode($resultado);

}

/*ELIMINAR IMAGEN ANTIGUA DE PRODUCTO*/

if ($query == 13) {

    $oldCode = $_GET['oldCode'];

    $ruta = '../src/productsImages/' . $oldCode . '.jpg';

    if (file_exists($ruta)) {
        unlink($ruta);
        echo json_encode("Archivo eliminado correctamente.");
    } else {
        echo json_encode("El archivo a eliminar no existe.");
    }

}

if ($query == 14) {

    include("connectDB.php");

    $sql = "SELECT codigo, nombre_proveedor, fecha_pedido, fecha_llegada, fecha_llegada - CURRENT_DATE AS dias_restantes
    FROM lote
    ORDER BY fecha_llegada ASC";
    $sentencia = $conn->prepare($sql);
    $sentencia->execute();
    $resultado = $sentencia->fetchAll();

    include("disconnectDB.php");

    header("Content-Type: application/json");
    echo json_encode($resultado);
}

/*PRODUCTOS DE PROVEEDOR DADO*/
if ($query == 15) {

    if (isset($_GET['proveedor'])) {

        $proveedor = $_GET['proveedor'];
        include("connectDB.php");
        $sql = "SELECT * FROM producto
        WHERE nombre_proveedor = :proveedor
        ORDER BY producto.nombre ASC";
        $sentencia = $conn->prepare($sql);
        $sentencia->bindParam(':proveedor', $proveedor);
        $sentencia->execute();
        $resultado = $sentencia->fetchAll();

        include("disconnectDB.php");

        header("Content-Type: application/json");
        echo json_encode($resultado);

    }

}

//AGREGAR NUEVO LOTE (necesito que el producto sea un objeto que tenga las caracteristicas codigo(string) y unidades(int))
if ($query == 16) {
    $codigo = $_POST['codigo'];
    $proveedor = $_POST['nombre_proveedor'];
    $fecha_pedido = $_POST['fecha_pedido'];
    $fecha_llegada = $_POST['fecha_llegada'];
    $productos = $_POST['productos'];
    if ($proveedor == 'SIN PROVEEDOR') {
        $proveedor = null;
    }
    include("connectDB.php");

    $sql = "INSERT INTO lote (codigo, nombre_proveedor,fecha_pedido, fecha_llegada)
        VALUES (:codigo, :nombre_proveedor, :fecha_pedido, :fecha_llegada)";

    $sentencia = $conn->prepare($sql);
    $sentencia->bindParam(':codigo', $codigo);
    $sentencia->bindParam(':nombre_proveedor', $proveedor);
    $sentencia->bindParam(':fecha_pedido', $fecha_pedido);
    $sentencia->bindParam(':fecha_llegada', $fecha_llegada);
    $sentencia->execute();

    if ($productos != [""]) {

        foreach ($productos as $producto) {
            $unidades = $producto->unidades;
            $codigo_producto = $producto->codigo;
            $sql = "INSERT INTO contiene (unidades, codigo_lote,codigo_producto)
            VALUES (:unidades,:codigo, :codigo_producto)";

            $sentencia = $conn->prepare($sql);
            $sentencia->bindParam(':unidades', $unidades);
            $sentencia->bindParam(':codigo', $codigo);
            $sentencia->bindParam(':codigo_producto', $codigo_producto);
            $sentencia->execute();
        }

    }

    $rowCount = $sentencia->rowCount();

    include("disconnectDB.php");

    $response = ($rowCount > 0) ? true : false;
    echo json_encode($response);
}

//MODIFICAR LOTE
if ($query == 17) {
    $codigoAntiguo = $_POST['codigo'];
    $codigoNuevo = $_POST['codigo_nuevo'];
    $proveedor = $_POST['nombre_proveedor'];
    $fecha_pedido = $_POST['fecha_pedido'];
    $fecha_llegada = $_POST['fecha_llegada'];
    $productos = $_POST['productos'];
    if ($proveedor == 'SIN PROVEEDOR') {
        $proveedor = null;
    }
    include("connectDB.php");

    $sql = "UPDATE lote 
        SET codigo = :codigo_nuevo
        SET nombre_proveedor = :nombre_proveedor
        SET fecha_pedido = :fecha_pedido
        SET fecha_llegada = :fecha_llegada
        WHERE codigo = :codigo";
    $sentencia = $conn->prepare($sql);
    $sentencia->bindParam(':codigo_nuevo', $codigoNuevo);
    $sentencia->bindParam(':nombre_proveedor', $proveedor);
    $sentencia->bindParam(':fecha_pedido', $fecha_pedido);
    $sentencia->bindParam(':fecha_llegada', $fecha_llegada);
    $sentencia->execute();
    $sql = "DELETE FROM contiene
            WHERE codigo_lote = :codigo";

    if ($productos != [""]) {

        foreach ($productos as $producto) {
            $unidades = $producto->unidades;
            $codigo_producto = $producto->codigo;
            $sql = "INSERT INTO contiene (unidades, codigo_lote,codigo_producto)
            VALUES (:unidades,:codigo, :codigo_producto)";

            $sentencia = $conn->prepare($sql);
            $sentencia->bindParam(':unidades', $unidades);
            $sentencia->bindParam(':codigo', $codigo);
            $sentencia->bindParam(':codigo_producto', $codigo_producto);
            $sentencia->execute();
        }

    }

    $rowCount = $sentencia->rowCount();

    include("disconnectDB.php");

    $response = ($rowCount > 0) ? true : false;
    echo json_encode($response);

}

//ELIMINAR LOTE
if ($query == 18) {
    $codigo_lote = $_GET['codigo_lote'];
    include("connectDB.php");

    $sql = "DELETE FROM lote
            WHERE codigo = :codigo_lote";

    $sentencia = $conn->prepare($sql);
    $sentencia->bindValue(':codigo_lote', $codigo_lote);
    $sentencia->execute();

    $rowCount = $sentencia->rowCount();

    include("disconnectDB.php");

    $response = ($rowCount > 0) ? true : false;

    echo json_encode($response);
}

/*ELIMINAR PROVEEDOR*/
if ($query == 19) {
    $proveedor = $_GET['proveedor'];
    include("connectDB.php");

    $sql = "DELETE FROM proveedor
            WHERE nombre = :proveedor";
    $sentencia = $conn->prepare($sql);
    $sentencia->bindValue(':proveedor', $proveedor);
    $sentencia->execute();
    $rowCount = $sentencia->rowCount();

    include("disconnectDB.php");

    $response = ($rowCount > 0) ? true : false;

    echo json_encode($response);
}

// Modificar PROVEEDOR
if ($query == 20) {

    $modProSelected = $_GET['modProSelected'];
    $proveedorModName = $_GET['proveedorModName'];

    include("connectDB.php");

    $sql = "UPDATE proveedor
            SET nombre = :proveedorModName
            WHERE nombre = :modProSelected";

    $sentencia = $conn->prepare($sql);
    $sentencia->bindValue(':proveedorModName', $proveedorModName);
    $sentencia->bindValue(':modProSelected', $modProSelected);
    $sentencia->execute();

    $rowCount = $sentencia->rowCount();

    include("disconnectDB.php");

    $response = ($rowCount > 0) ? true : false;

    echo json_encode($response);
}
/*AGREGAR PROVEEDOR*/
if ($query == 21) {

    $proveedor = $_GET['proveedor'];

    include("connectDB.php");

    $sql = "INSERT INTO proveedor (nombre)
        VALUES (:proveedor)";
    $sentencia = $conn->prepare($sql);
    $sentencia->bindValue(':proveedor', $proveedor);
    $sentencia->execute();

    $rowCount = $sentencia->rowCount();

    include("disconnectDB.php");

    $response = ($rowCount > 0) ? true : false;

    echo json_encode($response);
}

/*Mostrar productos Lote, con sus detalles
Recibe el codigo de Lote como parametro
Devuelve todos los productos de ese lote, junto con toda su informacion
*/
if ($query == 22) {

    if (isset($_GET['lote'])) {
        $lote = $_GET['lote'];
        include("connectDB.php");

        $sql = "SELECT p.*, c.unidades FROM producto p
                INNER JOIN contiene c ON p.codigo = c.codigo_producto
                WHERE c.codigo_lote = :lote
                ORDER BY p.codigo ASC";

        $sentencia = $conn->prepare($sql);
        $sentencia->bindParam(':lote', $lote);
        $sentencia->execute();
        $resultado = $sentencia->fetchAll();

        include("disconnectDB.php");

        header("Content-Type: application/json");
        echo json_encode($resultado);

    }

}

// Modificar Lote

if ($query == 23) {
    include("connectDB.php");

    $codigo = $_GET['codigo'];
    $fechaPedido = $_GET['fechaPedido'];
    $fechaLlegada = $_GET['fechaLlegada'];
    $lote = $_GET['lote'];

    // Aquí se realiza la modificación de los atributos del lote seleccionado
    $sql = "UPDATE lote 
        SET codigo = :codigo, fecha_pedido = :fechaPedido, fecha_llegada = :fechaLlegada 
        WHERE codigo = :lote";

    $sentencia = $conn->prepare($sql);
    $sentencia->bindParam(':codigo', $codigo);
    $sentencia->bindParam(':fechaPedido', $fechaPedido);
    $sentencia->bindParam(':fechaLlegada', $fechaLlegada);
    $sentencia->bindParam(':lote', $lote);

    // Asigna los valores adecuados a las variables correspondientes


    $sentencia->execute();

    include("disconnectDB.php");

    header("Content-Type: application/json");
    echo json_encode(array("mensaje" => "Atributos del lote modificados con éxito"));

}

// Agregar producto a Lote
if ($query == 24) {

    $lote = $_GET['lote'];
    $codProducto = $_GET['codProducto'];
    $cantidad = $_GET['cantidad'];

    include("connectDB.php");

    $sql = "INSERT INTO contiene (unidades, codigo_lote, codigo_producto) VALUES (:cantidad, :lote, :codProducto)";
    $sentencia = $conn->prepare($sql);
    $sentencia->bindValue(':cantidad', $cantidad);
    $sentencia->bindValue(':lote', $lote);
    $sentencia->bindValue(':codProducto', $codProducto);
    $sentencia->execute();

    $rowCount = $sentencia->rowCount();

    include("disconnectDB.php");

    $response = ($rowCount > 0) ? true : false;
    echo json_encode($response);
}


// Eliminar producto de Lote
if ($query == 25) {
    $lote = $_GET['lote'];
    $codProducto = $_GET['codProducto'];

    include("connectDB.php");

    $sql = "DELETE FROM contiene WHERE codigo_lote = :lote AND codigo_producto = :codProducto";
    $sentencia = $conn->prepare($sql);
    $sentencia->bindValue(':lote', $lote);
    $sentencia->bindValue(':codProducto', $codProducto);
    $sentencia->execute();

    $rowCount = $sentencia->rowCount();

    include("disconnectDB.php");

    $response = ($rowCount > 0) ? true : false;
    echo json_encode($response);
}


// Eliminar lote de la tabla contiene
if ($query == 26) {
    $codigo_lote = $_GET['codigo_lote'];
    include("connectDB.php");

    $sql = "DELETE FROM contiene
            WHERE codigo_lote = :codigo_lote";

    $sentencia = $conn->prepare($sql);
    $sentencia->bindValue(':codigo_lote', $codigo_lote);
    $sentencia->execute();

    $rowCount = $sentencia->rowCount();

    include("disconnectDB.php");

    $response = ($rowCount > 0) ? true : false;

    echo json_encode($response);
}

if ($query == 27) {
    $codigo = $_GET['codigo'];
    $nombreProveedor = $_GET['nombre_proveedor'];
    $fechaPedido = $_GET['fecha_pedido'];
    $fechaLlegada = $_GET['fecha_llegada'];

    include("connectDB.php");

    $sql = "INSERT INTO lote (codigo, nombre_proveedor, fecha_pedido, fecha_llegada)
        VALUES (:codigo, :nombreProveedor, :fechaPedido, :fechaLlegada)";
    $sentencia = $conn->prepare($sql);
    $sentencia->bindValue(':codigo', $codigo);
    $sentencia->bindValue(':nombreProveedor', $nombreProveedor);
    $sentencia->bindValue(':fechaPedido', $fechaPedido);
    $sentencia->bindValue(':fechaLlegada', $fechaLlegada);
    $sentencia->execute();

    $rowCount = $sentencia->rowCount();

    include("disconnectDB.php");

    $response = ($rowCount > 0) ? true : false;

    echo json_encode($response);
}
// MODIFICAR LOTE DE TABLA CONTIENE - LIGADA A Q23
if ($query == 28) {
    $codigo_lote = $_GET['codigo_lote'];
    $beforeCodigo = $_GET['beforeCodigo'];

    include("connectDB.php");

    $sql = "UPDATE contiene
            SET codigo_lote = :codigo_lote
            WHERE codigo_lote = :beforeCodigo";

    $sentencia = $conn->prepare($sql);
    $sentencia->bindValue(':codigo_lote', $codigo_lote);
    $sentencia->bindValue(':beforeCodigo', $beforeCodigo);
    $sentencia->execute();

    $rowCount = $sentencia->rowCount();

    include("disconnectDB.php");

    $response = ($rowCount > 0) ? true : false;

    echo json_encode($response);
}

//OBTENER TEXTO NOSOTROS
if ($query == 29) {
    include("connectDB.php");

    $sql = "SELECT texto FROM nosotros";

    $sentencia = $conn->prepare($sql);
    $sentencia->execute();
    $resultado = $sentencia->fetchAll();

    include("disconnectDB.php");

    header("Content-Type: application/json");
    echo json_encode($resultado);
}

// MODIFICAR NOSOTROS

if ($query == 30) {
    include("connectDB.php");

    $nuevotexto = $_GET['textonuevo'];

    $sql = "UPDATE nosotros 
        SET texto = :textonuevo 
        WHERE id = (SELECT MIN(id) FROM nosotros)";

    $sentencia = $conn->prepare($sql);
    $sentencia->bindParam(':textonuevo', $nuevotexto);

    $sentencia->execute();

    include("disconnectDB.php");

    header("Content-Type: application/json");
    echo json_encode(array("mensaje" => "Atributos de nosotros modificado con éxito"));

}



?>