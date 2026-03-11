import PedidoProvider from "./src/provider/PedidoProvider";
import NavegadorPrincipal from "./src/navegacion/NavegadorPrincipal";

export default function App() {

 return (

  <PedidoProvider>

   <NavegadorPrincipal />

  </PedidoProvider>

 );

}