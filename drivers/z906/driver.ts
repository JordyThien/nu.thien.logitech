'use strict';

import Homey = require('homey');
import Z906Signal = require('../../lib/Z906Signal');

const { RFDriver } = require('homey-rfdriver');

class Z906Driver extends RFDriver {

  static SIGNAL = Z906Signal;

  async sendCommand({ commandId, device }: { commandId: string, device: Homey.Device }) {
    // Pass the device so Homey routes the IR command via the right transmitter (satelliteMode)
    await this.cmd(commandId, { device });
  }

  async onRFInit() {
    await super.onRFInit();

    this.homey.flow.getActionCard(`${this.id}:send_cmd`)
      .registerRunListener(this.runListener())
      .getArgument('cmd')
      .registerAutocompleteListener(this.autocompleteListener());
  }

  private runListener() {
    return async ({
      device,
      cmd,
    }: { device: Homey.Device, cmd: { cmd: string } }) => {
      return this.sendCommand({ commandId: cmd.cmd, device });
    };
  }

  private autocompleteListener() {
    return async (query: string) => {
      const signal = await this.getRFSignal();

      return Object.keys(signal.manifest.cmds)
        .map((commandId) => {
          return {
            name: this.homey.__(`commands.${commandId}`) || commandId,
            cmd: commandId,
          };
        })
        .filter((command) => {
          return command.name.toLowerCase()
            .includes(query.toLowerCase());
        });
    };
  }

}

module.exports = Z906Driver;
