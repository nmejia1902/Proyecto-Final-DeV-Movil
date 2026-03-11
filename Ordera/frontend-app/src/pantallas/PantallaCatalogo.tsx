import { View, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { api } from "../servicios/api";
import TarjetaProducto from "../componentes/TarjetaProducto";

export default function PantallaCatalogo(){

 const [productos,setProductos] = useState<any[]>([]);

 useEffect(()=>{
  cargarProductos();
 },[]);

 const cargarProductos = async () => {

  try{

   const res = await api.get("/productos");

   setProductos(res.data);

  }catch(error){

   console.log("Error cargando productos",error);

  }

 };

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