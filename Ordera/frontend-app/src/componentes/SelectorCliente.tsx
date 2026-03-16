import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import ModalSeleccionCliente from "./ModalSeleccionCliente";

export default function SelectorCliente({ cliente, setCliente }: any){

 const [visible, setVisible] = useState(false);

 return(
  <View>

   <TouchableOpacity
    style={styles.selector}
    onPress={()=>setVisible(true)}
   >

    <Text style={styles.texto}>
     {cliente ? cliente.nombre : "Seleccionar cliente"}
    </Text>

   </TouchableOpacity>

   <ModalSeleccionCliente
    visible={visible}
    setVisible={setVisible}
    setCliente={setCliente}
   />

  </View>
 );
}

const styles = StyleSheet.create({

 selector:{
  backgroundColor:"#FFFFFF",
  padding:15,
  borderRadius:12,
  borderWidth:1,
  borderColor:"#F8BBD0",
  shadowColor:"#000",
  shadowOpacity:0.05,
  shadowRadius:5,
  elevation:2
 },

 texto:{
  fontSize:16,
  color:"#444"
 }

});