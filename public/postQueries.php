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

 if ($query == 2) {
  $usuario = $_POST['rut'];
  $newPass = $_POST['newPass'];

  include("connectDB.php");

  $sql = "UPDATE usuario
          SET contraseña = :newPass
          WHERE rut = :rut";

  $sentencia = $conn->prepare($sql);
  $sentencia->bindValue(':rut', $usuario);
  $sentencia->bindValue(':newPass', $newPass);
  $sentencia->execute();

  $rowCount = $sentencia->rowCount(); // Obtener el número de filas afectadas por la consulta

  include("disconnectDB.php");

  $response = ($rowCount > 0) ? true : false; // Verificar si se actualizó al menos una fila

  echo json_encode($response);
}

?>