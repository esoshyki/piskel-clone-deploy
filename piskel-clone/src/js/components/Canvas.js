export default class Canvas {
    constructor(App) {
        this.app = App;
        this.canvas = document.createElement('canvas');
        this.ctx;
    }

    start() {
        const content = document.createElement('div');
        content.className = 'canvas';
        this.canvas.className = 'canvas_main';
        this.canvas.width = 512; this.canvas.height = 512;
        content.appendChild(this.canvas);
        document.querySelector('main').appendChild(content);
        this.ctx = this.canvas.getContext('2d');
    }
}