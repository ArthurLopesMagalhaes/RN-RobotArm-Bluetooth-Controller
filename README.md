# 🤖 RN-RobotArm-Bluetooth-Controller

Aplicativo mobile desenvolvido em **React Native** para controlar um **braço robótico** impresso em 3D, utilizando comunicação **Bluetooth** com o módulo **HC-05** conectado a um **Arduino UNO**. O projeto foi desenvolvido como parte de um trabalho acadêmico da disciplina de Robótica Industrial, com o objetivo de simular o processo de **soldagem automatizada com manipulador antropomórfico**.

## 📱 Funcionalidades do App

- Controle individual de **3 servomotores** via sliders, representando os eixos do braço robótico.
- Exibição em tempo real do **ângulo de cada servo** (0° a 180°).
- Conexão Bluetooth com dispositivos disponíveis (ex: HC-05).
- Interface intuitiva e responsiva, ideal para testes em campo ou demonstrações.

<p align="center">
 
  <img src="https://github.com/ArthurLopesMagalhaes/RN-RobotArm-Bluetooth-Controller/blob/main/screen2.jpeg?raw=true" width="250" />
  <img src="https://github.com/ArthurLopesMagalhaes/RN-RobotArm-Bluetooth-Controller/blob/main/screen1.jpeg?raw=true" width="250" />
</p>

## 🤖 Estrutura do Robô

- Braço robótico com 3 DOF (graus de liberdade).
- Estrutura impressa em **3D**.
- Servomotores posicionados para simular o movimento de um braço humano.
- Controle alternativo via **potenciômetros**, permitindo comparação entre métodos de controle.

<p align="center">
  <img src="https://github.com/ArthurLopesMagalhaes/RN-RobotArm-Bluetooth-Controller/blob/main/assets/screenshots/robot_arm.png" width="300" />
</p>

## 🔌 Montagem Eletrônica

- **Arduino UNO**
- **Módulo Bluetooth HC-05**
- **3 Servomotores**
- **Protoboard e jumpers**

Conexões principais:

- HC-05 TX ➝ Arduino RX (pino 10)
- HC-05 RX ➝ Arduino TX (pino 11) (com divisor de tensão)
- Servos conectados aos pinos digitais (ex: 9, 10 e 11)

<p align="center">
   <img src="https://github.com/ArthurLopesMagalhaes/RN-RobotArm-Bluetooth-Controller/blob/main/arduino.jpeg?raw=true" width="250" />
</p>

## 📟 Código Arduino (C++)

O código embarcado foi escrito em C++ e carregado no **Arduino UNO**. Ele é responsável por:

- Receber comandos via **Bluetooth** do app mobile.
- Interpretar os comandos recebidos (por exemplo, `S1:120` para servo 1 com 120 graus).
- Controlar os **servomotores** nos respectivos ângulos.

O código pode ser encontrado no arquivo `arduino.cpp`:


## 💡 Como usar

1. **Clone este repositório**:
   ```bash
   git clone https://github.com/ArthurLopesMagalhaes/RN-RobotArm-Bluetooth-Controller.git
   ```
2. **Instale as dependências**:
   ```bash
    cd RN-RobotArm-Bluetooth-Controller
    npm install
   ```
3. **Rode no seu dispositivo Android**:

   ```bash
   npm start
   npm run android
   ```

4. **Emparelhe seu HC-05 com o celular**

5. **Abra o app, selecione o dispositivo HC-05 (senha padrão: 1234 ou 0000)**:

## 📷 Demonstração

https://github.com/user-attachments/assets/a2c4861b-c4f0-45b4-b7c4-ded6b9082282


## 🧠 Tecnologias Utilizadas

- **React Native**
- **react-native-bluetooth-classic**
- **Arduino C++**
- **HC-05 Bluetooth Module**
- **Servomotores SG90**
- **Impressão 3D (PLA)**
