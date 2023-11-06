import { StyleSheet, Text, View, Image,TouchableOpacity, Modal, TextInput, Alert } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React, { Component } from 'react'
import { globalStyles } from './globalStyles';

export default class Cita extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: this.props.route.params.nombre,
      id: this.props.route.params.id,
      response:[],
    };
    this.focusListener = null;
  }
  componentDidMount() {
    // Llama a tu función personalizada aquí
    this.verificarExistenciaCita();
    this.focusListener = this.props.navigation.addListener('focus', () => {
      // Este código se ejecutará cuando la pantalla obtenga el enfoque
      this.verificarExistenciaCita();
    });
  }
  componentWillUnmount() {
    // Elimina el listener cuando el componente se desmonta para evitar fugas de memoria
    if (this.focusListener) {
      this.focusListener();
    }
  }

  verificarExistenciaCita() {
    _this = this;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        const response = JSON.parse(xhttp.responseText);
        if(response.errorCode===1){
          const partes = response.diaEntrada.split("-");
          const diaEntrada = `${partes[2]}/${partes[1]}/${partes[0]}`;
          response.diaEntrada=diaEntrada;
        }
        _this.setState({ response });
      }
    };
    xhttp.open("GET", "https://entradascucei.000webhostapp.com/recuperarCita.php?usuarioId="+this.state.id, true);
    //xhttp.open("GET", "https://xerophilous-loudspe.000webhostapp.com/datos2.php", true);
    xhttp.send();
  }

  render() {

    const clickCrearCita = ()=>{
      if(this.state.response['errorCode']==3){
        this.props.navigation.navigate('CrearCita', {nombre:this.state.nombre, id:this.state.id})
      }else{
        Alert.alert('Ya tienes una cita');
      }
      
    }
    const clickModificarCita = ()=>{
      if(this.state.response['errorCode']==3){
        Alert.alert('No hay una cita');
      }else{
        this.props.navigation.navigate('ModificarCita', {response: this.state.response})
      }
    }
    const clickEliminarCita = ()=>{
      if(this.state.response['errorCode']==3){
        Alert.alert('No hay una cita');
      }else{
        this.props.navigation.navigate('EliminarCita', {response: this.state.response})
      }
    }

    return (
      <View style={globalStyles.contenedorPrincipal}>
        <View style={[globalStyles.header, globalStyles.centrar]}> 
            <View style={[globalStyles.formaContenedorTituloRegistro, globalStyles.tamanioContenedor]}>
              <Text style={globalStyles.textoTitulos}>CITAS</Text>
            </View>
        </View>
        
        <View style={[globalStyles.centrar, styles.bajarContenedor]}>
          <TouchableOpacity onPress={clickCrearCita}>
            <View style={[globalStyles.boton, globalStyles.centrar, styles.separarBotonAbajo, styles.botonContainer]}>
              <Text style={styles.txtBoton}>Crear</Text>
              <Image source={require('./Img/icono-crear.png')} style={styles.icono} />
              
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={clickModificarCita}>
            <View style={[globalStyles.boton, globalStyles.centrar, styles.separarBotonAbajo, styles.botonContainer]}>
              <Text style={styles.txtBoton}>Modificar</Text>
              <Image source={require('./Img/icono-modificar.png')} style={styles.icono} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={clickEliminarCita}>
            <View style={[globalStyles.boton, globalStyles.centrar, styles.separarBotonAbajo, styles.botonContainer]}>
              <Text style={styles.txtBoton}>Eliminar</Text>
              <Image source={require('./Img/icono-eliminar.png')} style={styles.icono} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  bajarContenedor:{
    marginTop: 140,
  },
  icono: {
    width: wp('10%'),
    height: hp('5%'),
    marginLeft: 10, // Espacio entre el texto y el ícono
  },
  botonContainer: {
    marginBottom: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtBoton:{
    fontSize: 30,
    textAlign: 'center',
    color: '#000000',
    fontWeight: 'bold',
    marginLeft: 40
  },
})