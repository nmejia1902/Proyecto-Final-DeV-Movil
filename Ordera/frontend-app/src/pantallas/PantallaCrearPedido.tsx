import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Image } from "react-native";
import { useContext, useRef, useState } from "react";
import { PedidoContext } from "../context/PedidoContext";
import SelectorCliente from "../componentes/SelectorCliente";
import ItemProductoPedido from "../componentes/ItemProductoPedido";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function PantallaCrearPedido({ navigation }: any) {

  const { cliente, setCliente, productos, total, confirmarPedido } = useContext(PedidoContext);

  const [fotoPedido, setFotoPedido] = useState<string | null>(null);
  const [mostrarCamara, setMostrarCamara] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<any>(null);

  const abrirCamara = async () => {
    if (!permission?.granted) {
      const result = await requestPermission();
      if (!result.granted) return;
    }
    setMostrarCamara(true);
  };

  const tomarFoto = async () => {
    if (cameraRef.current) {
      const foto = await cameraRef.current.takePictureAsync();
      setFotoPedido(foto.uri);
      setMostrarCamara(false);
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>Crear pedido</Text>

      <Text style={styles.subtitulo}>Cliente</Text>

      <SelectorCliente
        cliente={cliente}
        setCliente={setCliente}
      />

      <Text style={styles.subtitulo}>Foto de referencia</Text>

      {fotoPedido ? (
        <View style={styles.fotoContainer}>
          <Image source={{ uri: fotoPedido }} style={styles.fotoPreview} />
          <TouchableOpacity style={styles.botonSecundario} onPress={abrirCamara}>
            <Text style={styles.botonSecundarioTexto}>Retomar foto</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.botonFoto} onPress={abrirCamara}>
          <Text style={styles.botonFotoTexto}>📷  Tomar foto del pastel</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.subtitulo}>Productos agregados</Text>

      <FlatList
        data={productos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) =>
          <ItemProductoPedido producto={item} />
        }
      />

      <Text style={styles.total}>
        Total: L {total}
      </Text>

      <TouchableOpacity
        style={styles.botonAgregar}
        onPress={() => navigation.navigate("Catalogo")}
      >
        <Text style={styles.botonTexto}>Agregar producto</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botonConfirmar}
        onPress={confirmarPedido}
      >
        <Text style={styles.botonTexto}>Confirmar pedido</Text>
      </TouchableOpacity>

      {/* Modal cámara */}
      <Modal visible={mostrarCamara} animationType="slide">
        <CameraView style={{ flex: 1 }} facing="back" ref={cameraRef} />

        <View style={styles.camaraBotones}>
          <TouchableOpacity style={styles.botonConfirmar} onPress={tomarFoto}>
            <Text style={styles.botonTexto}>Tomar foto</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.botonAgregar, { backgroundColor: "#888" }]}
            onPress={() => setMostrarCamara(false)}
          >
            <Text style={styles.botonTexto}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff"
  },
  titulo: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold"
  },
  subtitulo: {
    marginTop: 15,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#444"
  },
  total: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold"
  },
  fotoContainer: {
    alignItems: "center",
    marginBottom: 10
  },
  fotoPreview: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 8,
    resizeMode: "cover"
  },
  botonFoto: {
    borderWidth: 2,
    borderColor: "#2e86de",
    borderStyle: "dashed",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginBottom: 10
  },
  botonFotoTexto: {
    color: "#2e86de",
    fontSize: 16,
    fontWeight: "bold"
  },
  botonSecundario: {
    padding: 8
  },
  botonSecundarioTexto: {
    color: "#2e86de",
    textDecorationLine: "underline"
  },
  botonAgregar: {
    backgroundColor: "#2e86de",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10
  },
  botonConfirmar: {
    backgroundColor: "#27ae60",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10
  },
  botonTexto: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15
  },
  camaraBotones: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    paddingHorizontal: 20
  }
});