import { StyleSheet, Text, View, Image,TouchableOpacity, TextInput, Alert, handleInputChange  } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React, { Component } from 'react'
import { globalStyles } from './globalStyles';

export default class SingUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
        //declaracion de varibles
        nombre: "",
        correo: "",
        password: "",
        nombreError: false,
        correoError: false,
        passwordError: false,
    };
  }

  handleInputChange = (fieldName, text) => {
    this.setState({ [fieldName]: text });
  };

  render() {
    const { nombreError, correoError, passwordError } = this.state;

    const clickCrearCuenta=()=>{
      _this = this;
      const { nombre, correo, password } = this.state;
      // Verifica si los campos están vacíos y muestra mensajes de error si es necesario
      if (nombre === "") {
        this.setState({ nombreError: true });
      }else{
        this.setState({ nombreError: false });
      }
      if (correo === "") {
        this.setState({ correoError: true });
      }else{
        this.setState({ correoError: false });
      }
      if (password === "") {
        this.setState({ passwordError: true });
      }else{
        this.setState({ passwordError: false });
      }
      if (nombre === "" || correo === "" || password === "") {
        Alert.alert("Todos los campos deben estar llenos");
      }else{
        //Codigo para enviar y recibir datos del server
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                // Typical action to be performed when the document is ready:
                console.log(xhttp.responseText);
                if(xhttp.responseText==="1"){
                    Alert.alert("Usuario registrado");
                    _this.props.navigation.goBack();
                }else{
                    Alert.alert("Error");
                }
                _this.setState({ nombre: ""});
                _this.setState({ correo: ""});
                _this.setState({ password: ""});
            }
        };
        xhttp.open("GET", "https://entradascucei.000webhostapp.com/insertarUsuario.php?nombre="+this.state.nombre+"&correo="+this.state.correo+"&password="+this.state.password, true);
        //xhttp.open("GET", "https://xerophilous-loudspe.000webhostapp.com/datos2.php", true);
        xhttp.send();
      }
    }

    return (
      
      <View style={globalStyles.contenedorPrincipal}>
        <View style={[globalStyles.header, globalStyles.centrar]}> 
            <View style={[globalStyles.formaContenedorTituloRegistro, globalStyles.tamanioContenedor]}>
              <Text style={globalStyles.textoTitulos}>REGISTRO</Text>
            </View>
        </View>

        <View style={globalStyles.centrar}>
          <Text style={styles.tituloInputFormulario}>Nombre</Text>
          <TextInput
            style={[styles.input, nombreError && styles.errorInput]}
            onChangeText={nombre=>this.setState({nombre})}
          ></TextInput>
          {nombreError && <Text style={styles.errorMessage}>Campo requerido</Text>}

          <Text style={styles.tituloInputFormulario}>Correo</Text>
          <TextInput
            style={[styles.input, correoError && styles.errorInput]}
            onChangeText={correo=>this.setState({correo})}
          ></TextInput>
          {correoError && <Text style={styles.errorMessage}>Campo requerido</Text>}

          <Text style={styles.tituloInputFormulario}>Contraseña</Text>
          <TextInput
            style={[styles.input, passwordError && styles.errorInput]}
            onChangeText={password=>this.setState({password})}
          ></TextInput>
          {passwordError && <Text style={styles.errorMessage}>Campo requerido</Text>}

          <TouchableOpacity onPress={clickCrearCuenta}>
            <View style={[globalStyles.boton, globalStyles.centrar, styles.abajo]}>
              <Text style={globalStyles.txtBoton}>Crear cuenta</Text>
            </View>
          </TouchableOpacity>
        </View>
        
      </View>
    );
  }
}
const styles = StyleSheet.create({
  input:{
    backgroundColor: "#005FB7",
    height: hp('6.5%'),
    width: wp('90%'),
    fontSize: 20,
    borderRadius: 15,
  },
  tituloInputFormulario:{
      fontSize: 24,
      marginTop: 10,
      color: "white",
      fontWeight: "bold",
      marginBottom: 7,
  },
  abajo:{
    marginTop: 40,
  },
  errorInput: {
    borderColor: 'red',
    borderWidth: 4,
  },
  errorMessage: {
    color: 'red',
    fontSize: 17,
    fontWeight: 'bold',
  },
})