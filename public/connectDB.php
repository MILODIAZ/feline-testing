<?php

$host = "localhost";
$dbname = "INGESOTESTING";
$username = "postgres";
$password = "123456";

try {
    $conn = new PDO("pgsql:host = $host; dbname=$dbname", $username, $password);
    /*echo "Se conectó correctamente a la Base de Datos";*/
} catch (PDOException $exp) {
    /*echo ("No se pudo conectar a la base de datos, $exp");*/
}

?>