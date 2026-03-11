import NavegadorPrincipal from "./src/navegacion/NavegadorPrincipal";
import { PedidoProvider } from "./src/provider/PedidoProvider";

export default function App() {
 return (
  <PedidoProvider>
   <NavegadorPrincipal />
  </PedidoProvider>
 );
}