import {inject} from "aurelia-framework";
import {DataStore} from "./../../data-store";

@inject(DataStore)
export class Dom {
    duration: any;
    dataStore: DataStore;
    data: any;
    dataState: string;
    dataCount: number;
    bindingSource: any;

    start: Date;
    end: Date;
    container;

    constructor(datastore) {
        this.dataState = "loading";
        this.duration = 0;
        this.dataStore = datastore;
    }

    attached() {
        this.container = document.getElementById("itemsContainer");

        addEventListener("onmessage", this.onMessage.bind(this));
        this.dataStore.postMessage("get-all-data", "data/assets.json");
    }

    detached() {
        removeEventListener("onmessage", this.onMessage.bind(this))
    }

    onMessage(event) {
        const action = event.detail.action;
        const result = event.detail.result;

        if (action === "get-all-data") {
            this.data = result;
        }
        else if (action === "data-count") {
            this.dataCount = result;
        }
    }

    clean() {
        requestAnimationFrame(function() {
            this.container.innerHTML = "";
        }.bind(this));
    }

    thrash() {
        this.start = new Date();

        for(let i = 0; i < this.data.length; i++) {
            const li = document.createElement("li");
            li.innerHTML = this.data[i].code;

            this.container.appendChild(li);
        }

    }
    
    trashPerFrame() {
        this.start = new Date();

        for(let i = 0; i < this.data.length; i++) {
            requestAnimationFrame(function() {
                const li = document.createElement("li");
                li.innerHTML = this.data[i].code;
                this.container.appendChild(li);
            }.bind(this));
        }

    }

    batch() {
        this.start = new Date();
        const array = [];

        const dataTimeS = new Date();
        for(let i = 0; i < this.data.length; i++) {
            const li = document.createElement("li");
            li.innerHTML = this.data[i].code;
            array.push(li);
        }
        const dataTimeE = new Date();

        console.log((<any>dataTimeE - <any>dataTimeS) * 0.001);

        requestAnimationFrame(function() {
            console.log(array.length);
            const as = new Date();
            for (let i = 0; i < array.length; i++) {
                this.container.appendChild(array[i]);
            }
            const ae = new Date();
            console.log((<any>ae - <any>as) * 0.001);
        }.bind(this))

    }

    fragment() {
        const offset = 50;
        const batchCount = Math.trunc(this.data.length / offset);

        for (var i = 0; i < batchCount; i++) {

            let start = i * offset;
            let end = start + offset;

            if (end > this.data.length -1) {
                end = this.data.length -1;
            }

            this.fragmentBatch(start, end);
        }
    }

    fragmentBatch(start, end) {
        requestAnimationFrame(() => {
            const fragment = document.createDocumentFragment();

            for (var i = start; i < end; i++) {
                const listItem = document.createElement("li");
                listItem.innerHTML = this.data[i].code;
                fragment.appendChild(listItem);
            }

            this.container.appendChild(fragment);
        });
    }

    time() {
        const fragment = document.createDocumentFragment();
        requestAnimationFrame(() => {
            for(let item of this.data) {
                 const listItem = document.createElement("li");
                 listItem.innerText = item.code;
                 fragment.appendChild(listItem);
            }
        });

        requestAnimationFrame(() => {
            this.container.appendChild(fragment);
            console.log("done");
        });
    }

    // printArrayToDom(domArray) {
    //     const startTime: any = new Date();
    //
    //     function addDom(start, end, container) {
    //         const fragment = document.createDocumentFragment();
    //
    //         for(var i = 0; i < end; i++) {
    //             fragment.appendChild(domArray[i]);
    //         }
    //
    //         container.appendChild(fragment);
    //     }
    //
    //     const offset = 1000;
    //     const batchCount = Math.trunc(domArray.length / offset);
    //
    //     for (var i = 0; i < batchCount; i++) {
    //         const start = i * offset;
    //         let end = start + offset;
    //
    //         if (end > domArray.length -1) {
    //             end = domArray.length -1;
    //         }
    //
    //         requestAnimationFrame(() => {
    //             addDom(start, end, this.container);
    //         });
    //
    //         const endTime: any = new Date();
    //         console.log(`duration ${(endTime - startTime) * 0.001} seconds to add ites to dom`);
    //     }
    // }

    printArrayToDom(domArray) {
        const startTime: any = new Date();

        const fragment = document.createDocumentFragment();

        for(let item of domArray) {
            fragment.appendChild(item);
        }

        this.container.appendChild(fragment);

        const endTime: any = new Date();
        console.log(`duration ${(endTime - startTime) * 0.001} seconds to add ites to dom`);
    }

    inject() {
        this.start = new Date();
        let result = "";
        for(let i = 0; i < this.data.length; i++) {
            result += `<li>${this.data[i].code}</li>`
        }

        this.container.innerHTML = result;
    }
}