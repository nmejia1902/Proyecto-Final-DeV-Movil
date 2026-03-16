import { View, Text, Button, StyleSheet, Image } from "react-native";
import { useContext } from "react";
import { PedidoContext } from "../context/PedidoContext";

export default function TarjetaProducto({ producto }: any){

 const { agregarProducto } = useContext(PedidoContext);

 return(

  <View style={styles.card}>

   {producto.imagen && (
    <Image
     source={{ uri: producto.imagen }}
     style={styles.imagen}
    />
   )}

   <View style={styles.info}>
    <Text style={styles.nombre}>{producto.nombre}</Text>
    <Text style={styles.precio}>L {producto.precio}</Text>

    <Button
     title="Agregar"
     onPress={()=>agregarProducto(producto)}
    />
   </View>

  </View>

 );

}

const styles = StyleSheet.create({

 card:{
  borderWidth:1,
  padding:15,
  marginBottom:10,
  borderRadius:8,
  flexDirection:"row",
  alignItems:"center",
  backgroundColor:"#fff"
 },

 imagen:{
  width:70,
  height:70,
  borderRadius:10,
  marginRight:12
 },

 info:{
  flex:1
 },

 nombre:{
  fontSize:16,
  marginBottom:5,
  fontWeight:"bold"
 },

 precio:{
  marginBottom:8
 }

});