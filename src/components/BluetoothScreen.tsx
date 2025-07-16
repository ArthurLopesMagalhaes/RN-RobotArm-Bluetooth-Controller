import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RNBluetoothClassic from 'react-native-bluetooth-classic';
import { requestBluetoothPermissions } from '../hooks/requestBluetoothPermission';

type Props = {
  onConnected: (device: any) => void;
};

export function BluetoothScreen({ onConnected }: Props) {
  const [devices, setDevices] = useState<any[]>([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        await RNBluetoothClassic.requestBluetoothEnabled();
        const bonded = await RNBluetoothClassic.getBondedDevices();
        setDevices(bonded);
      } catch (err) {
        Alert.alert('Erro', 'Bluetooth não disponível ou permissão negada');
      }
    };

    load();
  }, [count]);

  useEffect(() => {
  const init = async () => {
    const granted = await requestBluetoothPermissions();

    if (!granted) {
      Alert.alert(
        'Permissão negada',
        'As permissões de Bluetooth são necessárias para funcionar corretamente.'
      );
    }

    await RNBluetoothClassic.requestBluetoothEnabled();
  };

  init();
}, []);

  const connect = async (device: any) => {
    try {
      const success = await device.connect();
      if (success) {
        Alert.alert('Conectado!', `Conectado a ${device.name}`);
        onConnected(device);
      }
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível conectar ao dispositivo');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dispositivos disponíveis</Text>
      <FlatList
        data={devices}
        keyExtractor={item => item.address}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.deviceItem}
            onPress={() => connect(item)}
          >
            <View style={styles.icon}>
              <Text style={styles.deviceName}>🛜</Text>
            </View>
            <View>
              <Text style={styles.deviceName}>{item.name}</Text>
              <Text style={styles.deviceAddress}>{item.address}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <Button
        title="Buscar"
        onPress={() => setCount(prevState => prevState + 1)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff', marginTop: 28 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, color: '#000' },
  deviceItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    gap: 12,
  },
  icon: {
    fontSize: 24,
    marginRight: 12,
    backgroundColor: '#f2e8e8',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  deviceName: { fontSize: 18,  color: '#000' },
  deviceAddress: { fontSize: 14, color: '#666' },
});
