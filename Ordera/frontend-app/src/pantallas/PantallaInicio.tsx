import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function PantallaInicio({ navigation }: any) {

 return (
  <View style={styles.container}>

   <Text style={styles.titulo}>ORDERA</Text>

   <TouchableOpacity
    style={styles.boton}
    onPress={() => navigation.navigate("PantallaClientes")}
   >
    <Text>Administracion de clientes</Text>
   </TouchableOpacity>

   <TouchableOpacity
    style={styles.boton}
    onPress={() => navigation.navigate("CrearPedido")}
   >
    <Text>Agregar pedidos</Text>
   </TouchableOpacity>

   <TouchableOpacity
    style={styles.boton}
    onPress={() => navigation.navigate("HistorialPedidos")}
   >
    <Text>Historial pedidos</Text>
   </TouchableOpacity>

   <TouchableOpacity
    style={styles.boton}
    onPress={() => navigation.navigate("EditarCatalogo")}
   >
    <Text>Editar catalogo</Text>
   </TouchableOpacity>

  </View>
 );
}

const styles = StyleSheet.create({
 container:{
  flex:1,
  justifyContent:"center",
  alignItems:"center"
 },
 titulo:{
  fontSize:30,
  marginBottom:30
 },
 boton:{
  width:"70%",
  padding:15,
  backgroundColor:"#D6A3A3",
  marginBottom:10,
  alignItems:"center",
  borderRadius:8
 }
});