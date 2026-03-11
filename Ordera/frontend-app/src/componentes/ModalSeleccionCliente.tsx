import { Modal, View, TextInput, FlatList, TouchableOpacity, Text } from "react-native";
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

  <Modal visible={visible}>

   <View style={{padding:20}}>

    <TextInput
     placeholder="Buscar cliente"
     value={busqueda}
     onChangeText={setBusqueda}
     style={{borderWidth:1,padding:10,marginBottom:10}}
    />

    <FlatList
     data={filtrados}
     keyExtractor={(item)=>item.id.toString()}
     renderItem={({item})=>(
      <TouchableOpacity
       onPress={()=>{
        setCliente(item);
        setVisible(false);
       }}
      >
       <Text style={{padding:10}}>{item.nombre}</Text>
      </TouchableOpacity>
     )}
    />

   </View>

  </Modal>

 );

}