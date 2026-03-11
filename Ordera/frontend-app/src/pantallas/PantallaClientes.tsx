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

   <Text style={styles.titulo}>Clientes</Text>

   {mostrarFormulario && (

    <View style={styles.formulario}>

     <TextInput
      placeholder="Nombre"
      value={nombre}
      onChangeText={setNombre}
      style={styles.input}
     />

     <TextInput
      placeholder="Telefono"
      value={telefono}
      onChangeText={setTelefono}
      style={styles.input}
     />

     <TextInput
      placeholder="Direccion"
      value={direccion}
      onChangeText={setDireccion}
      style={styles.input}
     />

     <Button
      title="Guardar cliente"
      onPress={guardarCliente}
     />

    </View>

   )}

   <FlatList
    data={clientes}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => (

     <View style={styles.cliente}>

      <Text style={styles.nombre}>{item.nombre}</Text>
      <Text>{item.telefono}</Text>
      <Text>{item.direccion}</Text>

     </View>

    )}
   />

   <Button
    title="Agregar cliente"
    onPress={() => {
     console.log("abrir formulario");
     setMostrarFormulario(true);
    }}
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

 formulario:{
  marginBottom:20
 },

 input:{
  borderWidth:1,
  borderColor:"#ccc",
  padding:10,
  marginBottom:10
 },

 cliente:{
  padding:10,
  borderBottomWidth:1,
  borderBottomColor:"#eee"
 },

 nombre:{
  fontWeight:"bold"
 }

});