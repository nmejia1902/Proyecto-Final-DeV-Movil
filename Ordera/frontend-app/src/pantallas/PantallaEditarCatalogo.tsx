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

   <Text style={styles.titulo}>🧁 Catálogo</Text>

   <FlatList
    data={productos}
    keyExtractor={(item:any)=>item.id.toString()}
    renderItem={({item}:any)=>(
     <View style={styles.item}>

      <View>
        <Text style={styles.nombre}>{item.nombre}</Text>
        <Text style={styles.precio}>L {item.precio}</Text>
      </View>

      <View style={styles.botonEliminar}>
        <Button
         title="Eliminar"
         color="#FF8A80"
         onPress={()=>console.log("eliminar")}
        />
      </View>

     </View>
    )}
   />

   <View style={styles.botonAgregar}>
    <Button
     title="Agregar producto"
     color="#F8BBD0"
     onPress={()=>navigation.navigate("AgregarProducto")}
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
  textAlign:"center",
  color:"#5F5F5F"
 },

 item:{
  backgroundColor:"#FFFFFF",
  padding:15,
  marginBottom:12,
  borderRadius:12,
  flexDirection:"row",
  justifyContent:"space-between",
  alignItems:"center",
  shadowColor:"#000",
  shadowOpacity:0.05,
  shadowRadius:5,
  elevation:2
 },

 nombre:{
  fontSize:16,
  fontWeight:"bold",
  color:"#444"
 },

 precio:{
  color:"#666",
  marginTop:4
 },

 botonEliminar:{
  borderRadius:10,
  overflow:"hidden"
 },

 botonAgregar:{
  marginTop:10,
  borderRadius:10,
  overflow:"hidden"
 }

});