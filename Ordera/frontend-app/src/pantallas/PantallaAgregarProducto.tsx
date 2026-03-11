import { View, TextInput, Button, StyleSheet } from "react-native";
import { useState } from "react";
import { api } from "../servicios/api";

export default function PantallaAgregarProducto({ navigation }: any){

 const [nombre,setNombre] = useState("");
 const [precio,setPrecio] = useState("");
 const [descripcion,setDescripcion] = useState("");

 const guardarProducto = async () => {

  try{

   await api.post("/productos",{
    nombre,
    precio,
    descripcion
   });

   navigation.goBack();

  }catch(error){
   console.log(error);
  }

 };

 return(

  <View style={styles.container}>

   <TextInput
    placeholder="Nombre"
    value={nombre}
    onChangeText={setNombre}
    style={styles.input}
   />

   <TextInput
    placeholder="Precio"
    value={precio}
    onChangeText={setPrecio}
    style={styles.input}
   />

   <TextInput
    placeholder="Descripcion"
    value={descripcion}
    onChangeText={setDescripcion}
    style={styles.input}
   />

   <Button
    title="Guardar producto"
    onPress={guardarProducto}
   />

  </View>

 );

}

const styles = StyleSheet.create({

 container:{
  flex:1,
  padding:20
 },

 input:{
  borderWidth:1,
  padding:10,
  marginBottom:10
 }

});