import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import { useContext } from "react";
import { PedidoContext } from "../context/PedidoContext";
import SelectorCliente from "../componentes/SelectorCliente";
import ItemProductoPedido from "../componentes/ItemProductoPedido";

export default function PantallaCrearPedido({ navigation }: any) {

 const { cliente, setCliente, productos, total, confirmarPedido } = useContext(PedidoContext);

 return (
  <View style={styles.container}>

   <Text style={styles.titulo}>Crear pedido</Text>

   <Text style={styles.subtitulo}>Cliente</Text>

   <SelectorCliente
    cliente={cliente}
    setCliente={setCliente}
   />

   <Text style={styles.subtitulo}>Productos agregados</Text>

   <FlatList
    data={productos}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({ item }) =>
      <ItemProductoPedido producto={item} />
    }
   />

   <Text style={styles.total}>
    Total: L {total}
   </Text>

   <Button
    title="Agregar producto"
    onPress={() => navigation.navigate("Catalogo")}
   />

   <Button
    title="Confirmar pedido"
    onPress={confirmarPedido}
   />

  </View>
 );
}

const styles = StyleSheet.create({
 container:{
  flex:1,
  padding:20
 },
 titulo:{
  fontSize:24,
  marginBottom:20
 },
 subtitulo:{
  marginTop:15,
  marginBottom:10,
  fontWeight:"bold"
 },
 total:{
  marginTop:20,
  fontSize:18
 }
});