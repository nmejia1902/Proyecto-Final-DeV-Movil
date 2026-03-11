import { View, FlatList } from "react-native";
import TarjetaProducto from "../componentes/TarjetaProducto";

const productos = [
 {id:1,nombre:"Torta chocolate",precio:500},
 {id:2,nombre:"Brownie",precio:350},
 {id:3,nombre:"Cheesecake",precio:450}
];

export default function PantallaCatalogo(){

 return(

  <View style={{flex:1,padding:20}}>

   <FlatList
    data={productos}
    keyExtractor={(item)=>item.id.toString()}
    renderItem={({item})=>
     <TarjetaProducto producto={item}/>
    }
   />

  </View>

 );

}