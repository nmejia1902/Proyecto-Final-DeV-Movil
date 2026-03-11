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

   <Text style={styles.titulo}>Historial de pedidos</Text>

   <FlatList
    data={pedidos}
    keyExtractor={(item:any)=>item.id.toString()}
    renderItem={({item}:any)=>(

     <View style={styles.card}>

      <Text style={styles.cliente}>
       Cliente: {item.Cliente?.nombre}
      </Text>

      <Text>
       Usuario: {item.Usuario?.usuario}
      </Text>

      <Text>
       Total: L {item.total}
      </Text>

      <Text>
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
  padding:20
 },

 titulo:{
  fontSize:22,
  marginBottom:15
 },

 card:{
  borderWidth:1,
  padding:15,
  marginBottom:10,
  borderRadius:8
 },

 cliente:{
  fontWeight:"bold"
 }

});