import {inject} from "aurelia-framework";
import {DataStore} from "./../../data-store";

@inject(DataStore)
export class TreeTest {
    dataStore: DataStore;
    container: any;
    data:any;
    selectedIndex: number;

    constructor(dataStore) {
        this.dataStore = dataStore;
    }

    attached() {
        this.container = document.getElementById("container");

        addEventListener("onmessage", this.onMessage.bind(this));
        this.dataStore.postMessage("data:root", null);
    }

    onMessage(event) {
        const action = event.detail.action;
        const result = event.detail.result;

        if (action == "data:root") {
            this.data = result;
        }
        else if (action == "data:children") {
            this.addChildrenToData(result);
        }
    }

    itemSelected(event) {
        const id = event.target.getAttribute("data-id");
        const selectedObject = this.data.find((element) => element.id == id);
        this.selectedIndex = this.data.indexOf(selectedObject);

        this.dataStore.postMessage("data:children", id);
    }

    addChildrenToData(children) {
        this.data.splice.apply(this.data, [this.selectedIndex + 1, 0].concat(children));
    }
}