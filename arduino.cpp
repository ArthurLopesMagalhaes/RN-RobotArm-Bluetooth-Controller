#include <Servo.h>
#include <SoftwareSerial.h>

Servo servo1, servo2, servo3;
SoftwareSerial bluetooth(10, 11);

int angle1 = 90;
int angle2 = 90;
int angle3 = 90;

unsigned long lastBlinkTime = 0;
bool ledState = false;

void setup() {
  bluetooth.begin(9600);
  Serial.begin(9600);

  servo1.attach(3);
  servo2.attach(4);
  servo3.attach(5);

  servo1.write(angle1);
  servo2.write(angle2);
  servo3.write(angle3);

  pinMode(13, OUTPUT);

  Serial.println("Modo suave ativo");
}

void moveServoSmooth(Servo &servo, int &currentAngle, int targetAngle) {
  int step = (targetAngle > currentAngle) ? 1 : -1;

  for (int i = currentAngle; i != targetAngle; i += step) {
    servo.write(i);
    delay(10);
  }

  currentAngle = targetAngle;
}

void moveServosSimultaneous(int target1, int target2, int target3) {
  target1 = constrain(target1, 0, 180);
  target2 = constrain(target2, 0, 180);
  target3 = constrain(target3, 0, 180);

  while (angle1 != target1 || angle2 != target2 || angle3 != target3) {
    if (angle1 < target1) angle1++;
    else if (angle1 > target1) angle1--;

    if (angle2 < target2) angle2++;
    else if (angle2 > target2) angle2--;

    if (angle3 < target3) angle3++;
    else if (angle3 > target3) angle3--;

    servo1.write(angle1);
    servo2.write(angle2);
    servo3.write(angle3);

    delay(10);
  }
}

void processCommand(String cmd) {
  if (cmd.startsWith("S1:")) {
    int ang = cmd.substring(3).toInt();
    moveServoSmooth(servo1, angle1, constrain(ang, 0, 180));
  } else if (cmd.startsWith("S2:")) {
    int ang = cmd.substring(3).toInt();
    moveServoSmooth(servo2, angle2, constrain(ang, 0, 180));
  } else if (cmd.startsWith("S3:")) {
    int ang = cmd.substring(3).toInt();
    moveServoSmooth(servo3, angle3, constrain(ang, 0, 180));
  } else if (cmd.startsWith("S:")) {
    int a1, a2, a3;
    int first = cmd.indexOf(':') + 1;
    int comma1 = cmd.indexOf(',', first);
    int comma2 = cmd.indexOf(',', comma1 + 1);

    if (comma1 > 0 && comma2 > comma1) {
      a1 = cmd.substring(first, comma1).toInt();
      a2 = cmd.substring(comma1 + 1, comma2).toInt();
      a3 = cmd.substring(comma2 + 1).toInt();

      moveServosSimultaneous(a1, a2, a3);
    }
  }
}

void loop() {
  if (millis() - lastBlinkTime >= 500) {
    ledState = !ledState;
    digitalWrite(13, ledState ? HIGH : LOW);
    lastBlinkTime = millis();
  }

  if (bluetooth.available()) {
    String input = bluetooth.readStringUntil('\n');
    input.trim();
    Serial.println("Recebido: " + input);

    while (input.length()) {
      int idx = input.indexOf(' ');
      String cmd = idx == -1 ? input : input.substring(0, idx);
      processCommand(cmd);
      input = idx == -1 ? "" : input.substring(idx + 1);
    }
  }
}
