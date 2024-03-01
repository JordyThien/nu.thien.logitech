'use strict';

const { RFDevice } = require('homey-rfdriver');

module.exports = class RFDeviceLogitechZ906 extends RFDevice {

  static CAPABILITIES = {
    onoff: 'onoff',
    volume_down: 'volume_down',
    volume_up: 'volume_up',
    volume_mute: 'volume_mute',
    input: 'input',
    effect: 'effect',
    input_1: 'input_1',
    input_2: 'input_2',
    input_3: 'input_3',
    input_4: 'input_4',
    input_5: 'input_5',
    input_aux: 'input_aux',
  };

};
