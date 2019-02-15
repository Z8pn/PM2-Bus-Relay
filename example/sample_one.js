var relay = require('../index.js');
relay = new relay("sample_one");
relay.on("onRelayConnected", function() {
    console.log("relay conncted to bus");
});
relay.on("sample", function(data) {
    console.log("sample_one", data)
    relay.send({
        event: "sample",
        data: "from sample_one"
    })
});