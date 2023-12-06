<?php
require_once 'conexion.php';
$nombre=$_GET["nombre"];
$correo=$_GET["correo"];
$password=$_GET["password"];
$sql = "INSERT INTO usuario(nombre, correo, contrasenia) VALUES ('$nombre', '$correo', '$password')";
$resultado=$mysql->query($sql);
if($resultado==true){
    echo "1";
}else{
    echo "0";
}
?>