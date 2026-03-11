import { View, Text, Button, StyleSheet } from "react-native";
import { useContext } from "react";
import { PedidoContext } from "../context/PedidoContext";

export default function TarjetaProducto({ producto }: any){

 const { agregarProducto } = useContext(PedidoContext);

 return(

  <View style={styles.card}>

   <Text style={styles.nombre}>{producto.nombre}</Text>

   <Text>L {producto.precio}</Text>

   <Button
    title="Agregar"
    onPress={()=>agregarProducto(producto)}
   />

  </View>

 );

}

const styles = StyleSheet.create({

 card:{
  borderWidth:1,
  padding:15,
  marginBottom:10,
  borderRadius:8
 },

 nombre:{
  fontSize:16,
  marginBottom:5
 }

});