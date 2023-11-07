import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import React, {Component} from 'react';
import {globalStyles} from './globalStyles';

export default class Cita extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const clickCrearCita = () => {
      this.props.navigation.navigate('CrearCita');
    };
    const clickModificarCita = () => {
      this.props.navigation.navigate('ModificarCita');
    };
    const clickEliminarCita = () => {
      this.props.navigation.navigate('EliminarCita');
    };

    return (
      <View style={globalStyles.contenedorPrincipal}>
        <View style={[globalStyles.header, globalStyles.centrar]}>
          <View
            style={[
              globalStyles.formaContenedorTituloRegistro,
              globalStyles.tamanioContenedor,
            ]}>
            <Text style={globalStyles.textoTitulos}>CITAS</Text>
          </View>
        </View>

        <View style={[globalStyles.centrar, styles.bajarContenedor]}>
          <TouchableOpacity onPress={clickCrearCita}>
            <View
              style={[
                globalStyles.boton,
                globalStyles.centrar,
                styles.separarBotonAbajo,
                styles.botonContainer,
              ]}>
              <Text style={styles.txtBoton}>Crear</Text>
              <Image
                source={require('./Img/icono-crear.png')}
                style={styles.icono}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={clickModificarCita}>
            <View
              style={[
                globalStyles.boton,
                globalStyles.centrar,
                styles.separarBotonAbajo,
                styles.botonContainer,
              ]}>
              <Text style={styles.txtBoton}>Modificar</Text>
              <Image
                source={require('./Img/icono-modificar.png')}
                style={styles.icono}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={clickEliminarCita}>
            <View
              style={[
                globalStyles.boton,
                globalStyles.centrar,
                styles.separarBotonAbajo,
                styles.botonContainer,
              ]}>
              <Text style={styles.txtBoton}>Eliminar</Text>
              <Image
                source={require('./Img/icono-eliminar.png')}
                style={styles.icono}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  bajarContenedor: {
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
  txtBoton: {
    fontSize: 30,
    textAlign: 'center',
    color: '#000000',
    fontWeight: 'bold',
    marginLeft: 40,
  },
});
