export class App {
    router = null;

    configureRouter(config, router) {
        config.title = 'Pragma Products';
        config.map([
            {route: ['', 'welcome'], name: 'welcome',      moduleId: 'views/welcome/welcome',      nav: true, title: 'Welcome'},
            {route: ['dom'], name: 'dom',      moduleId: 'views/dom/dom',      nav: true, title: 'Dom'},
            {route: ['svg'], name: 'svg',      moduleId: 'views/svg/svg',      nav: true, title: 'SVG'},
            {route: ['canvas'], name: 'canvas',      moduleId: 'views/canvas/canvas',      nav: true, title: 'Canvas'},
            {route: ['glsl'], name: 'glsl',      moduleId: 'views/glsl/glsl',      nav: true, title: 'GlSl'},
        ]);

        this.router = router;
    }
}