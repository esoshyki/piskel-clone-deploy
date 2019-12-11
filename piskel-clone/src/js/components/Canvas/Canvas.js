import Pencil from "./instruments/Pencil";

export default class Canvas {
    constructor(App) {
        this.app = App;
        this.canvas = document.createElement('canvas');
        this.ctx;

        this.pencil = new Pencil(this)
    }

    update_canvas_size() {
        this.canvas.width = this.app.canvas_size; 
        this.canvas.height = this.app.canvas_size;
    }

    getSquare(e) {
        const resize = 512 / this.canvas.width;
        const x = Math.floor((e.pageX - this.canvas.offsetLeft)/resize);
        const y = Math.floor((e.pageY - this.canvas.offsetTop)/resize);
        const size = (this.canvas.width / this.app.pensize) 
        const startX = size * Math.floor(x/size);
        const startY = size * Math.floor(y/size);
        return [startX, startY, size]
    }   

    draw(e) {
        console.log('here')
        this.ctx.fillStyle = this.app.current_color;
        const square = this.getSquare(e)

        if (this.app.instrument === 'pencil') {
            this.pencil.draw(square)
        }

    }

    start() {

        this.canvas.className = 'canvas_main';
        this.canvas.width = this.app.canvas_size; this.canvas.height = this.app.canvas_size;
        document.querySelector('main').appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false;
        this.canvas.addEventListener('mousedown', this.draw.bind(this))
    }
}