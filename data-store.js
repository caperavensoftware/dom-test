const messages = {
    load: "load",
    count: "data-count",
    getAllData: "get-all-data"
};

class DataStoreManager {
    constructor() {
        this.data = null;
    }

    getAllData() {
        postMessage({
            action: messages.getAllData,
            result: this.data
        });
    }

    getDataRange() {

    }

    getDataCount() {
        let count = 0;

        if (this.data)
        {
            count = this.data.length;
        }

        postMessage({
            action: messages.count,
            result: count
        })
    }

    load(params) {
        const store = this;

        fetch(params)
            .then(function(response) {
                return response.text();
            })
            .then(function(data){
                store.data = JSON.parse(data).data;
                postMessage({
                    action: messages.load,
                    result: "done"
                });
                store.getDataCount();
                store.getAllData();
            })
            .catch(function(error) {
                console.error(error.message);
            });
    }
}

const storeManager = new DataStoreManager();

onmessage = function(e) {
    const action = e.data[0];
    const parameters = e.data[1];

    if (action === messages.load) {
        storeManager.load(parameters);
    }
    else if (action === messages.count) {
        storeManager.getDataCount()
    }
    else if (action == messages.getAllData) {
        storeManager.getAllData()
    }
};