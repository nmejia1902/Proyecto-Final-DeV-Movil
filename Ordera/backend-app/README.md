# ORDERA - App de Gestión de Pedidos para Repostería

##  Descripción

**ORDERA** es una aplicación móvil desarrollada en React Native que permite gestionar pedidos en una repostería. Facilita la administración de clientes, productos y pedidos, incluyendo el seguimiento del estado de cada pedido.

---

##  Objetivo

Optimizar el proceso de toma y gestión de pedidos mediante una solución móvil intuitiva, reduciendo errores y mejorando la organización del negocio.

---

##  Tecnologías utilizadas

###  Frontend
- React Native
- Expo
- TypeScript
- Context API
- Axios

###  Backend
- Node.js
- Express
- Sequelize

###  Base de datos
- MySQL

---

##  Funcionalidades principales

###  Login
- Validación de usuario contra base de datos
- Control de acceso

###  Clientes
- Crear clientes
- Listar clientes
- Seleccionar cliente

###  Productos
- Crear productos
- Tomar foto con cámara
- Mostrar catálogo con imágenes
- Eliminar productos

### 🛒 Pedidos
- Selección de cliente
- Agregar productos
- Control de cantidad (+ / -)
- Cálculo automático del total
- Resumen antes de confirmar

###  Historial
- Visualización de pedidos
- Estados:
  - 🟡 Pendiente
  - 🟠 En proceso
  - 🟢 Entregado
- Cambio de estado

    Login
    ↓
    Inicio
    ↓
    Seleccionar cliente
    ↓
    Agregar productos
    ↓
    Confirmar pedido
    ↓
    Guardar en base de datos
    ↓
    Historial
    ↓
    Cambio de estado

    ##  Estructura del proyecto

### Frontend


pantallas/
PantallaLogin.tsx
PantallaInicio.tsx
PantallaClientes.tsx
PantallaCatalogo.tsx
PantallaCrearPedido.tsx
PantallaHistorialPedidos.tsx

componentes/
TarjetaProducto.tsx
ItemProductoPedido.tsx
SelectorCliente.tsx
ModalSeleccionCliente.tsx

context/
PedidoContext.ts
PedidoProvider.tsx

servicios/
api.ts


---

### Backend


index.js

Modelos/
Usuario.js
Cliente.js
Producto.js
Pedido.js
DetallePedido.js
Estado.js


---

## Instalación

### Frontend


npm install
npx expo start


### Backend


npm install
node index.js


---

##  Configuración

Editar archivo:


servicios/api.ts


Configurar:

ts
baseURL: "http://TU_IP:5000"
 Usuarios de prueba
admin / 1234
