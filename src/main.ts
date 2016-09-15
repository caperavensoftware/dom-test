export function configure(aurelia) {
    return new Promise((resolve) => {
        aurelia.use
            .standardConfiguration()
            .developmentLogging()
            .plugin('aurelia-ui-virtualization');

        aurelia.start().then(() => {
            aurelia.setRoot();
            resolve();
        });
    });
}