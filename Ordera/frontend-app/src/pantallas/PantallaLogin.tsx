import { View, Text, TextInput, Button, StyleSheet } from "react-native";

export default function PantallaLogin({ navigation }: any) {

 return (
  <View style={styles.container}>

   <Text style={styles.titulo}>ORDERA</Text>

   <TextInput placeholder="Usuario" style={styles.input} />
   <TextInput placeholder="Contrasena" secureTextEntry style={styles.input} />

   <Button
    title="Ingresar"
    onPress={() => navigation.navigate("Inicio")}
   />

  </View>
 );
}

const styles = StyleSheet.create({
 container:{
  flex:1,
  justifyContent:"center",
  alignItems:"center"
 },
 titulo:{
  fontSize:30,
  marginBottom:20
 },
 input:{
  width:"70%",
  borderWidth:1,
  marginBottom:10,
  padding:10
 }
});