import { View, Text, FlatList, StyleSheet, TextInput, Button } from "react-native";
import { useEffect, useState } from "react";
import { api } from "../servicios/api";

export default function PantallaClientes() {

 const [clientes, setClientes] = useState<any[]>([]);
 const [mostrarFormulario, setMostrarFormulario] = useState(false);

 const [nombre, setNombre] = useState("");
 const [telefono, setTelefono] = useState("");
 const [direccion, setDireccion] = useState("");

 useEffect(() => {
  cargarClientes();
 }, []);

 const cargarClientes = async () => {
  try {
   const res = await api.get("/clientes");
   setClientes(res.data);
  } catch (error) {
   console.log("Error cargando clientes", error);
  }
 };

 const guardarCliente = async () => {

  try {

   await api.post("/clientes", {
    nombre,
    telefono,
    direccion
   });

   setNombre("");
   setTelefono("");
   setDireccion("");

   setMostrarFormulario(false);

   cargarClientes();

  } catch (error) {

   console.log("Error guardando cliente", error);

  }

 };

 return (
  <View style={styles.container}>

   <Text style={styles.titulo}>👥 Clientes</Text>

   {mostrarFormulario && (

    <View style={styles.formulario}>

     <TextInput
      placeholder="Nombre"
      placeholderTextColor="#999"
      value={nombre}
      onChangeText={setNombre}
      style={styles.input}
     />

     <TextInput
      placeholder="Telefono"
      placeholderTextColor="#999"
      value={telefono}
      onChangeText={setTelefono}
      style={styles.input}
     />

     <TextInput
      placeholder="Direccion"
      placeholderTextColor="#999"
      value={direccion}
      onChangeText={setDireccion}
      style={styles.input}
     />

     <View style={styles.boton}>
      <Button
       title="Guardar cliente"
       color="#F8BBD0"
       onPress={guardarCliente}
      />
     </View>

    </View>

   )}

   <FlatList
    data={clientes}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => (

     <View style={styles.cliente}>

      <Text style={styles.nombre}>{item.nombre}</Text>
      <Text style={styles.detalle}>{item.telefono}</Text>
      <Text style={styles.detalle}>{item.direccion}</Text>

     </View>

    )}
   />

   <View style={styles.botonAgregar}>
    <Button
     title="Agregar cliente"
     color="#B2DFDB"
     onPress={() => {
      setMostrarFormulario(true);
     }}
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
  fontSize:24,
  marginBottom:15,
  fontWeight:"bold",
  color:"#5F5F5F",
  textAlign:"center"
 },

 formulario:{
  marginBottom:20,
  backgroundColor:"#FFFFFF",
  padding:15,
  borderRadius:15,
  shadowColor:"#000",
  shadowOpacity:0.08,
  shadowRadius:8,
  elevation:4
 },

 input:{
  borderWidth:1,
  borderColor:"#F8BBD0",
  borderRadius:10,
  padding:10,
  marginBottom:10,
  backgroundColor:"#FFF"
 },

 cliente:{
  backgroundColor:"#FFFFFF",
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

 detalle:{
  color:"#666"
 },

 boton:{
  marginTop:5,
  borderRadius:10,
  overflow:"hidden"
 },

 botonAgregar:{
  marginTop:10,
  borderRadius:10,
  overflow:"hidden"
 }

});