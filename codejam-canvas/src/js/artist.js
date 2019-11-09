import ColorContoll from './colorContoll'

export default class Artist {
    constructor(Canvas) {
        this.instrument = 'pencil';
        this.canvas = Canvas;
        this.ctx = this.canvas.getContext('2d');
        this.colorContoll = new ColorContoll(this.canvas, this.ctx)
        this.body = document.querySelector('._artist')
        this.selectedNode = this.body.querySelector('[name=pencil]');
        this.handleClick = this.handleClick.bind(this)
        this.draw = this.draw.bind(this);
        this.drawPath = this.drawPath.bind(this);
        this.ratio = 4;
    }

    handleClick(e) {
        if (e.target.classList[0] !=='_artist_item') return // если не попал по кнопке ретурн

        const instrument = e.target.getAttribute('name')

        if (!this.selectedNode) {
            this.selectedNode = e.target
        } 

        else {
            // Выключение кнопки при нажатии на ее же саму
            if (this.selectedNode === e.target) {
                this.selectedNode.classList.remove('selected');
                this.selectedNode = null
                this.instrument = null
                return
            }
            // Отключение уже выбранной кнопки
            else {
                this.selectedNode.classList.remove('selected');
                this.selectedNode = e.target;
            }
        }

        this.selectedNode.classList.add('selected');

        this.instrument = instrument

    }
  
    draw(e) {

        if (!this.instrument) return // ничего не делает если инструмент не выбран

        const square = this.getSquare(e)
        console.log(this.ctx.fillstyle)
        if (this.instrument === 'pencil')  {
            this.pencilDraw(square);
            this.canvas.addEventListener('mousemove', this.drawPath)
            this.canvas.addEventListener('mouseup', () => this.canvas.removeEventListener('mousemove', this.drawPath))
        }
        
        if (this.instrument === 'color_picker') {
            this.colorContoll.pickColor(square)
        } 
      }

    drawPath(e) {
        const square = this.getSquare(e)
            this.pencilDraw(square)
    }
    
    pencilDraw(square) {
        console.log(this.ctx.fillstyle)
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
        this.body.addEventListener('click', this.handleClick)
        this.canvas.addEventListener('mousedown', this.draw);
        this.colorContoll.previousColorNode.addEventListener('click', this.colorContoll.previousColorClickHandler)
    }
}