import {inject} from "aurelia-framework";
import {DataStore} from "./../../data-store";

@inject(DataStore)
export class Welcome {
    dataStore: DataStore;
    dataState: string;
    dataCount: number;

    constructor(dataStore) {
        this.dataStore = dataStore;
        this.dataState = "loading";
        this.dataCount = 0;
    }

    attached() {
        addEventListener("onmessage", this.onMessage.bind(this));

        this.dataStore.postMessage("load", "data/assets.json");
    }

    detached() {
        removeEventListener("onmessage", this.onMessage.bind(this));
    }

    onMessage(event: any) {
        const action = event.detail.action;
        const result = event.detail.result;

        if (action == "load") {
            this.dataState = result;
        }
        else if (action === "data-count") {
            this.dataCount = result;
        }
    }
}