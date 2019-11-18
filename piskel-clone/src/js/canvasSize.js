export default class CanvasSize {
    constructor(obj) {

        this.app = obj
        this.selectedPenSize = document.querySelector('._pen-size ._item:first-of-type');
        this.selectedPenSize.classList.add('selected')
        this.selectedVSize = document.querySelector('._change-canvas-size ._item:first-of-type');
        this.selectedVSize.classList.add('selected')
        this.size = 128;

    }

    changeByRatio(ratio) {

        // Функция устанавливает выбранную кнопку размера кисти
        const node = document.querySelector(`._pen-size [penSize='${ratio}']`)
        if (this.selectedPenSize == node) return

        this.selectedPenSize.classList.remove('selected')
        this.selectedPenSize = node;
        this.selectedPenSize.classList.add('selected')

    }

    changeBySize(vSize) {
        const image = new Image()
        image.src = document.querySelector('.canvas_main').toDataURL('image/png');
        this.app.canvas.width = this.app.canvas.height = vSize
        image.width = image.height = vSize;
        image.setAttribute('crossorigin', 'anonymous');
        console.log(image)
        image.onload = () => {
            this.app.ctx.imageSmoothingEnabled = false;
            this.app.ctx.drawImage(image, 0, 0, this.app.canvas.width, this.app.canvas.width)
        }

        // Функция устанавливает выбранную кнопку размера кисти
        const node = document.querySelector(`._change-canvas-size [vSize="${vSize}"]`)
        if (this.selectedVSize == node) return
        
        this.selectedVSize.classList.remove('selected')
        this.selectedVSize = node;
        this.selectedVSize.classList.add('selected')
    }

    handlePenSize(e) {

        const target = e.target; const value = target.getAttribute('penSize');
        if (!value) return

        this.app.ratio = value;
        this.changeByRatio(this.app.ratio)
    }

    handleCanvasSize(e) {
        const target = e.target; const value = target.getAttribute('vSize');
        if (!value) return
        this.size = value
        this.changeBySize(this.size)

    }

    start() {

        document.querySelector('._pen-size').addEventListener('click', this.handlePenSize.bind(this));
        document.querySelector('._change-canvas-size').addEventListener('click', this.handleCanvasSize.bind(this))
        
    }
}