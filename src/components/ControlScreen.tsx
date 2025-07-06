import React, { useState } from "react";
import { SafeAreaView, View, Text, ScrollView, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import { Button } from "./ui/button";

type Servo = {
  name: string;
  angle: number;
};

type Props = {
  device: any;
};

export function ControlScreen({ device }: Props) {
  const [servos, setServos] = useState<Servo[]>([
    { name: "Servo 1", angle: 90 },
    { name: "Servo 2", angle: 90 },
    { name: "Servo 3", angle: 90 },
  ]);

  const sendCommand = async (cmd: string) => {
    try {
      await device.write(`${cmd}\n`);
      console.log('Enviado:', cmd);
    } catch (err) {
      console.error('Erro ao enviar comando:', err);
    }
  };

  const updateServoAngle = (index: number, angle: number) => {
    setServos((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], angle };
      return updated;
    });
  };

  const goHome = () => {
    const newServos = servos.map((s, i) => {
      sendCommand(`S${i + 1}:0`);
      return { ...s, angle: 0 };
    });
    setServos(newServos);
  };

  const startMove = async () => {
    console.log("Movimento alternado iniciado com ângulos:", servos.map((s) => s.angle));

    const cmd = `S:${servos.map(s => s.angle).join(',')}`;
    await sendCommand(cmd);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.controls}>
        {servos.map((s, i) => (
          <View key={i} style={styles.servoCard}>
            <View style={styles.headerContainer}>
              <View style={styles.iconContainer}>
                <Text style={styles.label}>🤖</Text>
              </View>
              <Text style={styles.label}>{s.name}</Text>
            </View>

            <View style={styles.sliderContainer}>
              <View style={styles.sliderInfo}>
                <Text style={styles.value}>Ângulo</Text>
                <Text style={styles.value}>{s.angle}°</Text>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={180}
                step={1}
                value={s.angle}
                onSlidingComplete={angle => updateServoAngle(i, angle)}
              />
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Button title="Home" onPress={goHome} />
        <Button title="Iniciar" onPress={startMove} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    marginTop: 28,
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  sliderInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  slider: {
    width: '100%',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  controls: {
    padding: 16,
  },
  servoCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  value: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'right',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 24,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F2E8E8',
    borderRadius: 12,
    width: 60,
    height: 60,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 16,
  },
  sliderContainer: {
    marginTop: 16,
    marginBottom: 24,
  },
});
