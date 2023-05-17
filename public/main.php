<?php 
 header("Access-Control-Allow-Origin: *");
 header("Access-Control-Allow-Headers: access");
 header("Access-Control-Allow-Methods: GET,POST");
 header("Content-Type: application/json; charset=UTF-8");
 header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
 header('Content-Type: application/json');

 $query = $_GET['query'];

    /*QUERY CATEGORÍAS*/
    if ($query == 1){

        include ("connectDB.php"); 

        $sql="SELECT * FROM categoria";
        $sentencia=$conn->prepare($sql);
        $sentencia->execute();
        $resultado=$sentencia->fetchAll(); 

        include("disconnectDB.php");

        header("Content-Type: application/json");
        echo json_encode($resultado);
    }

    /*QUERY PRODUCTOS FAVORITOS*/
    if ($query == 2){

        include ("connectDB.php"); 

        $sql="SELECT * FROM producto
        WHERE favorito=true";
        $sentencia=$conn->prepare($sql);
        $sentencia->execute();
        $resultado=$sentencia->fetchAll(); 

        include("disconnectDB.php");

        header("Content-Type: application/json");
        echo json_encode($resultado);
    }  

    
?>