const messages = {
    load: "load",
    count: "data-count",
    getAllData: "get-all-data",
    getRoot: "data:root",
    getChildren: "data:children"
};

class DataStoreManager {
    constructor() {
        this.actionAfterLoad = null;
        this.data = null;
        this.load("data/assets.json");
    }

    getAllData() {
        if (this.data) {
            postMessage({
                action: messages.getAllData,
                result: this.data
            });

            this.getDataCount();
        }
        else {
            this.actionAfterLoad = this.getAllData;
        }
    }

    getRootData() {
        if (this.data) {
            const result = this.data.filter((element) => {
                return element.tree_level == 0;
            });

            postMessage({
                action: messages.getRoot,
                result: result
            })
        }
        else {
            this.actionAfterLoad = this.getRootData;
        }
    }

    getChildren(parentId) {
        const result = this.data.filter((element) => {
           return element.parent_asset_id == parentId;
        });

        postMessage({
            action: messages.getChildren,
            result: result
        })
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

                if (store.actionAfterLoad) {
                    store.actionAfterLoad();
                    store.actionAfterLoad = null;
                }
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
    else if (action === messages.getRoot) {
        storeManager.getRootData()
    }
    else if (action === messages.getChildren){
        storeManager.getChildren(parameters);
    }
};