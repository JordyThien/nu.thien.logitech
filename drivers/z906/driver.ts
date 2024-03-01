'use strict';

import Z906Signal = require('../../lib/Z906Signal');

const { RFDriver } = require('homey-rfdriver');

module.exports = class Z906Driver extends RFDriver {

  static SIGNAL = Z906Signal;

};
