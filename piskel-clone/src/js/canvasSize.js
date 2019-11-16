export default class CanvasSize {
    constructor(obj) {

        this.canvas = obj.canvas;
        this.app = obj
        this.selectedNode = document.querySelector('._change-canvas-size ._item:first-of-type');
        this.selectedNode.classList.add('selected')
        this.handle = this.handle.bind(this);

    }

    handle(e) {

        const target = e.target; const value = target.getAttribute('val');
        if (!value) return

        this.app.ratio = parseInt(value);

        this.selectedNode.classList.remove('selected');
        this.selectedNode = document.querySelector('._change-canvas-size').querySelector(`div[val="${value}"]`);
        this.selectedNode.classList.add('selected');

    }

    start() {

        document.querySelector('._change-canvas-size').addEventListener('click', this.handle)
        
    }
}