export default class Artist {
    constructor(Canvas) {
        this.instrument = 'pencil';
        this.canvas = Canvas;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.fillstyle = 'rgba(0,0,0,255)';
        this.currentColor = [0,0,0,255];
        this.previousColor = 'red';
        this.body = document.querySelector('._artist')
        this.handleClick = this.handleClick.bind(this)
        this.draw = this.draw.bind(this);
        this.drawPath = this.drawPath.bind(this);
        this.selectedNode = this.body.querySelector('[name=pencil]');
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
                console.log(this.instrument)
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

        if (this.instrument === 'pencil') this.pencilDraw(square);

        this.canvas.addEventListener('mousemove', this.drawPath)
        this.canvas.addEventListener('mouseup', () => this.canvas.removeEventListener('mousemove', this.drawPath))
      }

    drawPath(e) {
        const square = this.getSquare(e)
        if (this.checkColor(square)) return
        else {
            this.pencilDraw(square)
        }
    }
    
    checkColor(square) {
        const c = [...this.ctx.getImageData(square[0]+2,square[1]+2,1,1).data];
        return `${c}`=== `${this.currentColor}`
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
        this.body.addEventListener('click', this.handleClick)
        this.canvas.addEventListener('mousedown', this.draw);
        console.log(this.selectedNode)
    }

}