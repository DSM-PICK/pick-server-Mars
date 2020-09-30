
class FakeResponse {
    constructor(result) {
        this.result = result;
    }

    send(result) {
        this.result = result;
    }
}

module.exports = FakeResponse;