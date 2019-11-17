import ColorContoll from './colorContoll'
import PaintBucket from './paintBucket';
import DataLoader from './DataLoad/dataLoader';
import CanvasSize from './canvasSize';

export default class App {
    constructor() {
        this.instrument = 'pencil';
        this.canvas = document.querySelector('.canvas_main');
        this.ctx = this.canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false;
        this.ratio = 4;

        this.colorContoll = new ColorContoll(this.canvas, this.ctx);
        this.paintBucket = new PaintBucket(this.canvas, this.ctx, this.colorContoll, this.ratio);
        this.sizeControl = new CanvasSize(this);
        this.dataLoader = new DataLoader(this);

        this.body = document.querySelector('._artist')
        this.selectedNode = document.querySelector('[name=pencil]');
        this.handleClick = this.handleClick.bind(this);
        this.handlePress = this.handlePress.bind(this);
        this.draw = this.draw.bind(this);
        this.drawPath = this.drawPath.bind(this);
        this.changeSelect = this.changeSelect.bind(this);
        this.changeInstrument = this.changeInstrument.bind(this)

    }

    changeInstrument(instrument) {

        const instr = document.querySelector(`[name=${instrument}]`)
        this.changeSelect(instr, instrument)

    }

    changeCursor() {

        if (this.instrument === 'pencil') {
            document.body.style.cursor = "url('../src/assets/cursors/pencil.cur'), pointer"
        }
        else if (this.instrument === 'fill_bucket') {
            document.body.style.cursor = "url('../src/assets/cursors/bucket.cur'), pointer"
        }
        else if (this.instrument === 'color_picker') {
            document.body.style.cursor = "url('../src/assets/cursors/color-picker.cur'), pointer"
        }

    }


    changeSelect(node, instrument) {

        if (!this.selectedNode) {
            this.selectedNode = node
        }

        else {

            if (this.selectedNode === node) {
                this.selectedNode.classList.remove('selected');
                this.selectedNode = null
                this.instrument = null
                return 
            }

            else {
                this.selectedNode.classList.remove('selected');
                this.selectedNode = node;
            }

        }

        this.selectedNode.classList.add('selected');
        this.instrument = instrument;
        this.changeCursor();

    }

    handleClick(e) {

        if (e.target.classList[0] !=='_artist_item') return // если не попал по кнопке ретурн

        const instrument = e.target.getAttribute('name')

        this.changeSelect(e.target, instrument)

    }

    handlePress(e) {

        if (e.keyCode === 112) {
            this.changeInstrument('pencil');
        }

        if (e.keyCode === 98) {
            this.changeInstrument('fill_bucket')
        }

        if (e.keyCode === 99) {
            this.changeInstrument('color_picker')
        }
    }
  
    draw(e) {

        if (!this.instrument) return // ничего не делает если инструмент не выбран

        const square = this.getSquare(e)

        if (this.instrument === 'pencil')  {

            this.pencilDraw(square);
            this.canvas.addEventListener('mousemove', this.drawPath)
            this.canvas.addEventListener('mouseup', () => this.canvas.removeEventListener('mousemove', this.drawPath))
            this.canvas.addEventListener('mouseleave', () => this.canvas.removeEventListener('mousemove', this.drawPath))
        
        }
        
        if (this.instrument === 'color_picker') {

            this.colorContoll.pickColor(square)

        }

        if (this.instrument === 'fill_bucket') {

            this.paintBucket.startPath(square)

        }

        if (this.instrument === 'test') {

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

        const x = e.pageX - this.canvas.offsetLeft;
        const y = e.pageY - this.canvas.offsetTop;
        const size = this.canvas.width / this.ratio;
        const resize = this.canvas.width / 512;

        const startX = resize * size * Math.floor(x/size);
        const startY = resize * size * Math.floor(y/size);
        console.log(startX, startY, size)
        return [startX, startY, size]

    }   

    start() {

        this.body.addEventListener('click', this.handleClick);
        window.addEventListener('keypress', this.handlePress);
        this.canvas.addEventListener('mousedown', this.draw);
        this.ctx.fillStyle = '#ffffff'
        this.ctx.fillRect(0,0, 512, 512);
        this.ctx.fillStyle = '#000000'
        this.colorContoll.previousColorNode.addEventListener('click', this.colorContoll.previousColorClickHandler)
        this.colorContoll.start();
        this.dataLoader.start();
        this.sizeControl.start();
        
    }
}