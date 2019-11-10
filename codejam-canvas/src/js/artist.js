import ColorContoll from './colorContoll'
import PaintBucket from './paintBucket';

export default class Artist {
    constructor(Canvas) {
        this.instrument = 'pencil';
        this.canvas = Canvas;
        this.ctx = this.canvas.getContext('2d');
        this.colorContoll = new ColorContoll(this.canvas, this.ctx);
        this.paintBucket = new PaintBucket(this.canvas, this.ctx, this.colorContoll, this.ratio);
        this.body = document.querySelector('._artist')
        this.selectedNode = document.querySelector('[name=pencil]');
        this.handleClick = this.handleClick.bind(this);
        this.handlePress = this.handlePress.bind(this);
        this.draw = this.draw.bind(this);
        this.drawPath = this.drawPath.bind(this);
        this.changeSelect = this.changeSelect.bind(this);
        this.changeInstrument = this.changeInstrument.bind(this)
        this.ratio = 4;

    }

    changeInstrument(instrument) {
        console.log(instrument)
        const instr = document.querySelector(`[name=${instrument}]`)
        console.log(instr)
        this.changeSelect(instr, instrument)

    }

    changeCursor() {

        if (this.instrument === 'pencil') {
            document.body.style.cursor = "url('./src/assets/cursors/pencil.cur'), pointer"
        }
        else if (this.instrument === 'fill_bucket') {
            document.body.style.cursor = "url('./src/assets/cursors/bucket.cur'), pointer"
        }
        else if (this.instrument === 'color_picker') {
            document.body.style.cursor = "url('./src/assets/cursors/color-picker.cur'), pointer"
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
        this.instrument = instrument
        this.changeCursor()
    }

    handleClick(e) {

        if (e.target.classList[0] !=='_artist_item') return // если не попал по кнопке ретурн

        const instrument = e.target.getAttribute('name')

        this.changeSelect(e.target, instrument)

    }

    handlePress(e) {
        console.log(e.keyCode)
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
        const size = 512 / this.ratio;
        const startX = size * Math.floor(x/size);
        const startY = size * Math.floor(y/size);
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
        this.colorContoll.start()
    }
}