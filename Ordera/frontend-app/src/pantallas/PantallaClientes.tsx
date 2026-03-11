import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { api } from "../servicios/api";

export default function PantallaClientes() {

 const [clientes,setClientes] = useState([]);

 const obtenerClientes = async () => {
  try{
   const res = await api.get("/clientes");
   setClientes(res.data);
  }catch(error){
   console.log(error);
  }
 };

 useEffect(()=>{
  obtenerClientes();
 },[]);

 return(

  <View style={styles.container}>

   <Text style={styles.titulo}>Clientes</Text>

   <FlatList
    data={clientes}
    keyExtractor={(item:any)=>item.id.toString()}
    renderItem={({item}:any)=>(
     <View style={styles.item}>
      <Text>{item.nombre}</Text>
      <Text>{item.telefono}</Text>
     </View>
    )}
   />

   <Button
    title="Agregar cliente"
    onPress={()=>console.log("abrir formulario")}
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
  marginBottom:10
 },

 item:{
  padding:10,
  borderBottomWidth:1
 }

});