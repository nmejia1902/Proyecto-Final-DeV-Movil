import { View, Text, FlatList, StyleSheet } from "react-native";
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

      <Text style={styles.estado}>
       Estado: {item.Estado?.nombre}
      </Text>

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
  marginBottom:4
 },

 estado:{
  color:"#555"
 }

});