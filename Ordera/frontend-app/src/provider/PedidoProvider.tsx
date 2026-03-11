import { useState } from "react";
import { PedidoContext } from "../context/PedidoContext";
import { api } from "../servicios/api";

export default function PedidoProvider({ children }: any) {

 const [cliente, setCliente] = useState<any>(null);
 const [productos, setProductos] = useState<any[]>([]);

 const agregarProducto = (producto: any) => {
  setProductos([...productos, producto]);
 };

 const eliminarProducto = (index: number) => {

  const nuevos = productos.filter((_, i) => i !== index);
  setProductos(nuevos);

 };

 const total = productos.reduce((sum, p) => sum + Number(p.precio || 0), 0);

 const limpiarPedido = () => {
  setCliente(null);
  setProductos([]);
 };

const confirmarPedido = async () => {

 if (!cliente) {
  alert("Seleccione un cliente");
  return;
 }

 if (productos.length === 0) {
  alert("Agregue productos al pedido");
  return;
 }

 try {

  const detalles = productos.map((p: any) => ({
   producto_id: p.id,
   cantidad: 1,
   subtotal: Number(p.precio)
  }));

  const body = {
   cliente_id: cliente.id,
   usuario_id: 1,
   detalles
  };

  console.log("Enviando pedido:", body);

  await api.post("/pedidos", body);

  alert("Pedido registrado correctamente");

  limpiarPedido();

 } catch (error: any) {

  console.log("Error backend:", error.response?.data || error);
  alert("Error al registrar el pedido");

 }

};

 return (

  <PedidoContext.Provider
   value={{
    cliente,
    setCliente,

    productos,
    agregarProducto,
    eliminarProducto,

    total,

    confirmarPedido,
    limpiarPedido
   }}
  >

   {children}

  </PedidoContext.Provider>

 );

}