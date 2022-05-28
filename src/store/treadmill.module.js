const WP_SERVICE_ID = '0000fe00-0000-1000-8000-00805f9b34fb';
const WP_READ_CHARACTERISTIC_ID = '0000fe01-0000-1000-8000-00805f9b34fb';
const WP_WRITE_CHARACTERISTIC_ID = '0000fe02-0000-1000-8000-00805f9b34fb';
const REQUEST_DATA_CMD = 0x00;
const SET_SPEED_CMD = 0x01;
const SET_MODE_CMD = 0x02;
const STATE_OFFSET = 2;
const STATE_LENGTH = 1;
const SPEED_OFFSET = 3;
const SPEED_LENGTH = 1;
const MODE_OFFSET = 4;
const MODE_LENGTH = 1;
const TIME_OFFSET = 5;
const TIME_LENGTH = 3;
const DISTANCE_OFFSET = 8;
const DISTANCE_LENGTH = 3;
const STEPS_OFFSET = 11;
const STEPS_LENGTH = 3;

function isSet(field) {
  return typeof field === 'number';
}

function buildCommand(command, value) {
  return Uint8Array.of(0xF7, 0xA2, command, value, 0xA2 + command + value, 0xFD);
}

function getData(data, dataOffset, dataLength) {
  return data.slice(dataOffset, dataOffset + dataLength);
}

function Uint8ArrayToUint32(array) {
  const UINT32_SIZE = 4;
  const tempArray = new Uint8Array(UINT32_SIZE);
  tempArray.set(array, UINT32_SIZE - array.length);
  return (tempArray[0] << 24) | (tempArray[1] << 16) | (tempArray[2] << 8) | tempArray[3];
}

const treadmillModule = {
  namespaced: true,
  state: {
    state: 0,
    mode: 1,
    speed: 0,
    time: 0,
    distance: 0,
    steps: 0,
    error: '',
  },
  getters: {
    speed(state) {
      const asString = state.speed.toString();
      if (state.speed === 0) return '0 km/h';
      if (state.speed < 10) return `0.${asString} km/h`;
      return `${asString.charAt(0)}.${asString.charAt(1)} km/h`;
    },
    distance(state) {
      const asString = state.speed.toString();
      if (state.distance === 0) return '0 m';
      if (state.distance < 100) return `${asString}0 m`;
      return `${asString.substring(0, asString.length - 2)}.${asString.substring(asString.length - 2)} km`;
    },
    time(state) {
      return new Date(state.time * 1000).toISOString().substring(11, 16);
    },
  },
  mutations: {
    updateData(state, data) {
      if (isSet(data.state)) state.state = data.state;
      if (isSet(data.mode)) state.mode = data.mode;
      if (isSet(data.speed)) state.speed = data.speed;
      if (isSet(data.time)) state.time = data.time;
      if (isSet(data.distance)) state.distance = data.distance;
      if (isSet(data.steps)) state.steps = data.steps;
    },
    setReadCharacteristic(state, readCharacteristic) {
      state.readCharacteristic = readCharacteristic;
    },
    setWriteCharacteristic(state, writeCharacteristic) {
      state.writeCharacteristic = writeCharacteristic;
    },
  },
  actions: {
    setup(context) {
      return new Promise((resolve, reject) => {
        navigator.bluetooth.requestDevice({
          acceptAllDevices: true,
          optionalServices: [
            WP_SERVICE_ID,
          ],
        }).then((device) => device.gatt?.connect())
          .then((server) => server?.getPrimaryService(WP_SERVICE_ID))
          .then((service) => {
            // Receive data from WalkingPad
            service?.getCharacteristic(WP_READ_CHARACTERISTIC_ID)
              .then((readCharacteristic) => readCharacteristic.startNotifications())
              .then((readCharacteristic) => {
                context.commit('setReadCharacteristic', readCharacteristic);

                readCharacteristic.addEventListener('characteristicvaluechanged', (event) => {
                  const receivedValue = event.target.value;
                  if (receivedValue) {
                    const dataArray = new Uint8Array(receivedValue.buffer);
                    context.dispatch('treadmill/updateData', dataArray, { root: true });
                  }
                }).then(() => {
                  service?.getCharacteristic(WP_WRITE_CHARACTERISTIC_ID)
                    .then((writeCharacteristic) => {
                      resolve();
                      context.commit('setWriteCharacteristic', writeCharacteristic);
                    }).catch((error) => {
                      reject(error);
                    });
                }).reject((error) => {
                  reject(error);
                });
              }).catch((error) => {
                reject(error);
              });
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    requestData(context) {
      const command = buildCommand(REQUEST_DATA_CMD, 0x00);
      context.state.writeCharacteristic?.writeValueWithoutResponse(command);
    },
    updateData(context, data) {
      context.commit('updateData', {
        state: Uint8ArrayToUint32(getData(data, STATE_OFFSET, STATE_LENGTH)),
        speed: Uint8ArrayToUint32(getData(data, SPEED_OFFSET, SPEED_LENGTH)),
        mode: Uint8ArrayToUint32(getData(data, MODE_OFFSET, MODE_LENGTH)),
        time: Uint8ArrayToUint32(getData(data, TIME_OFFSET, TIME_LENGTH)),
        distance: Uint8ArrayToUint32(getData(data, DISTANCE_OFFSET, DISTANCE_LENGTH)),
        steps: Uint8ArrayToUint32(getData(data, STEPS_OFFSET, STEPS_LENGTH)),
      });
    },
    updateMode(context, mode) {
      if (![0, 1].includes(context.state.mode)) return false;
      context.commit('updateData', { mode });
      context.dispatch('treadmill/sendMode', {}, { root: true });
      return true;
    },
    updateSpeed(context, speed) {
      if (context.state.speed < 0 || context.state.speed > 60) return false;
      context.commit('updateData', { speed });
      context.dispatch('treadmill/sendSpeed', {}, { root: true });
      return true;
    },
    sendMode(context) {
      const command = buildCommand(SET_MODE_CMD, context.state.mode);
      context.state.writeCharacteristic?.writeValueWithoutResponse(command);
      return true;
    },
    sendSpeed(context) {
      const command = buildCommand(SET_SPEED_CMD, context.state.speed);
      context.state.writeCharacteristic?.writeValueWithoutResponse(command);
      return true;
    },
  },
  modules: {},
};

export default treadmillModule;
