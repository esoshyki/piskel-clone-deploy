export default class Artist {
    constructor(Canvas) {
        this.instrument = 'pencil';
        this.canvas = Canvas;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.fillstyle = 'black';
        this.previousColor = 'red';
        this.body = document.querySelector('._artist')
        this.handleClick = this.handleClick.bind(this)
        this.draw = this.draw.bind(this);
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
        const x = e.pageX - this.canvas.offsetLeft;
        const y = e.pageY - this.canvas.offsetTop;
        const square = this.getSquare(x, y)
        if (this.instrument === 'pencil') this.pencilDraw(square)
    }

    pencilDraw(square) {
        this.ctx.fillRect(square[0],square[1], square[2], square[2])
    }

    getSquare(x, y) {
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