import { useState } from "react";
import { PedidoContext } from "../context/PedidoContext";

export const PedidoProvider = ({ children }: any) => {

 const [cliente, setCliente] = useState<any>(null);
 const [productos, setProductos] = useState<any[]>([]);

 const agregarProducto = (producto: any) => {
  setProductos([...productos, producto]);
 };

 const eliminarProducto = (id: number) => {
  setProductos(productos.filter(p => p.id !== id));
 };

 const total = productos.reduce((sum, p) => sum + p.precio, 0);

 return (
  <PedidoContext.Provider
   value={{
    cliente,
    setCliente,
    productos,
    agregarProducto,
    eliminarProducto,
    total
   }}
  >
   {children}
  </PedidoContext.Provider>
 );
};