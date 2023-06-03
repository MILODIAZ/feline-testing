<?php

header("Access-Control-Allow-Origin: *");
 header("Access-Control-Allow-Headers: access");
 header("Access-Control-Allow-Methods: GET,POST");
 header("Content-Type: application/json; charset=UTF-8");
 header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
 header('Content-Type: application/json');

 function validarRut($rut)  {
      $rut = preg_replace('/[^k0-9]/i', '', $rut); // Eliminar todos los caracteres excepto k y números
      $dv  = substr($rut, -1); // Obtener el dígito verificador
      $numero = substr($rut, 0, strlen($rut) - 1); // Obtener el número del rut

      $suma = 0;
      $factor = 2;
      for ($i = strlen($numero) - 1; $i >= 0; $i--) {
          $suma += $factor * $numero[$i];
          $factor = ($factor + 1) % 8 ?: 2;
      }

      $dvEsperado = 11 - ($suma % 11);
      if ($dvEsperado == 11) {
          $dvEsperado = '0';
      } elseif ($dvEsperado == 10) {
          $dvEsperado = 'k';
      }

      return strtoupper($dv) === strtoupper($dvEsperado);
}

function formatearRut($rut)
{
    $rut = preg_replace('/[^k0-9]/i', '', $rut); // Eliminar todos los caracteres excepto k y números
    $rut = substr($rut, 0, -1) . '-' . substr($rut, -1); // Agregar guión entre el número y el dígito verificador
    return $rut;
}



 $query = $_POST['query'];

 //VALIDAR CREDENCIALES LOGIN

 if ($query==1){

    $usuario = $_POST['usuario'];    
    $pass = $_POST['pass']; 
    
    if(validarRut($usuario)){

      $usuario = formatearRut($usuario);

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

    } else {
      $response = [
        [
          "existe_usuario" => false,"0" => false,"nombre_usuario" => null,"1" => null,"rut_usuario" => null,"2" => null
        ]
      ];
      echo json_encode($response);
    }
 }

 //CAMBIAR CONTRASEÑA

 if ($query == 2) {
  $usuario = $_POST['rut'];
  $newPass = $_POST['newPass'];

  if (validarRut($usuario)){

    $usuario = formatearRut($usuario);

    include("connectDB.php");

    $sql = "UPDATE usuario
            SET contraseña = :newPass
            WHERE rut = :rut";

    $sentencia = $conn->prepare($sql);
    $sentencia->bindValue(':rut', $usuario);
    $sentencia->bindValue(':newPass', $newPass);
    $sentencia->execute();

    $rowCount = $sentencia->rowCount();

    include("disconnectDB.php");

    $response = ($rowCount > 0) ? true : false;

    echo json_encode($response);
  } else {
    echo json_encode(false);
  }

  
}

//OBTENER USUARIOS

if ($query == 3){
  
  include ("connectDB.php"); 

  $sql="SELECT rut, nombre
  FROM usuario
  ORDER BY rut ASC";
  $sentencia=$conn->prepare($sql);
  $sentencia->execute();
  $resultado=$sentencia->fetchAll(); 

  include("disconnectDB.php");

  header("Content-Type: application/json");
  echo json_encode($resultado);

}

//ELIMINAR USUARIO

if ($query == 4){

  $usuario = $_POST['user'];

  include ("connectDB.php"); 

  $sql="DELETE FROM usuario
  WHERE rut = :usuario";
  $sentencia=$conn->prepare($sql);
  $sentencia->bindParam(':usuario', $usuario);
  $sentencia->execute();

  $rowCount = $sentencia->rowCount();

  include("disconnectDB.php");

  $response = ($rowCount > 0) ? true : false;

  echo json_encode($response);

}

//REGISTRAR NUEVO USUARIO

if ($query == 5){

  $userRut = $_POST['userRut'];
  $userName = $_POST['userName'];

  if(validarRut($userRut)){
    
    $userRut=formatearRut($userRut);

    include ("connectDB.php"); 

    $sql="INSERT INTO usuario (rut, nombre, contraseña)
    VALUES (:userRut, :userName, :userRut)";
    $sentencia=$conn->prepare($sql);
    $sentencia->bindParam(':userRut', $userRut);
    $sentencia->bindParam(':userName', $userName); 
    $sentencia->execute();

    $rowCount = $sentencia->rowCount();

    include("disconnectDB.php");

    $response = ($rowCount > 0) ? true : false;

    echo json_encode($response);
    
  } else {
    echo json_encode(false);
  }

  

}

//AGREGAR NUEVO PRODUCTO

if ($query == 6){
  $codigo = $_POST['codigo'];
  $nombre = $_POST['nombre'];
  $proveedor = $_POST['proveedor'];
  if($proveedor=='SIN PROVEEDOR'){
    $proveedor=null;
  }
  $categorias = $_POST['categorias'];
  $precio = $_POST['precio'];
  $stock = $_POST['stock'];
  $stockRecomendado = $_POST['stockRecomendado'];
  $stockMinimo = $_POST['stockMinimo'];
  $descripcion = $_POST['descripcion'];
  if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === UPLOAD_ERR_OK) {
    
    $imagen = $_FILES['imagen'];
    
  } else {
    
    $imagen = null;
  }  

  include ("connectDB.php"); 

  $sql="INSERT INTO producto (codigo, nombre_proveedor, nombre, descripción, precio, stock_actual, stock_recomendado, stock_bajo, favorito)
  VALUES (:codigo, :nombre_proveedor, :nombre, :descripcion, :precio, :stock_actual, :stock_recomendado, :stock_bajo, false)";

  $sentencia=$conn->prepare($sql);
  $sentencia->bindParam(':codigo', $codigo);
  $sentencia->bindParam(':nombre_proveedor', $proveedor);
  $sentencia->bindParam(':nombre', $nombre);
  $sentencia->bindParam(':descripcion', $descripcion);
  $sentencia->bindParam(':precio', $precio);
  $sentencia->bindParam(':stock_actual', $stock);
  $sentencia->bindParam(':stock_recomendado', $stockRecomendado);
  $sentencia->bindParam(':stock_bajo', $stockMinimo);
  $sentencia->execute(); 

  if($categorias!=[""]){

    foreach($categorias as $categoria) {
      $sql = "INSERT INTO corresponde (codigo_producto, nombre_categoria)
      VALUES (:codigo_producto, :nombre_categoria)";
  
      $sentencia=$conn->prepare($sql);
      $sentencia->bindParam(':codigo_producto', $codigo);
      $sentencia->bindParam(':nombre_categoria', $categoria);
  
      $sentencia->execute();
    }

  }  

  $rowCount = $sentencia->rowCount();

  include("disconnectDB.php");

  $response = ($rowCount > 0) ? true : false;
  
  if($response==true && !is_null($imagen)){    

    
    $nuevoNombreArchivo = $codigo . '.jpg';

    $targetDirectory = '../src/productsImages/';
    $targetFile = $targetDirectory . basename($nuevoNombreArchivo);
    move_uploaded_file($imagen['tmp_name'], $targetFile);
  }

  echo json_encode($response);
  
}

if ($query == 7){
  $currentCode = $_POST['currentCode'];
  $codigo = $_POST['codigo'];
  $nombre = $_POST['nombre'];
  $proveedor = $_POST['proveedor'];
  if($proveedor=='SIN PROVEEDOR'){
    $proveedor=null;
  }
  $categorias = $_POST['categorias'];
  $precio = $_POST['precio'];  
  $stockRecomendado = $_POST['stockRecomendado'];
  $stockMinimo = $_POST['stockMinimo'];
  $descripcion = $_POST['descripcion'];
  if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === UPLOAD_ERR_OK) {
    
    $imagen = $_FILES['imagen'];
    
  } else {
    
    $imagen = null;
  }  

  include ("connectDB.php"); 

  $sql="DELETE FROM corresponde
  WHERE codigo_producto = :codProd";

  $sentencia=$conn->prepare($sql);
  $sentencia->bindParam(':codProd', $currentCode);
  $sentencia->execute();

  $sql="UPDATE producto
  SET codigo=:codigo, nombre_proveedor=:nombre_proveedor,
   nombre=:nombre, descripción=:descripcion, precio=:precio, stock_recomendado=:stock_recomendado, stock_bajo=:stock_bajo
  WHERE codigo=:currentCodigo";  

  $sentencia=$conn->prepare($sql);
  $sentencia->bindParam(':currentCodigo', $currentCode);
  $sentencia->bindParam(':codigo', $codigo);
  $sentencia->bindParam(':nombre_proveedor', $proveedor);
  $sentencia->bindParam(':nombre', $nombre);
  $sentencia->bindParam(':descripcion', $descripcion);
  $sentencia->bindParam(':precio', $precio);  
  $sentencia->bindParam(':stock_recomendado', $stockRecomendado);
  $sentencia->bindParam(':stock_bajo', $stockMinimo);
  $sentencia->execute();  

  if($categorias!=[""]){    

    foreach($categorias as $categoria) {
      $sql = "INSERT INTO corresponde (codigo_producto, nombre_categoria)
      VALUES (:codigo_producto, :nombre_categoria)
      ON CONFLICT DO NOTHING";
  
      $sentencia=$conn->prepare($sql);
      $sentencia->bindParam(':codigo_producto', $codigo);
      $sentencia->bindParam(':nombre_categoria', $categoria);
  
      $sentencia->execute();
    }

  }

  $rowCount = $sentencia->rowCount();

  include("disconnectDB.php");

  $response = ($rowCount > 0) ? true : false;
  
  if(!is_null($imagen)){      

    $nuevoNombreArchivo = $codigo . '.jpg';

    $targetDirectory = '../src/productsImages/';
    $targetFile = $targetDirectory . basename($nuevoNombreArchivo);
    move_uploaded_file($imagen['tmp_name'], $targetFile);     

    echo json_encode($response);  
      
  }

        

  else if(is_null($imagen)){
    $ruta = '../src/productsImages/' . $currentCode . '.jpg';
    $nuevoNombreArchivo = $codigo . '.jpg';
    $rutaNueva = '../src/productsImages/' . $nuevoNombreArchivo;
    if (file_exists($ruta)) {
      rename($ruta, $rutaNueva);
      echo json_encode($response);
    }
  }

  
  
}



?>