class FakeRequest {
    constructor(data) {
        this.body = data.body;
        this.params = data.params;
        this.auth = data.auth;
    }

    static compare(req1, req2) {
        return JSON.stringify(req1.params) == JSON.stringify(req2.params)
            && JSON.stringify(req1.body) == JSON.stringify(req2.body);
    }

}

module.exports = FakeRequest;