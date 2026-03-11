import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PantallaLogin from "../pantallas/PantallaLogin";
import PantallaInicio from "../pantallas/PantallaInicio";
import PantallaCrearPedido from "../pantallas/PantallaCrearPedido";
import PantallaCatalogo from "../pantallas/PantallaCatalogo";
import PantallaClientes from "../pantallas/PantallaClientes";
import PantallaEditarCatalogo from "../pantallas/PantallaEditarCatalogo";
import PantallaAgregarProducto from "../pantallas/PantallaAgregarProducto";
import PantallaHistorialPedidos from "../pantallas/PantallaHistorialPedidos";

const Stack = createNativeStackNavigator();

export default function NavegadorPrincipal() {
 return (
  <NavigationContainer>
   <Stack.Navigator>

    <Stack.Screen name="Login" component={PantallaLogin} />
    <Stack.Screen name="Inicio" component={PantallaInicio} />
    <Stack.Screen name="CrearPedido" component={PantallaCrearPedido} />
    <Stack.Screen name="Catalogo" component={PantallaCatalogo} />
    <Stack.Screen name="PantallaClientes" component={PantallaClientes} />
    <Stack.Screen name="EditarCatalogo" component={PantallaEditarCatalogo} />
    <Stack.Screen name="AgregarProducto" component={PantallaAgregarProducto} />
    <Stack.Screen name="HistorialPedidos" component={PantallaHistorialPedidos} />

   </Stack.Navigator>
  </NavigationContainer>
 );
}