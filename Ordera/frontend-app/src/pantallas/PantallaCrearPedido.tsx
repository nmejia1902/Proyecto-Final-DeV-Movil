import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import { useContext } from "react";
import { PedidoContext } from "../context/PedidoContext";
import SelectorCliente from "../componentes/SelectorCliente";
import ItemProductoPedido from "../componentes/ItemProductoPedido";

export default function PantallaCrearPedido({ navigation }: any) {

 const { cliente, setCliente, productos, total, confirmarPedido } = useContext(PedidoContext);

 return (
  <View style={styles.container}>

   <Text style={styles.titulo}>🧾 Crear pedido</Text>

   <View style={styles.card}>
     <Text style={styles.subtitulo}>Cliente</Text>

     <SelectorCliente
      cliente={cliente}
      setCliente={setCliente}
     />
   </View>

   <View style={styles.card}>
     <Text style={styles.subtitulo}>Productos agregados</Text>

     <FlatList
      data={productos}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) =>
        <ItemProductoPedido producto={item} />
      }
     />
   </View>

   <View style={styles.totalBox}>
     <Text style={styles.total}>
      Total: L {total}
     </Text>
   </View>

   <View style={styles.boton}>
     <Button
      title="Agregar producto"
      color="#B2DFDB"
      onPress={() => navigation.navigate("Catalogo")}
     />
   </View>

   <View style={styles.boton}>
     <Button
      title="Confirmar pedido"
      color="#F8BBD0"
      onPress={confirmarPedido}
     />
   </View>

  </View>
 );
}

const styles = StyleSheet.create({

 container:{
  flex:1,
  padding:20,
  backgroundColor:"#FFF6F2"
 },

 titulo:{
  fontSize:26,
  marginBottom:20,
  fontWeight:"bold",
  color:"#5F5F5F",
  textAlign:"center"
 },

 subtitulo:{
  marginBottom:10,
  fontWeight:"bold",
  color:"#444",
  fontSize:16
 },

 card:{
  backgroundColor:"#FFFFFF",
  padding:15,
  borderRadius:15,
  marginBottom:15,
  shadowColor:"#000",
  shadowOpacity:0.08,
  shadowRadius:8,
  elevation:3
 },

 totalBox:{
  backgroundColor:"#FFE0EC",
  padding:15,
  borderRadius:12,
  alignItems:"center",
  marginBottom:15
 },

 total:{
  fontSize:20,
  fontWeight:"bold",
  color:"#444"
 },

 boton:{
  marginBottom:10,
  borderRadius:10,
  overflow:"hidden"
 }

});