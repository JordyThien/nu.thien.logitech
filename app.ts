'use strict';

import Homey from 'homey';

// homey-rfdriver is untyped; these are the members of drivers/z906/driver.ts used here.
type Z906Driver = Homey.Driver & {
  getRFSignal(): Promise<{ manifest: { cmds: Record<string, string> } }>;
  sendCommand(args: { commandId: string, device: Homey.Device }): Promise<void>;
};

class MyApp extends Homey.App {

  /**
   * onInit is called when the app is initialized.
   */
  async onInit() {
    this.homey.dashboards.getWidget('remote')
      .registerSettingAutocompleteListener('device', async (query: string) => {
        return this.getZ906Devices()
          .map((device) => ({ name: device.getName(), id: device.getData().uuid }))
          .filter((result) => result.name.toLowerCase().includes(query.toLowerCase()));
      });
  }

  /**
   * Called by the remote widget's API (widgets/remote/api.js).
   */
  async sendWidgetCommand({ deviceId, command }: { deviceId: string, command: string }) {
    const driver = this.homey.drivers.getDriver('z906') as Z906Driver;
    const signal = await driver.getRFSignal();
    if (!Object.prototype.hasOwnProperty.call(signal.manifest.cmds, command)) {
      throw new Error(`Unknown command: ${command}`);
    }

    const device = this.getZ906Devices().find((d) => d.getData().uuid === deviceId);
    if (!device) {
      throw new Error(this.homey.__('widget.device_not_found'));
    }

    await driver.sendCommand({ commandId: command, device });
  }

  private getZ906Devices() {
    return this.homey.drivers.getDriver('z906').getDevices();
  }

}

module.exports = MyApp;
