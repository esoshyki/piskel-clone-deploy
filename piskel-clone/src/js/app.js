import ColorContoll from './colorContoll'
import PaintBucket from './paintBucket';
import DataLoader from './dataLoader';
import CanvasSize from './canvasSize';
import InstrumentConrtol from './instrumentControl';

export default class App {
    constructor() {

        this.canvas = document.querySelector('.canvas_main');
        this.ctx = this.canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false;
        this.ratio = 4;

        this.colorContoll = new ColorContoll(this.canvas, this.ctx);
        this.paintBucket = new PaintBucket(this.canvas, this.ctx, this.colorContoll, this.ratio);
        this.sizeControl = new CanvasSize(this);
        this.dataLoader = new DataLoader(this);
        this.instrumentControl = new InstrumentConrtol;

        this.draw = this.draw.bind(this);
        this.drawPath = this.drawPath.bind(this);

    }

    draw(e) {

        if (!this.instrumentControl.instrument) return // ничего не делает если инструмент не выбран

        const square = this.getSquare(e)

        if (this.instrumentControl.instrument === 'pencil')  {

            this.pencilDraw(square);
            this.canvas.addEventListener('mousemove', this.drawPath)
            this.canvas.addEventListener('mouseup', () => this.canvas.removeEventListener('mousemove', this.drawPath))
            this.canvas.addEventListener('mouseleave', () => this.canvas.removeEventListener('mousemove', this.drawPath))
        
        }
        
        if (this.instrumentControl.instrument === 'color_picker') {

            this.colorContoll.pickColor(square)

        }

        if (this.instrumentControl.instrument === 'fill_bucket') {
            if (this.colorContoll.getColor(square) === this.colorContoll.currentColor) return
            this.paintBucket.startPath([square[0],square[1],this.canvas.width/16])

        }

        if (this.instrumentControl.instrument === 'test') {

            this.paintBucket.test(square)
        }
      }

    drawPath(e) {

        const square = this.getSquare(e)
        this.pencilDraw(square)

    }
    
    pencilDraw(square) {

        this.ctx.fillRect(square[0],square[1], square[2], square[2])

    }

    getSquare(e) {

        const resize = 512 / this.canvas.width;
        const x = Math.floor((e.pageX - this.canvas.offsetLeft)/resize);
        const y = Math.floor((e.pageY - this.canvas.offsetTop)/resize);
        const size = (this.canvas.width / this.ratio) 
        const startX = size * Math.floor(x/size);
        const startY = size * Math.floor(y/size);
        return [startX, startY, size]

    }   

    start() {

        this.canvas.addEventListener('mousedown', this.draw);
        this.ctx.fillStyle = '#ffffff'
        this.ctx.fillRect(0,0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#000000'
        this.colorContoll.previousColorNode.addEventListener('click', this.colorContoll.previousColorClickHandler)
        this.colorContoll.start();
        this.dataLoader.start();
        this.sizeControl.start();
        this.instrumentControl.start();
        
    }
}