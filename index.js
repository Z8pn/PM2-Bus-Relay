var pm2 = require('pm2');
var EventEmitter = require('events').EventEmitter;
module.exports = class extends EventEmitter {
    constructor(name) {
        super();
        this._setup(name);
    }
    _setup(name) {
        var self = this;
        self._processId = process.env.pm_id;
        self._name = name;
        self._ready = false;
        pm2.connect(function(err) {
            if (err) {
                console.error(err);
                process.exit(2);
            }
            pm2.launchBus(function(err, bus) {
                console.log("Bus - launched.");
                self._ready = true;
                self.emit("onRelayConnected");
                bus.on('process:msg', function(packet) {
                    if (packet.process.pm_id != self._processId) {
                        self.emit(packet.data.event, packet.data.data);
                        self.emit("any",packet.data.event, packet.data.data);
                    }
                });
            });
        });
    }
    send(data) {
        process.send({
            type: 'process:msg',
            data: data
        });
    }
}