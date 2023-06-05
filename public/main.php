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

        if($categoria=='Otros'){
            $sql = "SELECT *
            FROM producto
            WHERE codigo NOT IN (
                SELECT codigo_producto
                FROM corresponde)";
            $sentencia = $conn->prepare($sql);
        } else if ($categoria=='Favoritos') {
            $sql = "SELECT * FROM producto
            WHERE favorito=true";
            $sentencia = $conn->prepare($sql);            
        } else {
            $sql = "SELECT * FROM producto
            INNER JOIN corresponde ON producto.codigo = corresponde.codigo_producto
            WHERE corresponde.nombre_categoria = :categoria";
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

/*ACTUALIZAR <STOCK>*/
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
if($query == 11) {

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
if($query == 12){

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

if($query == 13){

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

?>