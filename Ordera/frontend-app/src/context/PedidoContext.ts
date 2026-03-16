import { createContext } from "react";

export const PedidoContext = createContext({

 cliente: null as any,
 setCliente: (cliente: any) => {},

 productos: [] as any[],

 agregarProducto: (producto: any) => {},

 eliminarProducto: (id: number) => {},

 actualizarCantidadProducto: (id: number, cantidad: number) => {},

 total: 0,

 confirmarPedido: async () => {},

 limpiarPedido: () => {}

});