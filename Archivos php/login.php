<?php
require_once 'conexion.php';
$correo = $_GET['correo'];
$password = $_GET['password'];
$sql = "SELECT * FROM usuario WHERE correo='$correo'";
$resultado = $mysql->query($sql);
$response = array();
if ($mysql->affected_rows > 0) {
    while ($row = mysqli_fetch_assoc($resultado)) {
        $nombre = $row['nombre'];
        $contrasenia = $row['contrasenia'];
        if ($password === $contrasenia) {
            $response['nombre'] = $nombre;
            $response['id'] = $row['id'];
            $response['errorCode'] = 1;
            header('Content-Type: application/json');
            echo json_encode($response);
        } else {
            $response['errorCode'] = 0;
            header('Content-Type: application/json');
            echo json_encode($response);
        }
    }
} else {
    $response['errorCode'] = 3;
    header('Content-Type: application/json');
    echo json_encode($response);
}
?>