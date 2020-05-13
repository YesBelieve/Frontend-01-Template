const net = require('net');
const { ResponseParser } = require('./response');

const res_parser = new ResponseParser();

class Request{
    constructor(opts){
        this.method = opts.method || "GET";
        this.host = opts.host;
        this.port = opts.port || 80;
        this.body = opts.body;
        this.headers = opts.headers || Object.create(null);
        this.path = opts.path || '/';
        
        // 没有提供Content-Type
        if(!this.headers["Content-Type"]){
            this.headers['Content-Type'] = "application/x-www-form-urlencoded";
        }
        
        if(this.headers['Content-Type'] === "application/json"){
            this.bodyText =JSON.stringify(this.body);
        }else if(this.headers['Content-Type'] === "application/x-www-form-urlencoded"){
            this.bodyText = Object.keys(this.body)
                    .map(key => `${key}=${encodeURIComponent(this.body[key])}`)
                    .join('&');
        }
        this.headers['Content-Length'] = this.bodyText.length;
    }

    toString(){
        return `${this.method} ${this.path} HTTP/1.1\r\n${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}\r\n\r\n${this.bodyText}`;
    }

    sendAsync(connection) {
        return new Promise((resolve, reject) => {
            if (connection) {
                connection.write(this.toString());
            } else {
                connection = net.createConnection({
                    host: this.host,
                    port: this.port
                }, () => {
                    connection.write(this.toString());
                });
            }

            connection.on('data', (data) => {
                res_parser.receive(data.toString());
                if (res_parser.isFinished) {
                    resolve([null, res_parser.response]);
                }
                connection.end();
            });

            connection.on('error', (err) => {
                console.log('on error');
                resolve([err, null]);
                connection.end();
            });

            connection.on('end', () => {
                console.log('disconnected from server');
            });
        })
    }
}

module.exports = {
    Request
}