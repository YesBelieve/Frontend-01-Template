'use strict'

class ResponseParser{
    constructor() {
        this.WAITING_STATUS_LINE = 0;
        this.WAITING_STATUS_LINE_END = 1;
        this.WAITING_HEADER_NAME = 2;
        this.WAITING_HEADER_SPACE = 3;
        this.WAITING_HEADER_VALUE = 4;
        this.WAITING_HEADER_LINE_END = 5;
        this.WAITING_HEADER_LINE_BLOCK_END = 6;
        this.WAITING_BODY = 7;

        this.currentStaus = this.WAITING_STATUS_LINE;
        this.statusLine = '';
        this.headers = Object.create(null);
        this.headerName = '';
        this.headerValue = '';
        this.bodyParser = null;
    }
    // 获取返回结果
    get response() {
        this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\S\s]+)/);

        return {
            statusCode: RegExp.$1,
            statusText: RegExp.$2,
            headers: this.headers,
            body: this.bodyParser.content.join('')
        };
    }
    // 判断当前返回流是否接受完成
    get isFinished() {
        return this.bodyParser && this.bodyParser.isFinished;
    }
    receiverChar(char) {
        if (this.currentStaus === this.WAITING_STATUS_LINE) {
            if (char === '\r') {
                this.currentStaus = this.WAITING_STATUS_LINE_END;
            } else if (char === '\n') {
                this.currentStaus = this.WAITING_HEADER_NAME;
            } else {
                this.statusLine += char;
            }
        } else if (this.currentStaus === this.WAITING_STATUS_LINE_END) { 
            if (char === '\n') {
                this.currentStaus = this.WAITING_HEADER_NAME;
            }
        }else if (this.currentStaus === this.WAITING_HEADER_NAME) {
            if (char === '\r') {
                this.currentStaus = this.WAITING_HEADER_LINE_BLOCK_END;
                if (this.headers['Transfer-Encoding'] === 'chunked') {
                    this.bodyParser = new TrunkedBodyParser();
                }
            } else if (char === ':') {
                this.currentStaus = this.WAITING_HEADER_SPACE;
            } else {
                this.headerName += char;
            }
        } else if (this.currentStaus === this.WAITING_HEADER_SPACE) {
            if (char === ' ') {
                this.currentStaus = this.WAITING_HEADER_VALUE;
            }
        } else if (this.currentStaus === this.WAITING_HEADER_VALUE) {
            if (char === '\r') {
                this.currentStaus = this.WAITING_HEADER_LINE_END;
                this.headers[this.headerName] = this.headerValue;

                this.headerName = '';
                this.headerValue = '';
            } else {
                this.headerValue += char;
            }
        } else if (this.currentStaus === this.WAITING_HEADER_LINE_END) {
            if (char === '\n') {
                this.currentStaus = this.WAITING_HEADER_NAME;
            }
        }else if (this.currentStaus === this.WAITING_HEADER_LINE_BLOCK_END) {
            if (char === '\n') {
                this.currentStaus = this.WAITING_BODY;
            }
        } else if (this.currentStaus === this.WAITING_BODY) {
            this.bodyParser.receiveChar(char);
        }
    }

    receive(string) {
        for (let i = 0; i < string.length; i++){
            this.receiverChar(string.charAt(i));
        }
    }
}

class TrunkedBodyParser{
    constructor() {
        this.WAITING_LENGTH = 0;
        this.WAITING_LENGTH_LINE_END = 1;
        this.READING_TRUNK = 2;
        this.WAITING_NEW_LINE = 3;
        this.WAITING_NEW_LINE_END = 4;
        this.isFinished = false;
        this.length = 0;
        this.content = [];
        this.currentStatus = this.WAITING_LENGTH;
    }

    receiveChar(char) {
        //console.log(JSON.stringify(char));
        if (this.currentStatus === this.WAITING_LENGTH) { // 长度部分
            if (char === '\r') {
                if (this.length === 0) {
                    this.isFinished = true;
                } else {
                    this.currentStatus = this.WAITING_LENGTH_LINE_END;
                }
            } else {
                // 16进制
                this.length *= 16;
                // this.length += char.charCodeAt(0) - '0'.charCodeAt(0);
                this.length += parseInt(char, 16);
            }
        } else if (this.currentStatus === this.WAITING_LENGTH_LINE_END) {
            if (char === '\n') {
                this.currentStatus = this.READING_TRUNK;
            }
        } else if (this.currentStatus === this.READING_TRUNK) {
            this.content.push(char);
            this.length--;
            if (this.length === 0) {
                this.currentStatus = this.WAITING_NEW_LINE;
            }
        } else if (this.currentStatus === this.WAITING_NEW_LINE) {
            if (char === '\r') {
                this.currentStatus = this.WAITING_NEW_LINE_END;
            }
        } else if (this.currentStatus === this.WAITING_NEW_LINE_END) {
            if (char === '\n') {
                this.currentStatus = this.WAITING_LENGTH;
            }
        }
    }
}

module.exports = {
    ResponseParser
}