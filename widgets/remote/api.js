'use strict';

module.exports = {
  async sendCommand({ homey, body }) {
    return homey.app.sendWidgetCommand(body);
  },
};
