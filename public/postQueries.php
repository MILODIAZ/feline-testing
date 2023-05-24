<?php

header("Access-Control-Allow-Origin: *");
 header("Access-Control-Allow-Headers: access");
 header("Access-Control-Allow-Methods: GET,POST");
 header("Content-Type: application/json; charset=UTF-8");
 header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
 header('Content-Type: application/json');

 $query = $_POST['query'];

 if ($query==1){

    $usuario = $_POST['usuario'];    
    $pass = $_POST['pass'];      

    include ("connectDB.php"); 

    $sql="SELECT 
    EXISTS(SELECT 1 FROM usuario WHERE rut = :usuario AND contraseña = :pass) AS existe_usuario,
    CASE 
      WHEN EXISTS(SELECT 1 FROM usuario WHERE rut = :usuario AND contraseña = :pass)
      THEN (SELECT nombre FROM usuario WHERE rut = :usuario AND contraseña = :pass)
      ELSE NULL
    END AS nombre_usuario,
    CASE 
      WHEN EXISTS(SELECT 1 FROM usuario WHERE rut = :usuario AND contraseña = :pass)
      THEN :usuario
      ELSE NULL
    END AS rut_usuario";
    $sentencia=$conn->prepare($sql);
    $sentencia->bindParam(':usuario', $usuario);
    $sentencia->bindParam(':pass', $pass);                
    $sentencia->execute();
    $resultado=$sentencia->fetchAll();

    include("disconnectDB.php");

    header("Content-Type: application/json");
    echo json_encode($resultado);

 }

?>