import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import Svg, { Rect, Circle, Path, Ellipse } from "react-native-svg";
import { api } from "../servicios/api";

export default function PantallaLogin({ navigation }: any) {

 const [usuario,setUsuario] = useState("");
 const [contrasenia,setContrasenia] = useState("");

 const login = async () => {

  if(!usuario || !contrasenia){
   Alert.alert("Error","Ingrese usuario y contraseña");
   return;
  }

  try{

   const res = await api.post("/login",{
    usuario,
    contrasenia
   });

   Alert.alert("Bienvenido", res.data.msg);

   navigation.navigate("Inicio");

  }catch(error:any){

   Alert.alert(
    "Error",
    error.response?.data?.msg || "Credenciales incorrectas"
   );

  }

 };

 return (
  <View style={styles.container}>

   <Svg width="140" height="140" viewBox="0 0 200 200">
     <Ellipse cx="100" cy="150" rx="70" ry="12" fill="#E0F2F1" />
     <Rect x="50" y="90" width="100" height="50" rx="15" fill="#FFCCBC"/>
     <Path d="M50 95 Q70 75 90 95 Q110 75 130 95 Q150 75 150 95 L150 110 L50 110 Z" fill="#F8BBD0"/>
     <Rect x="50" y="110" width="100" height="12" fill="#FFD8C9"/>
     <Rect x="50" y="125" width="100" height="10" fill="#FFE5D9"/>
     <Rect x="96" y="60" width="8" height="30" rx="3" fill="#B2DFDB"/>
     <Path d="M100 50 C95 55 95 60 100 65 C105 60 105 55 100 50" fill="#FFD54F"/>
     <Circle cx="70" cy="105" r="3" fill="#FFFFFF"/>
     <Circle cx="100" cy="100" r="3" fill="#FFFFFF"/>
     <Circle cx="130" cy="105" r="3" fill="#FFFFFF"/>
   </Svg>

   <Text style={styles.titulo}>ORDERA</Text>

   <TextInput
    placeholder="Usuario"
    value={usuario}
    onChangeText={setUsuario}
    style={styles.input}
   />

   <TextInput
    placeholder="Contraseña"
    secureTextEntry
    value={contrasenia}
    onChangeText={setContrasenia}
    style={styles.input}
   />

   <Button
    title="Ingresar"
    onPress={login}
   />

  </View>
 );
}

const styles = StyleSheet.create({
 container:{
  flex:1,
  justifyContent:"center",
  alignItems:"center",
  backgroundColor:"#FFF6F2"
 },
 titulo:{
  fontSize:30,
  marginBottom:20,
  fontWeight:"bold",
  color:"#5F5F5F"
 },
 input:{
  width:"70%",
  borderWidth:1,
  marginBottom:10,
  padding:10,
  borderRadius:10,
  borderColor:"#F8BBD0",
  backgroundColor:"#FFFFFF"
 }
});