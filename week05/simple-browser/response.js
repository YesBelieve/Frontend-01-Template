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
    get response() {
        this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\S\s]+)/);

        return {
            statusCode: RegExp.$1,
            statusText: RegExp.$2,
            headers: this.headers,
            body: this.bodyParser.content.join('')
        };
    }
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

class TrunkedBodyParser {
    constructor() {
        this.WAITING_LENGTH = 0;
        this.WAITING_LENGTH_LINE_END = 1;
        this.READING_TRUNK = 2;
        this.WAITING_NEW_LINE = 3;
        this.WAITING_NEW_LINE_END = 4;
        this.length = 0;
        this.content = [];
        this.isFinished = false;
        this.current = this.WAITING_LENGTH;
    }

    receiveChar(char) {
        if (this.current === this.WAITING_LENGTH) {
            if (char === '\r') {
                if (this.length === 0) {
                    //console.log(this.content);
                    //console.log('///////////');
                    this.isFinished = true;
                } else {
                    this.current = this.WAITING_LENGTH_LINE_END;
                }
            } else {
                this.length *= 10;
                this.length += char.charCodeAt(0) - '0'.charCodeAt(0);
            }
        } else if (this.current === this.WAITING_LENGTH_LINE_END) {
            if (char === '\n') {
                this.current = this.READING_TRUNK;
            }
        } else if (this.current === this.READING_TRUNK) {
            this.content.push(char);
            this.length--;
            if (this.length === 0) {
                this.current = this.WAITING_NEW_LINE;
            }
        } else if (this.current === this.WAITING_NEW_LINE) {
            if (char === '\r') {
                this.current = this.WAITING_NEW_LINE_END;
            }
        } else if (this.current === this.WAITING_NEW_LINE_END) {
            if (char === '\n') {
                this.current = this.WAITING_LENGTH;
            }
        }
    }
}

module.exports = {
    ResponseParser
}