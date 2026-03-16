import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import { useEffect, useState } from "react";
import { api } from "../servicios/api";

export default function PantallaHistorialPedidos(){

 const [pedidos,setPedidos] = useState<any[]>([]);

 const obtenerPedidos = async () => {

  try{

   const res = await api.get("/pedidos");

   setPedidos(res.data);

  }catch(error){

   console.log("Error cargando pedidos",error);

  }

 };

 useEffect(()=>{
  obtenerPedidos();
 },[]);

 const cambiarEstado = async (pedidoId:number, estado:number) => {

  try{

   await api.put(`/pedidos/${pedidoId}/estado`,{
    estado_id: estado
   });

   obtenerPedidos();

  }catch(error){

   console.log("Error cambiando estado",error);

  }

 };

const colorEstado = (estadoId:number) => {

 switch(estadoId){

  case 1:
   return "#FFD54F";   // Pendiente

  case 2:
   return "#FF8A65";   // En proceso

  case 3:
   return "#81C784";   // Entregado

  default:
   return "#ccc";

 }

};

 return(

  <View style={styles.container}>

   <Text style={styles.titulo}>📋 Historial de pedidos</Text>

   <FlatList
    data={pedidos}
    keyExtractor={(item:any)=>item.id.toString()}
    renderItem={({item}:any)=>(

     <View style={styles.card}>

      <Text style={styles.cliente}>
       👤 Cliente: {item.Cliente?.nombre}
      </Text>

      <Text style={styles.detalle}>
       Usuario: {item.Usuario?.usuario}
      </Text>

      <Text style={styles.total}>
       Total: L {item.total}
      </Text>

      <View style={styles.estadoContainer}>

                <View
                    style={[
                        styles.estadoPunto,
                        { backgroundColor: colorEstado(item.estado_id) }
                    ]}
                />

       <Text style={styles.estadoTexto}>
        {item.Estado?.nombre}
       </Text>

      </View>

      {item.estado_id === 1 && (
       <Button
        title="Marcar en proceso"
        onPress={()=>cambiarEstado(item.id,2)}
       />
      )}

      {item.estado_id === 2 && (
       <Button
        title="Marcar entregado"
        onPress={()=>cambiarEstado(item.id,3)}
       />
      )}

     </View>

    )}
   />

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
  textAlign:"center",
  color:"#5F5F5F"
 },

 card:{
  backgroundColor:"#FFFFFF",
  padding:15,
  marginBottom:12,
  borderRadius:15,
  shadowColor:"#000",
  shadowOpacity:0.05,
  shadowRadius:6,
  elevation:2
 },

 cliente:{
  fontWeight:"bold",
  fontSize:16,
  color:"#444",
  marginBottom:4
 },

 detalle:{
  color:"#666",
  marginBottom:4
 },

 total:{
  fontWeight:"bold",
  color:"#D16BA5",
  marginBottom:8
 },

 estadoContainer:{
  flexDirection:"row",
  alignItems:"center",
  marginBottom:10
 },

 estadoPunto:{
  width:12,
  height:12,
  borderRadius:6,
  marginRight:8
 },

 estadoTexto:{
  fontWeight:"bold",
  color:"#555"
 }

});