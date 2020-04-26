const path = require('path');
const GoogleAssistant = require('google-assistant');
const readline = require('readline');

const config = {
  auth: {
    keyFilePath: path.resolve(__dirname, 'api_key.json'),
    // where you want the tokens to be saved
    // will create the directory if not already there
    savedTokensPath: path.resolve(__dirname, 'tokens.json'),
  },
  // this param is optional, but all options will be shown
  conversation: {
    lang: 'en-US',
    //deviceModelId: 'homebridge-plugin-homebridge-reality-switch-y1dpom', // use if you've gone through the Device Registration process
    //deviceId: 'homebridge-reality-switch', // use if you've gone through the Device Registration process
    textQuery: 'What time is it?', // if this is set, audio input is ignored
    isNew: true,
    screen: {
      isOn: false,
    },
  },
};

const assistant = new GoogleAssistant(config.auth);

const invokeCommand = request => {
  config.conversation.textQuery = request;
  return new Promise((resolve, reject) => {
    assistant.start(config.conversation, conversation => {
      conversation.on('ended', error => {
        if (error) {
          reject(error);
        }
        resolve();
      }).on('error', error => {
        reject(error);
      });
    });
  });
};

let isReady = false;

assistant.on('ready', () => {
  isReady = true;
});

const controlFan = fanOn => {
  const request = fanOn ? 'turn on fan' : 'turn off fan';
  return new Promise((resolve, reject) => {
    const command = () => invokeCommand(request).then(resolve).catch(reject);
    if (isReady) {
      command();
    }
    assistant.on('ready', command);
  });
};

const turnOnFan = () => controlFan(true);
const turnOffFan = () => controlFan(false);

module.exports = {
  turnOffFan,
  turnOnFan,
};
