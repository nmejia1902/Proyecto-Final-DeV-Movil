import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { api } from "../servicios/api";

export default function PantallaEditarCatalogo({ navigation }: any){

 const [productos,setProductos] = useState([]);

 const obtenerProductos = async () => {

  try{

   const res = await api.get("/productos");
   setProductos(res.data);

  }catch(error){
   console.log(error);
  }

 };

 useEffect(()=>{
  obtenerProductos();
 },[]);

 return(

  <View style={styles.container}>

   <Text style={styles.titulo}>Catalogo</Text>

   <FlatList
    data={productos}
    keyExtractor={(item:any)=>item.id.toString()}
    renderItem={({item}:any)=>(
     <View style={styles.item}>

      <Text>{item.nombre}</Text>
      <Text>L {item.precio}</Text>

      <Button
       title="Eliminar"
       onPress={()=>console.log("eliminar")}
      />

     </View>
    )}
   />

   <Button
    title="Agregar producto"
    onPress={()=>navigation.navigate("AgregarProducto")}
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

 item:{
  borderWidth:1,
  padding:10,
  marginBottom:10
 }

});