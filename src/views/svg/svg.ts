import {inject} from "aurelia-framework";
import {DataStore} from "./../../data-store";

@inject(DataStore)
export class Svg {
    dataStore: DataStore;
    data: any;
    dataState: string;
    dataCount: number;
    container: any;
    svg: any;

    constructor(dataStore) {
        this.dataStore = dataStore;
    }

    attached() {
        this.container = document.getElementById("container");

        addEventListener("onmessage", this.onMessage.bind(this));
        this.dataStore.postMessage("load", "data/assets.json");

        this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.container.appendChild(this.svg);
    }

    onMessage(event) {
        const action = event.detail.action;
        const result = event.detail.result;

        if (action == "load") {
            this.dataState = result;
        }
        else if (action === "get-all-data") {
            this.data = result;
        }
        else if (action === "data-count") {
            this.dataCount = result;
        }
    }

    clean() {

    }

    thrash() {
        const fragment = document.createDocumentFragment();
        const fontSize = 16;

        requestAnimationFrame(() => {
            let i = 0;
            for(let item of this.data) {
                i++;

                const textNode = document.createElementNS("http://www.w3.org/2000/svg", "text");
                textNode.setAttributeNS(null, "x", "0");
                textNode.setAttributeNS(null, "y", String(i * fontSize));
                textNode.setAttributeNS(null, "font-size", String(fontSize));
                textNode.innerHTML = item.code;

                fragment.appendChild(textNode);
            }
        });

        requestAnimationFrame(() => {
            this.svg.appendChild(fragment)
        });

        console.log("thrash");
    }
}