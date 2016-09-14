export class DataStore {
    worker: Worker;
    constructor() {
        this.worker = new Worker("data-store.js");
        this.worker.onmessage = this.onMessage.bind(this);
    }

    postMessage(message: string, parameters: any) {
        this.worker.postMessage([message, parameters]);
    }

    onMessage(e) {
        const event = new CustomEvent("onmessage", {detail: e.data});
        dispatchEvent(event);
    }
}