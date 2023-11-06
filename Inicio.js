import { StyleSheet, Text, View, Image,TouchableOpacity, Modal, TextInput, Alert } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React, { Component } from 'react'
import { globalStyles } from './globalStyles';

export default class Inicio extends Component {
  constructor(props) {
    super(props);
    this.state = {
        //declaracion de varibles
        modalVentanaLogin: false,
        correo: "",
        password: "",
        correoError: false,
        passwordError: false,
    };
  }

  render() {
    const { correoError, passwordError } = this.state;
    const clickLogin=() => {
      this.setState({modalVentanaLogin:true});
    }
    const cierraModalLogin=() =>{
      let correo = this.state.correo;
      let password = this.state.password;
      _this = this;
      // Validación de campos vacíos
      let correoError = false;
      let passwordError = false;

      if (correo === "") {
        correoError = true;
      }
      if (password === "") {
        passwordError = true;
      }
      this.setState({ correoError, passwordError });

      if (correoError || passwordError) {
        Alert.alert("Todos los campos deben estar llenos");
      } else{
        this.setState({ modalVentanaLogin: false });
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            const response = JSON.parse(xhttp.responseText);

            if (response.errorCode === 3) {
              Alert.alert('Correo desconocido, regístrate');
            } else if (response.errorCode === 0) {
              Alert.alert('Contraseña incorrecta, inténtalo de nuevo');
            } else {
              const nombre = response.nombre;
              const id = response.id;
              _this.props.navigation.navigate('Cita', { nombre, id });
            }
            _this.setState({ correo: '' });
            _this.setState({ password: '' });
          }
        };
        xhttp.open("GET", "https://entradascucei.000webhostapp.com/login.php?correo="+this.state.correo+"&password="+this.state.password, true);
        //xhttp.open("GET", "https://xerophilous-loudspe.000webhostapp.com/datos2.php", true);
        xhttp.send();
      }
      
  }
    const cambiarVentanaSingUp= () =>{
      this.props.navigation.navigate('SingUp')
    }
    return (
      <View style={globalStyles.contenedorPrincipal}>
        <View style={globalStyles.centrar}>
          <Image
            style={styles.imangeEscudoCucei}
            source={require("./Img/Escudo_CUCEI.png")}
          />
        </View>
        <View style={[globalStyles.centrar, styles.contenedorTextoTitulos]}>
          <Text style={styles.textoTitulos}>Entradas Cucei</Text>
        </View>

        <View style={styles.contenedorLogin}>
          <TouchableOpacity onPress={clickLogin}>
            <View style={[globalStyles.boton, styles.botonIniciarSesion, globalStyles.centrar]}>
              <Text style={globalStyles.txtBoton}>Iniciar Sesion</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={cambiarVentanaSingUp}>
            <View style={[globalStyles.boton, globalStyles.centrar]}>
              <Text style={globalStyles.txtBoton}>Registrarse</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Modal ventana correo */}
        <Modal
                transparent={true}
                visible={this.state.modalVentanaLogin}
                //animationType='slide'
                animationType='fade'
            >
                <View style={styles.estilosModal}>
                    <Text style={styles.tituloInputFormulario}>Correo</Text>
                    <TextInput style={styles.input} onChangeText={correo=>this.setState({correo})}></TextInput>
                    {correoError && <Text style={styles.errorMessage}>Campo requerido</Text>}

                    <Text style={styles.tituloInputFormulario}>Password </Text>
                    <TextInput style={styles.input} onChangeText={password=>this.setState({password})}></TextInput>
                    {passwordError && <Text style={styles.errorMessage}>Campo requerido</Text>}

                    <TouchableOpacity style={[styles.btnAceptar, globalStyles.centrar]} onPress={cierraModalLogin}>
                        <Text style={globalStyles.txtBoton}>Aceptar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  imangeEscudoCucei:{
    marginTop: 70,
    width: wp('55%'),
    height: hp('35%'),
  },
  textoTitulos:{
    color: "white",
    textAlign: "center",
    fontSize: 40,
    fontWeight: 'bold',
  },
  contenedorTextoTitulos:{
    width: wp('100%'),
    height: hp('10%'),
  },
  contenedorLogin:{
    justifyContent: 'center', // Centra verticalmente
    alignItems: 'center', // Centra horizontalmente
    width: wp('100%'),
    height: hp('25%'),
    marginTop: 40,
    borderRadius: 25,
  },
  botonIniciarSesion:{
    
    marginBottom: 30,
  },
  estilosModal:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderRadius: 40,
    width: wp('90%'),
    height: hp('40%'), // Aumenta la altura para centrar verticalmente
    marginTop: hp('30%'), // Ajusta el valor para centrar verticalmente
    marginLeft: wp('5%'), // Ajusta el valor para centrar verticalmente
  },
  tituloInputFormulario:{
      fontSize: 20,
      marginTop: 10,
      color: "white",
      fontWeight: "bold",
      marginBottom: 5,
  },
  input:{
      backgroundColor: "rgba(150, 150, 150, 0.8)",
      width: wp('82%'),
      height: hp('5%'), // Aumenta la altura para centrar verticalmente
      fontSize: 15,
      marginBottom: 7,
      borderColor: "#808080",
  },
  btnAceptar:{
      //borderWidth: 2,
      width: wp('50%'),
      height: hp('7%'), // Aumenta la altura para centrar verticalmente
      marginTop: 10,
      marginBottom: 10,
      borderRadius: 40,
      backgroundColor: "#2196F3",
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
});