const { Request } = require('./utils/request');
const htmlParser = require('./utils/html-parser');
// const images = require('images');
// const render = require('./utils/render-images');

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

(async function () {
    try {
        let [err, data] = await request_client.sendAsync();

        // console.log(data);
        if (err) {
            throw err;
        } else {
            // let dom = htmlParser.parseHTML(data);
            // console.log(dom);
            // let viewport = images(800, 600);
            // render(viewport, dom);
            // viewport.save('../static/viewport.jpg');
        }
    } catch (err) {
        
    }
})();