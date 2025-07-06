import React, { useState } from 'react';
import {BluetoothScreen} from './src/components/BluetoothScreen';
import {ControlScreen} from './src/components/ControlScreen';

export default function App() {
  const [device, setDevice] = useState<any>(null);

  return device ? (
    <BluetoothScreen onConnected={setDevice} />
  ) : (
    <ControlScreen device={device} />
  );
}
