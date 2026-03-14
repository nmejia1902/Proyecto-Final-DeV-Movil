import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function PantallaInicio({ navigation }: any) {

 return (
  <View style={styles.container}>

   <Text style={styles.titulo}>🍰 ORDERA</Text>

   <TouchableOpacity
    style={styles.boton}
    onPress={() => navigation.navigate("PantallaClientes")}
   >
    <Text style={styles.textoBoton}>👥 Administración de clientes</Text>
   </TouchableOpacity>

   <TouchableOpacity
    style={styles.boton}
    onPress={() => navigation.navigate("CrearPedido")}
   >
    <Text style={styles.textoBoton}>🧾 Agregar pedidos</Text>
   </TouchableOpacity>

   <TouchableOpacity
    style={styles.boton}
    onPress={() => navigation.navigate("HistorialPedidos")}
   >
    <Text style={styles.textoBoton}>📋 Historial de pedidos</Text>
   </TouchableOpacity>

   <TouchableOpacity
    style={styles.boton}
    onPress={() => navigation.navigate("EditarCatalogo")}
   >
    <Text style={styles.textoBoton}>🧁 Editar catálogo</Text>
   </TouchableOpacity>

  </View>
 );
}

const styles = StyleSheet.create({

 container:{
  flex:1,
  justifyContent:"center",
  alignItems:"center",
  backgroundColor:"#FFF6F2",
  padding:20
 },

 titulo:{
  fontSize:34,
  marginBottom:40,
  fontWeight:"bold",
  color:"#5F5F5F"
 },

 boton:{
  width:"85%",
  padding:18,
  backgroundColor:"#F8BBD0",
  marginBottom:15,
  alignItems:"center",
  borderRadius:15,
  shadowColor:"#000",
  shadowOpacity:0.08,
  shadowRadius:8,
  elevation:4
 },

 textoBoton:{
  fontSize:16,
  fontWeight:"600",
  color:"#444"
 }

});