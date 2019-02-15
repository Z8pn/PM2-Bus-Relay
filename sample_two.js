var relay = require('./index.js');
relay = new relay("sample_two");
relay.on("onRelayConnected", function() {
    console.log("relay conncted to bus");
    setInterval(function() {
        relay.send({
            event: "sample",
            data: "from sample_two"
        })
    }, 1000);
});
relay.on("sample", function(data) {
    console.log("sample_two", data)
});