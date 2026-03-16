import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useContext } from "react";
import { PedidoContext } from "../context/PedidoContext";

export default function ItemProductoPedido({ producto }: any){

 const { eliminarProducto, actualizarCantidadProducto } = useContext(PedidoContext);

 const cantidad = producto.cantidad ?? 1;
 const precio = parseFloat(producto.precio);
 const subtotal = (precio * cantidad).toFixed(2);

 const aumentar = () => {
  actualizarCantidadProducto(producto.id, cantidad + 1);
 };

 const disminuir = () => {
  if (cantidad <= 1) {
   eliminarProducto(producto.id);
  } else {
   actualizarCantidadProducto(producto.id, cantidad - 1);
  }
 };

 return(

  <View style={styles.item}>

   {producto.imagen && (
    <Image source={{ uri: producto.imagen }} style={styles.imagen}/>
   )}

   <View style={styles.info}>
    <Text style={styles.nombre}>{producto.nombre}</Text>
    <Text style={styles.precio}>L {precio}</Text>

    <View style={styles.cantidadBox}>

     <TouchableOpacity style={styles.boton} onPress={disminuir}>
      <Text style={styles.botonTexto}>-</Text>
     </TouchableOpacity>

     <Text style={styles.cantidad}>{cantidad}</Text>

     <TouchableOpacity style={styles.boton} onPress={aumentar}>
      <Text style={styles.botonTexto}>+</Text>
     </TouchableOpacity>

    </View>

    <Text style={styles.subtotal}>Subtotal: L {subtotal}</Text>
   </View>

   <TouchableOpacity onPress={()=>eliminarProducto(producto.id)}>
    <Text style={styles.eliminar}>Eliminar</Text>
   </TouchableOpacity>

  </View>

 );

}

const styles = StyleSheet.create({

 item:{
  flexDirection:"row",
  alignItems:"center",
  padding:10,
  borderBottomWidth:1
 },

 imagen:{
  width:60,
  height:60,
  borderRadius:8,
  marginRight:10
 },

 info:{
  flex:1
 },

 nombre:{
  fontSize:16,
  fontWeight:"bold"
 },

 precio:{
  color:"#666"
 },

 cantidadBox:{
  flexDirection:"row",
  alignItems:"center",
  marginVertical:5
 },

 boton:{
  backgroundColor:"#F8BBD0",
  width:30,
  height:30,
  alignItems:"center",
  justifyContent:"center",
  borderRadius:6
 },

 botonTexto:{
  color:"#fff",
  fontSize:18
 },

 cantidad:{
  marginHorizontal:10,
  fontSize:16
 },

 subtotal:{
  fontWeight:"bold"
 },

 eliminar:{
  color:"red",
  marginLeft:10
 }

});