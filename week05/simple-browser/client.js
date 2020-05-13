const { Request } = require('./request');

let request_client = new Request({
    port: 8088,
    host: '127.0.0.1',
    method: 'POST',
    path: '/',
    body: {
        name: 'winter'
    },
    headers: {
        ["X-Foo2"]: 'Customed'
    }
});

request_client.sendAsync().then(console.log).catch(console.error);