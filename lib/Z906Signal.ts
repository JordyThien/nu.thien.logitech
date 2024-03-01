'use strict';

const { RFSignal } = require('homey-rfdriver');

module.exports = class Z906Signal extends RFSignal {

  static FREQUENCY = 'ir';
  static ID = 'z906_prontohex';

};
