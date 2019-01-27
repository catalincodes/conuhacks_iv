var mockserver = require ('mockserver-node');

function startMocking(){
    mockserver.start_mockserver({
    serverPort: 1080,
    trace: true
})
}


function stopMocking(){
    mockserver.stop_mockserver({
    serverPort:1080
    })
}

