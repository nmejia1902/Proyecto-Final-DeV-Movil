import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import ModalSeleccionCliente from "./ModalSeleccionCliente";

export default function SelectorCliente({ cliente, setCliente }: any){

 const [visible, setVisible] = useState(false);

 return(
  <View>

   <TouchableOpacity onPress={()=>setVisible(true)}>
    <Text>
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