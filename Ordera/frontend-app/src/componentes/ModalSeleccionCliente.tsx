import { Modal, View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { api } from "../servicios/api";

export default function ModalSeleccionCliente({ visible, setVisible, setCliente }: any){

 const [busqueda,setBusqueda] = useState("");
 const [clientes,setClientes] = useState<any[]>([]);

 useEffect(()=>{
  if(visible){
   cargarClientes();
  }
 },[visible]);

 const cargarClientes = async () => {

  try{

   const res = await api.get("/clientes");

   setClientes(res.data);

  }catch(error){

   console.log("Error cargando clientes",error);

  }

 };

 const filtrados = clientes.filter(c =>
  c.nombre.toLowerCase().includes(busqueda.toLowerCase())
 );

 return(

  <Modal visible={visible} animationType="slide">

   <View style={styles.container}>

    <Text style={styles.titulo}>Seleccionar cliente</Text>

    <TextInput
     placeholder="Buscar cliente"
     value={busqueda}
     onChangeText={setBusqueda}
     style={styles.busqueda}
     placeholderTextColor="#999"
    />

    <FlatList
     data={filtrados}
     keyExtractor={(item)=>item.id.toString()}
     renderItem={({item})=>(

      <TouchableOpacity
       style={styles.card}
       onPress={()=>{
        setCliente(item);
        setVisible(false);
       }}
      >

       <Text style={styles.nombre}>{item.nombre}</Text>

       {item.telefono && (
        <Text style={styles.info}>{item.telefono}</Text>
       )}

       {item.direccion && (
        <Text style={styles.info}>{item.direccion}</Text>
       )}

      </TouchableOpacity>

     )}
    />

    <TouchableOpacity
     style={styles.botonCerrar}
     onPress={()=>setVisible(false)}
    >
     <Text style={styles.textoCerrar}>Cerrar</Text>
    </TouchableOpacity>

   </View>

  </Modal>

 );

}

const styles = StyleSheet.create({

 container:{
  flex:1,
  padding:20,
  backgroundColor:"#FFF6F2"
 },

 titulo:{
  fontSize:22,
  fontWeight:"bold",
  marginBottom:15,
  textAlign:"center",
  color:"#5F5F5F"
 },

 busqueda:{
  backgroundColor:"#FFF",
  padding:12,
  borderRadius:10,
  borderWidth:1,
  borderColor:"#F8BBD0",
  marginBottom:15
 },

 card:{
  backgroundColor:"#FFF",
  padding:15,
  borderRadius:12,
  marginBottom:10,
  shadowColor:"#000",
  shadowOpacity:0.05,
  shadowRadius:5,
  elevation:2
 },

 nombre:{
  fontWeight:"bold",
  fontSize:16,
  color:"#444"
 },

 info:{
  color:"#666",
  marginTop:3
 },

 botonCerrar:{
  marginTop:10,
  backgroundColor:"#F8BBD0",
  padding:15,
  borderRadius:12,
  alignItems:"center"
 },

 textoCerrar:{
  color:"#FFF",
  fontWeight:"bold"
 }

});