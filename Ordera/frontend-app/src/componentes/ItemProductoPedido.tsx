import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useContext } from "react";
import { PedidoContext } from "../context/PedidoContext";

export default function ItemProductoPedido({ producto }: any){

 const { eliminarProducto } = useContext(PedidoContext);

 return(

  <View style={styles.item}>

   <View>
    <Text style={styles.nombre}>{producto.nombre}</Text>
    <Text>L {producto.precio}</Text>
   </View>

   <TouchableOpacity
    onPress={()=>eliminarProducto(producto.id)}
   >
    <Text style={styles.eliminar}>Eliminar</Text>
   </TouchableOpacity>

  </View>

 );

}

const styles = StyleSheet.create({

 item:{
  flexDirection:"row",
  justifyContent:"space-between",
  padding:10,
  borderBottomWidth:1
 },

 nombre:{
  fontSize:16
 },

 eliminar:{
  color:"red"
 }

});